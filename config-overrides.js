// https://github.com/timarney/react-app-rewired/issues/189

console.log("@@@@@@@@@@@@@@@@@@@@@@@");
console.log("@ using react-rewired @");
console.log("@@@@@@@@@@@@@@@@@@@@@@@");

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config
    console.log("@@@@@@@@@@@");
    console.log("@ webpack @");
    console.log("@@@@@@@@@@@");
    console.log({config, env});

    if (env === 'development') {
      const entryPoint = process.env.entryPoint;

      if (!entryPoint)
        throw new Error("missing required parameter process.env.entryPoint");

      config.entry = config.entry.replace(new RegExp("index.ts$"), entryPoint);
      console.log("entry point changed:", config.entry);
    }

    return config;
  },
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function(config) {
    // ...add your jest config customisation...
    // Example: enable/disable some tests based on environment variables in the .env file.
    // if (!config.testPathIgnorePatterns) {
    //     config.testPathIgnorePatterns = [];
    // }
    // if (!process.env.RUN_COMPONENT_TESTS) {
    //     config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
    // }
    // if (!process.env.RUN_REDUCER_TESTS) {
    //     config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
    // }
    return config;
  },
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function(configFunction) {
    console.log("@@@@@@@@@@@@@");
    console.log("@ devServer @");
    console.log("@@@@@@@@@@@@@");
    console.log({configFunction});
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      console.log("@@@@@@@@@@@@@@@@@@@@@@");
      console.log("@ devServer function @");
      console.log("@@@@@@@@@@@@@@@@@@@@@@");
      console.log({proxy, allowedHost, config});

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      // const fs = require('fs');
      // config.https = {
      //     key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
      //     cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
      //     ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
      //     passphrase: process.env.REACT_HTTPS_PASS
      // };

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function(paths, env) {
    // ...add your paths config

    console.log("@@@@@@@@@");
    console.log("@ paths @");
    console.log("@@@@@@@@@");
    console.log({paths, env});

    return paths;
  },
}