"use client";
import { submitContribution } from "@/app/map/[invaderName]/actions";
import CreateDateForm from "@/app/map/[invaderName]/CreateDateForm";
import PointsForm from "@/app/map/[invaderName]/PointsForm";
import StateForm from "@/app/map/[invaderName]/StateForm";
import TabsSelect from "@/app/map/[invaderName]/TabsSelect";
import {
  InvaderEditResponseState,
  InvaderEditableKeys,
} from "@/app/map/[invaderName]/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { DropdownMenuItem } from "@/components/DropdownMenu";
import SubmitButton from "@/components/SubmitButton";
import { Invader } from "@/db";
import { cn } from "@/lib/utils";
import { tooltipClass } from "@/utils";
import { DialogProps } from "@radix-ui/react-dialog";
import EditIcon from "pixelarticons/svg/edit.svg";
import React, { FC, useEffect, useRef } from "react";
import { useFormState } from "react-dom";

type EditModalProps = { data: Invader } & DialogProps;

const EditModal: FC<EditModalProps> = ({ data, ...props }) => {
  const submitWithId = submitContribution.bind(null, data.name);
  const [state, formAction] = useFormState(
    submitWithId,
    InvaderEditResponseState
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (state.success) {
      closeButtonRef?.current?.click();
    }
  }, [state.success, closeButtonRef]);
  return (
    <Dialog {...props}>
      <DialogContent className="p-0">
        <form action={formAction} className="flex max-h-dvh flex-col gap-4 p-4">
          <DialogHeader>
            <DialogTitle>What changed?</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto">
            <TabsSelect
              values={InvaderEditableKeys}
              placeholder="Select a field"
            >
              <StateForm state={data.state} />
              <CreateDateForm create_date={data.create_date} />
              <PointsForm points={data.points} />
            </TabsSelect>
          </div>
          {!state.success &&
            state.errors.map((message, i) => (
              <p key={i} className="text-xs text-error">
                {message}
              </p>
            ))}
          <DialogFooter className="mt-4">
            <DialogClose className="btn" type="button" ref={closeButtonRef}>
              Cancel
            </DialogClose>
            <SubmitButton className="btn btn-primary">Submit</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
