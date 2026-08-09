import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import {
  isPromoMerdekaActive,
  generateVoucherCode,
  generateVoucher5kCode,
} from "../data/promos";
import { Gift, CheckCircle2, ChevronRight } from "lucide-react";
import { getProducts } from "../utils/supabase";
import type { DBProduct } from "../utils/supabase";
import bannerMerdeka from "../assets/banner_merdeka.webp";

// List of available main items and drinks for the bundle builder
const PRODUCT_LIST = [
  // Bolu
  { name: "Bolu Pandan", basePrice: 37000, category: "Bolu" },
  { name: "Bolu Pandan Keju", basePrice: 45000, category: "Bolu" },
  { name: "Bolu Keju", basePrice: 48000, category: "Bolu" },
  // Brownies
  { name: "Brownies Classic", basePrice: 55000, category: "Brownies" },
  { name: "Brownies Almond", basePrice: 65000, category: "Brownies" },
  { name: "Brownies Cookies", basePrice: 68000, category: "Brownies" },
  { name: "Brownies Mix Topping", basePrice: 70000, category: "Brownies" },
];

const DRINKS_LIST = [
  { name: "Kopi Susu Gula Aren", basePrice: 15000 },
  { name: "Mocha Bliss", basePrice: 16000 },
  { name: "Roasted Milk Tea", basePrice: 16000 },
  { name: "Butterscotch Bliss", basePrice: 17000 },
  { name: "Choco Bliss", basePrice: 17000 },
];

interface DrawPrize {
  text: string;
  price: number;
  icon: string;
  code?: string;
}

// List of potential prizes for Amplop Merdeka
const PRIZES: DrawPrize[] = [
  { text: "Voucher Potongan Rp10.000 (Next Order)", price: 0, icon: "🎟️" },
  { text: "Diskon Langsung Rp5.000", price: -5000, icon: "💸" },
  { text: "Free 1 Cookies Original", price: 0, icon: "🍪" },
  { text: "Free Kopi Susu Gula Aren", price: 0, icon: "☕" },
  { text: "Free Roasted Milk Tea", price: 0, icon: "🧋" },
  { text: "Voucher Potongan Rp5.000 (Next Order)", price: 0, icon: "🎫" },
];

function getWeightedRandomPrize(subtotal: number): DrawPrize {
  let weights: number[];

  if (subtotal < 70000) {
    // Belanja Kecil (Rp50.000 - Rp69.999): Prioritaskan voucher next order (modal hari ini Rp0)
    // Index 0: Voucher 10k (Next) -> 15%
    // Index 1: Diskon 5k (Instant) -> 15%
    // Index 2: Cookies -> 1% (Peluang 1:100)
    // Index 3: Kopi Susu -> 5%
    // Index 4: Milk Tea -> 4%
    // Index 5: Voucher 5k (Next) -> 60% (Mayoritas mendapatkan ini)
    weights = [15, 15, 1, 5, 4, 60];
  } else if (subtotal < 100000) {
    // Belanja Sedang (Rp70.000 - Rp99.999)
    // Index 0: Voucher 10k (Next) -> 45%
    // Index 1: Diskon 5k (Instant) -> 15%
    // Index 2: Cookies -> 2%
    // Index 3: Kopi Susu -> 8%
    // Index 4: Milk Tea -> 5%
    // Index 5: Voucher 5k (Next) -> 25%
    weights = [45, 15, 2, 8, 5, 25];
  } else {
    // Belanja Premium (>= Rp100.000)
    // Index 0: Voucher 10k (Next) -> 50%
    // Index 1: Diskon 5k (Instant) -> 10%
    // Index 2: Cookies -> 15%
    // Index 3: Kopi Susu -> 8%
    // Index 4: Milk Tea -> 7%
    // Index 5: Voucher 5k (Next) -> 10%
    weights = [50, 10, 15, 8, 7, 10];
  }

  // Draw weighted random index
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let randomVal = Math.random() * totalWeight;

  for (let i = 0; i < PRIZES.length; i++) {
    if (randomVal < weights[i]) {
      return PRIZES[i];
    }
    randomVal -= weights[i];
  }

  return PRIZES[PRIZES.length - 1]; // Fallback
}

