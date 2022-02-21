// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Bird from "./birdGame";
import ShootBirdConfig from "./shootbirdConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bow extends cc.Component {

    @property(cc.Node)
    touch: cc.Node = null;

    @property(cc.Node)
    slingshot: cc.Node = null;

    @property(cc.Prefab)
    rock: cc.Prefab = null;

    @property(cc.Prefab)
    bird: cc.Prefab = null;

    @property(cc.Label)
    rockCount: cc.Label = null;

    @property(cc.Label)
    birdCount: cc.Label = null;

    speed: number = 800;

    delay: number = 0.3;

    static birdOnScreen: number = 0;


    onLoad () {
        let physic_mng = cc.director.getPhysicsManager();
        physic_mng.enabled = true;
        physic_mng.gravity = cc.v2(0,-400);
        this.speed = ShootBirdConfig.rockSpeed;
        this.touch.on(cc.Node.EventType.TOUCH_END, (ev: cc.Event.EventTouch)=>{this.shoot(ev)});
    }

    shoot(ev: cc.Event.EventTouch)
    {
        if(ShootBirdConfig.rockCount>0)
        {
            ShootBirdConfig.rockCount--;
            let wp = ev.getLocation();
            let pos = this.node.convertToNodeSpaceAR(wp);
            let rock = cc.instantiate(this.rock);
            rock.parent = this.node;
            let rad = Math.atan2(pos.y,pos.x);
            rock.angle = cc.misc.radiansToDegrees(rad);
            this.slingshot.angle = cc.misc.radiansToDegrees(rad) -90;
            console.log()
            rock.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.cos(rad)*this.speed,Math.sin(rad)*this.speed);
        }
    }

    update (dt) {
        this.rockCount.string = ShootBirdConfig.rockCount + '';
        this.birdCount.string = ShootBirdConfig.birdCount + '';
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
