"use client";

import BackgroundGlows from "./BackgroundGlows";

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({ children }: ClientShellProps) {
  return (
    <>
      <BackgroundGlows />
      {children}
    </>
  );
}
