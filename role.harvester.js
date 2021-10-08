module.exports = {
    /** @param {Creep} creep**/
    run: function(creep){
		var source = Game.getObjectById(creep.memory.from);
		if(!creep.memory.setUp) {
			creep.memory.setUp = _.find(Game.flags, (flag)=> flag.color == COLOR_RED && flag.pos.inRangeTo(source,2)).pos;
		}
		
		//when spawned, move to source
		if(!creep.pos.isEqualTo(creep.memory.setUp.x, creep.memory.setUp.y)){
			creep.moveTo(creep.memory.setUp.x, creep.memory.setUp.y);
			creep.say("🏁");
		}
		else{
			//when not full energy harvest
			if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){	
			    creep.harvest(source);
			}
			//when full energy transfer energy to storage or when no storage nearby wait for courier and transfer
			if(!creep.memory.to){
			    var nearbyCourier = _.find(Game.creeps, (c) => c.memory.role == 'courier' && creep.pos.isNearTo(c.pos))
			    if(!!nearbyCourier){
    				creep.transfer(nearbyCourier, RESOURCE_ENERGY);	
    			}
    			creep.say("❗");
			}
			else{
				var to = Game.getObjectById(creep.memory.to);
				creep.transfer(to, RESOURCE_ENERGY);
			}
		}
    }
}