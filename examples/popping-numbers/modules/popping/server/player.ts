import { RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";
import { PoppingNumbersManager } from "../client/src/managers/PoppingNumbersManager";
import { Utils } from "@rpgjs/common";
import { PoppingNumberSchema } from "./schemas/PoppingNumberSchema";

declare module "@rpgjs/server" {
    export interface RpgPlayer extends PoppingNumbersManager {}
}

const player: RpgPlayerHooks = {
    props: {
        poppingNumber: PoppingNumberSchema
    },
}

Utils.applyMixins(RpgPlayer, [PoppingNumbersManager]);

const originalInitializeMethod = RpgPlayer.prototype.initialize;
RpgPlayer.prototype.initialize = function () {
    originalInitializeMethod.apply(this);

    this.poppingNumber = {};
}

export default player;
