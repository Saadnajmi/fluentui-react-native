/**
 * Smoke tests for the Storybook app.
 *
 * These validate the Storybook configuration and that every story file is well-formed
 * CSF (a default export with a `title` plus at least one named story export). Rendering
 * of the actual FURN controls is exercised end-to-end by the metro bundle and the native
 * app — importing FURN component *source* under jest is intentionally avoided here (in
 * this monorepo those packages resolve to TypeScript source, which the app's jest preset
 * does not transform the same way metro does).
 */
import * as fs from 'fs';
import * as path from 'path';

import main from '../.rnstorybook/main';

const storiesDir = path.join(__dirname, '..', 'stories');

describe('storybook config', () => {
  it('declares a stories glob', () => {
    expect(Array.isArray(main.stories)).toBe(true);
    expect(main.stories.length).toBeGreaterThan(0);
  });

  it('omits on-device addon panels (incompatible with lite mode)', () => {
    expect(main.deviceAddons ?? []).toEqual([]);
  });
});

describe('stories', () => {
  const storyFiles = fs.readdirSync(storiesDir).filter((file) => file.endsWith('.stories.tsx'));

  it('has story files', () => {
    expect(storyFiles.length).toBeGreaterThan(0);
  });

  it.each(storyFiles)('%s is well-formed CSF', (file) => {
    const source = fs.readFileSync(path.join(storiesDir, file), 'utf8');
    // default export (the meta) with a title
    expect(source).toMatch(/export default \w+/);
    expect(source).toMatch(/title:\s*['"][^'"]+['"]/);
    // at least one named story export
    expect(source).toMatch(/export const \w+/);
  });
});
