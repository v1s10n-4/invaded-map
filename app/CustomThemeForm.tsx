"use client";
import {
  Box,
  Flex,
  Grid,
  Separator,
  Slider,
  Switch,
  Text,
  Theme,
  Tooltip,
  useThemeContext,
} from "@v1s10n_4/radix-ui-themes";
import React, { FC } from "react";
import {
  radiusPropDef,
  themePropDefs,
} from "@v1s10n_4/radix-ui-themes/dist/esm/props";
import InvertIcon from "pixelarticons/svg/invert.svg";
import ChessIcon from "pixelarticons/svg/chess.svg";
import MoonIcon from "pixelarticons/svg/moon.svg";
import SunIcon from "pixelarticons/svg/sun.svg";
import { getMatchingGrayColor } from "@v1s10n_4/radix-ui-themes/dist/esm/helpers";

export const CustomThemeForm: FC<ThemeContext> = ({
  appearance,
  onAppearanceChange,
  accentColor,
  resolvedGrayColor,
  grayColor,
  onGrayColorChange,
  onAccentColorChange,
  radius,
  onRadiusChange,
  scaling,
  onScalingChange,
  panelBackground,
  onPanelBackgroundChange,
}) => {
  return (
    <Flex direction="column" gap="3">
      <CustomAppearance
        appearance={appearance}
        onAppearanceChange={onAppearanceChange}
      />
      <Separator size="4" />
      <CustomAccentColor
        accentColor={accentColor}
        onAccentColorChange={onAccentColorChange}
        resolvedGrayColor={resolvedGrayColor}
      />
      <Separator size="4" />
      <CustomGrayColor
        grayColor={grayColor}
        onGrayColorChange={onGrayColorChange}
        accentColor={accentColor}
      />
      <Separator size="4" />
      <CustomRadius radius={radius} onRadiusChange={onRadiusChange} />
      <Separator size="4" />
      <CustomScaling scaling={scaling} onScalingChange={onScalingChange} />
      <Separator size="4" />
      <CustomBackground
        panelBackground={panelBackground}
        onPanelBackgroundChange={onPanelBackgroundChange}
      />
    </Flex>
  );
};

type ThemeContext = NonNullable<ReturnType<typeof useThemeContext>>;

export const CustomRadius: FC<
  Pick<ThemeContext, "radius" | "onRadiusChange">
