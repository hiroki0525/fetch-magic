import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" assert { type: 'json' };
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "umd",
      sourcemap: true,
      name: "lib",
      compact: true,
    },
  ],
  external: Object.keys(packageJson.dependencies),
  plugins: [commonjs(), typescript(), nodeResolve(), terser()],
};
