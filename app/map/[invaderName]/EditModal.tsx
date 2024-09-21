"use client";
import { submitContribution } from "@/app/map/[invaderName]/actions";
import CreateDateForm from "@/app/map/[invaderName]/CreateDateForm";
import PointsForm from "@/app/map/[invaderName]/PointsForm";
import StateForm from "@/app/map/[invaderName]/StateForm";
import TabsSelect from "@/app/map/[invaderName]/TabsSelect";
import {
  InvaderEditableKeys,
  InvaderEditResponseState,
} from "@/app/map/[invaderName]/utils";
import { CardFooter } from "@/components/Card";
import SubmitButton from "@/components/SubmitButton";
import { Invader } from "@/db";
import { DialogProps } from "@radix-ui/react-dialog";
import { Button, Dialog, IconButton, Text } from "@v1s10n_4/radix-ui-themes";
import CloseIcon from "pixelarticons/svg/close.svg";
import React, { FC, useActionState, useEffect, useRef } from "react";

type EditModalProps = { data: Invader } & DialogProps;

const EditModal: FC<EditModalProps> = ({ data, ...props }) => {
  const submitWithId = submitContribution.bind(null, data.name);
  const [state, formAction] = useActionState(
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
    <Dialog.Root {...props}>
      <Dialog.Content asChild>
        <form action={formAction} className="relative max-h-dvh">
          <Dialog.Close ref={closeButtonRef}>
            <IconButton
              size="2"
              color="gray"
              variant="ghost"
              type="button"
              className="absolute right-3 top-3"
            >
              <CloseIcon className="h-6 w-6" />
            </IconButton>
          </Dialog.Close>
          <Dialog.Title>What changed?</Dialog.Title>
          <div className="overflow-auto">
            <TabsSelect
              values={InvaderEditableKeys}
              placeholder="Select a field"
              required
            >
              <StateForm state={data.state} />
              <CreateDateForm create_date={data.create_date} />
              <PointsForm points={data.points} />
            </TabsSelect>
          </div>
          {!state.success &&
            state.errors.map((message, i) => (
              <Text key={i} size="1" color="red" mt="1">
                {message}
              </Text>
            ))}
          <CardFooter px="0" pb="0" mt="4" gap="2">
            <Dialog.Close ref={closeButtonRef}>
              <Button size="3" color="gray" variant="surface" type="button">
                Cancel
              </Button>
            </Dialog.Close>
            <SubmitButton size="3">Submit</SubmitButton>
          </CardFooter>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditModal;
