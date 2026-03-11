import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export function DialogDelete({
  handleSubmit,
  openDialog,
  onOpenDialog,
}: {
  handleSubmit: () => void;
  openDialog: boolean;
  onOpenDialog: (open: boolean) => void;
}) {
  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialog}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure want to delete this task?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