> = ({ radius, onRadiusChange }) => {
  const radiusValues = radiusPropDef.radius.values;
  const radiusMap = Object.fromEntries(
    Object.entries(radiusPropDef.radius.values).map((r) => r.reverse())
  );
  return (
    <Flex direction="column" gap="3">
      <Slider
        value={[Number(radiusMap[radius])]}
        onValueChange={([newRadius]) => onRadiusChange(radiusValues[newRadius])}
        min={0}
        max={radiusValues.length - 1}
        mx="2"
        mt="1"
      />
      <Flex justify="between">
        {radiusValues.map((r, i) => (
          <Box
            key={i + r}
            data-radius={r}
            width="32px"
            height="32px"
            style={{
              borderTopRightRadius: r === "full" ? "80%" : "var(--radius-4)",
              backgroundImage:
                "linear-gradient(to bottom left, var(--accent-3), var(--accent-2))",
              borderTop: "2px solid var(--accent-a8)",
              borderRight: "2px solid var(--accent-a8)",
            }}
            onClick={() => onRadiusChange(r)}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export const CustomAppearance: FC<
  Pick<ThemeContext, "appearance" | "onAppearanceChange">
> = ({ appearance, onAppearanceChange }) => {
  return (
    <Text as="label">
      <Flex gap="2">
        <MoonIcon className="h-6 w-6" />
        <Switch
          defaultChecked={appearance === "light"}
          onCheckedChange={(newAppearance) =>
            onAppearanceChange(newAppearance ? "light" : "dark")
          }
        />
        <SunIcon className="h-6 w-6" />
      </Flex>
    </Text>
  );
};

export const CustomAccentColor: FC<
  Pick<
    ThemeContext,
    "accentColor" | "resolvedGrayColor" | "onAccentColorChange"
  >
> = ({ accentColor, resolvedGrayColor, onAccentColorChange }) => {
  return (
    <Grid
      columns="10"
      gap="2"
      role="group"
      aria-labelledby="accent-color-title"
    >
      {themePropDefs.accentColor.values.map((color) => (
        <label
          key={color}
          className="rt-ThemePanelSwatch"
          style={{ backgroundColor: `var(--${color}-9)` }}
        >
          <Tooltip
            content={`${color}${
              accentColor === "gray" && resolvedGrayColor !== "gray"
                ? ` (${resolvedGrayColor})`
                : ""
            }`}
          >
            <input
              className="rt-ThemePanelSwatchInput"
              type="radio"
              name="accentColor"
              value={color}
              checked={accentColor === color}
              onChange={(event) => {
                onAccentColorChange(event.target.value as typeof accentColor);
              }}
            />
          </Tooltip>
        </label>
      ))}
    </Grid>
  );
};

export const CustomGrayColor: FC<
  Pick<ThemeContext, "grayColor" | "accentColor" | "onGrayColorChange">
> = ({ grayColor, onGrayColorChange, accentColor }) => {
  const autoMatchedGray = getMatchingGrayColor(accentColor);
  return (
    <Grid
      columns="10"
      gap="2"
      role="group"
      aria-labelledby="accent-color-title"
    >
      {themePropDefs.grayColor.values.map((gray) => (
        <Flex key={gray} asChild align="center" justify="center">
          <label
            className="rt-ThemePanelSwatch"
            style={{
              backgroundColor:
                gray === "auto"
                  ? `var(--${autoMatchedGray}-9)`
                  : gray === "gray"
                    ? "var(--gray-9)"
                    : `var(--${gray}-9)`,
              // we override --gray so pure gray doesn't exist anymore
              // recover something as close as possible by desaturating
              filter: gray === "gray" ? "saturate(0)" : undefined,
            }}
          >
            <Tooltip
              content={`${gray}${
                gray === "auto" ? ` (${autoMatchedGray})` : ""
              }`}
            >
              <input
                className="rt-ThemePanelSwatchInput"
                type="radio"
                name="grayColor"
                value={gray}
                checked={grayColor === gray}
                onChange={(event) => {
                  console.log(event);
                  onGrayColorChange(event.target.value as typeof grayColor);
                }}
              />
            </Tooltip>
          </label>
        </Flex>
      ))}{" "}
    </Grid>
  );
};

export const CustomScaling: FC<
  Pick<ThemeContext, "scaling" | "onScalingChange">
> = ({ scaling, onScalingChange }) => {
  return (
    <Grid columns="5" gap="2" role="group" aria-labelledby="scaling-title">
      {themePropDefs.scaling.values.map((value) => (
        <label key={value} className="rt-ThemePanelRadioCard">
          <input
            className="rt-ThemePanelRadioCardInput"
            type="radio"
            name="scaling"
            value={value}
            checked={scaling === value}
            onChange={(event) =>
              onScalingChange(event.target.value as typeof scaling)
            }
          />

          <Flex align="center" justify="center" height="32px">
            <Theme asChild scaling={value}>
              <Flex align="center" justify="center">
                <Text size="1" weight="medium">
                  {value}
                </Text>
              </Flex>
            </Theme>
          </Flex>
        </label>
      ))}
    </Grid>
  );
};

export const CustomBackground: FC<
  Pick<ThemeContext, "panelBackground" | "onPanelBackgroundChange">
> = ({ panelBackground, onPanelBackgroundChange }) => {
  return (
    <Grid
      columns="2"
      gap="2"
      role="group"
      aria-labelledby="panel-background-title"
    >
      {themePropDefs.panelBackground.values.map((value) => (
        <label key={value} className="rt-ThemePanelRadioCard">
          <input
            className="rt-ThemePanelRadioCardInput"
            type="radio"
            name="panelBackground"
            value={value}
            checked={panelBackground === value}
            onChange={(event) =>
              onPanelBackgroundChange(
                event.target.value as typeof panelBackground
              )
            }
          />
          <Flex align="center" justify="center" height="32px" gap="2">
            {value === "solid" ? (
              <ChessIcon className="h-6 w-6" />
            ) : (
              <InvertIcon className="h-6 w-6" />
            )}
            <Text size="1" weight="medium">
              {{ solid: "mat", translucent: "frozen" }[value]}
            </Text>
          </Flex>
        </label>
      ))}
    </Grid>
  );
};
