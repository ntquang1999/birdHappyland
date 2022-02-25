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
    static birdList: {id: number, type: number, hitpoint: number, speed: number, maxHitpoint: number}[] = [];
    static jsonData: JSON;
    static maxBird: number;
    static birdIDList: {id: number}[] = [];
    static firstTime = false;
    static lucky = true;
    static giftList: {type: number, quantity: number}[] = [];


    static initData()
    {
        this.rockSpeed = this.jsonData["data"]["rockSpeed"];
        this.maxBird = this.jsonData["data"]["birdCount"];
        this.rockCount = this.jsonData["data"]["rockCount"];
        this.time = this.jsonData["data"]["time"];
        this.damage = this.jsonData["data"]["damage"];
        for(let i=0;i<this.birdCount;i++)
        {
            this.birdList.push({"id": this.jsonData["data"]["birdList"][i]["id"],"type": this.jsonData["data"]["birdList"][i]["type"], "hitpoint": this.jsonData["data"]["birdList"][i]["hitpoint"], "speed": this.jsonData["data"]["birdList"][i]["speed"], "maxHitpoint": this.jsonData["data"]["birdList"][i]["hitpoint"]});
        }
        this.birdCount = this.maxBird;
    }

    static initFakeData()
    {
        this.lucky = true;
        this.rockSpeed = 3000;
        this.maxBird = 7;
        this.birdCount = this.maxBird;
        this.rockCount = 12;
        this.damage = 1;
        
        this.time = 120;
        
        for(let i=0;i<this.birdCount;i++)
        {
            this.birdList.push({"id": 0,"type": 0, "hitpoint": 1, "speed": 10, "maxHitpoint": 1});
        }
        //this.birdList.push({"id": 0,"type": 1, "hitpoint": 3, "speed": 10, "maxHitpoint": 3});

        this.giftList.push({"type": 0, "quantity": 10});
        this.giftList.push({"type": 1, "quantity": 999});
        this.giftList.push({"type": 2, "quantity": 110});
        this.giftList.push({"type": 4, "quantity": 92});
        this.giftList.push({"type": 5, "quantity": 103});
        this.giftList.push({"type": 9, "quantity": 9});
    }


}

ShootBirdConfig.initFakeData();