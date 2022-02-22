const {ccclass, property} = cc._decorator;

@ccclass
export default class ShootBirdConfig extends cc.Component {
    static rockSpeed: number = 1300;
    static birdSpeed: number = 300;
    static birdCount: number = 10;
    static rockCount: number = 30;
    static time: number = 200;
    static damage: number = 1;
    static giftAvailable = true;
    static birdList: {id: number, type: number, hitpoint: number, speed: number}[] = [];
    static jsonData: JSON;
    static maxBird: number;
    static birdIDList: {id: number}[] = [];


    static initData()
    {
        this.rockSpeed = this.jsonData["data"]["rockSpeed"];
        this.maxBird = this.jsonData["data"]["birdCount"];
        this.rockCount = this.jsonData["data"]["rockCount"];
        this.time = this.jsonData["data"]["time"];
        this.damage = this.jsonData["data"]["damage"];
        for(let i=0;i<this.birdCount;i++)
        {
            this.birdList.push({"id": this.jsonData["data"]["birdList"][i]["id"],"type": this.jsonData["data"]["birdList"][i]["type"], "hitpoint": this.jsonData["data"]["birdList"][i]["hitpoint"], "speed": this.jsonData["data"]["birdList"][i]["speed"]});
        }
        this.birdCount = this.maxBird;
    }

    static initFakeData()
    {
        this.rockSpeed = 1500;
        this.birdCount = 5;
        this.rockCount = 300;
        this.damage = 1;
        this.maxBird = 5;
        this.time = 120;
        
        for(let i=0;i<this.birdCount-1;i++)
        {
            this.birdList.push({"id": 0,"type": 0, "hitpoint": 1, "speed": 5});
        }
        this.birdList.push({"id": 0,"type": 1, "hitpoint": 3, "speed": 2.5});
    }


}

ShootBirdConfig.initFakeData();