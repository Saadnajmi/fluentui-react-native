/**
 * Metro configuration for the FluentUI React Native Storybook app.
 * Mirrors apps/fluent-tester's rnx-kit setup, then wraps it with Storybook's
 * `withStorybook` (lite on-device UI, no websockets).
 *
 * @format
 */

const path = require('node:path');
const { exclusionList, makeMetroConfig, resolveUniqueModule } = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

// ensure regex paths are merged, normalized, use forward slashes and end with a /
function pathForRegex(...parts) {
  let result = path.normalize(path.join(...parts));
  if (!result.endsWith(path.sep)) {
    result += path.sep;
  }
  return result.replace(/[/\\]+/g, '/');
}

const excludeMixins = [];
const extraNodeModules = {};

function ensureUniqueModule(moduleName) {
  const [nmEntry, excludePattern] = resolveUniqueModule(moduleName);
  excludeMixins.push(excludePattern);
  extraNodeModules[moduleName] = nmEntry;
}

// build up the added excludes and extraNodeModules
['react-native-svg'].forEach((moduleName) => ensureUniqueModule(moduleName));

const blockList = exclusionList([
  // Exclude other test apps
  new RegExp(pathForRegex(__dirname, '../win32')),
  new RegExp(pathForRegex(__dirname, '../fluent-tester')),

  // Exclude build output directory
  new RegExp(pathForRegex(__dirname, 'dist')),

  ...excludeMixins,
]);

const symlinkResolver = MetroSymlinksResolver({
  resolver: 'oxc-resolver',
});

// Storybook 10 core is ESM-only and exposes its public API through subpath `exports`
// (e.g. `storybook/internal/preview-api`). The rnx-kit oxc symlink resolver can't resolve
// those subpath exports, so delegate storybook/@storybook/uuid to Metro's default resolver
// (which `withStorybook` primes with `unstable_enablePackageExports` + the `import`
// condition). Everything else keeps using the oxc symlink resolver for pnpm support.
function resolveRequest(context, moduleName, platform) {
  if (
    moduleName.startsWith('storybook') ||
    moduleName.startsWith('@storybook') ||
    moduleName === 'uuid' ||
    moduleName.startsWith('uuid/')
  ) {
    return context.resolveRequest(context, moduleName, platform);
  }
  return symlinkResolver(context, moduleName, platform);
}

const config = makeMetroConfig({
  resolver: {
    blockList,
    extraNodeModules,
    resolveRequest,
  },
  transformer: {
    // This transformer selects between the regular transformer and svg transformer depending on the file type
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
});

config.resolver.assetExts = [...config.resolver.assetExts.filter((ext) => ext !== 'svg'), 'ttf', 'otf', 'png'];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// `withStorybook` preserves the transformer/resolver above (it only adds
// `unstable_allowRequireContext` and wraps `resolveRequest`). Full on-device UI
// (@storybook/react-native-ui) — needs reanimated / gesture-handler / bottom-sheet.
// reanimated 3.10 is the last line supporting RN 0.74; its babel plugin's @babel/*
// lookups are satisfied via a packageExtensions entry in the root .yarnrc.yml.
module.exports = withStorybook(config, {
  configPath: path.resolve(__dirname, '.rnstorybook'),
  // Docs tooling pulls @storybook/react's docs preview annotations, which crash in the
  // RN runtime (parameters.docs is undefined). No docs UI on device, so disable it.
  docTools: false,
});
