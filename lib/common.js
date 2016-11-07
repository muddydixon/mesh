const NobleDevice = require("noble-device");

class Mesh {
  constructor(peripheral){
    NobleDevice.call(this, peripheral);
  }
  enableConfigCharacteristic(serviceUuid, characteristicUuid, callback){
    this.writeUInt8Characteristic(serviceUuid, characteristicUuid, 0x01, callback);
  }
};

NobleDevice.Util.inherits(Mesh, NobleDevice);
NobleDevice.Util.mixin(Mesh, NobleDevice.BatteryService);
NobleDevice.Util.mixin(Mesh, NobleDevice.DeviceInformationService);

module.exports = Mesh;
