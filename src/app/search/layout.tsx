"use client";
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
