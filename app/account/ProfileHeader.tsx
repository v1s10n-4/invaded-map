import { DisplayUserName } from "@/app/account/utils";
import { signOutAction } from "@/app/actions";
import { Card } from "@/components/Card";
import { HitPlaceholder } from "@/components/Placeholder";
import { User } from "@/db";
import { Avatar, Button, Flex, Heading, Slot, Text } from "@radix-ui/themes";
import Image from "next/image";
import LogOutIcon from "pixelarticons/svg/logout.svg";
import React, { FC } from "react";

export const ProfilePicture: FC<User> = ({ name, image }) => {
  if (!image) {
    return (
      <Avatar
        fallback={name?.charAt(0) || "?"}
        size={{ initial: "7", md: "6" }}
      />
    );
  }

  return (
    <span className="rt-reset rt-AvatarRoot rt-r-size-7 md:rt-r-size-6 rt-variant-soft">
      <Image
        src={image}
        alt="your profile picture"
        className="rt-AvatarImage"
        width={96}
        height={96}
        placeholder={HitPlaceholder(96, 96)}
      />
    </span>
  );
};

const ProfileHeader: FC<User> = (user) => {
  return (
    <Card>
      <Flex
        direction={{ initial: "column", sm: "row" }}
        align="center"
        gap={{ initial: "4", md: "8" }}
        p="3"
        width="100%"
        style={{ border: "1px solid var(--color-primary)" }}
      >
        <Card className="shrink-0">
          <ProfilePicture {...user} />
        </Card>

        <Flex
          direction={{ initial: "column", md: "row" }}
          align={{ initial: "center", md: "end" }}
          justify="between"
          gap="2"
          width="100%"
          height="100%"
        >
          <Flex
            direction="column"
            align={{ initial: "center", md: "start" }}
            gap="2"
            my={{ md: "auto" }}
          >
            <Heading as="h2" size={{ initial: "3", md: "4" }} mb="1">
              <DisplayUserName {...user} />
            </Heading>
            <Text
              size="1"
              align={{ initial: "center", md: "left" }}
              style={{ wordBreak: "break-all" }}
            >
              {user.email}
            </Text>
            <Text size="1">
              Created: {new Date(user.created_at).toLocaleDateString()}
            </Text>
          </Flex>

          <form action={signOutAction}>
            <Button variant="soft" size={{ initial: "3", md: "2" }}>
              Sign out
              <Slot>
                <LogOutIcon className="h-6 w-6" />
              </Slot>
            </Button>
          </form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProfileHeader;
