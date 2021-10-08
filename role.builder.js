var findNewProject = function(creep) {
	var structureList = _.filter(Game.spawns['Spawn1'].room.find(FIND_STRUCTURES), (s) => s.hits/s.hitsMax*100 < 50);
            if(structureList.length > 0) {
                creep.memory.to = structureList[0].id;
            }
            else{
				var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
				if(!!constructionSite) {
					creep.memory.to = constructionSite.id;
				}
            }
}

module.exports = {
     /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.isWorking = false;
            creep.say('harvest');
			creep.memory.from = Game.spawns['Spawn1'].id; 
	    }
	    if(!creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
	        creep.memory.isWorking = true;
	        creep.say('build');
			findNewProject(creep);
	    }

	    if(creep.memory.isWorking) {
	        var to = Game.getObjectById(creep.memory.to)
			if(!to){
				findNewProject(creep);
			}
	        if(creep.pos.isNearTo(to)){
	            creep.build(to);
				creep.repair(to);
            } else {
                creep.moveTo(to, {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	    else {
	        var from = Game.getObjectById(creep.memory.from)
	        if(creep.pos.isNearTo(from) && from.store[RESOURCE_ENERGY] == from.store.getCapacity(RESOURCE_ENERGY)){
	            creep.withdraw(from, RESOURCE_ENERGY);
            } else {
                creep.moveTo(from, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};