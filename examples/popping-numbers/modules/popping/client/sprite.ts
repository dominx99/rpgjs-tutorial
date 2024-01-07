import { RpgSprite, RpgSpriteHooks, inject } from '@rpgjs/client'
import { PoppingNumbersEvents } from './src/enum/PoppingNumbersEvents';
import { PoppingNumberRenderer } from './src/service/PoppingNumberRenderer';
import { PoppingNumberOptions } from './src/managers/PoppingNumbersManager';

const sprite: RpgSpriteHooks = {
    onInit(sprite: RpgSprite) {
        sprite.game.clientEngine.socket.on(
            PoppingNumbersEvents.RENDER,
            (options: PoppingNumberOptions) => inject(PoppingNumberRenderer).render(sprite, options)
        );
    },
    onChanges(sprite: RpgSprite, updated:any) {
        if (!updated.poppingNumber || !updated.poppingNumber.text) {
            return;
        }

        console.log('rendering', updated.poppingNumber);

        inject(PoppingNumberRenderer).render(sprite, updated.poppingNumber);
    }
}

export default sprite;
