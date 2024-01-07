import { MapData, RpgMap } from "@rpgjs/server";
import { MapSchema } from "../src/schemas";

@MapData({
    id: 'simplemap',
    file: require('../worlds/maps/simplemap.tmx'),
    syncSchema: MapSchema
})
export default class Simplemap extends RpgMap {
}
