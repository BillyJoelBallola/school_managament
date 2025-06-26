"use client";

import { useUser, UserButton } from "@clerk/nextjs";

export function UserInfo() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      <UserButton />
      {user && (
        <div className="grid">
          <span className="text-sm font-semibold">Billy Joel Ballola</span>
          <span className="-mt-1 text-xs text-muted-foreground capitalize">
            {user.publicMetadata?.role as string}
          </span>
        </div>
      )}
    </div>
  );
}
