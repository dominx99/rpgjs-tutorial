import { EventData, RpgEvent, Speed } from "@rpgjs/server";

@EventData({
    name: "BallEvent",
})
export default class ArcaneBoltEvent extends RpgEvent {
    onInit() {
        this.speed = Speed.Fastest;
        this.setGraphic("ball");
        this.through = true;
        this.throughOtherPlayer = true;
    }
}
