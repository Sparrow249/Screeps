var roleHarvester ={
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
			if(creep.carry.energy < creep.carryCapacity){	
				creep.harvest(source);
			}
			//when full energy transfer energy to storage or when no storage nearby wait for courier and transfer
			else if(creep.memory.depot == 'null'){
				for(var name in Game.creeps){
					var creep2 = Game.creeps[name];
					if(creep2.memory.role == 'courier' && creep.pos.isNearTo(creep2.pos)){
						creep.transfer(creep2, RESOURCE_ENERGY);						
					}
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

module.exports = roleHarvester