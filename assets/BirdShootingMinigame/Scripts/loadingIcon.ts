import ShootBirdConfig from "../Scripts/shootbirdConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    GiftPopup: cc.Node = null;
    @property(cc.Node)
    LuckyPopup: cc.Node = null;

    protected start(): void {
        setTimeout(() => {
            if(ShootBirdConfig.lucky)
            {
                this.LuckyPopup.active = true;
                this.LuckyPopup.scale = 0;
                
                cc.tween( this.node).to(0.8,{opacity:0}).call(()=>{cc.tween(this.LuckyPopup).to(0.8,{scale:1}, {easing: cc.easing.backOut}).start();this.node.destroy();}).start();
            }
            else 
            {
                this.GiftPopup.active = true;
                this.GiftPopup.scale = 0;
                
                cc.tween( this.node).to(0.8,{opacity:0}).call(()=>{cc.tween(this.GiftPopup).to(0.8,{scale:1}, {easing: cc.easing.backOut}).start();this.node.destroy();}).start();
            }
            
            
        }, 2000);
    }
}