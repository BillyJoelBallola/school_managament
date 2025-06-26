"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function SignInPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const role = user?.publicMetadata?.role || "admin";

  useEffect(() => {
    if (user) {
      router.push(`/${role}`);
    }
  }, [user, role, router]);

  if (!isLoaded || user) return null;

  return (
    <div className="h-dvh w-dvw grid place-items-center bg-neutral-950">
      <SignIn fallbackRedirectUrl={`/${role}`} />
    </div>
  );
}

export default SignInPage;
