/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.one');
 * mod.thing == 'a thing'; // true
 */
var state = require('state');

var findCreepWithoutCourier = function(creepList, courierList){
    return _.find(creepList, (cr) => {
        var courier = _.find(courierList, (c) => c.memory.depot === cr.id || c.memory.target === cr.id);
        console.log("harvester " + cr.name + " has courier " + courier);
        if(!courier){
            return cr;
        }
    });
}

module.exports = {...state,
    createCreep: function(){
        var harvesterList = _.filter(Game.creeps, (c) => c.memory.role == 'harvester');
        var courierList = _.filter(Game.creeps, (c) => c.memory.role == 'courier');
        var upgraderList = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader');
        var builderList = _.filter(Game.creeps, (c) => c.memory.role == 'builder');
        
        if(Game.spawns["Spawn1"].room.energyAvailable >= 250){
            if(Game.creeps.length === 0){
                console.log("Spawn starter");
                Game.spawns["Spawn1"].spawnStarter(Game.spawns["Spawn1"].room.find(FIND_SOURCES)[0].id);
            }
            else if(harvesterList.length < 1){
                console.log("Spawn harvester");
                Game.spawns["Spawn1"].spawnHarvester(Game.spawns["Spawn1"].room.find(FIND_SOURCES)[0].id);
            }
            else if(courierList.length < harvesterList.length + upgraderList.length){
                var harvester = findCreepWithoutCourier(harvesterList, courierList);
                if(!!harvester){
                    console.log("Spawn courier for harvester " + harvester.name);
                    Game.spawns["Spawn1"].spawnCourier(Game.spawns["Spawn1"].id, harvester.id);
                } else {
                    var upgrader = findCreepWithoutCourier(upgraderList, courierList);
                    console.log("Spawn courier for upgrader " + upgrader.name);
                    Game.spawns["Spawn1"].spawnCourier(upgrader.id, Game.spawns["Spawn1"].id);
                }
            }
            else if(upgraderList.length < 1){
                console.log("Spawn upgrader");
                Game.spawns["Spawn1"].spawnUpgrader();
            }
            else if(builderList.length < 3){
                console.log("Spawn builder");
                Game.spawns["Spawn1"].spawnBuilder();
            }
        } 
    }
}

