import { ACCEPTED_IMAGE_TYPES } from "@/app/account/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { TabsContent } from "@/components/Tabs";
import { Invader } from "@/db";
import InfoBoxIcon from "pixelarticons/svg/info-box.svg";
import React, { FC } from "react";

type StateFormProps = Pick<Invader, "state">;

export const invaderValidStates = [
  { value: "A", label: "active", description: "flashable & no degradation" },
  {
    value: "DG",
    label: "degraded",
    description:
      "flashable but degraded, some tiles are missing, partially painted/tagged",
  },
  {
    value: "H",
    label: "hidden",
    description: "visually hidden, painted, structure in front of it",
  },
  {
    value: "D",
    label: "destroyed",
    description: "literally destroyed, it can be repaired or rebuilt",
  },
  {
    value: "DD",
    label: "unfixable",
    description: "can't be rebuilt, ex: due to environment changes",
  },
  {
    value: "U",
    label: "unknown",
    description:
      "no one ever seen it but we know it exists (not recommended, only for creation, if you're updating from a more precise value there's 99% chance of getting rejected)",
  },
];

const StateForm: FC<StateFormProps> = ({ state }) => {
  return (
    <TabsContent value="state" tabIndex={-1}>
      <h4 className="mb-2 mt-4 flex items-center gap-1">
        New state
        <Popover>
          <PopoverTrigger asChild>
            <button className="btn btn-square btn-ghost btn-sm data-[state=open]:text-primary data-[state=closed]:opacity-50">
              <InfoBoxIcon className="h-6 w-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="top" collisionPadding={8}>
            <p className="text-xs text-base-content/70">
              Describe the new physical state of the invader. Please read
              carefully the infos for each state to be sure to select the most
              accurate one.
            </p>
          </PopoverContent>
        </Popover>
      </h4>
      {invaderValidStates.map(({ value, label, description }) => (
        <div key={value} className="form-control">
          <label className="label cursor-pointer" htmlFor={`state-${value}`}>
            <span className="label-text flex items-center">
              {label}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="btn btn-square btn-ghost btn-sm data-[state=open]:text-primary data-[state=closed]:opacity-50">
                    <InfoBoxIcon className="h-6 w-6" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto max-w-80 text-center text-xs"
                  side="top"
                  collisionPadding={8}
                >
                  {description}
                </PopoverContent>
              </Popover>
            </span>
            <input
              id={`state-${value}`}
              name="state"
              type="radio"
              className="radio rounded-none border-base-content checked:border-primary checked:bg-primary disabled:bg-base-content/60"
              disabled={state === value}
              required
              value={value}
            />
          </label>
        </div>
      ))}
      <h4 className="mb-2 mt-4 flex items-center gap-1">
        Proof
        <Popover>
          <PopoverTrigger asChild>
            <button className="btn btn-square btn-ghost btn-sm data-[state=open]:text-primary data-[state=closed]:opacity-50">
              <InfoBoxIcon className="h-6 w-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="top" collisionPadding={8}>
            <p className="text-xs text-base-content/70">
              A proof is required, it must be a photo of the invader that assess
              your information
            </p>
          </PopoverContent>
        </Popover>
      </h4>
      <label className="form-control w-full">
        <input
          required
          name="proof"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(", ")}
          // accept="image/*"
          // capture="environment"
          className="file-input w-full px-0 text-xs file:text-xs"
        />
        <div className="label">
          <span className="label-text-alt">max image size: 4mb</span>
        </div>
      </label>
    </TabsContent>
  );
};

export default StateForm;
