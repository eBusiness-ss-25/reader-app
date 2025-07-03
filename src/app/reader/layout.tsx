"use client";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function ReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
