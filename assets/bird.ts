// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Bow from "./bow";
import ShootBirdConfig from "./shootbirdConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    minx: number = -700;
    maxx: number = 700;
    miny: number = -100;
    maxy: number = 800;
    speed: number = 600;
    protected start(): void {
        this.speed = ShootBirdConfig.birdSpeed;
    }
    update (dt) {
        // let velocity = this.node.getComponent(cc.RigidBody).linearVelocity;
        // if(this.node.x <= this.minx)
        // {
        //     velocity = cc.v2(this.getRandomInt(200,ShootBirdConfig.birdSpeed),velocity.y);
        //     this.node.scaleX = -1;this.node.angle = -this.node.angle
        // }
        // if(this.node.x >= this.maxx)
        // {
        //     velocity = cc.v2(-this.getRandomInt(200,ShootBirdConfig.birdSpeed),velocity.y);
        //     this.node.scaleX = 1; this.node.angle = -this.node.angle
        // }
        // if(this.node.y <= this.miny)
        // {
        //     velocity = cc.v2(velocity.x, this.getRandomInt(100,ShootBirdConfig.birdSpeed));
        //     if(this.node.scaleX == 1) this.node.angle = -29; else this.node.angle = 29;
        // }
        // if(this.node.y >= this.maxy)
        // {
        //     velocity = cc.v2(velocity.x, -this.getRandomInt(100,ShootBirdConfig.birdSpeed));
        //     this.node.angle = 0;
        // }
        // this.node.getComponent(cc.RigidBody).linearVelocity = velocity;

        
    }
    onBeginContact(contact, selfCollider:cc.BoxCollider, otherCollider:cc.BoxCollider)
    {
        if(otherCollider.tag != 1)
        {
            this.node.destroy();
            Bow.birdOnScreen--;
            ShootBirdConfig.birdCount--;
        }
        
        
    }

    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    
}
