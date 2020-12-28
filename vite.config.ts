import * as reactPlugin from 'vite-plugin-react'
import type { UserConfig } from 'vite'
import { resolve } from "path";

const path = require('path');

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}

const config: UserConfig = {
  jsx: 'react',
  plugins: [reactPlugin],
  optimizeDeps: {
    include: ["@ant-design/icons"],
  },
  alias: {
    '/@components/': path.resolve(__dirname, './src/components'),
    '/@lib/': path.resolve(__dirname, './src/lib')
  }
}

export default config
