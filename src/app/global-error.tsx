"use client";

import React from "react";

/**
 * Last-resort error boundary. Root layout crash korle o ei file ta render hoy.
 * Note: global-error root layout er bodole render hoy, tai global CSS/Tailwind
 * available na — inline style use kora hoyeche.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry?: () => void;
}) {
  const message =
    typeof error?.message === "string" && error.message.trim()
      ? error.message
      : "An unexpected error stopped the app from loading.";

  const handleRetry = () => {
    if (typeof retry === "function") {
      retry();
      return;
    }
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background:
            "radial-gradient(ellipse 80% 70% at 50% -10%, #0f2f33 0%, #060b12 55%, #04070b 100%)",
          color: "#e2e8f0",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            borderRadius: "28px",
            border: "1px solid rgba(244,63,94,0.28)",
            background: "rgba(15,23,42,0.72)",
            boxShadow: "0 30px 80px -40px rgba(244,63,94,0.55)",
            padding: "32px 24px",
            textAlign: "center",
            backdropFilter: "blur(18px)",
          }}
        >
          <div
            style={{
              margin: "0 auto 16px",
              display: "flex",
              height: "64px",
              width: "64px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "18px",
              border: "1px solid rgba(244,63,94,0.4)",
              background:
                "linear-gradient(135deg, rgba(244,63,94,0.25), rgba(251,191,36,0.12))",
              fontSize: "28px",
            }}
            aria-hidden="true"
          >
            ⚠
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#fda4af",
            }}
          >
            Application error
          </p>

          <h1
            style={{
              margin: "10px 0 0",
              fontSize: "24px",
              lineHeight: 1.25,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#94a3b8",
            }}
          >
            The app hit an unexpected error and could not finish loading. Your
            saved data is safe — please retry or reload the page.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={handleRetry}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "12px",
                padding: "12px 22px",
                fontSize: "14px",
                fontWeight: 800,
                color: "#042f2e",
                background: "linear-gradient(90deg, #2dd4bf, #22d3ee)",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(148,163,184,0.35)",
                padding: "12px 22px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#e2e8f0",
                textDecoration: "none",
              }}
            >
              Go to homepage
            </a>
          </div>

          <details
            style={{
              marginTop: "22px",
              textAlign: "left",
              borderRadius: "14px",
              border: "1px solid rgba(148,163,184,0.18)",
              background: "rgba(2,6,23,0.55)",
              padding: "10px 14px",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#94a3b8",
              }}
            >
              Technical details
            </summary>
            <p
              style={{
                margin: "8px 0 0",
                wordBreak: "break-word",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "11px",
                lineHeight: 1.6,
                color: "#cbd5e1",
              }}
            >
              {message}
              {error?.digest ? ` • Digest: ${error.digest}` : ""}
            </p>
          </details>
        </div>
      </body>
    </html>
  );
}
