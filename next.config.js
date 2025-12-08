const NextFederationPlugin = require('@module-federation/nextjs-mf');

// Remote URLs - can be configured via environment variables
const getRemoteUrl = (name, defaultPort) => {
  const envVar = `REMOTE_${name.toUpperCase()}_URL`;
  return process.env[envVar] || `http://localhost:${defaultPort}/_next/static/chunks/remoteEntry.js`;
};

module.exports = {
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        remotes: {
          'dashboard-ui': `dashboard_ui@${getRemoteUrl('dashboard-ui', 3001)}`,
          'training-ui': `training_ui@${getRemoteUrl('training-ui', 3002)}`,
          '1v1-ui': `1v1_ui@${getRemoteUrl('1v1-ui', 3003)}`,
          'playground-ui': `playground_ui@${getRemoteUrl('playground-ui', 3004)}`,
          'signup-builder-ui': `signup_builder_ui@${getRemoteUrl('signup-builder-ui', 3005)}`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );
    return config;
  },
};

