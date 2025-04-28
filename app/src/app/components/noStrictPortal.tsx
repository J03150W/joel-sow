"use client";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface NoStrictPortalProps {
  children: ReactNode;
  containerId?: string;
}

export default function NoStrictPortal({
  children,
  containerId = "portal-root",
}: NoStrictPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.getElementById(containerId);
  if (!portalRoot) return null;

  let container = portalRoot.querySelector(".no-strict-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "no-strict-container";
    portalRoot.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}
