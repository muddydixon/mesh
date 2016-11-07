const co = require("co");
const Mesh = require("./lib/mesh");

Mesh.discoverAll((mesh)=>{
  console.log(`discovered ${mesh.constructor.name}(${mesh})`);
  mesh.connectAndSetup((err)=>{
    // enable/set/notify
    co(function*(){
      yield mesh.enableButtonNotify();
      yield mesh.notifyButtonChange();
      mesh.on("data", (data)=>{
        console.log(data);
      });
    });
  });
});
