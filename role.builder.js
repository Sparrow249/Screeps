module.exports = {
     /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.isWorking = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
	        creep.memory.isWorking = true;
	        creep.say('build');
	    }

	    if(creep.memory.isWorking) {
	        if(!creep.memory.target) {
	            creep.memory.target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES).id;
	        }
	        var target = Game.getObjectById(creep.memory.target)
	        if(creep.pos.isNearTo(target)){
	            creep.build(target);
            } else {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	    else {
	       // if(!creep.memory.depot){
	            creep.memory.depot = creep.pos.findClosestByPath(FIND_SOURCES).id;
	       // }
	        var depot = Game.getObjectById(creep.memory.depot)
	        if(creep.pos.isNearTo(depot)){
	            creep.harvest(depot);
	            creep.withdraw(depot);
            } else {
                creep.moveTo(depot, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};