"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { TabsContent } from "@/components/Tabs";
import { Invader } from "@/db";
import InfoBoxIcon from "pixelarticons/svg/info-box.svg";
import React, { FC } from "react";

type PointsFormProps = Pick<Invader, "points">;

const PointsForm: FC<PointsFormProps> = ({ points }) => {
  return (
    <TabsContent value="points" tabIndex={-1}>
      <h4 className="mb-2 mt-4 flex items-center gap-1">
        Points
        <Popover>
          <PopoverTrigger asChild>
            <button className="btn btn-square btn-ghost btn-sm data-[state=open]:text-primary data-[state=closed]:opacity-50">
              <InfoBoxIcon className="h-6 w-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="top" collisionPadding={8}>
            <p className="text-xs text-base-content/70">
              The amount of points earned in flash invaders when the invader is
              flashed.
            </p>
          </PopoverContent>
        </Popover>
      </h4>
      <label className="form-control w-full">
        <div className="input input-bordered flex w-full items-center gap-2">
          <input
            required
            min={10}
            max={1000}
            step={10}
            name="points"
            type="number"
            className="grow"
            defaultValue={points}
          />
          <span>pts</span>
        </div>
        <div className="label">
          <span className="label-text-alt">Previous value: {points} pts</span>
        </div>
      </label>
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
              A proof is required, it must be a screenshot or a photo of the app
              showing the score for the invader. Photos of &quot;official&quot;
              books are also accepted.
            </p>
          </PopoverContent>
        </Popover>
      </h4>
      <label className="form-control w-full">
        <input
          required
          name="proof"
          type="file"
          accept="image/*"
          className="file-input w-full px-0 text-xs file:text-xs"
        />
        <div className="label">
          <span className="label-text-alt">max image size: 4mb</span>
        </div>
      </label>
    </TabsContent>
  );
};

export default PointsForm;
