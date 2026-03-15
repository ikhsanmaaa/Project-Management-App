import { Badge } from "@/components/ui/badge";

export default function ActivityBadge({ type }: { type: string }) {
  if (type === "created") return <Badge variant="secondary">Created</Badge>;

  if (type === "moved")
    return <Badge className="bg-blue-100 text-blue-700">Moved</Badge>;

  if (type === "completed")
    return <Badge className="bg-green-100 text-green-700">Completed</Badge>;

  if (type === "in progress")
    return <Badge className="bg-amber-100 text-amber-700">In Progress</Badge>;

  if (type === "expired")
    return <Badge className="bg-red-100 text-red-700">Expired</Badge>;

  if (type === "deleted")
    return <Badge className="bg-gray-200 text-gray-700">Deleted</Badge>;

  return null;
}
