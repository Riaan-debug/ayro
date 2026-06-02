import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const port = process.env.AYRO_DEV_PORT ?? '3056'

for (const file of ['.env.development.local', '.env.local', '.env']) {
  if (existsSync(file)) {
    process.loadEnvFile(file)
  }
}

const result = spawnSync('npx', ['vercel', 'dev', '--listen', port], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
})

process.exit(result.status ?? 1)
