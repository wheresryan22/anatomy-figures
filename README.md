# anatomy-figures

Every figure from Anatomy as a React component: drawn by Claude with the [/anatomy skill](https://github.com/wheresryan22/anatomy), live, interactive, and themeable. Dark by default.

```bash
npm install anatomy-figures
```

```tsx
import { Turbofan } from "anatomy-figures";

export default function Page() {
  return <Turbofan />;
}
```

## Theming

Pick one of the five themes, or pass your own tokens. Every fill and line in a figure reads a `--anatomy-*` token.

```tsx
<Turbofan theme="light" />
<Turbofan theme="blueprint" />
<Turbofan theme={{ base: "dark", "--anatomy-card": "#000000", "--anatomy-hi": "#ffffff" }} />
```

Or set it once for a whole tree:

```tsx
import { AnatomyTheme, Turbofan } from "anatomy-figures";

<AnatomyTheme theme="paper">
  <Turbofan />
</AnatomyTheme>
```

Themes: `dark` (default), `light`, `paper`, `blueprint`, `sepia`.

## One figure only

Each figure is its own entry, so importing one never pulls in the others:

```tsx
import Turbofan from "anatomy-figures/turbofan";
```

## Without React

```js
import { define } from "anatomy-figures/element/turbofan";
define();
```

```html
<anatomy-turbofan theme="dark"></anatomy-turbofan>
```

## Figures

- `HashMap` (`anatomy-figures/hash-map`): Hash map collisions
- `BinarySearch` (`anatomy-figures/binary-search`): Binary search
- `Dns` (`anatomy-figures/dns`): DNS resolution
- `MessageQueue` (`anatomy-figures/message-queue`): Message queue
- `LruCache` (`anatomy-figures/lru-cache`): LRU cache
- `TcpHandshake` (`anatomy-figures/tcp-handshake`): TCP handshake
- `GradientDescent` (`anatomy-figures/gradient-descent`): Gradient descent
- `BloomFilter` (`anatomy-figures/bloom-filter`): Bloom filter
- `FlexGrow` (`anatomy-figures/flex-grow`): flex-grow
- `MarkSweep` (`anatomy-figures/mark-sweep`): Mark and sweep
- `BTree` (`anatomy-figures/b-tree`): B-tree index
- `Debounce` (`anatomy-figures/debounce`): Debounce and throttle
- `Mutex` (`anatomy-figures/mutex`): Mutex
- `MergeSort` (`anatomy-figures/merge-sort`): Merge sort
- `Sampling` (`anatomy-figures/sampling`): Temperature
- `Afterburner` (`anatomy-figures/afterburner`): Afterburner
- `GlassFurnace` (`anatomy-figures/glass-furnace`): Glory hole
- `Tokamak` (`anatomy-figures/tokamak`): Tokamak shot
- `PlasmaCutter` (`anatomy-figures/plasma-cutter`): Plasma cutter
- `Forge` (`anatomy-figures/forge`): Forge and hammer
- `Turbofan` (`anatomy-figures/turbofan`): Turbofan ground run
- `PowerStation` (`anatomy-figures/power-station`): Power station
- `ProcessPump` (`anatomy-figures/process-pump`): Process pump
- `Watch` (`anatomy-figures/watch`): Watch movement
- `Seasons` (`anatomy-figures/seasons`): Seasons
- `Computer` (`anatomy-figures/computer`): Desk computer
- `RateLimiter` (`anatomy-figures/rate-limiter`): Token bucket
- `Easing` (`anatomy-figures/easing`): Easing bench
- `PublicKey` (`anatomy-figures/public-key`): Two-key box
- `Foundry` (`anatomy-figures/foundry`): Foundry pour
- `BoxModel` (`anatomy-figures/box-model`): Box model
- `GitMerge` (`anatomy-figures/git-merge`): Branch and merge
- `Reactor` (`anatomy-figures/reactor`): Pool reactor

## Early examples

The first figures, drawn for a WebGL glass library before the skill had its own rules. They take the same props, but they keep their own light and dark palettes: `theme` picks the base (`light`, `paper` and `sepia` draw light; `dark` and `blueprint` draw dark), and `--anatomy-card` sets their ground. The other tokens don't reach them. They render with React, so the custom elements need `react` and `react-dom` installed too.

- `OnePane` (`anatomy-figures/one-pane`): One pane
- `OneContext` (`anatomy-figures/one-context`): One context
- `SharedCanvas` (`anatomy-figures/shared-canvas`): Shared canvas
- `OneTexture` (`anatomy-figures/one-texture`): One texture
- `Fit` (`anatomy-figures/fit`): Fit
- `OneStage` (`anatomy-figures/one-stage`): One stage
- `SeparableBlur` (`anatomy-figures/separable-blur`): Separable blur
- `FieldKey` (`anatomy-figures/field-key`): Field key
- `FourFrames` (`anatomy-figures/four-frames`): Four frames
- `Lookup` (`anatomy-figures/lookup`): Lookup
- `Profile` (`anatomy-figures/profile`): Profile
- `LensBench` (`anatomy-figures/lens-bench`): Dispersion
- `Studio` (`anatomy-figures/studio`): Rim light
- `FrostedCopy` (`anatomy-figures/frosted-copy`): Frosted copy
- `SpotPlate` (`anatomy-figures/spot-plate`): Spot plate
- `BevelOffset` (`anatomy-figures/bevel-offset`): Bevel offset
- `LitByFacing` (`anatomy-figures/lit-by-facing`): Lit by facing
- `PressAndPull` (`anatomy-figures/press-and-pull`): Press and pull
- `ThreeReads` (`anatomy-figures/three-reads`): Three reads

MIT
