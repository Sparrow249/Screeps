module.exports = {
    getCreepList: function(role) {
        return _.filter(Game.creeps, (c) => c.memory.role == role);
    },

    findCreepWithoutCourierCount: function(creepList, courierList, courierCount) {
        return _.find(creepList, (creep) => {
            var couriers = _.filter(courierList, (courier) => courier.memory.from === creep.id 
            || courier.memory.from === creep.memory.to
            || courier.memory.to === creep.id
            || courier.memory.to === creep.memory.from);
            if(couriers.length < courierCount){
                return creep;
            }
        });
    },
    
    findObjectWithoutCreep: function(objectList, creepList){
        return _.find(objectList, (object) => {
            var creep = _.find(creepList, (c) => c.memory.from == object.id || c.memory.to == object.id);
            if(!creep){
                return object;
            }
        });
    }
};