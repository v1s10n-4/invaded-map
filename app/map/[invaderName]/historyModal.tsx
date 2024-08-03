import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { Invader } from "@/db";
import { DialogProps } from "@radix-ui/react-dialog";
import React, { FC } from "react";

type EditModalProps = Pick<Invader, "id"> & DialogProps;

const EditModal: FC<EditModalProps> = ({ id, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="flex max-h-dvh flex-col gap-4 p-4">
        <DialogHeader>
          <DialogTitle>Change history</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto">history {id}</div>
        <DialogFooter className="mt-4">
          <DialogClose className="btn btn-wide" type="button">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
