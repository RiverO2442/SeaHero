import React, { useState, useEffect } from "react";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export const NetworkStatusBanner: React.FC = () => {
  const online = useNetworkStatus();
  const [visible, setVisible] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!online) {
      setVisible(true);
      setWasOffline(true);
    } else if (wasOffline) {
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [online, wasOffline]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold animate-fadeSlideIn ${
        online ? "bg-emerald-500 text-white" : "bg-slate-900 text-white"
      }`}
    >
      <span className="material-symbols-outlined text-base">
        {online ? "wifi" : "wifi_off"}
      </span>
      {online ? "Back online!" : "You're offline — changes may not save"}
      {!online && (
        <button
          onClick={() => setVisible(false)}
          className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      )}
    </div>
  );
};
