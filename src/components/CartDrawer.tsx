import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

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
  const isCustomerDataComplete = [customerName, phone, address, pickupDate].every(
    (value) => value.trim().length > 0
  );

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

  const handleConfirmOrder = () => {
    if (!isCustomerDataComplete) return;

    clearCart();
    setCheckoutForm(createEmptyCheckoutForm());

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
${cart
  .map(
    (item) => `· ${item.title} x${item.qty} (${formatCurrency(item.price * item.qty)})`
  )
  .join("\n")}

Subtotal: ${formatCurrency(totalAmount)}
Ongkir: Dihitung admin
Total Sementara: ${formatCurrency(totalAmount)}
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
                </div>
                <div className="mt-3 flex justify-between text-sm font-bold text-[#2f221d]">
                  <span>Total Pesanan</span>
                  <span>{cart.reduce((sum, item) => sum + item.qty, 0)} Pcs</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-[#6d5b52]">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-[#6d5b52]">
                <span>Ongkir</span>
                <span>Dihitung admin</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-bold text-[#2f221d] border-t border-[#ead8c7] pt-4">
                <span>Total Sementara</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-[#7a6a62]">
              Setelah tombol ini ditekan, admin akan mengonfirmasi pesanan, menghitung ongkir, lalu mengirim total pembayaran.
            </p>

            <a
              href={
                isCustomerDataComplete
                  ? `https://wa.me/6287715443313?text=${encodeURIComponent(whatsappMessage)}`
                  : undefined
              }
              target="_blank"
              rel="noreferrer"
              onClick={handleConfirmOrder}
              aria-disabled={!isCustomerDataComplete}
              tabIndex={isCustomerDataComplete ? 0 : -1}
              className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold text-white shadow-lg transition ${
                isCustomerDataComplete
                  ? "bg-[#b08769] hover:bg-[#9d7453]"
                  : "pointer-events-none cursor-not-allowed bg-[#d2b9a5] opacity-70"
              }`}
            >
              Konfirmasi Pesanan
            </a>
          </>
        )}
      </div>
    </div>
  );
}
