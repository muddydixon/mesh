const NobleDevice = require("noble-device");
const MeshButton = require("./mesh-button");

module.exports = class Mesh {
  static discoverAll(onDiscover){
    MeshButton.discoverAll(onDiscover);
  }
  static stopDiscoverAll(onDiscover){
    MeshButton.stopDiscoverAll(onDiscover);
  }
};
