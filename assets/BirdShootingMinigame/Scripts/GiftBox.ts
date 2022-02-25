// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Gift extends cc.Component {

   type: number;

   @property(cc.Sprite)
    gift: cc.Sprite = null;

    @property(cc.Label)
    quantity: cc.Label = null;

    @property([cc.SpriteFrame])
    giftSprite: cc.SpriteFrame[] = [];



   changeSprite(i,n)
   {
       this.gift.spriteFrame = this.giftSprite[i];
       this.quantity.string = 'x'+ n;
   }

}
