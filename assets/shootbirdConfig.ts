const {ccclass, property} = cc._decorator;

@ccclass
export default class ShootBirdConfig extends cc.Component {
    static rockSpeed: number = 800;
    static birdSpeed: number = 300;
    static birdCount: number = 20;
    static rockCount: number = 25;
}
