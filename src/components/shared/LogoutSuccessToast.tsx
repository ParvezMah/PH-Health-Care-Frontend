"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LogoutSuccessToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("loggedOut") === "true") {
      toast.success("You have been logged out successfully.");

      // replace redirect("/login?loggedOut=true");
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("loggedOut");
      router.replace(newUrl.toString());
    }
  }, [searchParams, router]);

  // Kono Kicu return korbena just succes toast dekhabe
  return null;
};

export default LogoutSuccessToast;
