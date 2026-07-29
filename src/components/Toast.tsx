import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = "success", duration = 3500, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // trigger exit animation then close
    const exitTimer = setTimeout(() => setVisible(false), duration - 400);
    const closeTimer = setTimeout(onClose, duration);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const colors: Record<ToastType, { bg: string; border: string; icon: string }> = {
    success: {
      bg: "linear-gradient(135deg, #3d1a08 0%, #5c2a10 100%)",
      border: "rgba(196, 122, 60, 0.5)",
      icon: "✅",
    },
    error: {
      bg: "linear-gradient(135deg, #3d0808 0%, #5c1010 100%)",
      border: "rgba(220, 80, 80, 0.5)",
      icon: "❌",
    },
    info: {
      bg: "linear-gradient(135deg, #0d2138 0%, #163352 100%)",
      border: "rgba(80, 150, 220, 0.5)",
      icon: "ℹ️",
    },
  };

  const { bg, border, icon } = colors[type];

  return (
    <div
      style={{
        position: "fixed",
        top: "1.5rem",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "-80px"})`,
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
        zIndex: 99999,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "14px",
        padding: "14px 22px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
        minWidth: "280px",
        maxWidth: "420px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        cursor: "pointer",
      }}
      onClick={() => { setVisible(false); setTimeout(onClose, 350); }}
    >
      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{icon}</span>
      <p style={{
        margin: 0,
        color: "#f5e6d3",
        fontSize: "0.92rem",
        fontWeight: 500,
        lineHeight: 1.4,
        fontFamily: "'Poppins', sans-serif",
      }}>
        {message}
      </p>
    </div>
  );
}

/* ─── Hook ─────────────────────────────────────────────────────── */
interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}

let _setToasts: React.Dispatch<React.SetStateAction<ToastState[]>> | null = null;

export function showToast(message: string, type: ToastType = "success") {
  if (_setToasts) {
    const id = Date.now();
    _setToasts((prev) => [...prev, { id, message, type }]);
  }
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    _setToasts = setToasts;
    return () => { _setToasts = null; };
  }, []);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <>
      {toasts.map((t, i) => (
        <div
          key={t.id}
          style={{ position: "fixed", top: `${1.5 + i * 5}rem`, left: "50%", transform: "translateX(-50%)", zIndex: 99999 + i }}
        >
          <Toast
            message={t.message}
            type={t.type}
            onClose={() => remove(t.id)}
          />
        </div>
      ))}
    </>
  );
}
