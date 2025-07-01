"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      router.replace("/");
    }
  }, [router]);

  if (!Cookies.get("auth_token")) {
    return null;
  }

  return <>{children}</>;
}
