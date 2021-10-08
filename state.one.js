/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('state.one');
 * mod.thing == 'a thing'; // true
 */
var state = require('state');
var upgraderLimit = 2;

module.exports = {...state,
    createCreep: function(){
        var spawn = Game.spawns["Spawn1"];
        var controller = spawn.room.controller;
        var sourceList = spawn.room.find(FIND_SOURCES);
        var starterHarvesterList = _.filter(Game.creeps, (c) => c.memory.role == 'starter' && c.memory.to == spawn.id);
        var starterUpgraderList = _.filter(Game.creeps, (c) => c.memory.role == 'starter' && c.memory.to == controller.id);
        
        if(spawn.room.energyAvailable >= 250){
            if(starterHarvesterList.length < sourceList.length){
                for(source of sourceList){
                    var starter = _.find(starterHarvesterList, (s) => s.memory.from == source.id);
                    if(!starter){
                        spawn.spawnStarter(source.id, spawn.id);
                    }
                }
            }       
            else if(starterUpgraderList.length < upgraderLimit){
                spawn.spawnStarter(spawn.id, controller.id);
            }
        } 
    }
}

