module.exports = function(){    
    StructureSpawn.prototype.spawnStarter = function(fromId, toId) {
        console.log("Spawn starter");
        
        this.spawnCreep(
            [WORK, CARRY, MOVE, MOVE], 
            "starter"+Date.now(),
            {memory:{
                role: "starter",
                from: fromId,
                to: toId,
                isWorking: false
                }
            }
        )
    }

    
    StructureSpawn.prototype.spawnHarvester = function(fromId, toId, setUp) {
        console.log("Spawn harvester");

        this.spawnCreep(
            [WORK, WORK, CARRY, MOVE], 
            "harvester"+Date.now(),
            {memory:{
                role: "harvester",
                from: fromId,
                to: toId,
                setUp: setUp
                }
            }
        )
    }
    
    StructureSpawn.prototype.spawnCourier = function(fromId, toId, resource) {
        console.log("Spawn courier");
        this.spawnCreep(
            [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 
            "courier"+Date.now(),
            {memory:{
                role: "courier",
                from: fromId,
                to: toId,
                isWorking: false,
                resource: resource
                }
            }
        )
    }
    
    StructureSpawn.prototype.spawnUpgrader = function(fromId, toId, setUp) {
        console.log("Spawn upgrader");
        
        this.spawnCreep(
            [WORK, WORK, CARRY, MOVE], 
            "upgrader"+Date.now(),
            {memory:{
                role: "upgrader",
                from: fromId,
                to: toId,
                setUp: setUp
                }
            }
        )
    }
    
    StructureSpawn.prototype.spawnBuilder = function(fromId) {
        console.log("Spawn builder");
        this.spawnCreep(
            [WORK, CARRY, MOVE, MOVE], 
            "builder"+Date.now(),
            {memory:{
                role: "builder",
                isWorking: false,
                from: Game.spawns['Spawn1'].id
                }
            }
        )
    }
};