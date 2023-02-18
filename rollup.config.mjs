import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import tsConfigJson from './tsconfig.json' assert { type: 'json' };

const outputBaseDir = 'dist'
const outputBaseFileName = 'index'
const outputFormats = ['cjs', 'umd', 'es'];
const outputEnvironments = ['production', 'development']
const outputFormatsMap =  Object.fromEntries(outputEnvironments.map(environment => {
  return [environment, Object.fromEntries(outputFormats.map(format => {
    const environmentSuffix = environment === 'production' ? '' : `.${environment}`
    const outputFileName = `${outputBaseFileName}.${format}${environmentSuffix}.js`
    return [format, `${outputBaseDir}/${outputFileName}`]
  }))]
}))
const commonPlugins = [commonjs(), nodeResolve()]
const commonExternals = ['cross-fetch']
const commonName = 'fetchMagic'

const buildTsConfig = ({ format, sourceMap }) => {
  const extraConfig =
      format === 'umd'
          ? { compilerOptions: { target: 'es5', sourceMap } }
          : { compilerOptions: { sourceMap } };
  return typescript({ ...tsConfigJson, ...extraConfig });
};

const productionConfigs = outputFormats.map(format => ({
  input: 'src/index.ts',
  output: [
    {
      file: outputFormatsMap['production'][format],
      format,
      sourcemap: tsConfigJson.compilerOptions.sourceMap,
      name: commonName,
      compact: true,
    },
  ],
  external: commonExternals,
  plugins: [
    ...commonPlugins,
    buildTsConfig({
      format,
      sourceMap: tsConfigJson.compilerOptions.sourceMap,
    }),
    terser(),
  ],
}));

const developmentConfigs = outputFormats.map(format => ({
  input: 'src/index.ts',
  output: [
    {
      file: outputFormatsMap['development'][format],
      format,
      name: commonName,
    },
  ],
  external: commonExternals,
  plugins: [...commonPlugins, buildTsConfig({ format, sourceMap: false })],
}));

export default [
  ...productionConfigs,
  ...developmentConfigs,
];
