// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Bird from "./bird";
import ShootBirdConfig from "./shootbirdConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bow extends cc.Component {

    @property(cc.Node)
    touch: cc.Node = null;

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
        physic_mng.gravity = cc.v2(0,0);
        this.speed = ShootBirdConfig.rockSpeed;
        this.touch.on(cc.Node.EventType.TOUCH_END, (ev: cc.Event.EventTouch)=>{this.shoot(ev)});
    }

    shoot(ev: cc.Event.EventTouch)
    {
        if(ShootBirdConfig.rockCount>=0)
        {
            ShootBirdConfig.rockCount--;
            let wp = ev.getLocation();
            let pos = this.node.convertToNodeSpaceAR(wp);
            //let angle = cc.misc.radiansToDegrees(Math.atan(wp.x/wp.y));
            let rock = cc.instantiate(this.rock);
            rock.parent = this.node;
            let rad = Math.atan2(pos.y,pos.x);
            rock.angle = cc.misc.radiansToDegrees(rad);
            rock.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.cos(rad)*this.speed,Math.sin(rad)*this.speed);
        }
    }

    update (dt) {
        // this.delay -= dt;
        // if (Bow.birdOnScreen < 30 && ShootBirdConfig.birdCount >= 30 && this.delay<=0) {
        //     this.delay = 0.3;
        //     this.rockCount.string = ShootBirdConfig.rockCount + '';
        //     this.birdCount.string = ShootBirdConfig.birdCount + '';
        //     let bird = cc.instantiate(this.bird);
        //     bird.parent = this.node;
        //     bird.y = this.getRandomInt(-100, 800);
        //     if (this.getRandomInt(0, 3) == 1) {
        //         bird.x = -1000;
        //         bird.getComponent(Bird).moveBeizer(4, cc.v2(bird.x + 700, bird.y + 700), cc.v2(bird.x + 1400, bird.y - 700), cc.v2(bird.x + 2100, bird.y));
        //     }
        //     else {
        //         bird.x = 1000;
        //         bird.getComponent(Bird).moveBeizer(4, cc.v2(bird.x - 700, bird.y + 700), cc.v2(bird.x - 1400, bird.y - 700), cc.v2(bird.x - 2100, bird.y));
        //     }
        //     Bow.birdOnScreen++;
        // }
        // if(Bow.birdOnScreen < 10 && ShootBirdConfig.birdCount >= 10)
        // {
        //     let bird = cc.instantiate(this.bird);
        //     bird.parent = this.node;
        //     bird.y = this.getRandomInt(-100,800);
        //     if(this.getRandomInt(0,2) == 1)
        //     {
        //         bird.x = -850;
        //     }
        //     else
        //     {
        //         bird.x = 850;
        //     }
        //     if(this.getRandomInt(0,2) == 1)
        //     {
        //         bird.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,this.getRandomInt(100,ShootBirdConfig.birdSpeed));
        //     }
        //     else
        //     {
        //         bird.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-this.getRandomInt(100,ShootBirdConfig.birdSpeed));
        //     }
        //     Bow.birdOnScreen++;
        // }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
