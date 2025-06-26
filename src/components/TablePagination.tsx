"use client";

import { Button } from "@/components/ui/button";
import { ITEM_PER_PAGE } from "@/lib/config";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

function TablePagination({
  pageNumber,
  count,
}: {
  pageNumber: number;
  count: number;
}) {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (pageNumber - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (pageNumber - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="flex gap-2 items-center justify-center text-sm mt-4">
      <Button
        variant="ghost"
        disabled={!hasPrev}
        onClick={() => changePage(pageNumber - 1)}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <ChevronLeft />
          <span>Previous</span>
        </div>
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, idx) => {
          const pageIndex = idx + 1;
          return (
            <Button
              variant={`${pageNumber === pageIndex ? "outline" : "ghost"}`}
              size="sm"
              key={pageIndex}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </Button>
          );
        })}
      </div>
      <Button
        variant="ghost"
        disabled={!hasNext}
        onClick={() => changePage(pageNumber + 1)}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <span>Next</span>
          <ChevronRight />
        </div>
      </Button>
    </div>
  );
}

export default TablePagination;
