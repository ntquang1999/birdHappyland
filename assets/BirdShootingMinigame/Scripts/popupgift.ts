// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ShootBirdConfig from "../Scripts/shootbirdConfig";
import Gift from "./GiftBox";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    giftPrefab: cc.Prefab = null;

    @property(cc.Node)
    rewardBox: cc.Node = null;

    protected start(): void {
        ShootBirdConfig.giftList.forEach(element => {
            let gift = cc.instantiate(this.giftPrefab);
            gift.parent = this.rewardBox;
            gift.getComponent(Gift).changeSprite(element.type,element.quantity);
        });
    }
}
