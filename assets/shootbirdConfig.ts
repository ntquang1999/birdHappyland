const {ccclass, property} = cc._decorator;

@ccclass
export default class ShootBirdConfig extends cc.Component {
    static rockSpeed: number = 1300;
    static birdSpeed: number = 300;
    static birdCount: number = 10;
    static rockCount: number = 30;
    static damage: number = 1;
    static giftAvailable = true;
    static birdList: {id: number, type: number, hitpoint: number, speed: number}[] = [];
    static jsonData: JSON;


    static initData()
    {
        this.rockSpeed = this.jsonData["data"]["rockSpeed"];
        this.birdCount = this.jsonData["data"]["birdCount"];
        this.rockCount = this.jsonData["data"]["rockCount"];
        this.damage = this.jsonData["data"]["damage"];
        for(let i=0;i<this.birdCount;i++)
        {
            this.birdList.push({"id": this.jsonData["data"]["birdList"][i]["id"],"type": this.jsonData["data"]["birdList"][i]["type"], "hitpoint": this.jsonData["data"]["birdList"][i]["hitpoint"], "speed": this.jsonData["data"]["birdList"][i]["speed"]});
        }
    }

    static initFakeData()
    {
        this.rockSpeed = 3000;
        this.birdCount = 5;
        this.rockCount = 50;
        this.damage = 1;
        
        for(let i=0;i<this.birdCount-1;i++)
        {
            this.birdList.push({"id": 0,"type": 0, "hitpoint": 1, "speed": 5});
        }
        this.birdList.push({"id": 0,"type": 1, "hitpoint": 3, "speed": 2.5});
    }


}

ShootBirdConfig.initFakeData();