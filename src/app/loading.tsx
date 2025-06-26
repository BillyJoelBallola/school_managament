import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="h-dvh w-dvw bg-neutral-50 dark:bg-neutral-950 grid place-items-center pointer-events-none">
      <Loader2 className="animate-spin size-20 z-10" />
    </div>
  );
}

export default Loading;