export default function PromoMerdeka() {
  const { cart, addToCart, setCartOpen } = useCart();

  // Developer / simulated active toggle
  const [simulatedActive] = useState(() => {
    try {
      return localStorage.getItem("simulatedPromoMerdeka") === "true";
    } catch {
      return false;
    }
  });

  const isActive = isPromoMerdekaActive(simulatedActive);

  // Countdown state for when the promo is not active yet
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [isRunnerMode, setIsRunnerMode] = useState(false);
  const [showRunnerGameOver, setShowRunnerGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastMilestoneRef = useRef(0);
  const gameStateRef = useRef<{
    isPlaying: boolean;
    score: number;
    playerY: number;
    playerVy: number;
    isJumping: boolean;
    isDucking: boolean;
    obstacles: Array<{ x: number; width: number; height: number; speed: number; type: "rolling_pin" | "flying_egg" }>;
    frameCount: number;
    isGameOver: boolean;
  }>({
    isPlaying: false,
    score: 0,
    playerY: 136,
    playerVy: 0,
    isJumping: false,
    isDucking: false,
    obstacles: [],
    frameCount: 0,
    isGameOver: false,
  });

  useEffect(() => {
    if (isActive) return;

    const updateCountdown = () => {
      const now = new Date();
      // Target date is August 16, 2026, at 00:00:00 local time
      const targetDate = new Date("2026-08-16T00:00:00");
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Load products to offer upsell drinks when locked
  const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);
  useEffect(() => {
    getProducts(true).then((prods) => {
      setDbProducts(prods);
    });
  }, []);

  // Recommend quick add drinks to reach 50k threshold
  const upsellDrinks = useMemo(() => {
    if (dbProducts.length === 0) return [];
    return dbProducts
      .filter((p) => {
        const titleLower = p.title.toLowerCase();
        return (
          titleLower.includes("kopi susu") ||
          titleLower.includes("roasted milk") ||
          titleLower.includes("mocha bliss")
        );
      })
      .slice(0, 2);
  }, [dbProducts]);

  // Bundle Builder State (starts empty by default)
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");

  // Calculate pricing for selected bundle
  const bundlePricing = useMemo(() => {
    if (!selectedProduct || !selectedDrink) return { price: 0, originalPrice: 0 };
    const product = PRODUCT_LIST.find((p) => p.name === selectedProduct);
    const drink = DRINKS_LIST.find((d) => d.name === selectedDrink);
    if (!product || !drink) return { price: 0, originalPrice: 0 };
    return {
      price: product.basePrice + 10000,
      originalPrice: product.basePrice + drink.basePrice,
    };
  }, [selectedProduct, selectedDrink]);

  // Regular subtotal (excluding any already-won Amplop Merdeka prize)
  const regularSubtotal = useMemo(() => {
    return cart
      .filter((item) => !item.title.includes("🎁 [Amplop Merdeka]"))
      .reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  // Dynamic subtotal: Cart subtotal (after discounts) + current bundle selection (discounted price)
  const dynamicSubtotal = useMemo(() => {
    const selectionDiscounted = (selectedProduct && selectedDrink) ? bundlePricing.price : 0;
    return regularSubtotal + selectionDiscounted;
  }, [regularSubtotal, selectedProduct, selectedDrink, bundlePricing]);

  // Check if a prize is already claimed in the cart
  const claimedPrize = useMemo(() => {
    return cart.find((item) => item.title.includes("🎁 [Amplop Merdeka]"));
  }, [cart]);

  // Mini-game State
  const [envelopeState, setEnvelopeState] = useState<{
    selectedIdx: number | null;
    revealed: boolean;
    prize: typeof PRIZES[number] | null;
    claimed: boolean;
    drawnSubtotal?: number;
  }>(() => {
    // If there is already a prize in the cart, sync the claimed state
    const existing = cart.find((item) => item.title.includes("🎁 [Amplop Merdeka]"));
    if (existing) {
      const foundPrize = PRIZES.find((p) => existing.title.includes(p.text));
      return {
        selectedIdx: 0,
        revealed: true,
        prize: foundPrize || { text: existing.title.replace("🎁 [Amplop Merdeka] ", ""), price: existing.price, icon: "🎁" },
        claimed: true,
      };
    }

    // Check localStorage for a persistent locked draw result
    try {
      const saved = localStorage.getItem("delassa_merdeka_envelope");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to read envelope localStorage:", e);
    }

    return {
      selectedIdx: null,
      revealed: false,
      prize: null,
      claimed: false,
    };
  });

  // Keep envelope state in sync if prize is removed from cart outside
  useEffect(() => {
    if (!claimedPrize && envelopeState.claimed) {
      // Check if localStorage still has the key
      const saved = localStorage.getItem("delassa_merdeka_envelope");
      if (!saved) {
        // If it was deleted (due to a downgrade reset in CartContext), reset state completely
        setEnvelopeState({
          selectedIdx: null,
          revealed: false,
          prize: null,
          claimed: false,
        });
      } else {
        // If it still exists (manual removal, same subtotal), just set claimed to false so they can re-claim the same prize
        const updated = {
          ...envelopeState,
          claimed: false,
        };
        setEnvelopeState(updated);
        try {
          localStorage.setItem("delassa_merdeka_envelope", JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [claimedPrize, envelopeState.claimed]);

  // Game Modal State
  const [showGameModal, setShowGameModal] = useState(false);

  const handleCloseModal = () => {
    setShowGameModal(false);
    setGameScore(0);
    setIsRunnerMode(false);
    setShowRunnerGameOver(false);
    const state = gameStateRef.current;
    state.isPlaying = false;
    state.isGameOver = false;
    state.score = 0;
    state.obstacles = [];
    state.playerY = 136;
    state.playerVy = 0;

    if (isDemoMode) {
      setIsDemoMode(false);
      // Restore actual game state from localStorage or cart sync so progress is not lost
      const restoreState = () => {
        const existing = cart.find((item) => item.title.includes("🎁 [Amplop Merdeka]"));
        if (existing) {
          const foundPrize = PRIZES.find((p) => existing.title.includes(p.text));
          return {
            selectedIdx: 0,
            revealed: true,
            prize: foundPrize || { text: existing.title.replace("🎁 [Amplop Merdeka] ", ""), price: existing.price, icon: "🎁" },
            claimed: true,
          };
        }
        try {
          const saved = localStorage.getItem("delassa_merdeka_envelope");
          if (saved) {
            return JSON.parse(saved);
          }
        } catch {}
        return {
          selectedIdx: null,
          revealed: false,
          prize: null,
          claimed: false,
        };
      };
      setEnvelopeState(restoreState());
    }
  };

  const playJumpSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("AudioContext block:", e);
    }
  };

  const playDuckSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn(e);
    }
  };

  const playGameOverSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn(e);
    }
  };

  const playMilestoneSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch (e) {
      console.warn(e);
    }
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, frame: number, crashed = false) => {
    const isDucking = gameStateRef.current.isDucking && !crashed;
    const bodyHeight = isDucking ? 14 : 24;
    const drawY = isDucking ? 146 : y;

    ctx.fillStyle = crashed ? "#8b5a2b" : "#5c4033";
    ctx.beginPath();
    ctx.roundRect(x, drawY, 24, bodyHeight, 6);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    const hatOffset = isDucking ? 2 : 4;
    ctx.arc(x + 12, drawY - hatOffset, 6, 0, Math.PI * 2);
    ctx.arc(x + 6, drawY - hatOffset + 2, 4, 0, Math.PI * 2);
    ctx.arc(x + 18, drawY - hatOffset + 2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(x + 4, drawY - hatOffset + 3, 16, 2);

    if (crashed) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + 8, drawY + 7);
      ctx.lineTo(x + 12, drawY + 11);
      ctx.moveTo(x + 12, drawY + 7);
      ctx.lineTo(x + 8, drawY + 11);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + 14, drawY + 7);
      ctx.lineTo(x + 18, drawY + 11);
      ctx.moveTo(x + 18, drawY + 7);
      ctx.lineTo(x + 14, drawY + 11);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x + 13, drawY + 17, 3, Math.PI, 0);
      ctx.stroke();
    } else {
      const faceY = isDucking ? drawY + 4 : drawY + 8;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x + 11, faceY, 2, 0, Math.PI * 2);
      ctx.arc(x + 17, faceY, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ff8a80";
      ctx.beginPath();
      ctx.arc(x + 9, faceY + 4, 1.5, 0, Math.PI * 2);
      ctx.arc(x + 19, faceY + 4, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x + 14, faceY + 4, 2.5, 0, Math.PI);
      ctx.stroke();
    }

    ctx.strokeStyle = "#3e2723";
    ctx.lineWidth = 2.5;
    const legSwing = Math.sin(frame * 0.25) * 6;
    if (y < 136 && !isDucking) {
      ctx.beginPath();
      ctx.moveTo(x + 8, drawY + bodyHeight);
      ctx.lineTo(x + 8, drawY + bodyHeight + 4);
      ctx.moveTo(x + 16, drawY + bodyHeight);
      ctx.lineTo(x + 16, drawY + bodyHeight + 4);
      ctx.stroke();
    } else if (crashed) {
      ctx.beginPath();
      ctx.moveTo(x + 8, drawY + bodyHeight);
      ctx.lineTo(x + 4, drawY + bodyHeight + 2);
      ctx.moveTo(x + 16, drawY + bodyHeight);
      ctx.lineTo(x + 20, drawY + bodyHeight + 2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(x + 8, drawY + bodyHeight);
      ctx.lineTo(x + 8 + legSwing, drawY + bodyHeight + 5);
      ctx.moveTo(x + 16, drawY + bodyHeight);
      ctx.lineTo(x + 16 - legSwing, drawY + bodyHeight + 5);
      ctx.stroke();
    }
  };

  const drawObstacle = (ctx: CanvasRenderingContext2D, x: number, width: number, height: number, type = "rolling_pin", frame = 0) => {
    const groundY = 160;
    const topY = type === "flying_egg" ? 115 : (groundY - height);

    if (type === "flying_egg") {
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#ead8c7";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(x + width / 2, topY + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffb300";
      ctx.beginPath();
      ctx.arc(x + width / 2, topY + height / 2, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#ead8c7";
      ctx.lineWidth = 1;
      const wingFlap = Math.sin(frame * 0.3) * 6;
      ctx.beginPath();
      ctx.moveTo(x, topY + height / 2);
      ctx.quadraticCurveTo(x - 8, topY + height / 2 - 6 + wingFlap, x - 4, topY + height / 2 + wingFlap);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + width, topY + height / 2);
      ctx.quadraticCurveTo(x + width + 8, topY + height / 2 - 6 + wingFlap, x + width + 4, topY + height / 2 + wingFlap);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = "#e0e0e0";
      ctx.strokeStyle = "#9e9e9e";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, topY + 4, width, height - 8, 3);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#8d6e63";
      ctx.fillRect(x + width / 2 - 2, topY, 4, 4);
      ctx.fillRect(x + width / 2 - 2, groundY - 4, 4, 4);

      ctx.beginPath();
      ctx.arc(x + width / 2, topY, 3, 0, Math.PI * 2);
      ctx.arc(x + width / 2, groundY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Trigger Envelope Opening (Real Promo Lucky Draw)
  const handleOpenEnvelope = (idx: number) => {
    if (envelopeState.selectedIdx !== null || regularSubtotal < 50000) return;

    const randomPrize = getWeightedRandomPrize(regularSubtotal);

    // Generate dynamic secure signature code for the next order voucher
    const prizeWithCode = { ...randomPrize };
    if (randomPrize.text.includes("Rp10.000 (Next Order)")) {
      prizeWithCode.code = generateVoucherCode();
    } else if (randomPrize.text.includes("Rp5.000 (Next Order)")) {
      prizeWithCode.code = generateVoucher5kCode();
    }

    const newState = {
      selectedIdx: idx,
      revealed: false,
      prize: prizeWithCode,
      claimed: false,
      drawnSubtotal: regularSubtotal,
    };
    setEnvelopeState(newState);

    if (!isDemoMode) {
      try {
        localStorage.setItem("delassa_merdeka_envelope", JSON.stringify({ ...newState, revealed: true }));
      } catch (e) {
        console.error("Failed to write envelope localStorage:", e);
      }
    }

    // Reveal after brief animation delay
    setTimeout(() => {
      setEnvelopeState((prev) => ({ ...prev, revealed: true }));
    }, 1200);
  };

  const triggerPrizeDraw = (finalScore: number) => {
    setGameScore(finalScore);

    // Pick a random prize based on subtotal weight
    const randomPrize = getWeightedRandomPrize(isDemoMode ? 50000 : regularSubtotal);

    // Generate dynamic secure signature code for the next order voucher
    const prizeWithCode = { ...randomPrize };
    if (randomPrize.text.includes("Rp10.000 (Next Order)")) {
      prizeWithCode.code = generateVoucherCode();
    } else if (randomPrize.text.includes("Rp5.000 (Next Order)")) {
      prizeWithCode.code = generateVoucher5kCode();
    }

    const newState = {
      selectedIdx: 0,
      revealed: false,
      prize: prizeWithCode,
      claimed: false,
      drawnSubtotal: isDemoMode ? 50000 : regularSubtotal,
    };
    setEnvelopeState(newState);

    if (!isDemoMode) {
      try {
        localStorage.setItem("delassa_merdeka_envelope", JSON.stringify({ ...newState, revealed: true }));
      } catch (e) {
        console.error("Failed to write envelope localStorage:", e);
      }
    }

    // Delay showing the prize by 1.5 seconds to show the game over state
    setTimeout(() => {
      setEnvelopeState((prev) => ({ ...prev, revealed: true }));
    }, 1500);
  };

  const handleRestartRunner = () => {
    setShowRunnerGameOver(false);
    const state = gameStateRef.current;
    state.isPlaying = true;
    state.score = 0;
    state.playerY = 136;
    state.playerVy = 0;
    state.isJumping = false;
    state.isDucking = false;
    state.obstacles = [];
    state.frameCount = 0;
    state.isGameOver = false;
    lastMilestoneRef.current = 0;
  };

  const triggerJumpOrStart = () => {
    const state = gameStateRef.current;
    if (state.isGameOver) return;

    if (!state.isPlaying) {
      state.isPlaying = true;
      state.score = 0;
      state.playerY = 136;
      state.playerVy = 0;
      state.isJumping = false;
      state.isDucking = false;
      state.obstacles = [];
      state.frameCount = 0;
      state.isGameOver = false;
      lastMilestoneRef.current = 0;
    } else if (!state.isJumping && !state.isDucking) {
      state.playerVy = -8;
      state.isJumping = true;
      playJumpSound();
    }
  };

  const startDucking = () => {
    const state = gameStateRef.current;
    if (!state.isPlaying || state.isGameOver || state.isJumping) return;
    if (!state.isDucking) {
      state.isDucking = true;
      playDuckSound();
    }
  };

  const stopDucking = () => {
    const state = gameStateRef.current;
    state.isDucking = false;
  };

  // Keyboard controls listener
  useEffect(() => {
    if (!showGameModal || envelopeState.revealed) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        triggerJumpOrStart();
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        startDucking();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        stopDucking();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [showGameModal, envelopeState.revealed]);

  // Dino Game Loop
  useEffect(() => {
    if (!showGameModal || envelopeState.revealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 200;

    let animationId: number;
    const state = gameStateRef.current;

    const gameLoop = () => {
      ctx.fillStyle = "#fffaf5";
      ctx.fillRect(0, 0, 400, 200);

      ctx.strokeStyle = "#ead8c7";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 160);
      ctx.lineTo(400, 160);
      ctx.stroke();

      if (!state.isPlaying) {
        ctx.fillStyle = "#2f221d";
        ctx.font = "bold 15px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("DELASSA RUNNER", 200, 85);
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = "#7a6a62";
        ctx.fillText("Ketuk atau Tekan SPASI Untuk Mulai", 200, 115);

        drawPlayer(ctx, 40, 136, 0);
      } else if (state.isGameOver) {
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER!", 200, 75);
        ctx.fillStyle = "#2f221d";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(`Skor Akhir: ${state.score}`, 200, 105);
        ctx.font = "italic 9px sans-serif";
        ctx.fillStyle = "#7a6a62";
        ctx.fillText(isRunnerMode ? "Gila keren! Ingin latih refleksmu lagi?" : "Mengundi kupon keberuntunganmu...", 200, 130);

        drawPlayer(ctx, 40, state.playerY, state.frameCount, true);

        state.obstacles.forEach((obs) => {
          drawObstacle(ctx, obs.x, obs.width, obs.height, obs.type, state.frameCount);
        });
      } else {
        state.frameCount++;
        state.score = Math.floor(state.frameCount / 5);

        if (state.score > 0 && state.score % 100 === 0 && lastMilestoneRef.current !== state.score) {
          lastMilestoneRef.current = state.score;
          playMilestoneSound();
        }

        if (state.isDucking) {
          state.playerY = 146;
          state.playerVy = 0;
          state.isJumping = false;
        } else {
          state.playerVy += 0.45;
          state.playerY += state.playerVy;

          if (state.playerY >= 136) {
            state.playerY = 136;
            state.playerVy = 0;
            state.isJumping = false;
          }
        }

        if (state.frameCount % 120 === 0 || (state.frameCount > 600 && state.frameCount % 90 === 0)) {
          const isFlying = Math.random() > 0.65;
          state.obstacles.push({
            x: 400,
            width: isFlying ? 18 : 14,
            height: isFlying ? 16 : (Math.random() > 0.5 ? 26 : 18),
            type: isFlying ? "flying_egg" : "rolling_pin",
            speed: 3 + Math.min(state.score / 200, 2),
          });
        }

        state.obstacles.forEach((obs) => {
          obs.x -= obs.speed;
          drawObstacle(ctx, obs.x, obs.width, obs.height, obs.type, state.frameCount);

          const playerLeft = 40;
          const playerRight = 64;
          const playerHeight = state.isDucking ? 14 : 24;
          const playerTop = state.isDucking ? 146 : state.playerY;
          const playerBottom = playerTop + playerHeight;

          const obsLeft = obs.x;
          const obsRight = obs.x + obs.width;
          const obsTop = obs.type === "flying_egg" ? 115 : (160 - obs.height);
          const obsBottom = obs.type === "flying_egg" ? (115 + obs.height) : 160;

          if (
            playerRight > obsLeft + 2 &&
            playerLeft < obsRight - 2 &&
            playerBottom > obsTop + 2 &&
            playerTop < obsBottom - 2
          ) {
            state.isGameOver = true;
            playGameOverSound();
            if (isRunnerMode) {
              setShowRunnerGameOver(true);
            } else {
              triggerPrizeDraw(state.score);
            }
          }
        });

        state.obstacles = state.obstacles.filter((obs) => obs.x > -50);

        drawPlayer(ctx, 40, state.playerY, state.frameCount);

        ctx.fillStyle = "#2f221d";
        ctx.font = "bold 11px font-mono, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(`SKOR: ${state.score}`, 380, 25);
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [showGameModal, envelopeState.revealed]);





  // Adding Bundle to Cart
  const handleAddBundle = () => {
    const title = `Bundle Hemat: Menu Utama + Minuman (${selectedProduct} + ${selectedDrink})`;
    addToCart({
      title,
      price: bundlePricing.price,
      qty: 1,
    });
    setSelectedProduct("");
    setSelectedDrink("");
  };

  // Confetti Animation Particles
  const particles = useMemo(() => {
    if (!envelopeState.revealed || envelopeState.claimed) return [];
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 8 + 6,
      color: ["#ef4444", "#ffffff", "#f59e0b", "#3b82f6", "#10b981"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
    }));
  }, [envelopeState.revealed, envelopeState.claimed]);

  return (
    <div className="w-full px-3 sm:px-5 lg:px-8 pt-6 pb-0 relative">
      {/* Dynamic inline styles for Confetti float animation */}
      <style>{`
        @keyframes float-down {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .confetti-particle {
          animation-name: float-down;
          animation-timing-function: linear;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }
      `}</style>

      {/* Confetti Overlay */}
      {envelopeState.revealed && !envelopeState.claimed && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute confetti-particle"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                top: "-20px",
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-[1200px] mx-auto">

        {/* PROMO TITLE IMAGE */}
        <div className="mb-6 overflow-hidden rounded-[30px] shadow-[0_20px_50px_rgba(198,40,40,0.12)] group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(198,40,40,0.2)] border border-[#e8d5c4]/35">
          <img
            src={bannerMerdeka}
            alt="Promo Merdeka Delassa"
            className="w-full h-auto object-cover block group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>

        {!isActive ? (
          // Promo Countdown / Coming Soon State
          <div className="text-center py-10 bg-white/50 backdrop-blur-sm border border-[#e8d5c4] rounded-[30px] p-8 shadow-sm">
            <Gift className="w-12 h-12 text-[#c38358] mx-auto animate-bounce mb-3" />
            <h3 className="text-xl sm:text-2xl font-black text-[#2f221d]">Promo Merdeka Belum Dimulai</h3>
            <p className="text-[#7a6a62] mt-1.5 text-xs font-semibold max-w-md mx-auto">
              Nantikan keseruan Promo Merdeka Delassa pada tanggal 16 - 22 Agustus 2026.
            </p>

            {/* Countdown Blocks */}
            <div className="flex justify-center gap-2.5 sm:gap-3.5 my-6">
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Menit", value: timeLeft.minutes },
                { label: "Detik", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#ead8c7] shadow-sm flex items-center justify-center text-base sm:text-lg font-black text-[#2f221d]">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#7a6a62] mt-1.5 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-extrabold text-[#7a6a62] uppercase tracking-wider mb-2.5 mt-4">
              Mini Game Delassa Runner
            </p>
            <button
              onClick={() => {
                setIsDemoMode(true);
                setIsRunnerMode(true);
                setShowRunnerGameOver(false);
                setGameScore(0);
                const state = gameStateRef.current;
                state.isPlaying = false;
                state.isGameOver = false;
                state.score = 0;
                state.obstacles = [];
                state.playerY = 136;
                state.playerVy = 0;
                // Clear any existing active draw state for the demo session
                setEnvelopeState({
                  selectedIdx: null,
                  revealed: false,
                  prize: null,
                  claimed: false,
                });
                setShowGameModal(true);
              }}
              className="bg-[#c38358] hover:bg-[#b0744a] text-white font-bold py-2.5 px-8 rounded-full text-xs shadow-md transition cursor-pointer active:scale-95 inline-block"
            >
              START
            </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            
            {/* BUNDLE BUILDER CARD */}
            <div className="bg-white border border-[#e8d5c4] rounded-[30px] p-6 sm:p-8 shadow-[0_10px_30px_rgba(109,91,82,0.04)] relative flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-red-500"></div>
              
              <div className="flex flex-col justify-start">
                <div className="flex items-center mb-5">
                  <div>
                    <h3 className="text-lg font-black text-[#2f221d] leading-none">Bundle Merdeka</h3>
                    <p className="text-[11px] text-[#7a6a62] font-semibold mt-1">Beli Menu Utama + Minuman Hanya +Rp10.000</p>
                  </div>
                </div>

                {/* Step 1: Choose Main Product (Bolu/Brownies) */}
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a62] mb-2">
                    1. Pilih Menu Utama (Bolu / Brownies)
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full rounded-2xl border border-[#ead8c7] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#3b2b26] outline-none focus:border-[#c38358] transition cursor-pointer"
                  >
                    <option value="">-- Pilih Menu Utama --</option>
                    <optgroup label="Bolu">
                      {PRODUCT_LIST.filter((p) => p.category === "Bolu").map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name} ({formatCurrency(p.basePrice)})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Brownies">
                      {PRODUCT_LIST.filter((p) => p.category === "Brownies").map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name} ({formatCurrency(p.basePrice)})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Step 2: Choose Drink */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7a6a62] mb-2">
                    2. Pilih Minuman (+Rp10.000)
                  </label>
                  <select
                    value={selectedDrink}
                    onChange={(e) => setSelectedDrink(e.target.value)}
                    className="w-full rounded-2xl border border-[#ead8c7] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#3b2b26] outline-none focus:border-[#c38358] transition cursor-pointer"
                  >
                    <option value="">-- Pilih Minuman --</option>
                    {DRINKS_LIST.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} ({formatCurrency(d.basePrice)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Calculation Card */}
                {selectedProduct && selectedDrink ? (
                  <div className="bg-[#fffaf5] border border-[#ead8c7] rounded-2xl p-4 mb-6 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs text-[#7a6a62] font-semibold mb-2">
                      <span>Harga Normal</span>
                      <span className="line-through">
                        {formatCurrency(bundlePricing.originalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-extrabold text-red-500 uppercase tracking-wider">Harga Bundle</p>
                        <p className="text-2xl font-black text-[#2f221d] mt-0.5">
                          {formatCurrency(bundlePricing.price)}
                        </p>
                      </div>
                      <span className="bg-red-100 text-red-600 font-extrabold text-[11px] px-2.5 py-1.5 rounded-xl border border-red-200">
                        Hemat {formatCurrency(bundlePricing.originalPrice - bundlePricing.price)}!
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#fffaf5]/50 border border-dashed border-[#ead8c7] rounded-2xl p-6 text-center text-xs font-bold text-[#7a6a62] mb-6">
                    Silakan pilih menu utama & minuman untuk melihat harga hemat!
                  </div>
                )}
              </div>

              {(!selectedProduct || !selectedDrink || dynamicSubtotal < 50000 || envelopeState.claimed) && (
                <button
                  onClick={handleAddBundle}
                  disabled={!selectedProduct || !selectedDrink}
                  className={`w-full font-bold py-3.5 px-5 rounded-full text-xs shadow-md transition-all flex items-center justify-center gap-1.5 group mt-2 ${
                    selectedProduct && selectedDrink
                      ? "bg-[#c38358] hover:bg-[#b0744a] text-white cursor-pointer active:scale-95"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <span>Masukkan Bundle ke Keranjang</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {/* Progress & Upsell section (visible when subtotal < 50k) */}
              {regularSubtotal < 50000 && (
                <div className="mt-6 pt-5 border-t border-dashed border-[#ead8c7] animate-fadeIn">
                  <div className="flex justify-between text-[11px] font-bold text-[#7a6a62] mb-1.5">
                    <span className="flex items-center gap-1">Progres Amplop Merdeka:</span>
                    <span>{formatCurrency(dynamicSubtotal)} / Rp50k</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                      style={{ width: `${Math.min((dynamicSubtotal / 50000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-[11px] font-bold text-center">
                    {dynamicSubtotal >= 50000 ? (
                      <span className="text-emerald-600 flex items-center justify-center gap-1 animate-pulse">
                        Selamat! Syarat belanja minimal Rp50.000 telah terpenuhi.
                      </span>
                    ) : (
                      <span className="text-[#c38358]">
                        Belanja {formatCurrency(50000 - dynamicSubtotal)} lagi untuk membuka Amplop Merdeka!
                      </span>
                    )}
                  </p>

                  {dynamicSubtotal >= 50000 && !envelopeState.claimed && (
                    <button
                      onClick={() => {
                        // Automatically commit the bundle to the cart if selected
                        if (selectedProduct && selectedDrink) {
                          handleAddBundle();
                        }
                        setShowGameModal(true);
                      }}
                      className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-full text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 animate-pulse"
                    >
                      <span>Buka Amplop Merdeka & Checkout</span>
                    </button>
                  )}
                  
                  {/* Upsell Drinks */}
                  {dynamicSubtotal > 0 && dynamicSubtotal < 50000 && upsellDrinks.length > 0 && (
                    <div className="mt-4 bg-[#fffaf5] border border-dashed border-[#c38358] rounded-2xl p-4 text-center">
                      <p className="text-[10px] uppercase font-black text-red-500 tracking-wider">
                        ⚡ Dikit Lagi Dapat Amplop Merdeka!
                      </p>
                      <p className="text-[11px] font-semibold text-[#7a6a62] mt-0.5 leading-normal">
                        Kurang <strong className="font-extrabold text-red-600">{formatCurrency(50000 - dynamicSubtotal)}</strong> lagi. Tambah rekomendasi minuman cepat ini:
                      </p>
                      <div className="mt-2.5 flex gap-2 justify-center">
                        {upsellDrinks.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              addToCart({
                                title: p.title,
                                price: Number(p.price),
                                qty: 1,
                              });
                            }}
                            className="flex-1 flex items-center justify-between bg-white border border-[#ead8c7] hover:border-[#c38358] hover:bg-[#fffcf9] rounded-xl px-3 py-2 text-[9px] font-extrabold text-[#3b2b26] cursor-pointer transition active:scale-95 shadow-sm"
                          >
                            <span>+ {p.title}</span>
                            <span className="text-[#9b6a50] font-bold ml-1">({formatCurrency(Number(p.price))})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Success / Play Game section (visible when subtotal >= 50k and not claimed yet) */}
              {regularSubtotal >= 50000 && !envelopeState.claimed && (
                <div className="mt-6 pt-5 border-t border-dashed border-[#ead8c7] text-center animate-fadeIn">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 flex items-start gap-3 text-left">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-emerald-800 text-xs font-bold">TARGET BELANJA TERCAPAI! 🎉</p>
                      <p className="text-emerald-700 text-[11px] font-medium mt-0.5">
                        Belanja kamu sudah mencapai {formatCurrency(regularSubtotal)}. Kamu berhak memilih Amplop Merdeka!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowGameModal(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-full text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Mainkan Amplop Merdeka</span>
                  </button>
                </div>
              )}

              {/* Claimed prize indicator (if already claimed) */}
              {envelopeState.claimed && (
                <div className="mt-6 pt-5 border-t border-dashed border-[#ead8c7] animate-fadeIn">
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 w-full">
                    <CheckCircle2 size={14} />
                    <span>Sukses! Hadiah Amplop ({envelopeState.prize?.text}) Masuk Keranjang!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* LUCKY DRAW POPUP MODAL */}
      <AnimatePresence>
        {showGameModal && (
          <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white border border-[#ead8c7] rounded-[30px] p-6 sm:p-8 shadow-2xl relative max-w-lg w-full overflow-hidden flex flex-col"
            >
              {/* Red header stripe */}
              <div className="absolute top-0 right-0 left-0 h-2 bg-red-600"></div>

              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-[#7a6a62] hover:text-[#2f221d] bg-[#fffaf5] hover:bg-[#ead8c7] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition text-lg font-bold border border-[#ead8c7]/50 active:scale-95"
              >
                ×
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2.5 mb-6 mt-2">
                <span className="text-3xl">🎁</span>
                <div>
                  <h3 className="text-lg font-black text-[#2f221d] leading-none">
                    {isRunnerMode ? "Delassa Runner" : "Amplop Merdeka"}
                  </h3>
                  <p className="text-[#7a6a62] text-[11px] font-semibold mt-1">
                    {isRunnerMode 
                      ? "Lompati Rintangan & Temani Kami Menunggu Promo!" 
                      : "Pilih Salah Satu Amplop Berisi Hadiah Langsung!"}
                  </p>
                </div>
              </div>

              {isRunnerMode ? (
                // A. Dino Game mode (Wait for promo)
                <div className="flex-grow flex flex-col justify-between items-center text-center">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mb-5 flex items-start gap-2.5 text-left w-full">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-emerald-800 text-xs font-bold">GAME MERDEKA DELASSA!</p>
                      <p className="text-emerald-700 text-[10px] font-semibold mt-0.5 leading-normal">
                        Sambil menunggu promo resmi dimulai pada 16 Agustus, yuk bermain melompati rintangan (rolling pin)! Dapatkan skor tertinggi!
                      </p>
                    </div>
                  </div>

                  {/* Canvas Game Wrapper */}
                  <div className="relative w-full aspect-[2/1] max-w-[360px] border border-[#ead8c7] rounded-2xl overflow-hidden bg-[#fffaf5] shadow-inner select-none cursor-pointer flex items-center justify-center">
                    <canvas
                      ref={canvasRef}
                      onClick={triggerJumpOrStart}
                      className="w-full h-full block"
                    />
                  </div>

                  {/* Touch Action Buttons for Mobile/Desktop click */}
                  <div className="mt-3.5 flex gap-4 w-full max-w-[360px] justify-center">
                    <button
                      onClick={triggerJumpOrStart}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md transition active:scale-95 cursor-pointer select-none flex items-center justify-center gap-1.5"
                    >
                      <span>LOMPAT</span>
                    </button>
                    <button
                      onMouseDown={startDucking}
                      onMouseUp={stopDucking}
                      onMouseLeave={stopDucking}
                      onTouchStart={(e) => { e.preventDefault(); startDucking(); }}
                      onTouchEnd={(e) => { e.preventDefault(); stopDucking(); }}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md transition active:scale-95 cursor-pointer select-none flex items-center justify-center gap-1.5"
                    >
                      <span>MERUNDUK</span>
                    </button>
                  </div>

                  <p className="text-[9.5px] text-[#7a6a62] font-semibold mt-2.5">
                    Desktop: Tekan <kbd className="bg-white border px-1 py-0.5 rounded text-[10px] font-mono font-black shadow-sm">SPASI</kbd>/<kbd className="bg-white border px-1 py-0.5 rounded text-[10px] font-mono font-black shadow-sm">▲</kbd> untuk Lompat, <kbd className="bg-white border px-1 py-0.5 rounded text-[10px] font-mono font-black shadow-sm">▼</kbd>/<kbd className="bg-white border px-1 py-0.5 rounded text-[10px] font-mono font-black shadow-sm">S</kbd> untuk Merunduk
                  </p>

                  {showRunnerGameOver && (
                    <div className="mt-4 flex gap-3 w-full max-w-[360px]">
                      <button
                        onClick={handleRestartRunner}
                        className="flex-1 bg-[#c38358] hover:bg-[#b0744a] text-white font-bold py-2.5 px-4 rounded-full text-xs shadow-md active:scale-95 transition cursor-pointer"
                      >
                        Main Lagi
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-full text-xs shadow-md active:scale-95 transition cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>
                  )}
                </div>
              ) : !envelopeState.revealed ? (
                // B. Envelopes Selection Grid (Real Promo Lucky Draw)
                <div className="flex-grow flex flex-col justify-between">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-emerald-800 text-xs font-bold">LUCKY DRAW DIBUKA!</p>
                      <p className="text-emerald-700 text-[11px] font-medium mt-0.5">
                        Subtotal belanja kamu sudah mencapai {formatCurrency(regularSubtotal)}. Silakan pilih salah satu Amplop Merdeka di bawah ini untuk mendapatkan hadiah langsung!
                      </p>
                    </div>
                  </div>

                  {/* 3x2 Grid of Red & White Envelopes */}
                  <div className="grid grid-cols-3 gap-3 py-2">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleOpenEnvelope(idx)}
                        whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#fffcf9] border border-[#ead8c7] rounded-2xl p-3 shadow-sm hover:shadow-md cursor-pointer text-center relative overflow-hidden group flex flex-col items-center justify-center min-h-[110px]"
                      >
                        {/* Flap */}
                        <div className="w-12 h-8 bg-red-600 rounded-t-md relative overflow-hidden flex items-center justify-center shadow-inner group-hover:bg-red-500 transition-colors">
                          <span className="text-[10px] font-extrabold text-white tracking-widest">RI</span>
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-800"></div>
                        </div>
                        {/* Body */}
                        <div className="w-12 h-6 bg-white border-t border-red-600 rounded-b-md shadow-sm flex items-center justify-center">
                          <span className="text-xs">🇮🇩</span>
                        </div>
                        <p className="mt-2 text-[10px] font-bold text-[#7a6a62] group-hover:text-red-500 transition-colors">
                          #{idx + 1}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                // 3. Revealed Prize State (Opening state bypasses to here once revealed = true)
                <div className="text-center py-1 flex-grow flex flex-col justify-between w-full">
                  <div className="w-full bg-[#fffaf5] border border-dashed border-[#c38358] rounded-[24px] p-6 relative flex-grow flex flex-col justify-between">
                    <div className="flex-grow flex flex-col justify-center py-2">
                      {/* Prize Icon removed per request */}
                      <p className="text-[10px] uppercase font-extrabold tracking-[1.5px] text-red-500">
                        {gameScore > 0 ? `SKOR DELASSA RUNNER: ${gameScore}` : "MERDEKA! HADIAH SPESIAL UNTUKMU"}
                      </p>
                      <h4 className="text-sm sm:text-base font-black text-[#2f221d] mt-1.5 leading-snug">
                        {envelopeState.prize?.text}
                      </h4>
                      <p className="text-[#7a6a62] text-[9.5px] mt-1.5 leading-normal max-w-sm mx-auto">
                        Yeay! Hadiah manis ini siap melengkapi pesananmu. Klik tombol di bawah untuk klaim ke keranjang!
                      </p>
                    </div>

                    {envelopeState.prize?.code && (
                      <div className="mt-2.5 p-2 bg-red-50/70 border border-red-200/50 rounded-xl w-full">
                        <p className="text-[8.5px] uppercase tracking-wider text-red-600 font-extrabold text-center">KUPON REJEKI MERDEKA (SALIN & SIMPAN!)</p>
                        <div className="mt-1.5 flex items-center justify-between bg-white border border-red-100 rounded-lg px-2.5 py-1">
                          <span className="font-mono font-black text-red-600 text-xs tracking-wider">{envelopeState.prize.code}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(envelopeState.prize?.code || "");
                              alert("Kode voucher berhasil disalin!");
                            }}
                            className="text-[8px] font-black text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded border border-red-200/50 cursor-pointer active:scale-95 transition"
                          >
                            Salin
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 w-full">
                      {isDemoMode ? (
                        <div className="space-y-2.5 w-full">
                          <div className="bg-amber-50 text-amber-800 border border-amber-200/60 py-2.5 px-4 rounded-full font-bold text-[10px] flex items-center justify-center gap-1.5 w-full">
                            <span className="text-amber-600 font-bold">⚠️</span>
                            <span>Ini adalah Mode Demo (Simulasi)</span>
                          </div>
                          <button
                            onClick={handleCloseModal}
                            className="w-full bg-[#c38358] hover:bg-[#b0744a] text-white font-bold py-3 px-5 rounded-full text-xs shadow-md transition flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            Tutup Demo
                          </button>
                        </div>
                      ) : !envelopeState.claimed ? (
                        <button
                          onClick={() => {
                            // 1. Add bundle to cart if selected
                            if (selectedProduct && selectedDrink) {
                              const bundleTitle = `Bundle Hemat: Menu Utama + Minuman (${selectedProduct} + ${selectedDrink})`;
                              addToCart({
                                title: bundleTitle,
                                price: bundlePricing.price,
                                qty: 1,
                              });
                            }

                            // 2. Add prize to cart
                            if (envelopeState.prize) {
                              let prizeTitle = `🎁 [Amplop Merdeka] ${envelopeState.prize.text}`;
                              if (envelopeState.prize.code) {
                                prizeTitle += ` (Kode: ${envelopeState.prize.code})`;
                              }
                              addToCart({
                                title: prizeTitle,
                                price: envelopeState.prize.price,
                                qty: 1,
                              });
                            }

                            // 3. Mark as claimed and reset selections
                            const updatedState = { ...envelopeState, claimed: true };
                            setEnvelopeState(updatedState);
                            try {
                              localStorage.setItem("delassa_merdeka_envelope", JSON.stringify(updatedState));
                            } catch (e) {
                              console.error("Failed to write claimed state:", e);
                            }
                            setSelectedProduct("");
                            setSelectedDrink("");

                            // 4. Close modal and open cart drawer
                            setShowGameModal(false);
                            setCartOpen(true);
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-full text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <span>
                            {selectedProduct && selectedDrink
                              ? "Masukkan Bundle & Hadiah ke Keranjang"
                              : "Masukkan Hadiah ke Keranjang"}
                          </span>
                        </button>
                      ) : (
                        <div className="space-y-2 w-full">
                          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 py-2.5 px-3 rounded-full font-bold text-[10px] flex items-center justify-center gap-1.5 w-full">
                            <CheckCircle2 size={12} />
                            <span>Sukses! Hadiah Manismu Sudah Masuk Keranjang!</span>
                          </div>

                          <div className="text-center bg-white border border-[#ead8c7] rounded-xl p-2 w-full">
                            <p className="text-[9px] text-[#7a6a62] font-semibold leading-relaxed">
                              📸 Yuk pamerkan hadiahmu! Bagikan kemenangan seru ini ke IG Story & tag <strong>@delassa.homebakery</strong>!
                            </p>
                          </div>

                          <button
                            onClick={handleCloseModal}
                            className="w-full bg-[#c38358] hover:bg-[#b0744a] text-white font-bold py-2.5 px-4 rounded-full text-[10px] shadow-md transition flex items-center justify-center gap-1 cursor-pointer active:scale-95 mt-1"
                          >
                            Tutup & Lihat Keranjang
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
