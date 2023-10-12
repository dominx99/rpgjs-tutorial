import { Animation, Spritesheet } from '@rpgjs/client'

const to = () => {
    const array: any = [];
    let k = 0;
    const durationFrame = 2;
    for (let i=0 ; i < 4 ; i++) {
        for (let j=0 ; j < 5 ; j++) {
            array.push({ time: k * durationFrame, frameX: j, frameY: i });
            k++;
        }
    }

    array.push({ time: k * durationFrame });
    return array;
}

@Spritesheet({
    framesWidth: 5,
    framesHeight: 4,
    width: 960,
    height: 768,
    opacity: 1,
    anchor: [0.5],
    textures: {
        ['throw']: {
            animations: [ to() ]
        }
    }
})
export default class ShieldAnimations {}
