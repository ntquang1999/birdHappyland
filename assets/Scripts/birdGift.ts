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

    @property(cc.Node)
    hitAnimation: cc.Node = null;

    lastPosition = cc.v2(0,0);

    isLeftToRight: boolean = true;

    id: number = 0;

    speed: number = 1.5;

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
        if(this.node.y < -700) this.node.destroy();     
    }
    onBeginContact(contact, selfCollider:cc.BoxCollider, otherCollider:cc.BoxCollider)
    {
        if(otherCollider.tag != 1)
        {
            this.hitAnimation.active = true;
            setTimeout(() => {
                this.hitAnimation.active = false;
            }, 150);
            this.hitpoint-= ShootBirdConfig.damage;
            if(this.hitpoint <= 0)
                this.SelfDestruct(true);
            else
            {
                cc.tween(this.birdSprite).to(0.1, {angle: this.birdSprite.angle +50}).call(()=>{cc.tween(this.birdSprite).to(0.1, {angle: this.birdSprite.angle - 50}).start();}).start();
            }
        }    
    }

    SelfDestruct(shot: boolean)
    {
        Spawner.birdOnScreen--;
        //Spawner.giftSpawned = false;
        
        if(shot)
        {
            ShootBirdConfig.birdCount--;
            cc.Tween.stopAllByTarget(this.node);
            this.birdSprite.getComponent(sp.Skeleton).animation = "die";
            this.birdSprite.getComponent(sp.Skeleton).loop = false;
            cc.tween(this.node).to(0.8, {opacity:0}).start();
            ShootBirdConfig.birdIDList.push({"id": this.id});
            Bow.giftReceived = true;
        }
        else
        {
            ShootBirdConfig.birdList.push({"id": this.id, "type": 1, "hitpoint": this.hitpoint, "speed": this.speed});
            this.node.destroy();
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

