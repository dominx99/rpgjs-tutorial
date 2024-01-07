import { RpgSprite } from "@rpgjs/client";
import * as PIXI from 'pixi.js';
import { PoppingNumberOptions } from "../managers/PoppingNumbersManager";

export class PoppingNumberRenderer {
    render(sprite: RpgSprite, { text, color, fontSize, fontFamily, duration }: PoppingNumberOptions) {
        if (!duration) {
            duration = 15;
        }

        const pixiText = new PIXI.Text(text, {
            fontSize: fontSize || 12,
            fill: color,
            fontFamily: fontFamily || 'Arial',
        });

        const id = Math.random().toString(36).substr(2, 9);

        const randomXOffset = (Math.random() - 0.5) * (sprite.data.hitbox.w / 2);
        const randomYOffset = (Math.random() - 0.5) * (sprite.data.hitbox.y / 2);

        pixiText.name = id;
        pixiText.position.x = sprite.data.hitbox.w / 2 - pixiText.width / 2 + randomXOffset;
        pixiText.position.y = sprite.data.hitbox.h / 2 - pixiText.height / 2 + randomYOffset;

        const container = sprite.getLayoutContainer();

        let frames = 0;
        const bounceText = () => {
            const child = container.getChildByName(id);

            if (!child) {
                PIXI.Ticker.shared.remove(bounceText);

                return;
            }

            child.position.y = Math.sin(-frames / 10) * 10;

            frames += PIXI.Ticker.shared.deltaTime;

            if (frames > duration) {
                PIXI.Ticker.shared.remove(bounceText);
                container.removeChild(child);
            }
        }

        container.addChild(pixiText);

        PIXI.Ticker.shared.add(bounceText);
    }
}
