import { useEffect, useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import { getProducts, getActivePromos, logOrder } from "../utils/supabase";
import type { DBProduct, DBPromoWithProducts } from "../utils/supabase";
import { getVoucherDetails } from "../data/promos";
import type { Voucher } from "../data/promos";

type CheckoutFormData = {
  customerName: string;
  phone: string;
  address: string;
  location: string;
  notes: string;
  pickupDate: string;
};

const CHECKOUT_FORM_STORAGE_KEY = "delassaCheckoutForm";

const getTodayInputValue = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split("T")[0];
};

const createEmptyCheckoutForm = (): CheckoutFormData => ({
  customerName: "",
  phone: "",
  address: "",
  location: "",
  notes: "",
  pickupDate: getTodayInputValue(),
});

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { cart, removeFromCart, updateQty, totalAmount, clearCart } = useCart();
  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormData>(() => {
    try {
      const stored = localStorage.getItem(CHECKOUT_FORM_STORAGE_KEY);
      return stored
        ? { ...createEmptyCheckoutForm(), ...JSON.parse(stored) }
        : createEmptyCheckoutForm();
    } catch {
      return createEmptyCheckoutForm();
    }
  });

  const { customerName, phone, address, location, notes, pickupDate } = checkoutForm;

  // Voucher states
  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [voucherError, setVoucherError] = useState<string | null>(null);

  // Invalidate voucher if total amount falls below minSubtotal or if they won the same voucher in this transaction
  useEffect(() => {
    if (appliedVoucher) {
      if (totalAmount < (appliedVoucher.minSubtotal ?? 0)) {
        setAppliedVoucher(null);
        setVoucherInput("");
        setVoucherError("Voucher dihapus karena total belanja tidak memenuhi syarat.");
      } else {
        const isJustWon = cart.some(
          (item) => item.title.includes(`(Kode: ${appliedVoucher.code})`) && item.title.includes("Next Order")
        );
        if (isJustWon) {
          setAppliedVoucher(null);
          setVoucherInput("");
          setVoucherError("Voucher ini baru dapat digunakan pada transaksi berikutnya.");
        }
      }
    }
  }, [totalAmount, appliedVoucher, cart]);

  const handleApplyVoucher = () => {
    const codeClean = voucherInput.trim().toUpperCase();
    if (!codeClean) return;

    // Block immediate use of a voucher won in this order
    const isJustWon = cart.some(
      (item) => item.title.includes(`(Kode: ${codeClean})`) && item.title.includes("Next Order")
    );
    if (isJustWon) {
      setVoucherError("Voucher ini baru dapat digunakan pada transaksi berikutnya.");
      setAppliedVoucher(null);
      return;
    }

    const found = getVoucherDetails(codeClean);
    if (!found) {
      setVoucherError("Kode voucher tidak valid.");
      setAppliedVoucher(null);
      return;
    }

    if (totalAmount < (found.minSubtotal ?? 0)) {
      setVoucherError(`Minimal belanja untuk voucher ini adalah ${formatCurrency(found.minSubtotal ?? 0)}.`);
      setAppliedVoucher(null);
      return;
    }

    setAppliedVoucher(found);
    setVoucherError(null);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherInput("");
    setVoucherError(null);
  };

  const finalTotalAmount = useMemo(() => {
    const discount = appliedVoucher ? appliedVoucher.discountAmount : 0;
    return Math.max(0, totalAmount - discount);
  }, [totalAmount, appliedVoucher]);
  
  const isCustomerDataComplete = [customerName, phone, address, pickupDate].every(
    (value) => value.trim().length > 0
  );

  // Load products and promos to calculate free items
  const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);
  const [activePromos, setActivePromos] = useState<DBPromoWithProducts[]>([]);

  useEffect(() => {
    Promise.all([getProducts(true), getActivePromos()]).then(([prods, promos]) => {
      setDbProducts(prods);
      setActivePromos(promos);
    });
  }, []);

  // Hitung free gifts secara dinamis berdasarkan isi keranjang
  const freeGifts = useMemo(() => {
    if (cart.length === 0 || dbProducts.length === 0 || activePromos.length === 0) return [];

    const gifts: Array<{ title: string; qty: number; price: number }> = [];

    // Filter promo Beli X Gratis Y saja
    const buyFreePromos = activePromos.filter((p) => p.promo_type === "beli1gratis1");

    buyFreePromos.forEach((promo) => {
      // Cari produk hadiah (dengan fallback ke Kopi Susu Gula Aren)
      const freeProd = promo.free_product_id
        ? dbProducts.find((p) => p.id === promo.free_product_id)
        : dbProducts.find((p) => p.title.toLowerCase() === "kopi susu gula aren");
      if (!freeProd) return;

      // Cari produk-produk yang terdaftar di promo ini
      const promoProductTitles = dbProducts
        .filter((p) => (promo.product_ids ?? []).includes(p.id))
        .map((p) => p.title.toLowerCase());

      // Hitung total qty dari produk terpilih yang ada di keranjang
      let totalCount = 0;
      cart.forEach((item) => {
        // Bandingkan secara case-insensitive
        // (menghapus keterangan bundle legacy/tambahan di kurung jika ada)
        const cleanTitle = item.title.split(" (")[0].toLowerCase();
        if (promoProductTitles.includes(cleanTitle)) {
          totalCount += item.qty;
        }
      });

      // Hitung berapa kali pembeli mendapatkan hadiah
      if (totalCount >= promo.buy_quantity) {
        const factor = Math.floor(totalCount / promo.buy_quantity);
        const giftQty = factor * promo.free_quantity;
        if (giftQty > 0) {
          gifts.push({
            title: `🎁 [Bonus] ${freeProd.title}`,
            qty: giftQty,
            price: 0,
          });
        }
      }
    });

    return gifts;
  }, [cart, dbProducts, activePromos]);



  useEffect(() => {
    try {
      localStorage.setItem(CHECKOUT_FORM_STORAGE_KEY, JSON.stringify(checkoutForm));
    } catch {
      // ignore localStorage failures
    }
  }, [checkoutForm]);

  const updateCheckoutField = (field: keyof CheckoutFormData, value: string) => {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleConfirmOrder = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!isCustomerDataComplete || submitting) return;

    setSubmitting(true);
    try {
      // Build order items array
      const orderItems = [...cart, ...freeGifts].map((item) => ({
        title: item.title,
        qty: item.qty,
        price: item.price,
      }));

      // Append voucher line if applied
      if (appliedVoucher) {
        orderItems.push({
          title: `🎟️ [Voucher] ${appliedVoucher.code} (${appliedVoucher.description})`,
          qty: 1,
          price: -appliedVoucher.discountAmount,
        });
      }

      // Log order to database (with finalTotalAmount)
      await logOrder({
        customer_name: customerName.trim(),
        phone: phone.trim() || null,
        pickup_date: pickupDate || null,
        items: orderItems,
        total_amount: finalTotalAmount,
        status: "pending",
        notes: notes.trim() || null,
      });
    } catch (err: any) {
      console.error("Failed to log order to database:", err);
      alert("Gagal mencatat pesanan ke database: " + (err?.message || err));
    }

    // Redirect to WhatsApp
    const waUrl = `https://wa.me/6287715443313?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Cleanup states
    clearCart();
    setCheckoutForm(createEmptyCheckoutForm());
    setSubmitting(false);

    try {
      localStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
    } catch {
      // ignore localStorage failures
    }

    onClose();
  };

  const whatsappMessage = `Halo Delassa Home Bakery,

