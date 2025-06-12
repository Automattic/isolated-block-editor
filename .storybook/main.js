module.exports = {
  stories: [ '../src/**/*.stories.*', '../stories/**/*.stories.*' ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/preset-scss',
    '@storybook/addon-mdx-gfm'
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: ( prop ) => ( prop.parent ? !/node_modules/.test( prop.parent.fileName ) : true ),
    },
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  },
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  }
};