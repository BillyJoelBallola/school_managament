"use client";

import { Megaphone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Input } from "@/components/ui/input";
import { UserInfo } from "./UserInfo";

function Navbar() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="hidden md:flex md:w-sm">
        <Input type="text" placeholder="Search here..." />
      </div>
      <div className="flex items-center justify-end w-full gap-2">
        <Button variant="ghost" size="icon">
          <MessageCircle className="size-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Megaphone className="size-4" />
        </Button>
        <div className="bg-neutral-200 dark:bg-neutral-800 w-[1px] h-5" />
        <ModeToggle />
        <div className="bg-neutral-200 dark:bg-neutral-800 w-[1px] h-5" />
        <UserInfo />
      </div>
    </div>
  );
}

export default Navbar;
