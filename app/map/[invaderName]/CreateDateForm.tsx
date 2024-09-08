import { FileInput } from "@/components/FileInput";
import { Invader } from "@/db";
import {
  Blockquote,
  Heading,
  IconButton,
  Popover,
  Separator,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import InfoBoxIcon from "pixelarticons/svg/info-box.svg";
import React, { FC } from "react";

const CreationDateForm: FC<Pick<Invader, "create_date">> = ({
  create_date,
}) => {
  return (
    <Tabs.Content value="create_date" tabIndex={-1}>
      <Heading as="h4" size="3" className="mb-2 mt-4 flex items-center gap-1">
        Creation date
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
              The date must represent the creation date of the space invader,
              not the invasion wave date.
              <br />
              ex: the dates on each invader in Invader&apos;s &quot;4000&quot;
              book.
            </Text>
          </Popover.Content>
        </Popover.Root>
      </Heading>

      <label className="w-full">
        <TextField.Root
          size="3"
          required
          name="create_date"
          type="date"
          defaultValue={new Date(create_date).toLocaleDateString("en-CA")}
          className="[&>input]:block"
        />
        <Blockquote mt="1" size="1">
          Current value: {new Date(create_date).toLocaleDateString()}
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
              A proof is required, it can be a photo or screenshot of any
              &quot;official&quot; material that could attest your information
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
    </Tabs.Content>
  );
};

export default CreationDateForm;
