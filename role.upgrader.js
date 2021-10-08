module.exports = {
    /** @param {Creep} creep**/
    run: function(creep){
        var to = Game.getObjectById(creep.memory.to);
        if(!creep.memory.setUp) {
			creep.memory.setUp = _.find(Game.flags, (flag)=> flag.color == COLOR_YELLOW && flag.pos.inRangeTo(to,2)).pos;
		}
        
		if(!creep.pos.isEqualTo(creep.memory.setUp.x, creep.memory.setUp.y)){
			creep.moveTo(creep.memory.setUp.x, creep.memory.setUp.y);
			creep.say("🏁");
		} else{
            if(creep.store[RESOURCE_ENERGY] > 0){
                creep.upgradeController(to);
            }
            if(!creep.memory.from) {
                creep.say("❗");
            }
            else{
                var from = Game.getObjectById(creep.memory.from);
                creep.withdraw(from, RESOURCE_ENERGY);
            }
        }
    }
}
