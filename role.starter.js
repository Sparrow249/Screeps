/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.starter');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /** @param {Creep} creep**/
    run: function(creep){
        if(creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.isWorking = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
	        creep.memory.isWorking = true;
	        creep.say('transfer');
	    }
	    
	    if(creep.memory.isWorking) {
	        var depot = Game.getObjectById(creep.memory.depot);
            if(creep.pos.isNearTo(depot)){
                creep.transfer(depot, RESOURCE_ENERGY);
            } else {
                creep.moveTo(depot);
            }
	    } else {
	        var source = Game.getObjectById(creep.memory.target);
            if(creep.pos.isNearTo(source)){
                creep.harvest(source);
            } else {
                creep.moveTo(source);
            }
	    }
    }
};