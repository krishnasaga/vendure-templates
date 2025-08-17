/* eslint-disable @typescript-eslint/no-explicit-any */
// IframeBootstrap.tsx
import { useEffect } from "react";

type InitMsg =
  | { type: "INIT_OVERLAY_FROM_URL"; src: string }
  | { type: "INIT_OVERLAY_INLINE"; code: string }
  | { type: "OVERLAY_COMMAND"; cmd: "enable" | "disable" | "destroy" };

const ALLOWED_PARENT_ORIGIN = "*"; // <-- replace with "https://parent.example.com" if you can

export default function IframeBootstrap() {
  useEffect(() => {
    let injectedScriptEl: HTMLScriptElement | null = null;

    const onMessage = (e: MessageEvent) => {
      console.log("Received message in iframe:", e.data);
      // Security: only accept from allowed origin
      if (ALLOWED_PARENT_ORIGIN !== "*" && e.origin !== ALLOWED_PARENT_ORIGIN)
        return;

      const data = e.data as InitMsg | undefined;
      if (!data || typeof data !== "object" || !("type" in data)) return;

      if (
        data.type === "INIT_OVERLAY_FROM_URL" &&
        typeof data.src === "string"
      ) {
        // Remove previous script if any
        if (injectedScriptEl?.isConnected) injectedScriptEl.remove();

        // Inject external script (CSP-friendly)
        const s = document.createElement("script");
        s.src = data.src;
        s.async = true;

        // Optional: notify parent on load/error
        s.onload = () =>
          window.parent?.postMessage(
            { type: "OVERLAY_LOADED" },
            e.origin || "*",
          );
        s.onerror = () =>
          window.parent?.postMessage(
            { type: "OVERLAY_ERROR" },
            e.origin || "*",
          );

        document.documentElement.appendChild(s);
        injectedScriptEl = s;
      } else if (
        data.type === "INIT_OVERLAY_INLINE" &&
        typeof data.code === "string"
      ) {
        // Requires CSP to allow inline scripts (unsafe-inline or nonce/hash)
        if (injectedScriptEl?.isConnected) injectedScriptEl.remove();

        const s = document.createElement("script");
        s.textContent = data.code;
        document.documentElement.appendChild(s);
        injectedScriptEl = s;
      } else if (data.type === "OVERLAY_COMMAND") {
        const api = (window as any).__componentOverlay;
        if (!api) return;
        if (data.cmd === "enable") api.enable?.();
        if (data.cmd === "disable") api.disable?.();
        if (data.cmd === "destroy") api.destroy?.();
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (injectedScriptEl?.isConnected) injectedScriptEl.remove();
    };
  }, []);

  return null; // this component only wires up messaging
}

