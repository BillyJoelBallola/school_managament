import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { getUserCount } from "@/actions/dashboard.actions";

async function UserCard({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) {
  const count = await getUserCount(type);

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
        <h1 className="text-2xl font-semibold my-4">{count}</h1>
        <span className="capitalize text-sm font-medium text-muted-foreground">
          {type}
        </span>
      </CardContent>
    </Card>
  );
}

export default UserCard;
