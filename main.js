require('prototype.spawn')();
require('prototype.creep')();
var stateOne = require('state.one');

module.exports.loop = function()  {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var state;
    switch(Game.spawns["Spawn1"].room.controller.level) {
        case 1: state = stateOne; break;
        default:
            state = stateOne;
    }
    state.createCreep();
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.run()
    }
}