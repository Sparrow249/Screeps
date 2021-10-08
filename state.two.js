/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.one');
 * mod.thing == 'a thing'; // true
 */
var state = require('state');
var creepManager = require('manager.creep');
var roomManager = require('manager.room');
var creepCourierLimit = 2;
var builderLimit = 2;
var upgraderLimit = 2;

module.exports = {...state,
    createCreep: function(){
        var spawn = Game.spawns["Spawn1"];
        var sourceList = spawn.room.find(FIND_SOURCES);
        var harvesterList = creepManager.getCreepList('harvester');
        var courierList = creepManager.getCreepList('courier');
        var upgraderList = creepManager.getCreepList('upgrader');
        var builderList = creepManager.getCreepList('builder');

        containerFlagList = _.filter(spawn.room.find(FIND_FLAGS), (flag) => flag.color == COLOR_BLUE);

        for(var flag of containerFlagList){
            flag.pos.createConstructionSite(STRUCTURE_CONTAINER);
            flag.remove();
        }
        
        if(spawn.room.energyAvailable >= 300){
            var harvester = creepManager.findCreepWithoutCourierCount(harvesterList, courierList, creepCourierLimit);
            if(!!harvester){
                var fromId = !harvester.memory.to ? harvester.id : harvester.memory.to;
                console.log("Spawn courier for harvester " + harvester.name);
                spawn.spawnCourier(fromId, spawn.id, RESOURCE_ENERGY);
            }
            else if(harvesterList.length < sourceList.length){
                var emptySource = creepManager.findObjectWithoutCreep(sourceList, harvesterList);
                spawn.spawnHarvester(emptySource.id, 
                    roomManager.getContainerNearObject(emptySource).id,
                    roomManager.getSetupPosition(emptySource));
            }
            else if(courierList.length < (harvesterList.length*creepCourierLimit) + creepCourierLimit){
                var upgrader = creepManager.findCreepWithoutCourierCount(upgraderList, courierList, creepCourierLimit);
                if(!!upgrader) {
                    var toId = !upgrader.memory.from ? upgrader.id : upgrader.memory.from;
                    console.log("Spawn courier for upgrader " + upgrader.name);
                    spawn.spawnCourier(spawn.id, toId, RESOURCE_ENERGY);
                }
            }
            else if(upgraderList.length < upgraderLimit){
                spawn.spawnUpgrader(roomManager.getContainerNearObject(spawn.room.controller).id, 
                    spawn.room.controller.id, 
                    roomManager.getSetupPosition(spawn.room.controller));
            }
            else if(builderList.length < builderLimit){
                spawn.spawnBuilder();
            }
        } 
    }
}

