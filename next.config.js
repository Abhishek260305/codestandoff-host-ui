const NextFederationPlugin = require('@module-federation/nextjs-mf');
const webpack = require('webpack');
const path = require('path');

// Remote URLs - can be configured via environment variables
const getRemoteUrl = (name, defaultPort) => {
  const envVar = `REMOTE_${name.toUpperCase()}_URL`;
  return process.env[envVar] || `http://localhost:${defaultPort}/_next/static/chunks/remoteEntry.js`;
};

module.exports = {
  webpack: (config, options) => {
    const { isServer } = options;
    
    if (!isServer) {
      // Apply Module Federation plugin FIRST (before externals configuration)
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          remotes: {
            'dashboard-ui': `dashboard_ui@${getRemoteUrl('dashboard-ui', 3001)}`,
            'training-ui': `training_ui@${getRemoteUrl('training-ui', 3002)}`,
            'onevone-ui': `onevone_ui@${getRemoteUrl('onevone-ui', 3003)}`,
            'playground-ui': `playground_ui@${getRemoteUrl('playground-ui', 3004)}`,
            'signup-builder-ui': `signup_builder_ui@${getRemoteUrl('signup-builder-ui', 3005)}`,
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {},
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
              eager: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
              eager: false,
            },
          },
        })
      );
      
      // PERMANENT FIX: Suppress webpack build warnings for Module Federation remotes
      // They are loaded at runtime by Module Federation, not at build time
      // The build may show warnings but won't fail - remotes load correctly at runtime
      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        { module: /dashboard-ui/ },
        { module: /training-ui/ },
        { module: /onevone-ui/ },
        { module: /playground-ui/ },
        { module: /signup-builder-ui/ },
      ];
      
      // Suppress specific "Module not found" errors for Module Federation remotes
      // These are expected - Module Federation loads them at runtime
      const originalOnError = config.infrastructureLogging?.level;
      if (config.infrastructureLogging) {
        config.infrastructureLogging.level = 'error'; // Only show errors, not warnings
      }
    }
    
    return config;
  },
};

