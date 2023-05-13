"use client";
import React, { useState } from 'react';
import { Button, Input, Sheet, SheetProps, YStack } from 'tamagui';
import { Text } from '@tamagui/web';
import { H1, H2, Paragraph } from '@/design-system';

export default function Home() {
  const [open, setOpen] = useState(false)
  const [innerOpen, setInnerOpen] = useState(false)
  return (
    <main>
      <YStack f={1} ai="center" jc="center" space="$6" p="$10">
        <H1>Tamagui components in a web only, Nextjs app</H1>
        <Paragraph>This is my attempt to setup a simple nextjs app that works with @tamagui component library and avoid as much react native code as possible</Paragraph>
        <Text
          color="$white"
          fontFamily="$body"
          fontSize={20}
          hoverStyle={{
            color: '$colorHover',
          }}
        >
          This is a `Text` from @tamagui/web
        </Text>
        <Button size="$8" onPress={() => setOpen(true)}>Open</Button>
        <Sheet
          forceRemoveScrollEnabled={open}
          modal
          open={open}
          onOpenChange={setOpen}
          snapPoints={[85, 50, 25]}
          dismissOnSnapToBottom
          zIndex={100_000}
          animation="bouncy"
          native
        >
          <Sheet.Overlay />
          <Sheet.Handle />
          <Sheet.Frame
            flex={1}
            padding="$4"
            justifyContent="center"
            alignItems="center"
            space="$5"
          >
            <Button size="$6" onPress={() => setOpen(false)}>Close</Button>
            <Input width={200} />
            <InnerSheet open={innerOpen} onOpenChange={setInnerOpen} />
            <Button
              size="$6"
              onPress={() => setInnerOpen(true)}
            >
              open sub sheet
            </Button>
          </Sheet.Frame>
        </Sheet>
      </YStack>
    </main>
  )
}

function InnerSheet(props: SheetProps) {
  return (
    <Sheet modal snapPoints={[90]} dismissOnSnapToBottom {...props}>
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame flex={1} justifyContent="center" alignItems="center" space="$5">
        <Sheet.ScrollView padding="$4" space>
          <Button
            size="$8"
            alignSelf="center"
            onPress={() => props.onOpenChange?.(false)}
          >Close2</Button>
          <H1>Hello world</H1>
          <H2>You can scroll me</H2>
          {[1, 2, 3].map((i) => (
            <Paragraph key={i} size="$10">
              Eu officia sunt ipsum nisi dolore labore est laborum laborum in esse ad
              pariatur. Dolor excepteur esse deserunt voluptate labore ea. Exercitation
              ipsum deserunt occaecat cupidatat consequat est adipisicing velit cupidatat
              ullamco veniam aliquip reprehenderit officia. Officia labore culpa ullamco
              velit. In sit occaecat velit ipsum fugiat esse aliqua dolor sint.
            </Paragraph>
          ))}
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}