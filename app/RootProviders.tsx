'use client';
// debug
import { config as configBase } from '@tamagui/config';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme';
import '@tamagui/polyfill-dev';
// import 'client-only';
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Main } from 'next/document';
import { useServerInsertedHTML } from 'next/navigation';
import React, { cloneElement, ReactNode, startTransition, useEffect } from 'react';
// @ts-ignore
import { AppRegistry } from 'react-native';
import { createTamagui, TamaguiProvider as TamaguiProviderOG } from 'tamagui';

interface ProviderProps {
  children: ReactNode;
}

const tamaguiConfig = createTamagui({
  ...configBase,
  themeClassNameOnRoot: false,
});
export default function Provider({ children }: ProviderProps) {
  const [theme, setTheme] = useRootTheme();

  AppRegistry.registerComponent('Main', () => Main);
  // @ts-ignore
  const { getStyleElement } = AppRegistry.getApplication('Main');

  useServerInsertedHTML(() =>
    cloneElement(getStyleElement(), { key: 'react-native-stylesheet' }),
  );
  useServerInsertedHTML(() => (
    <style
      key="tamagui-css"
      dangerouslySetInnerHTML={{ __html: tamaguiConfig.getNewCSS() }}
    />
  ));

  // useEffect(function logDevOnlyThemeConfig() {
  //   if (process.env['NODE_ENV'] === 'development') {
  //     console.log('tamaguiConfig', tamaguiConfig);
  //   }
  // }, []);

  return (
    <NextThemeProvider
      onChangeTheme={next => {
        startTransition(() => {
          setTheme(next as 'dark' | 'light');
        });
      }}
    >
      <TamaguiProviderOG
        config={tamaguiConfig}
        disableInjectCSS
        disableRootThemeClass
        // themeClassNameOnRoot
        defaultTheme={theme}
      >
        {children}
      </TamaguiProviderOG>
    </NextThemeProvider>
  );
}