const path = require('path');

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(p => path.resolve(p));

function resolveApp(relativePath) {
  return path.resolve(relativePath);
}

const src = resolveApp('src');
const appSrc = path.join(src, 'app');
const sandboxSrc = path.join(src, 'sandbox');

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'),
  appHtml: path.join(appSrc, 'index.html'),
  sandboxHtml: path.join(sandboxSrc, 'index.html'),
  appPackageJson: resolveApp('package.json'),
  src,
  appSrc,
  sandboxSrc,
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  nodePaths,
};
