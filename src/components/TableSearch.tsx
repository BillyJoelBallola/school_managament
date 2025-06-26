"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function TableSearch() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input type="text" placeholder="Table search" />
    </form>
  );
}

export default TableSearch;
