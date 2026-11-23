import { toast, type ToastOptions } from "react-toastify";

/**
 * Single toast API for the whole app.
 * Sob page/component e ei `showToast` use korbe — direct react-toastify import na.
 * Dark + light theme duitai support kore, ar `id` dile same toast update hoy
 * (duplicate toast stack hobe na).
 */

type ToastType = "success" | "error" | "info" | "warning";

export type ShowToastOptions = {
  /** Same id dile purono toast replace hoy, notun stack hoy na. */
  id?: string;
  /** Milliseconds; default success/info 1800, error 2600. */
  autoClose?: number;
};

const ACCENT: Record<ToastType, string> = {
  success: "#14b8a6",
  error: "#f43f5e",
  info: "#38bdf8",
  warning: "#f59e0b",
};

const isDarkMode = () => {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
};

const buildStyle = (type: ToastType) => {
  const dark = isDarkMode();

  return {
    background: dark ? "rgba(6, 17, 28, 0.96)" : "rgba(255, 255, 255, 0.97)",
    color: dark ? "#e2e8f0" : "#0f172a",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: dark
      ? "1px solid rgba(56, 189, 248, 0.26)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    borderLeft: `4px solid ${ACCENT[type]}`,
    boxShadow: dark
      ? "0 20px 45px -20px rgba(34, 211, 238, 0.45)"
      : "0 18px 40px -18px rgba(15, 23, 42, 0.28)",
    borderRadius: "14px",
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: 1.45,
    padding: "12px 18px",
    maxWidth: "min(92vw, 360px)",
    width: "fit-content",
    margin: "0 auto",
  };
};

function push(type: ToastType, message: string, options: ShowToastOptions = {}) {
  const config: ToastOptions = {
    position: "top-center",
    autoClose: options.autoClose ?? (type === "error" ? 2600 : 1800),
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    draggable: false,
    style: buildStyle(type),
  };

  if (options.id) {
    config.toastId = options.id;
  }

  toast[type](message, config);
}

export const showToast = {
  success: (message: string, options?: ShowToastOptions) =>
    push("success", message, options),
  error: (message: string, options?: ShowToastOptions) =>
    push("error", message, options),
  info: (message: string, options?: ShowToastOptions) =>
    push("info", message, options),
  warning: (message: string, options?: ShowToastOptions) =>
    push("warning", message, options),
  /** Ekta id er toast ba sob toast bondho korte. */
  dismiss: (id?: string) => (id ? toast.dismiss(id) : toast.dismiss()),
};

export default showToast;
