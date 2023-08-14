# RPGJS Examples

In this repository you can find examples of [RPGJS](https://rpgjs.dev) capabilities.

## [LPC] Liberated Pixel Cup

[![Watch the video](https://i.imgur.com/gf6QUVg.png)](https://i.imgur.com/SW4OCal.mp4)

[Here](https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_pale_green&head=Human_male_pale_green&tail=Lizard_tail_pale_green&wings=Lizard_wings_pale_green&wound_arm=none&wound_brain=none&wound_eye=none&belt=Loose_Belt_white&hair=none&bandana=Bandana_gray&hat=Cloth_hood_black&jacket=Trench_coat_dark_gray&shoes=Boots_black) you can find assets used in video.

[Here](https://github.com/dominx99/rpgjs-tutorial/tree/main/examples/LPC) is code example used in this video.

`rpg.toml`
```toml
spritesheetDirectories= [
    'lpc-sprites'
]
```

`main/lpc-sprites/LPCSpritesheet.ts`
```ts
import { Animation, Spritesheet } from '@rpgjs/client'
import { Direction } from '@rpgjs/common'

const LPCSpritesheetPreset = () => {
    const frameY = (direction: Direction) => {
        return {
            [Direction.Down]: 2,
            [Direction.Left]: 1,
            [Direction.Right]: 3,
            [Direction.Up]: 0
        }[direction]
    }

    const stand = (direction: Direction) => [{ time: 0, frameX: 1, frameY: frameY(direction) }]
    const anim = (direction: Direction, framesWidth: number, speed: number = 5) => {
        const array: any = []
        for (let i = 0; i < framesWidth; i++) {
            array.push({ time: i * speed, frameX: i, frameY: frameY(direction) })
        }
        return array
    }

    return {
        rectWidth: 64,
        rectHeight: 64,
        spriteRealSize: {
            width: 48,
            height: 52,
        },
        framesWidth: 6,
        framesHeight: 4,
        textures: {
            [Animation.Stand]: {
                offset: {
                    x: 0,
                    y: 512,
                },
                animations: (direction: Direction) => [stand(direction)]
            },
            [Animation.Walk]: {
                offset: {
                    x: 0,
                    y: 512,
                },
                framesWidth: 9,
                framesHeight: 4,
                animations: (direction: Direction) => [anim(direction, 9)]
            },
            [Animation.Attack]: {
                offset: {
                    x: 0,
                    y: 768,
                },
                framesWidth: 6,
                framesHeight: 4,
                animations: (direction: Direction) => [anim(direction, 6, 3)]
            },
            [Animation.Skill]: {
                framesWidth: 6,
                framesHeight: 4,
                animations: (direction: Direction) => [anim(direction, 7, 3)]
            }
        },
    }
}

@Spritesheet({
    ...LPCSpritesheetPreset(),
})
export default class LPCSpritesheet {
}
```

