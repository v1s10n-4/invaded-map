import { auth } from "@/auth";
import LogInButton from "@/components/LogInButton";
import { HitPlaceholder } from "@/components/Placeholder";
import { DropdownMenu, IconButton } from "@v1s10n_4/radix-ui-themes";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

export const AuthButton: FC = async () => {
  const session = await auth();

  if (!session) {
    return <LogInButton />;
  }

  const user = session.user;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="4" variant="outline" className="overflow-hidden">
          <Image
            src={user.image || HitPlaceholder(96, 96)}
            alt="your profile picture"
            width={96}
            height={96}
            placeholder={HitPlaceholder(96, 96)}
          />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item asChild>
          <Link href={"/account"}>Account</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
        <DropdownMenu.Item>Support</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Logout</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
