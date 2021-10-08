module.exports = {
    /** @param {Creep} creep**/
    run: function(creep){
        if(creep.memory.isWorking && creep.store[creep.memory.resource] === 0) {
            creep.memory.isWorking = false;
            creep.say('withdraw');
	    }
	    if(!creep.memory.isWorking && creep.store[creep.memory.resource] === creep.store.getCapacity()) {
	        creep.memory.isWorking = true;
	        creep.say('transfer');
	    }
        
        if(!creep.memory.to || !creep.memory.from){
            creep.say("❗");
        } else if(creep.memory.isWorking) {
            var to = Game.getObjectById(creep.memory.to)
            if(!!to){
                if(creep.pos.isNearTo(to) == false){
                    creep.moveTo(to);
                }
                creep.transfer(to, creep.memory.resource)
            }
            else {
                creep.memory.to = undefined;
            }
        } else {
            var from = Game.getObjectById(creep.memory.from)
            if(!!from) {
                if(creep.pos.isNearTo(from) == false){
                    creep.moveTo(from);
                }
                creep.withdraw(from, creep.memory.resource)
            }
            else {
                creep.memory.from = undefined;
            }
        }
    }
}