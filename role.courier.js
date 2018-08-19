var roleCourier ={
    /** @param {Creep} creep**/
    run: function(creep){
        //when no energy go withdraw energy from storage
        if(creep.carry.energy == 0){
            var depot = Game.getObjectById(creep.memory.depot)
            if(creep.pos.isNearTo(depot) == false){
                creep.moveTo(depot);
            }
            if(depot != null && !depot.isPrototypeOf("Creep")){
                creep.withdraw(depot, RESOURCE_ENERGY)
            }
        }
        
        //tranfer energy to target
        else{
            var target = Game.getObjectById(creep.memory.target)
            if(creep.pos.isNearTo(target)){
                creep.transfer(target, RESOURCE_ENERGY)
            }
            else{
                creep.moveTo(target);
            }
        }
    }
}

module.exports = roleCourier