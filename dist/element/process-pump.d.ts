import type { Theme, Tokens } from "../types.js";

export declare const tag: "anatomy-process-pump";
export declare const ratio: string;
export declare function render(target: HTMLElement, options?: { fig?: string; theme?: Theme; tokens?: Tokens }): () => void;
export declare function define(name?: string): void;
