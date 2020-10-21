module.exports = {
    /** @param {Creep} creep**/
    run: function(creep){
		var source = Game.getObjectById(creep.memory.target);

		//when spawned, move to source
		if(creep.memory.setUp == false){
			creep.moveTo(source);
			creep.say("🏁");
			if(creep.pos.isNearTo(source)){
			    creep.memory.setUp = true;
			}
		}
		else{
			//when not full energy harvest
			if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){	
			    creep.harvest(source);
			}
			//when full energy transfer energy to storage or when no storage nearby wait for courier and transfer
			if(creep.memory.depot == 'null'){
			    var nearbyCourier = _.find(Game.creeps, (c) => c.memory.role == 'courier' && creep.pos.isNearTo(c.pos))
			    if(!!nearbyCourier){
    				creep.transfer(nearbyCourier, RESOURCE_ENERGY);						
    			}
    			creep.say("❗");
			}
			else{
				var depot = Game.getObjectById(creep.memory.depot);
				creep.transfer(depot, RESOURCE_ENERGY);
			}
		}
    }
}