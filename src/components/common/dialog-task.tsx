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
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function DialogTask({
  handleSubmit,
  openDialog,
  onOpenDialog,
  type,
}: {
  handleSubmit: (data: { title: string; description: string }) => void;
  openDialog: boolean;
  onOpenDialog: (open: boolean) => void;
  type: "add" | "update";
}) {
  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialog}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const title = formData.get("title") as string;
            const description = formData.get("description") as string;

            if (!title || !description) {
              alert("Please fill all fields");
              return;
            }

            handleSubmit({ title, description });
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {type === "add" ? "Add Task" : "Edit Task"}
            </DialogTitle>
            <DialogDescription>
              {type === "add"
                ? "Add a New Task"
                : "Make changes to your task here"}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="insert title of your task here"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="insert description of your task here"
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
