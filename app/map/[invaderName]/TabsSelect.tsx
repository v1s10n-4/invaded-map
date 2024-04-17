"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import React, { FC, PropsWithChildren, useState } from "react";

type TabsSelectProps = PropsWithChildren<{
  values: string[];
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
    <Tabs className="w-full" value={selected}>
      <Select onValueChange={setSelected} value={selected}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map((value) => (
              <SelectItem key={value} value={value} className="h-12">
                {value}
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
