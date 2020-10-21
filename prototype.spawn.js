module.exports = function(){
    if(!Memory.creepCount){
        Memory.creepCount = 0;
    }
    
    StructureSpawn.prototype.spawnStarter = function(targetId) {
        var depotId = this;
        
        this.spawnCreep(
            [WORK, CARRY, MOVE, MOVE], 
            "starter"+Memory.creepCount,
            {memory:{
                role: "starter",
                target: targetId,
                depot: depotId,
                isWorking: false
                }
            }
        )
        Memory.creepCount++;
    }

    
    StructureSpawn.prototype.spawnHarvester = function(targetId) {
        var depotId = 'null'
        
        // if storage near source exists set it as depot
        var depot = Game.getObjectById(targetId).pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});
        
        if(depot != null){
            depotId = depot.id;
        }
        
        this.spawnCreep(
            [WORK, WORK, CARRY, MOVE], 
            "harvester"+Memory.creepCount,
            {memory:{
                role: "harvester",
                setUp: false,
                target: targetId,
                depot: depotId
                }
            }
        )
        Memory.creepCount++;
    }
    
    StructureSpawn.prototype.spawnCourier = function(targetId, depotId) {
        this.spawnCreep(
            [CARRY, MOVE, MOVE, MOVE], 
            "courier"+Memory.creepCount,
            {memory:{
                role: "courier",
                target: targetId,
                depot: depotId,
                isWorking: false
                }
            }
        )
        Memory.creepCount++;
    }
    
    StructureSpawn.prototype.spawnUpgrader = function() {
        var targetId = this.room.controller.id;
        
        this.spawnCreep(
            [WORK, WORK, CARRY, MOVE], 
            "upgrader"+Memory.creepCount,
            {memory:{
                role: "upgrader",
                setUp: false,
                target: targetId
                }
            }
        )
        Memory.creepCount++;
    }
    
    StructureSpawn.prototype.spawnBuilder = function(targetId) {
        this.spawnCreep(
            [WORK, CARRY, MOVE, MOVE], 
            "builder"+Memory.creepCount,
            {memory:{
                role: "builder",
                isWorking: false
                }
            }
        )
        Memory.creepCount++;
    }
};