Saya ingin mengonfirmasi pesanan.

Pesanan:
${[...cart, ...freeGifts]
  .map(
    (item) => `· ${item.title} x${item.qty} (${item.price === 0 ? "Gratis" : formatCurrency(item.price * item.qty)})`
  )
  .join("\n")}
${appliedVoucher ? `· 🎟️ [Voucher] ${appliedVoucher.code}: -${formatCurrency(appliedVoucher.discountAmount)}\n` : ""}
Subtotal: ${formatCurrency(totalAmount)}
${appliedVoucher ? `Potongan Voucher: -${formatCurrency(appliedVoucher.discountAmount)}\n` : ""}Ongkir: Dihitung admin
Total Sementara: ${formatCurrency(finalTotalAmount)}
Tanggal Pickup: ${pickupDate}

Nama: ${customerName}
No HP: ${phone}
Alamat: ${address}
Patokan Lokasi: ${location}
Catatan: ${notes}

Admin akan menghitung ongkir dan mengirim total pembayaran setelah konfirmasi.`;

  return (
    <div className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-full max-w-[430px] bg-[#fffaf5] p-5 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] text-[#b07b5d] font-semibold">
              Checkout
            </p>
            <h3 className="mt-1 text-[24px] font-black text-[#2f221d]">Keranjang Kamu</h3>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-[#3b2b26] text-white"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="mt-8 rounded-[24px] border border-dashed border-[#e3cdb7] bg-white p-6 text-center">
            <p className="text-[16px] font-semibold text-[#2f221d]">Belum ada item</p>
            <p className="mt-2 text-sm text-[#7a6a62]">
              Tambahkan menu favoritmu dulu, lalu checkout lewat WhatsApp.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-3">
              {cart.map((item) => (
                <div key={item.title} className="rounded-[20px] border border-[#ead8c7] bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#2f221d]">{item.title}</p>
                      <p className="mt-1 text-sm text-[#c38358]">{formatCurrency(item.price * item.qty)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.title)} className="text-sm text-[#9b6a50]">
                      Hapus
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.title, -1)}
                        className="h-8 w-8 rounded-full border border-[#ead8c7] text-lg"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center font-semibold text-[#2f221d]">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.title, 1)}
                        className="h-8 w-8 rounded-full border border-[#ead8c7] text-lg"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-[#2f221d]">{formatCurrency(item.price * item.qty)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-[#ead8c7] bg-white p-5">
              <p className="text-[16px] font-bold text-[#2f221d]">Data Customer</p>
              <p className="mt-1 text-[12px] font-semibold text-[#9b6a50]">
                Tanda * wajib diisi
              </p>
              <div className="mt-4 space-y-4">
                <label className="block">
                  <input
                    value={customerName}
                    onChange={(e) => updateCheckoutField("customerName", e.target.value)}
                    placeholder="Nama lengkap *"
                    required
                    className="w-full rounded-[18px] border border-[#ead8c7] bg-[#fffaf5] px-4 py-3 text-sm text-[#3b2b26] outline-none focus:border-[#c38358]"
                  />
                </label>
                <label className="block">
                  <input
                    value={phone}
                    onChange={(e) => updateCheckoutField("phone", e.target.value)}
                    placeholder="No HP *"
                    required
                    className="w-full rounded-[18px] border border-[#ead8c7] bg-[#fffaf5] px-4 py-3 text-sm text-[#3b2b26] outline-none focus:border-[#c38358]"
                  />
                </label>
                <label className="block">
                  <textarea
                    value={address}
                    onChange={(e) => updateCheckoutField("address", e.target.value)}
                    placeholder="Alamat lengkap *"
                    rows={3}
                    required
                    className="w-full rounded-[18px] border border-[#ead8c7] bg-[#fffaf5] px-4 py-3 text-sm text-[#3b2b26] outline-none focus:border-[#c38358] resize-none"
                  />
                </label>
                <label className="block">
                  <input
                    value={location}
                    onChange={(e) => updateCheckoutField("location", e.target.value)}
                    placeholder="Patokan lokasi"
                    className="w-full rounded-[18px] border border-[#ead8c7] bg-[#fffaf5] px-4 py-3 text-sm text-[#3b2b26] outline-none focus:border-[#c38358]"
                  />
                </label>
                <label className="block">
                  <textarea
                    value={notes}
                    onChange={(e) => updateCheckoutField("notes", e.target.value)}
                    placeholder="Catatan / request"
                    rows={3}
                    className="w-full rounded-[18px] border border-[#ead8c7] bg-[#fffaf5] px-4 py-3 text-sm text-[#3b2b26] outline-none focus:border-[#c38358] resize-none"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-[12px] font-bold text-[#7a6a62] ml-1">Tanggal Pickup Pesanan *</span>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => updateCheckoutField("pickupDate", e.target.value)}
                    required
                    className="w-full rounded-[18px] border border-[#ead8c7] bg-[#fffaf5] px-4 py-3 text-sm text-[#3b2b26] outline-none focus:border-[#c38358]"
                  />
                </label>
              </div>
            </div>

            {/* VOUCHER CODE INPUT */}
            <div className="mt-6 rounded-[24px] border border-[#ead8c7] bg-white p-5">
              <p className="text-[16px] font-bold text-[#2f221d]">Kode Voucher</p>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: MERDEKA10K"
                  value={voucherInput}
                  onChange={(e) => {
                    setVoucherInput(e.target.value);
                    setVoucherError(null);
                  }}
                  disabled={appliedVoucher !== null}
                  className="flex-1 rounded-[18px] border border-[#ead8c7] bg-[#fffaf5] px-4 py-2.5 text-sm text-[#3b2b26] uppercase outline-none focus:border-[#c38358] disabled:opacity-50"
                />
                {appliedVoucher ? (
                  <button
                    onClick={handleRemoveVoucher}
                    className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 cursor-pointer transition active:scale-95"
                  >
                    Hapus
                  </button>
                ) : (
                  <button
                    onClick={handleApplyVoucher}
                    className="rounded-[18px] bg-[#b08769] hover:bg-[#9d7453] px-5 py-2 text-xs font-bold text-white cursor-pointer shadow transition active:scale-95"
                  >
                    Pasang
                  </button>
                )}
              </div>
              {voucherError && (
                <p className="mt-2 text-xs text-red-500 font-semibold">{voucherError}</p>
              )}
              {appliedVoucher && (
                <p className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  ✓ {appliedVoucher.description} (Potongan {formatCurrency(appliedVoucher.discountAmount)})
                </p>
              )}
            </div>

            <div className="mt-6 rounded-[24px] border border-[#ead8c7] bg-white p-5">
              <div className="mb-4 border-b border-dashed border-[#ead8c7] pb-4">
                <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#7a6a62] mb-3">Detail Pesanan</p>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.title} className="flex justify-between text-sm text-[#2f221d]">
                      <span>{item.title} <span className="text-[#c38358] font-bold">x{item.qty}</span></span>
                      <span className="font-semibold">{formatCurrency(item.price * item.qty)}</span>
                    </div>
                  ))}
                  {freeGifts.map((gift) => (
                    <div key={gift.title} className="flex justify-between text-sm text-purple-700 font-bold bg-purple-50/50 px-2.5 py-1 rounded-lg">
                      <span>{gift.title} <span className="text-purple-900 font-black">x{gift.qty}</span></span>
                      <span className="font-black text-purple-900">Gratis</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-sm font-bold text-[#2f221d]">
                  <span>Total Pesanan</span>
                  <span>{cart.reduce((sum, item) => sum + item.qty, 0) + freeGifts.reduce((sum, g) => sum + g.qty, 0)} Pcs</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-[#6d5b52]">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              {appliedVoucher && (
                <div className="mt-3 flex items-center justify-between text-sm text-emerald-600 font-semibold">
                  <span>Potongan Voucher ({appliedVoucher.code})</span>
                  <span>-{formatCurrency(appliedVoucher.discountAmount)}</span>
                </div>
              )}
              <div className="mt-3 flex items-center justify-between text-sm text-[#6d5b52]">
                <span>Ongkir</span>
                <span>Dihitung admin</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-bold text-[#2f221d] border-t border-[#ead8c7] pt-4">
                <span>Total Sementara</span>
                <span>{formatCurrency(finalTotalAmount)}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-[#7a6a62]">
              Setelah tombol ini ditekan, admin akan mengonfirmasi pesanan, menghitung ongkir, lalu mengirim total pembayaran.
            </p>

            <button
              onClick={handleConfirmOrder}
              disabled={!isCustomerDataComplete || submitting}
              className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold text-white shadow-lg transition ${
                isCustomerDataComplete && !submitting
                  ? "bg-[#b08769] hover:bg-[#9d7453] cursor-pointer"
                  : "pointer-events-none cursor-not-allowed bg-[#d2b9a5] opacity-70"
              }`}
            >
              {submitting ? "Memproses Pesanan..." : "Konfirmasi Pesanan"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
