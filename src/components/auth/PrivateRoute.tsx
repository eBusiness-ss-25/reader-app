"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      router.replace("/");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    // Optional: Ladeanzeige oder null
    return null;
  }

  return <>{children}</>;
}
