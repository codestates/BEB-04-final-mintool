module.exports = {
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = {
        crypto: false,
        fs: false,
        http: false,
        https: false,
        stream: false,
      };
  
      return config;
    },
  };