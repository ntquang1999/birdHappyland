// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Spawner from "./BirdSpawnerGame";
import Bow from "./bow";
import ShootBirdConfig from "./shootbirdConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BirdGift extends cc.Component {

    @property(cc.Node)
    birdSprite: cc.Node = null;

    lastPosition = cc.v2(0,0);

    isLeftToRight: boolean = true;

    hitpoint = 3;


    protected start(): void {
        this.lastPosition.x = this.node.x;
        this.lastPosition.y = this.node.y;
    }


    update (dt) {
        let rad = Math.atan2(this.node.y - this.lastPosition.y,this.node.x - this.lastPosition.x);
        if(this.isLeftToRight)
            this.node.angle = 160+cc.misc.radiansToDegrees(rad); 
        else
            this.node.angle = 20+ cc.misc.radiansToDegrees(rad);
        this.lastPosition.x = this.node.x;
        this.lastPosition.y = this.node.y;      
    }
    onBeginContact(contact, selfCollider:cc.BoxCollider, otherCollider:cc.BoxCollider)
    {
        if(otherCollider.tag != 1)
        {
            this.hitpoint-= ShootBirdConfig.damage;
            if(this.hitpoint <= 0)
                this.SelfDestruct(true);
        }    
    }

    SelfDestruct(shot: boolean)
    {
        this.node.destroy();
        Spawner.birdOnScreen--;
        Spawner.giftSpawned = false;
        if(shot)
        {
            ShootBirdConfig.birdCount--;
            Spawner.giftAvailable = false;
        }     
    }

    moveBeizer(duration, firstPoint, secondPoint, lastPoint)
    {
        duration = duration/2;
        if(this.node.x < lastPoint.x)
        {
            this.birdSprite.scaleX = -this.birdSprite.scaleX;
            this.isLeftToRight = false;
        }
        else
            this.isLeftToRight = true;
        cc.tween(this.node).bezierTo(duration,firstPoint, secondPoint, lastPoint).call(()=>{this.SelfDestruct(false)}).start();
    }

    moveStraight(duration, lastPoint)
    {
        duration = duration/2;
        if(this.node.x < lastPoint.x)
        {
            this.birdSprite.scaleX = -this.birdSprite.scaleX;
            this.isLeftToRight = false;
        }
        else
            this.isLeftToRight = true;
        cc.tween(this.node).to(duration,lastPoint).call(()=>{this.SelfDestruct(false)}).start();
    }
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    
}

