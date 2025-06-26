import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Ellipsis } from "lucide-react";

function UserCard({ type }: { type: string }) {
  return (
    <Card className="flex-1 min-w-[130px] gap-0">
      <CardHeader className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 border rounded-full">
          2025/18
        </span>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl font-semibold my-4">1,294</h1>
        <span className="capitalize text-sm font-medium text-muted-foreground">
          {type}
        </span>
      </CardContent>
    </Card>
  );
}

export default UserCard;
