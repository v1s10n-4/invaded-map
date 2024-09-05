"use client";
import { FileInput } from "@/components/FileInput";
import { TabsContent } from "@/components/Tabs";
import { Invader } from "@/db";
import {
  Blockquote,
  Heading,
  IconButton,
  Popover,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import InfoBoxIcon from "pixelarticons/svg/info-box.svg";
import React, { FC } from "react";

type PointsFormProps = Pick<Invader, "points">;

const PointsForm: FC<PointsFormProps> = ({ points }) => {
  return (
    <TabsContent value="points" tabIndex={-1}>
      <Heading as="h4" size="3" className="mb-2 mt-4 flex items-center gap-1">
        Points
        <Popover.Root>
          <Popover.Trigger>
            <IconButton size="1" variant="ghost" color="gray">
              <InfoBoxIcon className="h-6 w-6" />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content
            size="1"
            className="w-80"
            side="top"
            collisionPadding={8}
          >
            <Text>
              The amount of points earned in flash invaders when the invader is
              flashed.
            </Text>
          </Popover.Content>
        </Popover.Root>
      </Heading>
      <label className="w-full">
        <TextField.Root
          size="3"
          required
          min={10}
          max={1000}
          step={10}
          name="points"
          type="number"
          className="[&>input::-webkit-inner-spin-button]:appearance-auto"
          defaultValue={points}
        />
        <Blockquote mt="1" size="1">
          Current value: {points} pts
        </Blockquote>
      </label>
      <Separator size="4" my="3" />
      <Heading as="h4" size="3" className="mb-2 flex items-center gap-1">
        Proof
        <Popover.Root>
          <Popover.Trigger>
            <IconButton size="1" variant="ghost" color="gray">
              <InfoBoxIcon className="h-6 w-6" />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content
            size="1"
            className="w-80"
            side="top"
            collisionPadding={8}
          >
            <Text size="1">
              A proof is required, it must be a screenshot or a photo of the app
              showing the score for the invader. Photos of &quot;official&quot;
              books are also accepted.
            </Text>
          </Popover.Content>
        </Popover.Root>
      </Heading>
      <label className="form-control w-full">
        <FileInput
          required
          name="proof"
          size="3"
          // accept="image/*"
          // capture="environment"
        />
        <Blockquote mt="1" size="1">
          max image size: 4mb
        </Blockquote>
      </label>
    </TabsContent>
  );
};

export default PointsForm;
