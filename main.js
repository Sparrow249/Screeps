require('prototype.spawn')();
require('prototype.creep')();
require('once-only.flags')();
var stateOne = require('state.one');
var stateTwo = require('state.two');

module.exports.loop = function()  {
    for(var name in Memory.creeps) {
        var creep = Game.creeps[name];
        if(!creep) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    for(var name in Memory.flags) {
        var flag = Game.flags[name];
        if(!flag) {
            delete Memory.flags[name];
            console.log('Clearing non-existing flag memory:', flag);
        }
    }
    if(!!Game.spawns["Spawn1"].spawning)
    {
        var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
        if(spawningCreep.memory.role == "harvester")
        {
            var joblessCouriers = _.filter(Game.creeps, (creep) => creep.memory.role == "courier" && !creep.memory.from && creep.memory.to == Game.spawns["Spawn1"].id);
            for(courier of joblessCouriers)
            {
              courier.memory.from = !!spawningCreep.memory.to ? spawningCreep.memory.to : spawningCreep.id;
              console.log(courier.name + " target reset to: "+courier.memory.from);
            }
        }
    }
    
    var state;
    switch(Game.spawns["Spawn1"].room.controller.level) {
        case 1: state = stateOne; break;
        case 2: state = stateTwo; break;
        default:
            state = stateOne;
    }
    state.createCreep();
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.run()
    }
}