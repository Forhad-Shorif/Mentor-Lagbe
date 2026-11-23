"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * App-wide single toast host. Root layout e ekbar render hoy —
 * onno layout e abar ToastContainer dile duplicate toast dekhay.
 * Toast er light/dark style `showToast` helper theke ashe.
 */
export default function AppToaster() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1800}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable={false}
      pauseOnFocusLoss={false}
      theme="light"
      limit={3}
    />
  );
}
