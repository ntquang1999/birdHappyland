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
export default class Bird extends cc.Component {

    @property(cc.Node)
    birdSprite: cc.Node = null;

    lastPosition = cc.v2(0,0);

    isLeftToRight: boolean = true;

    hitpoint = 1;

    id = 0;

    speed = 3;


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
        if(this.node.y < -700) this.node.destroy();     
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
        
        Spawner.birdOnScreen--;
        if(shot)
        {
            ShootBirdConfig.birdCount--;
            cc.Tween.stopAllByTarget(this.node);
            this.birdSprite.getComponent(sp.Skeleton).animation = "die";
            //Spawner.giftAvailable = false;
        }
        else
        {
            ShootBirdConfig.birdList.push({"id": this.id, "type": 0, "hitpoint": this.hitpoint, "speed": this.speed});
        }     
    }

    moveBeizer(firstPoint, secondPoint, lastPoint)
    {
        if(this.node.x < lastPoint.x)
        {
            this.birdSprite.scaleX = -this.birdSprite.scaleX;
            this.isLeftToRight = false;
        }
        else
            this.isLeftToRight = true;
        cc.tween(this.node).bezierTo(this.speed,firstPoint, secondPoint, lastPoint).call(()=>{this.SelfDestruct(false)}).start();
    }

    moveStraight(lastPoint)
    {
        if(this.node.x < lastPoint.x)
        {
            this.birdSprite.scaleX = -this.birdSprite.scaleX;
            this.isLeftToRight = false;
        }
        else
            this.isLeftToRight = true;
        cc.tween(this.node).to(this.speed,lastPoint).call(()=>{this.SelfDestruct(false)}).start();
    }
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    
}
