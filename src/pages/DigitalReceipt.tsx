import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderLogById } from "../utils/supabase";
import type { DBOrderLog } from "../utils/supabase";
import { formatCurrency } from "../utils/format";
import { Download, ArrowLeft, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import delassaLogo from "../assets/delassa.webp";

export default function DigitalReceipt() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<DBOrderLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;
      try {
        setLoading(true);
        // Supabase query can take either full UUID or partial id
        // Let's query by ID directly
        const data = await getOrderLogById(orderId);
        if (data) {
          setOrder(data);
        } else {
          setError("Pesanan tidak ditemukan.");
        }
      } catch (err) {
        console.error(err);
        setError("Gagal memuat detail pesanan.");
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  const handlePrint = () => {
    if (!order) return;
    const originalTitle = document.title;
    const notaId = `DEL-${order.id.slice(0, 8).toUpperCase()}`;
    document.title = `Struk-Delassa-${notaId}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffcf9] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-10 h-10 text-[#c38358] animate-spin mb-4" />
        <p className="text-[#6d5b52] font-semibold text-sm">Memuat Struk Digital...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#fffcf9] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-14 h-14 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-[#3b2b26] mb-2">Terjadi Kesalahan</h2>
        <p className="text-[#6d5b52] mb-6 max-w-sm">{error || "Detail pesanan tidak dapat ditemukan."}</p>
        <Link
          to="/"
          className="flex items-center gap-2 bg-[#c38358] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#a96d45] shadow-md transition"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    );
  }

  const subtotal = (order.items || []).reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal + (order.ongkir || 0);
  const notaId = `DEL-${order.id.slice(0, 8).toUpperCase()}`;

  // Helper untuk badge status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="bg-green-100 text-green-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase">Selesai</span>;
      case "confirmed":
        return <span className="bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase">Dikonfirmasi</span>;
      case "cancelled":
        return <span className="bg-red-100 text-red-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase">Batal</span>;
      default:
        return <span className="bg-yellow-100 text-yellow-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase">Diproses</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f4] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      {/* Top action header (hidden on print) */}
      <div className="w-full max-w-[500px] mb-6 flex justify-between items-center no-print">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-bold text-[#6d5b52] hover:text-[#c38358] transition"
        >
          <ArrowLeft size={14} />
          <span>Ke Beranda</span>
        </Link>

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#c38358] text-white hover:bg-[#a96d45] rounded-xl px-4 py-2 font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Download size={14} />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* A5 Printable Receipt Container */}
      <div
        id="receipt-view"
        className="w-full max-w-[500px] bg-white rounded-3xl border border-[#ead8c7] p-6 sm:p-8 shadow-[0_10px_30px_rgba(109,91,82,0.06)] relative overflow-hidden print:shadow-none print:border-none print:p-0 print:max-w-full"
        style={{ minHeight: "680px" }}
      >
        {/* Aesthetic background paper accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#c38358] via-[#e5bc99] to-[#c38358]"></div>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center pt-2 pb-6 border-b border-dashed border-[#ead8c7]">
          <img
            src={delassaLogo}
            alt="Delassa Home Bakery"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#fff5ef] shadow-sm mb-3"
          />
          <h1 className="text-xl font-bold font-serif text-[#2f221d] tracking-wide">DELASSA HOME BAKERY</h1>
          <p className="text-[11px] text-[#8e7b72] font-semibold mt-1">Premium Homemade Bakery & Pastry</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Bekasi, Indonesia • WhatsApp: +62 877-1544-3313</p>
        </div>

        {/* Metadata section */}
        <div className="py-5 grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-[#3b2b26] border-b border-dashed border-[#ead8c7]">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">No. Nota</p>
            <p className="font-mono font-bold text-sm text-[#c38358] mt-0.5">{notaId}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Status</p>
            <div className="mt-1">{getStatusBadge(order.status)}</div>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pelanggan</p>
            <p className="font-semibold text-sm mt-0.5">{order.customer_name}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tanggal Pickup</p>
            <p className="font-semibold mt-0.5">
              {order.pickup_date
                ? new Date(order.pickup_date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })
                : "-"}
            </p>
          </div>
          {order.phone && (
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">No. WhatsApp</p>
              <p className="font-semibold mt-0.5">{order.phone}</p>
            </div>
          )}
        </div>

        {/* Items Table */}
        <div className="py-6 border-b border-dashed border-[#ead8c7]">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">Rincian Item</p>
          <div className="space-y-3.5">
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-4 text-xs">
                <div className="flex-grow">
                  <p className="font-semibold text-[#3b2b26]">{item.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Jumlah: {item.qty} pcs</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-[#3b2b26]">
                    {item.price === 0 ? "Gratis (Promo)" : formatCurrency(item.price * item.qty)}
                  </p>
                  {item.price > 0 && item.qty > 1 && (
                    <p className="text-[9px] text-gray-400 mt-0.5">
                      @{formatCurrency(item.price)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="py-5 space-y-2.5 border-b border-dashed border-[#ead8c7] text-xs">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal Produk</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Biaya Ongkos Kirim</span>
            <span className="font-medium">
              {order.ongkir && order.ongkir > 0 ? formatCurrency(order.ongkir) : "Free Ongkir"}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold text-[#2f221d] bg-[#fffaf5] p-3 rounded-xl border border-[#ead8c7]/40 mt-1">
            <span>TOTAL PEMBAYARAN</span>
            <span className="text-[#c38358]">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Buyer Notes */}
        {order.notes && (
          <div className="py-5 border-b border-dashed border-[#ead8c7] text-xs">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Catatan Pembeli</p>
            <p className="text-[#6d5b52] font-medium bg-[#fcfaf7] p-2.5 rounded-lg border border-[#ead8c7]/20 italic leading-relaxed">
              "{order.notes}"
            </p>
          </div>
        )}

        {/* Payment Transfer Info */}
        <div className="pt-6 pb-2 text-center text-xs">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Metode Pembayaran</p>
          <div className="bg-[#fffaf5] border border-[#ead8c7]/50 rounded-2xl p-4 inline-block min-w-[240px] shadow-sm">
            <p className="font-bold text-[#2f221d]">Transfer Bank BCA</p>
            <p className="text-lg font-black text-[#c38358] tracking-widest my-1 select-all">123456789</p>
            <p className="text-[10px] text-[#8e7b72] font-semibold">a/n Delassa Home Bakery</p>
          </div>
          
          <div className="mt-6 flex flex-col items-center">
            <CheckCircle className="text-green-500 w-5 h-5 mb-1.5" />
            <p className="text-[10px] text-[#c38358] font-bold uppercase tracking-wider">Terima kasih atas pesanan Anda!</p>
            <p className="text-[9px] text-gray-400 mt-1">Silakan simpan struk ini sebagai bukti transaksi sah.</p>
          </div>
        </div>

      </div>

      {/* Embedded print css specifically for A5 dimensions */}
      <style>{`
        @media print {
          @page {
            size: A5 portrait;
            margin: 8mm;
          }
          body, html {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: 100% !important;
          }
          #receipt-view {
            width: 100% !important;
            max-width: 100% !important;
            min-height: 0 !important;
            border: none !important;
            box-shadow: none !important;
            padding: 5px !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      
    </div>
  );
}
