let fs = require('fs');
let path = require('path');

function BuildManifestPlugin() {};

BuildManifestPlugin.prototype.apply = function(compiler) {
    // console.log('triggered');
    compiler.plugin('done', this.writeManifest);
};

BuildManifestPlugin.prototype.writeManifest = function(stats) {
    fs.writeFileSync(
        path.resolve('dist/manifest.json'),
        JSON.stringify(stats.toJson().assetsByChunkName)
    );
};

module.exports = BuildManifestPlugin;