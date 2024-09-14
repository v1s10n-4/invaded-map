"use client";
import { Select, Tabs } from "@v1s10n_4/radix-ui-themes";
import React, { FC, PropsWithChildren, useState } from "react";

type TabsSelectProps = PropsWithChildren<{
  values: { value: string; label: string }[];
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}>;

const TabsSelect: FC<TabsSelectProps> = ({
  values,
  defaultValue,
  placeholder,
  required,
  children,
}) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  return (
    <Tabs.Root className="mt-4 w-full" value={selected}>
      <Select.Root
        name="type"
        onValueChange={setSelected}
        value={selected}
        required={required}
        size="3"
      >
        <Select.Trigger className="w-full" placeholder={placeholder} />
        <Select.Content>
          <Select.Group>
            {values.map(({ value, label }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      {children}
    </Tabs.Root>
  );
};

export default TabsSelect;
