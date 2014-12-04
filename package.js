Package.describe({
  "summary": "Expose some underline collection apis",
  "version": "1.1.0",
  "git": "https://github.com/meteorhacks/meteor-collection-utils.git",
  "name": "meteorhacks:collection-utils"
});

Package.onUse(function(api) {
  configurePackage(api);
});

Package.onTest(function(api) {
  configurePackage(api);
  api.use([
    'tinytest', 'accounts-password'
  ], ['server']);

  // common before
  api.addFiles([
    'test.js'
  ], ['server']);
});

function configurePackage(api) {
  api.versionsFrom('METEOR@0.9.1');
  api.use(['mongo-livedata'], ['server']);

  // common before
  api.addFiles([
    'index.js',
  ], ['server']);
}
