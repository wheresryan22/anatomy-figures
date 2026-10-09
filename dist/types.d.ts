import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export type ThemeName = "dark" | "light" | "paper" | "blueprint" | "sepia";
export type Tokens = Partial<Record<`--anatomy-${string}`, string>>;
export type Theme = ThemeName | (Tokens & { base?: "dark" | "light" }) | { base?: "dark" | "light"; tokens: Tokens };

export interface FigureProps {
  theme?: Theme;
  tokens?: Tokens;
  fig?: string;
  className?: string;
  style?: CSSProperties;
}

export type Figure = ForwardRefExoticComponent<FigureProps & RefAttributes<HTMLDivElement>>;

export declare const themes: Record<ThemeName, { base: "dark" | "light"; tokens: Tokens }>;
export declare const DEFAULT_THEME: "dark";
export declare function resolveTheme(theme?: Theme, tokens?: Tokens): { base: "dark" | "light"; tokens: Tokens };
export declare function AnatomyTheme(props: { theme?: Theme; tokens?: Tokens; children?: ReactNode }): ReactNode;
export declare function useAnatomyTheme(): { theme?: Theme; tokens?: Tokens } | null;
