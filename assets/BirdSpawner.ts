import Bird from "./bird";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Spawner extends cc.Component {

    @property(cc.Prefab)
    bird: cc.Prefab = null;

    delay: number;

    delayConfig = 0.1;

    totalBird: number = 100;

    birdOnScreen: number = 0;

    duralation = 3;

    screenSize = cc.v2(1920,1080);

    firstPont;
    secondPoint;
    lastPoint;
    beizerStepX = 700;
    beizerStepY = 700;

    protected start(): void {
        this.delay = this.delayConfig;
    }

    update (dt) {
        this.delay -= dt;
        if (this.birdOnScreen < this.totalBird && this.delay<=0) {
            this.delay = this.delayConfig;
            let bird = cc.instantiate(this.bird);
            bird.parent = this.node;
            bird.y = this.getRandomInt(-this.screenSize.y/2, this.screenSize.y/2);
            if (this.getRandomInt(0, 3) == 1) {
                bird.x = -this.screenSize.x/2;
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
                bird.getComponent(Bird).moveBeizer(this.duralation, this.firstPont, this.secondPoint, this.lastPoint);
            }
            else {
                bird.x = this.screenSize.x/2;
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
                bird.getComponent(Bird).moveBeizer(this.duralation, this.firstPont, this.secondPoint, this.lastPoint);
            }
            this.birdOnScreen++;
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
