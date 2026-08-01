import { useState, useMemo, useEffect } from "react";
import { encodeOrderToUrl } from "../../utils/supabase";
import type { DBOrderLog, DBOrderItem } from "../../utils/supabase";
import { formatCurrency } from "../../utils/format";
import { DollarSign, ShoppingBag, TrendingUp, Calendar, Search, Trash2, Eye, Printer, Copy, Save } from "lucide-react";
import { showToast } from "../../components/Toast";
import delassaLogo from "../../assets/delassa.webp";


interface AdminOverviewTabProps {
  orderLogs: DBOrderLog[];
  loading: boolean;
  onUpdateOrder: (id: string, updates: Partial<Omit<DBOrderLog, "id" | "created_at">>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function AdminOverviewTab({
  orderLogs,
  loading,
  onUpdateOrder,
  onDelete
}: AdminOverviewTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | DBOrderLog["status"]>("all");
  const [selectedOrder, setSelectedOrder] = useState<DBOrderLog | null>(null);

  const [localOngkir, setLocalOngkir] = useState(0);
  const [localStatus, setLocalStatus] = useState<DBOrderLog["status"]>("pending");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedOrder) {
      setLocalOngkir(selectedOrder.ongkir || 0);
      setLocalStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const handleCopyWAText = () => {
    if (!selectedOrder) return;
    const subtotal = (selectedOrder.items || []).reduce((sum, item) => sum + (item.price * item.qty), 0);
    const total = subtotal + Number(localOngkir);
    
    let itemsText = "";
    (selectedOrder.items || []).forEach(item => {
      itemsText += `• ${item.title} x${item.qty} (${item.price === 0 ? "Gratis" : formatCurrency(item.price * item.qty)})\n`;
    });

    const notaId = `DEL-${selectedOrder.id.slice(0, 8).toUpperCase()}`;
    const dateStr = selectedOrder.pickup_date
      ? new Date(selectedOrder.pickup_date).toLocaleDateString("id-ID", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      : "-";

    const encodedData = encodeOrderToUrl(selectedOrder);
    const shareableUrl = `${window.location.origin}/struk/${encodedData}`;

    const text = `🧾 *STRUK DIGITAL - DELASSA HOME BAKERY*
----------------------------------------
Nomor Nota: #${notaId}
Pelanggan: ${selectedOrder.customer_name}
No. HP: ${selectedOrder.phone || "-"}
Tanggal Pickup: ${dateStr}

*Rincian Pesanan:*
${itemsText}
----------------------------------------
Subtotal: ${formatCurrency(subtotal)}
Ongkir: ${formatCurrency(localOngkir)}
*TOTAL TAGIHAN: ${formatCurrency(total)}*
----------------------------------------
Silakan melakukan pembayaran transfer ke:
🏦 *Bank BCA: 123456789* a/n *Delassa Home Bakery*

*Link Struk Digital:*
Buka link ini untuk mengunduh/melihat struk Anda:
${shareableUrl}

Harap kirimkan bukti transfer ke WhatsApp ini setelah melakukan pembayaran.
Terima kasih sudah memesan di Delassa! ✨`;

    navigator.clipboard.writeText(text);
    showToast("Format teks WhatsApp + Link Struk berhasil disalin!", "success");
  };

  const handlePrint = (notaId: string) => {
    const printContent = document.getElementById("receipt-print-area")?.innerHTML;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showToast("Gagal membuka jendela cetak. Izinkan pop-up di browser.", "error");
      return;
    }

    const logoSrc = window.location.origin + delassaLogo;

    printWindow.document.write(`
      <html>
        <head>
          <title>Struk-Delassa-${notaId}</title>
          <style>
            @page {
              size: A5 portrait;
              margin: 10mm;
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              margin: 0;
              padding: 0;
              background: white;
              color: #3b2b26;
              font-size: 11px;
              line-height: 1.4;
            }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .items-center { align-items: center; }
            .text-center { text-align: center; }
            .justify-between { justify-content: space-between; }
            .font-serif { font-family: Georgia, Cambria, "Times New Roman", Times, serif; }
            .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: bold; }
            .font-black { font-weight: 900; }
            .text-sm { font-size: 13px; }
            .text-xs { font-size: 10px; }
            .text-lg { font-size: 16px; }
            .text-xl { font-size: 18px; }
            .text-[10px] { font-size: 9px; }
            .text-[11px] { font-size: 10px; }
            .tracking-wide { letter-spacing: 0.025em; }
            .tracking-widest { letter-spacing: 0.1em; }
            .uppercase { text-transform: uppercase; }
            .italic { font-style: italic; }
            
            /* Spacing & Borders */
            .border-b { border-bottom: 1px dashed #ead8c7; }
            .border-t { border-top: 1px dashed #ead8c7; }
            .border-dotted { border-top: 1px dotted #ead8c7; }
            .pb-3 { padding-bottom: 12px; }
            .py-3 { padding-top: 12px; padding-bottom: 12px; }
            .py-5 { padding-top: 20px; padding-bottom: 20px; }
            .py-6 { padding-top: 24px; padding-bottom: 24px; }
            .pt-6 { padding-top: 24px; }
            .pb-2 { padding-bottom: 8px; }
            .mt-0\\.5 { margin-top: 2px; }
            .mt-1 { margin-top: 4px; }
            .mt-1\\.5 { margin-top: 6px; }
            .my-1 { margin-top: 4px; margin-bottom: 4px; }
            .mb-1\\.5 { margin-bottom: 6px; }
            .mb-2 { margin-bottom: 8px; }
            .mb-3 { margin-bottom: 12px; }
            
            /* Layout grids */
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-y-3 { row-gap: 12px; }
            .gap-x-4 { column-gap: 16px; }
            
            /* Tables / Rows */
            .space-y-2\\.5 > * + * { margin-top: 10px; }
            .space-y-3\\.5 > * + * { margin-top: 14px; }
            .space-y-2 > * + * { margin-top: 8px; }
            .p-3 { padding: 12px; }
            .p-4 { padding: 16px; }
            .p-2\\.5 { padding: 10px; }
            .rounded-xl { border-radius: 12px; }
            .rounded-2xl { border-radius: 16px; }
            .bg-\\[\\#fffaf5\\] { background-color: #fffaf5; }
            .bg-\\[\\#fcfaf7\\] { background-color: #fcfaf7; }
            .text-gray-400 { color: #9ca3af; }
            .text-gray-500 { color: #6b7280; }
            .text-green-500 { color: #22c55e; }
            .text-\\[\\#c38358\\] { color: #c38358; }
            .text-\\[\\#2f221d\\] { color: #2f221d; }
            .text-\\[\\#3b2b26\\] { color: #3b2b26; }
            .text-\\[\\#8e7b72\\] { color: #8e7b72; }
            .text-\\[\\#6d5b52\\] { color: #6d5b52; }
            
            /* Status Badges */
            .bg-green-100 { background-color: #dcfce7; color: #166534; }
            .bg-blue-100 { background-color: #dbeafe; color: #1e40af; }
            .bg-red-100 { background-color: #fee2e2; color: #991b1b; }
            .bg-yellow-100 { background-color: #fef9c3; color: #854d0e; }
            .px-2\\.5 { padding-left: 10px; padding-right: 10px; }
            .py-1 { padding-top: 4px; padding-bottom: 4px; }
            .rounded-full { border-radius: 9999px; }
            
            /* Hide scrollbar */
            ::-webkit-scrollbar { display: none; }
            img {
              width: 60px !important;
              height: 60px !important;
              border-radius: 50% !important;
              object-fit: cover !important;
              border: 1px solid #ead8c7 !important;
              margin-bottom: 8px !important;
            }
          </style>
        </head>
        <body>
          <div style="width: 100%;">
            ${printContent}
          </div>
          <script>
            // Pastikan gambar logo ter-render dengan src yang benar saat cetak
            const imgEl = document.querySelector('img');
            if (imgEl) imgEl.src = "${logoSrc}";

            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 1000);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleSaveOrder = async () => {
    if (!selectedOrder) return;
    setIsSaving(true);
    try {
      const subtotal = (selectedOrder.items || []).reduce((sum, item) => sum + (item.price * item.qty), 0);
      const newTotal = subtotal + Number(localOngkir);
      
      const updates = {
        status: localStatus,
        ongkir: Number(localOngkir),
        total_amount: newTotal
      };
      
      await onUpdateOrder(selectedOrder.id, updates);
      setSelectedOrder(prev => prev ? { ...prev, ...updates } : null);
      showToast("Pesanan berhasil disimpan & diperbarui!", "success");
    } catch (err) {
      console.error(err);
      showToast("Gagal memperbarui data pesanan.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // 1. STATS CALCULATIONS
  const stats = useMemo(() => {
    // Estimasi omset dihitung dari semua pesanan KECUALI yang statusnya cancelled
    const validOrders = orderLogs.filter(o => o.status !== "cancelled");
    const totalRevenue = validOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const totalTransactions = orderLogs.length;
    const avgOrderValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    const counts = {
      pending: orderLogs.filter(o => o.status === "pending").length,
      confirmed: orderLogs.filter(o => o.status === "confirmed").length,
      completed: orderLogs.filter(o => o.status === "completed").length,
      cancelled: orderLogs.filter(o => o.status === "cancelled").length,
    };

    return { totalRevenue, totalTransactions, avgOrderValue, counts };
  }, [orderLogs]);

  // 2. BEST SELLERS CALCULATIONS
  const bestSellers = useMemo(() => {
    const itemMap: Record<string, number> = {};
    // Hitung qty dari pesanan valid saja
    orderLogs.filter(o => o.status !== "cancelled").forEach(o => {
      const itemsList = Array.isArray(o.items) ? o.items : [];
      itemsList.forEach((item: DBOrderItem) => {
        const title = item.title.split(" (")[0]; // Clean name
        itemMap[title] = (itemMap[title] || 0) + Number(item.qty || 0);
      });
    });

    const list = Object.entries(itemMap).map(([title, qty]) => ({ title, qty }));
    list.sort((a, b) => b.qty - a.qty);
    return list.slice(0, 5); // Ambil top 5
  }, [orderLogs]);

  // 3. 7-DAYS CHART TREND CALCULATIONS
  const chartData = useMemo(() => {
    const days: Array<{ dateStr: string; label: string; amount: number; count: number }> = [];
    const dateObj = new Date();
    // Tarik 7 hari ke belakang
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(dateObj.getDate() - i);
      const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
      const label = d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" });
      days.push({ dateStr, label, amount: 0, count: 0 });
    }

    orderLogs.filter(o => o.status !== "cancelled").forEach(o => {
      if (!o.created_at) return;
      const orderDate = o.created_at.split("T")[0];
      const match = days.find(day => day.dateStr === orderDate);
      if (match) {
        match.amount += Number(o.total_amount || 0);
        match.count += 1;
      }
    });

    return days;
  }, [orderLogs]);

  // 4. FILTERED ORDER LOGS FOR TIMELINE
  const filteredOrders = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return orderLogs.filter(o => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;

      const itemsStr = Array.isArray(o.items)
        ? o.items.map((i: DBOrderItem) => i.title).join(" ").toLowerCase()
        : "";
      const haystack = [
        o.customer_name,
        o.phone,
        o.notes,
        itemsStr
      ].join(" ").toLowerCase();

      const matchesSearch = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesStatus && matchesSearch;
    });
  }, [orderLogs, searchQuery, statusFilter]);

  // 5. SVG CHART RENDERING DETAILS
  const svgParams = useMemo(() => {
    const maxAmount = Math.max(...chartData.map(d => d.amount), 100000);
    const width = 500;
    const height = 150;
    const padding = 20;

    const points = chartData.map((d, index) => {
      const x = padding + (index * (width - padding * 2)) / (chartData.length - 1);
      const y = height - padding - (d.amount * (height - padding * 2)) / maxAmount;
      return { x, y };
    });

    const pathD = points.length > 0
      ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
      : "";

    const areaD = points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
      : "";

    return { width, height, points, pathD, areaD, maxAmount };
  }, [chartData]);

  return (
    <div className="space-y-6 mt-6">
      {/* 1. STATS PANEL */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* REVENUE CARD */}
        <div className="bg-white p-6 rounded-3xl border border-[#ead8c7]/40 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600 shrink-0">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Estimasi Omset (Aktif)</p>
            <h3 className="text-xl font-black text-[#2f221d] mt-0.5">{formatCurrency(stats.totalRevenue)}</h3>
            <p className="text-[9px] text-[#7a6a62] mt-0.5">*Tidak termasuk order dibatalkan</p>
          </div>
        </div>

        {/* ORDERS CARD */}
        <div className="bg-white p-6 rounded-3xl border border-[#ead8c7]/40 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-[#fff9f5] rounded-2xl text-[#c38358] shrink-0">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Total Transaksi</p>
            <h3 className="text-xl font-black text-[#2f221d] mt-0.5">{stats.totalTransactions} Pesanan</h3>
            <p className="text-[9px] text-[#7a6a62] mt-0.5">Dikirim ke WhatsApp</p>
          </div>
        </div>

        {/* AVERAGE BASKET */}
        <div className="bg-white p-6 rounded-3xl border border-[#ead8c7]/40 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-purple-50 rounded-2xl text-purple-600 shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Rata-rata Belanja</p>
            <h3 className="text-xl font-black text-[#2f221d] mt-0.5">{formatCurrency(stats.avgOrderValue)}</h3>
            <p className="text-[9px] text-[#7a6a62] mt-0.5">Per pengunjung checkout</p>
          </div>
        </div>
      </div>

      {/* STATUS FILTER PILLS */}
      <div className="flex flex-wrap gap-2 bg-[#f2e7dd]/20 p-2 rounded-2xl border border-[#ead8c7]/30 max-w-fit">
        {[
          { id: "all", label: "Semua", count: orderLogs.length, color: "bg-gray-100 text-gray-700" },
          { id: "pending", label: "Pending", count: stats.counts.pending, color: "bg-amber-50 text-amber-700 border border-amber-100" },
          { id: "confirmed", label: "Dikonfirmasi", count: stats.counts.confirmed, color: "bg-blue-50 text-blue-700 border border-blue-100" },
          { id: "completed", label: "Selesai", count: stats.counts.completed, color: "bg-emerald-50 text-emerald-700 border border-emerald-100" },
          { id: "cancelled", label: "Dibatalkan", count: stats.counts.cancelled, color: "bg-red-50 text-red-700 border border-red-100" }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setStatusFilter(item.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              statusFilter === item.id
                ? "bg-[#c38358] text-white shadow-sm"
                : "bg-white text-[#7a6a62] hover:bg-[#fff5ef]"
            }`}
          >
            {item.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${statusFilter === item.id ? "bg-white/30 text-white" : item.color}`}>
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* 2. CHARTS & TREND SECTION */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 7 DAYS TREND CHART */}
        <div className="bg-white p-5 rounded-3xl border border-[#ead8c7]/40 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h4 className="text-sm font-black text-[#2f221d] flex items-center gap-2">
              <Calendar size={16} className="text-[#c38358]" />
              Tren Omset (7 Hari Terakhir)
            </h4>
            <p className="text-[11px] text-[#7a6a62] mt-0.5">Grafik nilai transaksi harian pembeli.</p>
          </div>

          {/* SVG RENDER LINE CHART */}
          <div className="w-full mt-4 flex-grow relative">
            <svg viewBox={`0 0 ${svgParams.width} ${svgParams.height}`} className="w-full overflow-visible">
              <defs>
                <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c38358" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#c38358" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="20" x2="480" y2="20" stroke="#ead8c7" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="75" x2="480" y2="75" stroke="#ead8c7" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="20" y1="130" x2="480" y2="130" stroke="#ead8c7" strokeWidth="0.5" />

              {/* Gradient Area Fill */}
              {svgParams.areaD && (
                <path d={svgParams.areaD} fill="url(#gradient-area)" />
              )}

              {/* Line path */}
              {svgParams.pathD && (
                <path d={svgParams.pathD} fill="none" stroke="#c38358" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              )}

              {/* Interactive dots */}
              {svgParams.points.map((p, index) => (
                <g key={index} className="group cursor-pointer">
                  <circle cx={p.x} cy={p.y} r="4" fill="#c38358" stroke="white" strokeWidth="1.5" />
                  <circle cx={p.x} cy={p.y} r="8" fill="#c38358" opacity="0" className="hover:opacity-20 transition" />
                  <text x={p.x} y={p.y - 10} textAnchor="middle" className="text-[8px] font-black fill-[#2f221d] opacity-0 group-hover:opacity-100 transition duration-300">
                    {formatCurrency(chartData[index].amount)}
                  </text>
                </g>
              ))}

              {/* Y Axis Label Max */}
              <text x="25" y="15" className="text-[8px] font-bold fill-gray-400">Max: {formatCurrency(svgParams.maxAmount)}</text>
            </svg>
          </div>

          <div className="flex justify-between border-t border-gray-100 pt-3 text-[10px] font-bold text-gray-400 px-2 mt-2">
            {chartData.map((d, i) => (
              <span key={i} className="text-center">{d.label}</span>
            ))}
          </div>
        </div>

        {/* BEST SELLING PRODUCTS GAUGE */}
        <div className="bg-white p-5 rounded-3xl border border-[#ead8c7]/40 shadow-sm flex flex-col min-h-[300px]">
          <div>
            <h4 className="text-sm font-black text-[#2f221d] flex items-center gap-2">
              <TrendingUp size={16} className="text-[#c38358]" />
              Varian Produk Terlaris (Qty Pcs)
            </h4>
            <p className="text-[11px] text-[#7a6a62] mt-0.5">Varian menu yang paling sering dibeli.</p>
          </div>

          <div className="mt-4 flex-grow flex flex-col justify-center space-y-4">
            {bestSellers.length === 0 ? (
              <div className="text-center text-xs text-[#7a6a62] py-8">Belum ada transaksi.</div>
            ) : (
              bestSellers.map((item, index) => {
                const maxQty = bestSellers[0]?.qty || 1;
                const percent = Math.min(100, Math.round((item.qty / maxQty) * 100));
                return (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-[#2f221d]">
                      <span className="truncate max-w-[80%]">{item.title}</span>
                      <span className="text-[#c38358]">{item.qty} Pcs</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ead8c7] to-[#c38358] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 3. ORDER TIMELINE LIST */}
      <div className="bg-white p-5 rounded-3xl border border-[#ead8c7]/40 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4">
          <div>
            <h4 className="text-sm font-black text-[#2f221d]">Histori Transaksi Masuk</h4>
            <p className="text-[11px] text-[#7a6a62] mt-0.5">Daftar pengunjung yang melakukan klik checkout ke WhatsApp.</p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative max-w-xs w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={14} className="text-[#c38358]" />
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, hp, atau item..."
              className="w-full rounded-xl border border-[#ead8c7]/60 bg-[#fdf7f2]/30 pl-9 pr-4 py-2 text-xs font-bold outline-none focus:border-[#c38358] focus:bg-white transition"
            />
          </div>
        </div>

        {/* ORDER LIST CONTAINER */}
        <div className="overflow-x-auto mt-4" style={{ scrollbarWidth: "none" }}>
          {loading ? (
            <div className="text-center text-xs text-[#7a6a62] py-12">Memuat histori transaksi...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center text-xs text-[#7a6a62] py-12 border border-dashed border-gray-200 rounded-2xl">
              Tidak ada histori transaksi yang cocok.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[#7a6a62] font-black uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4">Nama Pembeli</th>
                  <th className="py-3 px-4">Pesanan</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((order) => {
                  const dateStr = order.created_at
                    ? new Date(order.created_at).toLocaleString("id-ID", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                    : "-";
                  const itemsList = Array.isArray(order.items) ? order.items : [];
                  return (
                    <tr key={order.id} className="hover:bg-[#fffcf9]/60 transition">
                      <td className="py-4 px-4 font-bold text-gray-500 whitespace-nowrap">{dateStr}</td>
                      <td className="py-4 px-4">
                        <p className="font-black text-[#2f221d]">{order.customer_name}</p>
                        <p className="text-[10px] text-gray-400 font-bold">{order.phone || "No HP -"}</p>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {itemsList.map((it: DBOrderItem, idx) => (
                            <span key={idx} className="inline-block bg-[#f2e7dd]/50 text-[#3b2b26] px-2 py-0.5 rounded-lg text-[10px] font-bold">
                              {it.title} <b className="text-[#c38358]">x{it.qty}</b>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-black text-[#2f221d]">{formatCurrency(order.total_amount)}</td>
                      <td className="py-4 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrder(order.id, { status: e.target.value as any })}
                          className={`rounded-lg border px-2 py-1 text-[10px] font-black cursor-pointer outline-none transition ${
                            order.status === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : order.status === "confirmed"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : order.status === "completed"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#2f221d] transition cursor-pointer"
                            title="Detail Lengkap"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => onDelete(order.id)}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition cursor-pointer"
                            title="Hapus Transaksi"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 4. DETAIL POPUP MODAL */}
      {selectedOrder && (() => {
        const subtotal = (selectedOrder.items || []).reduce((sum, item) => sum + (item.price * item.qty), 0);
        const total = subtotal + Number(localOngkir);
        const notaId = `DEL-${selectedOrder.id.slice(0, 8).toUpperCase()}`;

        return (
          <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                body * {
                  visibility: hidden !important;
                }
                #receipt-print-area, #receipt-print-area * {
                  visibility: visible !important;
                }
                #receipt-print-area {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  max-width: 450px !important;
                  margin: 0 auto !important;
                  padding: 16px !important;
                  border: none !important;
                  box-shadow: none !important;
                  background: white !important;
                  color: black !important;
                  font-family: monospace !important;
                }
                .no-print {
                  display: none !important;
                }
              }
            `}} />

            <div className="w-full max-w-4xl bg-[#fffaf5] rounded-[32px] border border-[#ead8c7]/50 shadow-2xl p-6 relative my-8">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute right-5 top-5 h-8 w-8 rounded-full bg-[#3b2b26] text-white hover:bg-black transition cursor-pointer text-sm font-bold flex items-center justify-center no-print"
              >
                ×
              </button>

              <div className="no-print">
                <p className="text-[10px] font-black uppercase tracking-[2px] text-[#c38358]">DETAIL & CETAK NOTA</p>
                <h3 className="text-lg font-black text-[#2f221d] mt-1">Kelola Pesanan #{notaId}</h3>
              </div>

              {/* Grid 2 Column */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Left Side: Edit & Info Form */}
                <div className="space-y-4 text-xs no-print">
                  {/* Customer Info */}
                  <div className="bg-white rounded-2xl border border-[#ead8c7]/40 p-4 space-y-3">
                    <p className="text-[#c38358] font-black uppercase tracking-wider text-[10px]">Informasi Pembeli</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-gray-400 font-bold">Nama Pelanggan</p>
                        <p className="font-black text-[#2f221d] text-sm mt-0.5">{selectedOrder.customer_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-bold">No WhatsApp / HP</p>
                        <p className="font-black text-[#2f221d] text-sm mt-0.5">{selectedOrder.phone || "-"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold">Tanggal Pickup</p>
                      <p className="font-black text-[#2f221d] mt-0.5 text-sm">
                        {selectedOrder.pickup_date
                          ? new Date(selectedOrder.pickup_date).toLocaleDateString("id-ID", {
                              weekday: "short",
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* Edit Status & Ongkir */}
                  <div className="bg-white rounded-2xl border border-[#ead8c7]/40 p-4 space-y-4">
                    <p className="text-[#c38358] font-black uppercase tracking-wider text-[10px]">Edit Pengiriman & Status</p>
                    
                    {/* Status select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-500">Status Pesanan</label>
                      <select
                        value={localStatus}
                        onChange={(e) => setLocalStatus(e.target.value as any)}
                        className={`rounded-xl border px-3 py-2 font-black cursor-pointer outline-none transition w-full ${
                          localStatus === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : localStatus === "confirmed"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : localStatus === "completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        <option value="pending">Pending (Menunggu Ongkir)</option>
                        <option value="confirmed">Confirmed (Terkonfirmasi)</option>
                        <option value="completed">Completed (Selesai)</option>
                        <option value="cancelled">Cancelled (Dibatalkan)</option>
                      </select>
                    </div>

                    {/* Ongkir input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-gray-500">Biaya Ongkir (Rp)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-400">Rp</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={localOngkir === 0 ? "" : localOngkir}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setLocalOngkir(val === "" ? 0 : Number(val));
                          }}
                          placeholder="0"
                          className="w-full pl-9 pr-4 py-2 border border-[#ead8c7] rounded-xl outline-none focus:border-[#c38358] bg-[#fffaf5] text-sm font-semibold"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400">Total Tagihan otomatis terupdate menjadi {formatCurrency(total)}</p>
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={handleSaveOrder}
                      disabled={isSaving}
                      className="w-full flex items-center justify-center gap-2 bg-[#c38358] hover:bg-[#a96d45] text-white rounded-xl py-2.5 font-bold shadow-md transition cursor-pointer disabled:opacity-50"
                    >
                      <Save size={16} />
                      <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
                    </button>
                  </div>

                  {/* Notes */}
                  <div>
                    <p className="text-gray-400 font-bold mb-1">Catatan Pembeli</p>
                    <div className="bg-white/50 rounded-xl p-3 border border-[#ead8c7]/20 font-semibold text-[#3b2b26] min-h-[50px] leading-relaxed">
                      {selectedOrder.notes || "(Tidak ada catatan)"}
                    </div>
                  </div>
                </div>

                {/* Right Side: Struk Digital Preview & Print Actions */}
                <div className="flex flex-col items-center">
                  
                  {/* Digital Receipt Container */}
                  <div
                    id="receipt-print-area"
                    className="w-full bg-white rounded-2xl border border-[#ead8c7] p-6 shadow-sm max-w-[380px] text-[12px] text-[#3b2b26] leading-relaxed relative print:shadow-none print:border-none print:p-0"
                  >
                    {/* Brand Header */}
                    <div className="flex flex-col items-center text-center pb-4 border-b border-dashed border-gray-300">
                      <img
                        src={delassaLogo}
                        alt="Delassa Home Bakery"
                        className="w-12 h-12 rounded-full object-cover border border-[#fff5ef] shadow-sm mb-2"
                      />
                      <h4 className="text-sm font-bold tracking-wider text-[#2f221d] uppercase font-serif">Delassa Home Bakery</h4>
                      <p className="text-[10px] text-gray-400">Bekasi, Indonesia</p>
                      <p className="text-[9px] text-gray-400">WhatsApp: +62 877-1544-3313</p>
                    </div>

                    {/* Meta info */}
                    <div className="py-4 space-y-1.5 border-b border-dashed border-gray-300 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider">No. Nota:</span>
                        <span className="font-mono font-bold text-[#c38358]">#{notaId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider">Pelanggan:</span>
                        <span className="font-semibold">{selectedOrder.customer_name}</span>
                      </div>
                      {selectedOrder.phone && (
                        <div className="flex justify-between">
                          <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider">No. HP:</span>
                          <span className="font-semibold">{selectedOrder.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase text-[9px] font-bold tracking-wider">Tgl Pickup:</span>
                        <span className="font-semibold">
                          {selectedOrder.pickup_date
                            ? new Date(selectedOrder.pickup_date).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                              })
                            : "-"}
                        </span>
                      </div>
                    </div>

                    {/* Items table */}
                    <div className="py-4 border-b border-dashed border-gray-300 text-xs">
                      <p className="text-gray-400 uppercase text-[9px] font-bold tracking-wider mb-2">Rincian Item</p>
                      <div className="space-y-2">
                        {(selectedOrder.items || []).map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start gap-3">
                            <span className="truncate flex-grow font-semibold">{item.title}</span>
                            <span className="shrink-0 text-gray-400">x{item.qty}</span>
                            <span className="shrink-0 text-right font-medium min-w-[70px]">
                              {item.price === 0 ? "Gratis" : formatCurrency(item.price * item.qty)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total billing */}
                    <div className="py-4 space-y-1.5 border-b border-dashed border-gray-300 text-xs">
                      <div className="flex justify-between text-gray-500">
                        <span>Subtotal:</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Ongkos Kirim:</span>
                        <span className="font-medium">{formatCurrency(localOngkir)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-[#2f221d] bg-[#fffaf5] p-2.5 rounded-xl border border-[#ead8c7]/40 mt-1">
                        <span>TOTAL TAGIHAN:</span>
                        <span className="text-[#c38358]">{formatCurrency(total)}</span>
                      </div>
                    </div>

                    {/* Payment Instruction */}
                    <div className="pt-4 text-center space-y-1">
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Metode Pembayaran</p>
                      <p className="text-[11px] font-bold text-[#2f221d]">Transfer Bank BCA</p>
                      <p className="text-sm font-black text-[#c38358] tracking-widest leading-none">123456789</p>
                      <p className="text-[9px] text-gray-400">a/n Delassa Home Bakery</p>
                      <p className="text-[10px] text-[#c38358] font-bold mt-2 leading-tight">Terima kasih atas pesanan Anda! ✨</p>
                    </div>
                  </div>

                  {/* Actions underneath the receipt (no-print) */}
                  <div className="w-full max-w-[380px] mt-4 grid grid-cols-2 gap-3 no-print">
                    <button
                      onClick={() => handlePrint(notaId)}
                      className="flex items-center justify-center gap-1.5 bg-white border border-[#c38358] text-[#c38358] hover:bg-[#fff5ef] rounded-xl py-2.5 font-bold text-xs shadow-sm transition cursor-pointer"
                    >
                      <Printer size={14} />
                      <span>Cetak Struk (PDF)</span>
                    </button>
                    <button
                      onClick={handleCopyWAText}
                      className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl py-2.5 font-bold text-xs shadow-sm transition cursor-pointer border border-[#25D366]"
                    >
                      <Copy size={14} />
                      <span>Salin Struk WA</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        const encodedData = encodeOrderToUrl(selectedOrder);
                        const link = `${window.location.origin}/struk/${encodedData}`;
                        navigator.clipboard.writeText(link);
                        showToast("Link struk digital berhasil disalin!", "success");
                      }}
                      className="col-span-2 flex items-center justify-center gap-1.5 bg-[#c38358] hover:bg-[#a96d45] text-white rounded-xl py-2.5 font-bold text-xs shadow-sm transition cursor-pointer border border-[#c38358]"
                    >
                      <Copy size={14} />
                      <span>Salin Link Struk (Bagi ke Pembeli)</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* Close detail footer */}
              <div className="mt-6 border-t border-[#ead8c7]/30 pt-4 text-right no-print">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-[#3b2b26] hover:bg-black text-white rounded-xl px-6 py-2.5 font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Tutup Detail
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}
