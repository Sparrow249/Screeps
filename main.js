require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleCourier = require('role.courier');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function()  {
    var harvesterId;
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
        else if(Game.creeps[name].memory.role == 'harvester'){
           harvesterId = Game.creeps[name].id; 
        }
    }
    
    var harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var courierCount = _.sum(Game.creeps, (c) => c.memory.role == 'courier');
    var upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    
    if(Game.spawns["Spawn1"].room.energyAvailable >= 250){
        if(harvesterCount < 1){
            console.log("Spawn harvester");
            Game.spawns["Spawn1"].spawnHarvester(Game.spawns["Spawn1"].room.find(FIND_SOURCES)[0].id);
        }
        else if(courierCount < harvesterCount){
            console.log("Spawn courier");
            Game.spawns["Spawn1"].spawnCourier(Game.spawns["Spawn1"].id, harvesterId);
        }
        else if(upgraderCount < 1){
            console.log("Spawn upgrader");
            Game.spawns["Spawn1"].spawnUpgrader();
        }
        
    }
    
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
       
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'courier'){
            roleCourier.run(creep);
        }
        else if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
    }
}