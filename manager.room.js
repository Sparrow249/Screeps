var room = Game.spawns["Spawn1"].room;
module.exports = {
    getSetupPosition: function(target){
        //TODO: remove flag option!
        var containerPosition = this.getContainerNearObject(target).pos 
            || target.findInRange(FIND_FLAGS,2,{filter: (f)=>f.color = COLOR_BLUE})[0].pos
        
        var possibleLocations = _.filter(room.lookForAtArea(LOOK_TERRAIN, 
            Math.min(target.pos.y, containerPosition.y),
            Math.min(target.pos.x, containerPosition.x),
            Math.max(target.pos.y, containerPosition.y),
            Math.max(target.pos.x, containerPosition.x),
            true), (a => {
                position = room.getPositionAt(a.x, a.y);
                return a.terrain != "wall" 
                && position.isNearTo(target.pos)
                && position.isNearTo(containerPosition)
                && !position.isEqualTo(target.pos)
                && !position.isEqualTo(containerPosition)
            }));
        
        if(possibleLocations.length = 1) {
            return room.getPositionAt(possibleLocations[0].x, possibleLocations[0].y);
        }    

        //TODO fix unusedLocations
        var unusedLocations = _.find(possibleLocations, (l) => !_.find(Game.creeps, (c) => c.memory.setUp.isEqualTo(l.x, l.y)))
        
        if(unusedLocations > 0) {
            return unusedLocations[0]
        }
        
        return undefined;
    },

    getContainerNearObject: function(target){
        var containerList = target.pos.findInRange(FIND_STRUCTURES, 2, {filter: (s) => s.structureType == STRUCTURE_CONTAINER})
        return containerList[0];
    }
};