import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The vendored motion-primitives and the theme switch set state on mount
    // on purpose (portal and next-themes hydration guards).
    files: [
      'app/footer.tsx',
      'components/ui/animated-background.tsx',
      'components/ui/magnetic.tsx',
      'components/ui/morphing-dialog.tsx',
    ],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', '.wrangler/**', 'next-env.d.ts']),
])
