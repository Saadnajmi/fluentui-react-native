# @fluentui-react-native/tester-storybook

A [Storybook for React Native](https://github.com/storybookjs/react-native) (v10) app that showcases
FluentUI React Native **theming** and the **V1 controls**. It is a dedicated, thin
[react-native-test-app](https://github.com/microsoft/react-native-test-app) (RNTA) shell — a sibling of
`apps/fluent-tester` and `apps/win32` — so the existing FluentTester app and its wdio/Appium E2E suite are
left completely untouched.

## Running

```sh
# from apps/storybook
yarn macos      # or: yarn ios / yarn android
```

This starts Metro and builds/launches the RNTA app. Storybook is always-on in this app (no toggle).

For a JS-only sanity check (no native build needed):

```sh
yarn rnx-cli bundle --platform macos --dev true --entry-file index.js --bundle-output /tmp/sb.jsbundle
```

## Layout

- `.rnstorybook/` — Storybook config: `main.ts` (stories glob), `preview.tsx` (decorators),
  `index.tsx` (`getStorybookUI`), and `withFluentTheme.tsx` (on-device theme/appearance decorator).
- `stories/*.stories.tsx` — one CSF file per control (Button, Text, Switch, Checkbox, RadioGroup, Link,
  MenuButton, Avatar, TabList) plus `Theming.stories.tsx` (live token swatches).
- `src/index.tsx` — registers the generated `StorybookUIRoot` as the RNTA app component.
- `src/storybook.test.tsx` — jest smoke tests (CSF validity + config).

Stories are deliberately kept **outside `src/`** so `fluentui-scripts build` (tsc) doesn't emit them.

## How the Metro integration works

`metro.config.js` mirrors `apps/fluent-tester`'s rnx-kit config, then wraps it with Storybook's
`withStorybook(config, { liteMode: true, docTools: false })`. Notable, hard-won details:

- **`liteMode: true`** → uses `@storybook/react-native-ui-lite`, so the heavy native peers
  (`reanimated` / `gesture-handler` / `@gorhom/bottom-sheet`) are **not** required.
- **`docTools: false`** → the docs preview annotations crash in the RN runtime; lite mode has no docs UI.
- **No `deviceAddons`** → the on-device controls/actions addons call the manager `addons.register` API,
  which lite mode mocks out (crashes with `_managerApi.addons.register`).
- **Resolver delegation** (in `metro.config.js`): Storybook 10 is ESM-only and exposes its API via subpath
  `exports` (e.g. `storybook/internal/preview-api`). The rnx-kit oxc symlink resolver cannot resolve those
  subpaths, so `storybook`/`@storybook`/`uuid` are delegated to Metro's default resolver (which
  `withStorybook` primes with package-exports + the `import` condition); everything else keeps using oxc
  for pnpm symlink support.

## Status

✅ **Working**
- macOS **and** iOS native builds compile (`** BUILD SUCCEEDED **`).
- Metro bundles cleanly on all platforms.
- All JS checks pass: `build`, `lint`, `lint-package`, `depcheck`, and `yarn test` (jest smoke tests).
- At runtime on macOS, Storybook **boots and renders stories** with the FluentUI theming decorator
  (verified: the Avatar story renders a Fluent Avatar with the on-device Appearance picker —
  Auto / Light / Dark / High Contrast).

⚠️ **Known limitation — on-device story navigator**
- The on-device navigator/UI chrome currently fails to load with a non-fatal warning:
  `storybook-log: error loading UI [TypeError: undefined is not an object (evaluating 'primitive.displayName')]`.
- Root: `@storybook/react-native-theming` (via bundled `@emotion/native`) ends up with an `undefined`
  primitive when its styling layer initializes under Metro + pnpm. It is **not** a missing-RN-component
  issue (backfilling removed primitives like `DatePickerIOS`/`Slider` did not change it) and **not** fixable
  by the resolver (pure oxc — even 0.3.1 — cannot resolve `storybook/internal/preview-api`; the
  metro-default delegation is mandatory). It is the same class of ESM-interop issue as the (fixed)
  `composeConfigs` error, but inside the UI/theming packages.
- The full on-device UI (`@storybook/react-native-ui`) shares the same `@storybook/react-native-theming`
  code, so switching off lite mode is unlikely to help (and would re-introduce the heavy native peers).

### Suggested next steps for the navigator
1. Reproduce minimally and file upstream at `storybookjs/react-native` (Storybook 10 ESM + Metro + pnpm +
   react-native-macos); the `composeConfigs` / `primitive.displayName` interop is the crux.
2. Try aligning `storybook` core to `@storybook/react-native`'s exact patch (currently core `10.4.2` vs
   RN `10.4.4`) once core catches up.
3. As an interim, `getStorybookUI({ onDeviceUI: false })` renders the selected story directly (no on-device
   navigator) and could be paired with the web companion (`websockets: 'auto'`) to drive navigation from a
   browser.
