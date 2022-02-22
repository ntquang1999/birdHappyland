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

    @property(cc.Node)
    winGamePopup: cc.Node = null;

    @property(cc.Node)
    loseGamePopup: cc.Node = null;

    @property(cc.Node)
    helpPopup: cc.Node = null;

    @property(cc.Button)
    back: cc.Button = null;

    @property(cc.Button)
    winOK: cc.Button = null;
    @property(cc.Button)
    loseOK: cc.Button = null;
    @property(cc.Button)
    helpOK: cc.Button = null;

    @property(cc.Prefab)
    rock: cc.Prefab = null;

    @property(cc.Prefab)
    bird: cc.Prefab = null;

    @property(cc.Label)
    rockCount: cc.Label = null;

    @property(cc.Label)
    birdCount: cc.Label = null;

    @property(cc.Label)
    time: cc.Label = null;

    speed: number = 800;

    delay: number = 0.3;

    static birdOnScreen: number = 0;

    static giftReceived = false;

    shootCooldown = 2;

    onCooldown = false;

    isEndgame = false;

    isPausing = false;




    onLoad () {
        let physic_mng = cc.director.getPhysicsManager();
        physic_mng.enabled = true;
        physic_mng.gravity = cc.v2(0,-400);
        this.speed = ShootBirdConfig.rockSpeed;
        this.touch.on(cc.Node.EventType.TOUCH_END, (ev: cc.Event.EventTouch)=>{this.shoot(ev)});
        this.touch.on(cc.Node.EventType.TOUCH_START, (ev: cc.Event.EventTouch)=>{this.rotate(ev)});
        this.touch.on(cc.Node.EventType.TOUCH_MOVE, (ev: cc.Event.EventTouch)=>{this.rotate(ev)});
        this.back.node.on("click", ()=>this.onBackClick());
        this.helpOK.node.on("click", ()=>this.onStartGame());
        this.winOK.node.on("click", ()=>this.onBackClick());
        this.loseOK.node.on("click", ()=>this.onBackClick());
    }

    onBackClick()
    {
        cc.game.restart;
    }

    onStartGame()
    {
        cc.tween(this.helpPopup).to(0.8,{scale:0}, {easing: cc.easing.backIn}).call(()=>{this.helpPopup.active = false; this.isPausing = false;}).start();        
        
        this.schedule(()=>{
            ShootBirdConfig.time--;
        },1);
        setTimeout(() => {
            this.onCooldown = false;
        }, 650);
        this.onCooldown = true;
        this.slingshot.active = true;
    }

    rotate(ev: cc.Event.EventTouch)
    {
        if(this.isPausing) return;
        let wp = ev.getLocation();
        let pos = this.node.convertToNodeSpaceAR(wp);
        let rad = Math.atan2(pos.y,pos.x);
        this.slingshot.angle = cc.misc.radiansToDegrees(rad) - 90;
    }

    shoot(ev: cc.Event.EventTouch)
    {
        if(this.isPausing) return;
        if(ShootBirdConfig.rockCount>0 && !this.onCooldown && !this.isEndgame)
        {
            ShootBirdConfig.rockCount--;
            let wp = ev.getLocation();
            let pos = this.node.convertToNodeSpaceAR(wp);
            let rock = cc.instantiate(this.rock);
            rock.parent = this.node;
            let rad = Math.atan2(pos.y,pos.x);
            rock.angle = cc.misc.radiansToDegrees(rad);
            this.slingshot.angle = cc.misc.radiansToDegrees(rad) - 90;
            let skt = this.slingshot.getComponent(sp.Skeleton);
            skt.setAnimation(0,"2", false);
            skt.setCompleteListener((ev: sp.spine.TrackEntry)=>{
                if(ev.animation && ev.animation.name == "1")
                {
                    this.onCooldown = false;
                }
            });
            if(ShootBirdConfig.rockCount > 0 && ShootBirdConfig.birdCount > 0) 
                skt.addAnimation(0,"1",false);
            rock.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.cos(rad)*this.speed,Math.sin(rad)*this.speed);
            this.onCooldown = true;
        }
    }

    protected start(): void {
        this.isPausing = true;
        this.helpPopup.active = true;
        this.helpPopup.scale = 0;
        cc.tween(this.helpPopup).to(0.8,{scale:1}, {easing: cc.easing.backOut}).start();
    }

    update (dt) {
        if(ShootBirdConfig.time>=0 && !this.isEndgame && !this.isPausing)
            this.time.string = ShootBirdConfig.time + '';
        this.rockCount.string = ShootBirdConfig.rockCount + '';
        this.birdCount.string = ShootBirdConfig.maxBird-ShootBirdConfig.birdCount + '/' + ShootBirdConfig.maxBird;
        if(ShootBirdConfig.birdCount == 0 && !this.isEndgame)
        {
            this.isEndgame = true;
            //Call api endgame win
            if(Bow.giftReceived)
            {
                //Call API get gift
            }
            this.winGamePopup.active = true;
            this.winGamePopup.scale = 0;
            cc.tween(this.winGamePopup).to(0.8,{scale:1}, {easing: cc.easing.backOut}).start();            
        } 
        else if((ShootBirdConfig.rockCount == 0 || ShootBirdConfig.time <= 0 ) && !this.isEndgame)
        {
            this.isEndgame = true;
            //Call api endgame lose
            if(Bow.giftReceived)
            {
                //Call API get gift
            }
            this.loseGamePopup.active = true;
            this.loseGamePopup.scale = 0;
            cc.tween(this.loseGamePopup).to(0.8,{scale:1}, {easing: cc.easing.backOut}).start();           
        }
        if(this.onCooldown)
        {
            this.slingshot.opacity = 150;
        }
        else
        {
            this.slingshot.opacity = 255;
        }

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
