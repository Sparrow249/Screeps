module.exports = {
    /** @param {Creep} creep**/
    run: function(creep){
        var target = Game.getObjectById(creep.memory.target);
        
        //when spawned, move to source
		if(creep.memory.setUp === false){
			creep.moveTo(target);
			creep.say("🏁");
			if(creep.pos.isNearTo(target)){
			    creep.memory.setUp = true;
			}
		}
        else if(creep.store[RESOURCE_ENERGY] > 0){
            creep.upgradeController(target);
        }
        else{
            creep.say("❗");
        }
    }
}
