import type { TaskFormData } from "@/types/board";
import { useState } from "react";
import { format } from "date-fns";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

import { CalendarIcon, ClockIcon } from "lucide-react";

export function DialogTask({
  handleSubmit,
  openDialog,
  onOpenDialog,
  type,
}: {
  handleSubmit: (data: TaskFormData) => void;
  openDialog: boolean;
  onOpenDialog: (open: boolean) => void;
  type: "add" | "update";
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const [deadline, setDeadline] = useState<Date | undefined>();
  const [time, setTime] = useState("00:00");

  const isFormValid = title.trim() !== "" && deadline !== undefined;

  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialog}>
      <DialogContent className="sm:max-w-105 p-5">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const description = formData.get("description") as string;

            if (!title || !deadline) {
              alert("Please fill all required fields");
              return;
            }

            const [hours, minutes] = time.split(":");
            const finalDate = new Date(deadline);

            finalDate.setHours(Number(hours));
            finalDate.setMinutes(Number(minutes));

            handleSubmit({
              title,
              description,
              priority,
              deadline: finalDate,
            });

            setTitle("");
            setDeadline(undefined);
            setTime("00:00");
          }}
        >
          <DialogHeader className="space-y-1 pb-2 border-b">
            <DialogTitle>
              {type === "add" ? "Add Task" : "Edit Task"}
            </DialogTitle>

            <DialogDescription>
              {type === "add"
                ? "Create a new task for your board."
                : "Update your task details."}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                placeholder="Insert title of your task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9"
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>

              <Input
                id="description"
                name="description"
                placeholder="Insert description (optional)"
                className="h-9"
              />
            </Field>

            <Field>
              <Label>Priority</Label>

              <Select
                value={priority}
                onValueChange={(value) =>
                  setPriority(value as "low" | "medium" | "high")
                }
              >
                <SelectTrigger className="w-full h-9">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label>Deadline</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-9 text-sm font-normal"
                  >
                    <CalendarIcon size={16} />

                    {deadline ? format(deadline, "PPP HH:mm") : "Pick deadline"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-2">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={(date) => {
                      if (!date) return;

                      const newDate = new Date(date);

                      newDate.setHours(0);
                      newDate.setMinutes(0);

                      setDeadline(newDate);
                      setTime("00:00");
                    }}
                  />

                  <div className="flex items-center justify-center gap-2 border-t pt-3">
                    <ClockIcon size={16} className="text-muted-foreground" />

                    <input
                      type="time"
                      value={time}
                      className="h-9 border rounded-md px-2 text-sm"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={!isFormValid}
              className="cursor-pointer"
            >
              {type === "add" ? "Create Task" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
