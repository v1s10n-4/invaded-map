import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { TabsContent } from "@/components/Tabs";
import { Invader } from "@/db";
import InfoBoxIcon from "pixelarticons/svg/info-box.svg";
import React, { FC } from "react";

const CreationDateForm: FC<Pick<Invader, "create_date">> = ({
  create_date,
}) => {
  return (
    <TabsContent value="create_date" tabIndex={-1}>
      <h4 className="mb-2 mt-4 flex items-center gap-1">
        Creation date
        <Popover>
          <PopoverTrigger asChild>
            <button className="btn btn-square btn-ghost btn-sm data-[state=open]:text-primary data-[state=closed]:opacity-50">
              <InfoBoxIcon className="h-6 w-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="top" collisionPadding={8}>
            <p className="py-2 text-xs text-base-content/70">
              The date must represent the creation date of the space invader,
              not the invasion wave date.
              <br />
              ex: the dates on each invader in Invader&apos;s &quot;4000&quot;
              book.
            </p>
          </PopoverContent>
        </Popover>
      </h4>
      <label className="form-control w-full">
        <input
          required
          name="create_date"
          type="date"
          defaultValue={new Date(create_date).toLocaleDateString("en-CA")}
          className="input input-bordered"
        />
        <div className="label">
          <span className="label-text-alt">
            previous value: {new Date(create_date).toLocaleDateString()}
          </span>
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
              A proof is required, it can be a photo or screenshot of any
              &quot;official&quot; material that could attest your information
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

export default CreationDateForm;
