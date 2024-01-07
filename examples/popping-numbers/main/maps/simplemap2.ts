import { MapData, RpgMap } from "@rpgjs/server";
import { MapSchema } from "../src/schemas";

@MapData({
    id: 'simplemap2',
    file: require('../worlds/maps/simplemap2.tmx'),
    syncSchema: MapSchema
})
export default class Simplemap2 extends RpgMap {
}
