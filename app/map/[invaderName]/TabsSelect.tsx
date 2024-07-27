"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { Tabs } from "@/components/Tabs";
import React, { FC, PropsWithChildren, useState } from "react";

type TabsSelectProps = PropsWithChildren<{
  values: { value: string; label: string }[];
  defaultValue?: string;
  placeholder?: string;
}>;

const TabsSelect: FC<TabsSelectProps> = ({
  values,
  defaultValue,
  placeholder,
  children,
}) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  return (
    <Tabs className="mt-4 w-full" value={selected}>
      <Select name="type" onValueChange={setSelected} value={selected}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map(({ value, label }) => (
              <SelectItem key={value} value={value} className="h-12">
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {children}
    </Tabs>
  );
};

export default TabsSelect;
