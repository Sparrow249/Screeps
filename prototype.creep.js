var roleStarter = require('role.starter');
var roleHarvester = require('role.harvester');
var roleCourier = require('role.courier');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

//TODO: replace the creep when it dies and if necessary reset courier id

module.exports = function(){
    Creep.prototype.run = function() {
        switch(this.memory.role){
            case 'starter':
                roleStarter.run(this);
                break;
            case 'harvester':
                roleHarvester.run(this);
                break;
            case 'courier':
                roleCourier.run(this);
                break;
            case 'upgrader':
                roleUpgrader.run(this);
                break;
            case 'builder':
                roleBuilder.run(this);
                break;
            default:
                console.log("ERROR - unknown role: " + this.memory.role)
        }
    }
}
