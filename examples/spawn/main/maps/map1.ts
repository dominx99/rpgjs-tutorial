import { MapData, RpgMap } from "@rpgjs/server";
import { MobSpawnList, getMobsOnMapCount } from "../spawn/MapUtils";
import { Spawner } from "../spawn/Spawner";

@MapData({
    id: 'simplemap',
    file: require('../worlds/maps/simplemap.tmx'),
})
export default class Simplemap extends RpgMap {
    onLoad() {
        const spawner = new Spawner(this, MobSpawnList);

        setInterval(() => {
            const mobs = getMobsOnMapCount(this);
            spawner.populate(mobs);
        }, 60 * 1000)

        spawner.populate({});
    }
}
