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
            creep.say('Get Energy');
	    }
	    if(!creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
	        creep.memory.isWorking = true;
	        creep.say('Transfer Energy');
	    }
	    
	    if(creep.memory.isWorking) {
	        var to = Game.getObjectById(creep.memory.to);
            if(creep.pos.isNearTo(to)){
                if(to instanceof StructureController){
                    creep.upgradeController(to);
                }
                else{
                    creep.transfer(to, RESOURCE_ENERGY);
                }
            } else {
                creep.moveTo(to);
            }
	    } else {
	        var from = Game.getObjectById(creep.memory.from);
            if(creep.pos.isNearTo(from)){
                if(from instanceof Source){
                    creep.harvest(from);
                } else {
                    creep.withdraw(from, RESOURCE_ENERGY)
                }
            } else {
                creep.moveTo(from);
            }
	    }
    }
};