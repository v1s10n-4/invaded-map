import { invaderValidStates } from "@/app/map/[invaderName]/utils";
import { FileInput } from "@/components/FileInput";
import { Invader } from "@/db";
import {
  Blockquote,
  Flex,
  Heading,
  IconButton,
  Popover,
  RadioGroup,
  Separator,
  Tabs,
  Text,
} from "@radix-ui/themes";
import InfoBoxIcon from "pixelarticons/svg/info-box.svg";
import React, { FC } from "react";

type StateFormProps = Pick<Invader, "state">;

const StateForm: FC<StateFormProps> = ({ state }) => {
  return (
    <Tabs.Content value="state" tabIndex={-1}>
      <Heading as="h4" size="3" className="mb-4 mt-4 flex items-center gap-1">
        New state
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
              Describe the new physical state of the invader. Please read
              carefully the infos for each state to be sure to select the most
              accurate one.
            </Text>
          </Popover.Content>
        </Popover.Root>
      </Heading>
      <RadioGroup.Root className="gap-4 pr-2" name="state">
        {invaderValidStates.map(({ value, label, description }) => (
          <RadioGroup.Item
            className="w-full flex-row-reverse justify-between"
            key={value}
            disabled={state === value}
            required
            value={value}
          >
            <Flex align="center" gap="2">
              <Text className="capitalize">
                {label}
                {state === value && " (current)"}
              </Text>
              <Popover.Root>
                <Popover.Trigger>
                  <IconButton size="1" variant="ghost" color="gray">
                    <InfoBoxIcon className="h-6 w-6" />
                  </IconButton>
                </Popover.Trigger>
                <Popover.Content
                  size="1"
                  className="w-auto max-w-80 text-center text-xs"
                  side="top"
                  collisionPadding={8}
                >
                  {description}
                </Popover.Content>
              </Popover.Root>
            </Flex>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
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
              A proof is required, poor quality contributions will be rejected
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

export default StateForm;
