// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//import Bow from "./bow";
//import ShootBirdConfig from "./shootbirdConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bird extends cc.Component {

    @property(cc.Node)
    birdSprite: cc.Node = null;

    lastPosition = cc.v2(0,0);

    isLeftToRight: boolean = true;


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
    // onBeginContact(contact, selfCollider:cc.BoxCollider, otherCollider:cc.BoxCollider)
    // {
    //     if(otherCollider.tag != 1)
    //     {
    //         this.node.destroy();
    //         Bow.birdOnScreen--;
    //         ShootBirdConfig.birdCount--;
    //     }
        
        
    // }

    moveBeizer(duration, firstPoint, secondPoint, lastPoint)
    {
        if(this.node.x < lastPoint.x)
        {
            this.birdSprite.scaleX = -this.birdSprite.scaleX;
            this.isLeftToRight = false;
        }
        else
            this.isLeftToRight = true;
        cc.tween(this.node).bezierTo(duration,firstPoint, secondPoint, lastPoint).call(()=>{this.node.destroy();}).start();
    }

    moveStraight(duration, lastPoint)
    {
        if(this.node.x < lastPoint.x)
        {
            this.birdSprite.scaleX = -this.birdSprite.scaleX;
            this.isLeftToRight = false;
        }
        else
            this.isLeftToRight = true;
        cc.tween(this.node).to(duration,lastPoint).call(()=>{this.node.destroy();}).start();
    }
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    
}
