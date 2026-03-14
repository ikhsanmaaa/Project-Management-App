import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
type Props = {
  confirmOpen: boolean;
  setConfirmOpen: (confirmOpen: boolean) => void;
  handleCancelDone: () => void;
  handleConfirmDone: () => void;
};
export default function DialogColumnDone(props: Props) {
  const { confirmOpen, setConfirmOpen, handleCancelDone, handleConfirmDone } =
    props;
  return (
    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finish Task</DialogTitle>
          <DialogDescription>
            Are you sure want to finished this task?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleCancelDone}
            className="cursor-pointer"
          >
            No
          </Button>

          <Button onClick={handleConfirmDone} className="cursor-pointer">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
