module.exports = function(){
    Memory.creepCount++;
    
    StructureSpawn.prototype.spawnHarvester = function(targetId) {
        var depotId = 'null'
        
        // if storage near source exists set it as depot
        var depot = Game.getObjectById(targetId).pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER});
        
        if(depot != null){
            depotId = depot.id;
        }
        
        Game.spawns["Spawn1"].spawnCreep(
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
    }
    
    StructureSpawn.prototype.spawnCourier = function(targetId, depotId) {
        Game.spawns["Spawn1"].spawnCreep(
            [CARRY, MOVE, MOVE, MOVE], 
            "courier"+Memory.creepCount,
            {memory:{
                role: "courier",
                target: targetId,
                depot: depotId
                }
            }
        )
    }
    
    StructureSpawn.prototype.spawnUpgrader = function() {
        var targetId = Game.spawns["Spawn1"].room.controller.id;
        
        Game.spawns["Spawn1"].spawnCreep(
            [WORK, WORK, CARRY, MOVE], 
            "upgrader"+Memory.creepCount,
            {memory:{
                role: "upgrader",
                setUp: false,
                target: targetId
                }
            }
        )
    }
};