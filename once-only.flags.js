/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Flags');
 * mod.thing == 'a thing'; // true
 */

var findBestNearPosition = function(nearObject, closestToObject){
    position = nearObject.pos;
    area = Game.spawns["Spawn1"].room.lookAtArea(position.y-1,position.x-1,position.y+1,position.x+1, true);
    var optionList = _.filter(area, (option) => option.type === LOOK_TERRAIN && option[option.type] === 'plain');
    var bestOption = _.min(optionList, (option) => closestToObject.pos.findPathTo(option.x, option.y, null).length);
    return new RoomPosition(bestOption.x, bestOption.y, Game.spawns["Spawn1"].room.name)
}

//TODO: no flags, but on level change place constructionSites (multiple harvester location per container)
//determine harvester location based on container/source locations
module.exports = function() {
    //TODO: run per stage when stage is entered.
    var spawn = Game.spawns["Spawn1"];
    var controller = spawn.room.controller;
    var sourceList = spawn.room.find(FIND_SOURCES);

    var containerCount = spawn.room.find(FIND_CONSTRUCTION_SITES, {filter:(x)=> x.structureType == STRUCTURE_CONTAINER}).length 
    + spawn.room.find(FIND_STRUCTURES, {filter: (x) => x.structureType == STRUCTURE_CONTAINER}).length;

    if(containerCount < sourceList.length + 1) {
        //Harvesters
        for(var source of sourceList) {
            var harvestPos = findBestNearPosition(source, spawn);
            var path = spawn.pos.findPathTo(harvestPos);
    
            var containerPos = spawn.room.gerPositionAt(path[path.length-2].x, path[path.length-2].y);
            
            harvestPos.createFlag("harvester"+source.id, COLOR_RED);
            containerPos.createFlag("container"+source.id, COLOR_BLUE);
        }
    
        //Upgrader
        var upgradePos = findBestNearPosition(controller, spawn);
        var path = spawn.pos.findPathTo(upgradePos);
    
        var containerPos = spawn.room.gerPositionAt(path[path.length-2].x, path[path.length-2].y);
        
        upgradePos.createFlag("upgrader"+controller.id, COLOR_YELLOW);
        containerPos.createFlag("container"+controller.id, COLOR_BLUE);
    }
};