module.exports = {
    /** @param {Creep} creep**/
    run: function(creep){
        if(creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.isWorking = false;
            creep.say('withdraw');
	    }
	    if(!creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
	        creep.memory.isWorking = true;
	        creep.say('transfer');
	    }
        
        if(creep.memory.isWorking) {
            var target = Game.getObjectById(creep.memory.target)
            if(creep.pos.isNearTo(target)){
                creep.transfer(target, RESOURCE_ENERGY)
            }
            else{
                creep.moveTo(target);
            }
        } else {
            var depot = Game.getObjectById(creep.memory.depot)
            if(creep.pos.isNearTo(depot) == false){
                creep.moveTo(depot);
            }
            if(depot != null){
                creep.withdraw(depot, RESOURCE_ENERGY)
            }
        }
    }
}