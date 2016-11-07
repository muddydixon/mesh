const NobleDevice = require("noble-device");
const Mesh = require("./common");

const MESH_SERVICE_UUID     = "72c9000157a94d40b746534e22ec9f9e";
const MESH_NOTIFY_CHAR      = "72c9000357a94d40b746534e22ec9f9e";
const MESH_WRITE_NOREP_CHAR = "72c9000257a94d40b746534e22ec9f9e";
const MESH_INDICATE_CHAR    = "72c9000557a94d40b746534e22ec9f9e";
const MESH_WRITE_CHAR       = "72c9000457a94d40b746534e22ec9f9e";

class MeshButton extends Mesh {
  static is(peripheral){
    const localName = peripheral.advertisement.localName;
    if(!localName) return false;
    return (localName.indexOf("MESH-100BU") === 0);
  }

  constructor(peripheral){
    super(peripheral);
    console.log(this.constructor.name);
  }

  connectAndSetup(callback){
    super.connectAndSetup((err)=>{
      callback();
    });
  }

  enableButtonNotify(){
    return new Promise((resolve, reject)=>{
      console.log("enableButtonNotify");
      this.enableConfigCharacteristic(MESH_SERVICE_UUID, MESH_INDICATE_CHAR, (err)=>{
        if(err) return reject(err);
        return this.writeUInt32LECharacteristic(MESH_SERVICE_UUID, MESH_WRITE_CHAR, 0x00020103, (err)=>{
          if(err) return reject(err);
          return resolve();
        });
      });
    });
  }

  notifyButtonChange(){
    return new Promise((resolve, reject)=>{
      this.notifyCharacteristic(MESH_SERVICE_UUID, MESH_NOTIFY_CHAR, true, this.onButtonChange, (err)=>{
        if(err) return reject(err);
        return resolve();
      });
    });
  }

  onButtonChange(data){
    console.log(data);
  }
};

NobleDevice.Util.inherits(MeshButton, Mesh);
NobleDevice.Util.mixin(MeshButton, NobleDevice.BatteryService);
NobleDevice.Util.mixin(MeshButton, NobleDevice.DeviceInformationService);

module.exports = MeshButton;
