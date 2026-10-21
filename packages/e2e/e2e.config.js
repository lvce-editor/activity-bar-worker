import { defineConfig } from '@lvce-editor/test-with-playwright'

export default defineConfig({
  onlyExtension: '.',
  reusePage: true,
  testPath: '.',
})
