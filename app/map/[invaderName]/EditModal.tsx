import CreateDateForm from "@/app/map/[invaderName]/CreateDateForm";
import PointsForm from "@/app/map/[invaderName]/PointsForm";
import StateForm from "@/app/map/[invaderName]/StateForm";
import TabsSelect from "@/app/map/[invaderName]/TabsSelect";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Invader } from "@/db";
import { cn } from "@/lib/utils";
import { tooltipClass } from "@/utils";
import EditIcon from "pixelarticons/svg/edit.svg";
import React, { FC } from "react";

type EditModalProps = { data: Invader };

const editableKeys: Array<Partial<keyof Invader>> = [
  "state",
  "create_date",
  "points",
];

const EditModal: FC<EditModalProps> = async ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "btn btn-square btn-outline absolute right-0 top-0 self-start p-2",
            tooltipClass
          )}
          data-tip="edit"
        >
          <EditIcon className="h-full w-full" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What changed?</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            "use server";
            console.log(Object.fromEntries(formData));
          }}
        >
          <TabsSelect values={editableKeys} placeholder="Select a field">
            <StateForm state={data.state} />
            <CreateDateForm create_date={data.create_date} />
            <PointsForm points={data.points} />
          </TabsSelect>
          <DialogFooter className="mt-4">
            <DialogClose className="btn" type="button">
              Cancel
            </DialogClose>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
