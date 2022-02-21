import Bird from "./birdGame";
import BirdGift from "./birdGift";
import ShootBirdConfig from "./shootbirdConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Spawner extends cc.Component {

    @property(cc.Prefab)
    bird: cc.Prefab = null;

    @property(cc.Prefab)
    birdSpecial: cc.Prefab = null;

    delay: number;

    delayConfig = 0.6;

    totalBird: number = 3;

    static birdOnScreen: number = 0;

    duralation = 3;

    screenSize = cc.v2(1920,800);

    firstPont;
    secondPoint;
    lastPoint;
    beizerStepX = 700;
    beizerStepY = 700;

    static giftAvailable = true;

    static giftSpawned = false;

    protected start(): void {
        this.delay = this.delayConfig;
        this.beizerStepX = (this.screenSize.x + 500)/3;
        this.beizerStepY = 700;
        Spawner.giftAvailable = ShootBirdConfig.giftAvailable;
        //this.totalBird = ShootBirdConfig.birdCount;
    }

    update (dt) {
        this.delay -= dt;
        if (Spawner.birdOnScreen < this.totalBird && ShootBirdConfig.birdCount > this.totalBird && this.delay<=0) {
            this.delay = this.delayConfig;
            let bird;
            let isSpecial = false;
            if(Spawner.giftAvailable && !Spawner.giftSpawned)
            {
                console.log("grrr");
                bird = cc.instantiate(this.birdSpecial);
                Spawner.giftSpawned = true;
                isSpecial = true;
            }
            else
            {
                bird = cc.instantiate(this.bird);
            }
            bird.parent = this.node;
            bird.y = this.getRandomInt(-this.screenSize.y/2+300, this.screenSize.y/2);
            if (this.getRandomInt(0, 3) == 1) {
                bird.x = -this.screenSize.x/2 - 300;
                if (this.getRandomInt(0, 3) == 1)
                {
                    this.firstPont = cc.v2(bird.x + this.beizerStepX, bird.y + this.beizerStepY);
                    this.secondPoint = cc.v2(bird.x + 2*this.beizerStepX, bird.y - this.beizerStepY);
                    this.lastPoint = cc.v2(bird.x + 3*this.beizerStepX, bird.y);
                }
                else
                {
                    this.firstPont = cc.v2(bird.x + this.beizerStepX, bird.y - this.beizerStepY);
                    this.secondPoint = cc.v2(bird.x + 2*this.beizerStepX, bird.y + this.beizerStepY);
                    this.lastPoint = cc.v2(bird.x + 3*this.beizerStepX, bird.y);
                }
                if(isSpecial)
                {
                    bird.getComponent(BirdGift).moveBeizer(this.duralation, this.firstPont, this.secondPoint, this.lastPoint);
                } 
                else
                {
                    bird.getComponent(Bird).moveBeizer(this.duralation, this.firstPont, this.secondPoint, this.lastPoint);
                } 
                
            }
            else {
                bird.x = this.screenSize.x/2 + 300;
                if (this.getRandomInt(0, 3) == 1)
                {
                    this.firstPont = cc.v2(bird.x - this.beizerStepX, bird.y + this.beizerStepY);
                    this.secondPoint = cc.v2(bird.x - 2*this.beizerStepX, bird.y - this.beizerStepY);
                    this.lastPoint = cc.v2(bird.x - 3*this.beizerStepX, bird.y);
                }
                else
                {
                    this.firstPont = cc.v2(bird.x - this.beizerStepX, bird.y - this.beizerStepY);
                    this.secondPoint = cc.v2(bird.x - 2*this.beizerStepX, bird.y + this.beizerStepY);
                    this.lastPoint = cc.v2(bird.x - 3*this.beizerStepX, bird.y);
                }
                if(isSpecial)
                {
                    bird.getComponent(BirdGift).moveBeizer(this.duralation, this.firstPont, this.secondPoint, this.lastPoint);
                } 
                else
                {
                    bird.getComponent(Bird).moveBeizer(this.duralation, this.firstPont, this.secondPoint, this.lastPoint);
                } 
            }
            Spawner.birdOnScreen++;
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
