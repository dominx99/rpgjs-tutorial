import { RpgEvent, RpgPlayer } from '@rpgjs/server'
import { Skill } from '@rpgjs/database'
import BallEvent from '../../events/BallEvent';

@Skill({
    id: 'ArcaneBolt',
    name: 'ArcaneBolt',
    description: 'Shoots a ball of arcane magic',
    spCost: 10,
    power: 100,
    variance: 10,
    hitRate: 1,
    addStates: [],
    removeStates: [],
    elements: [],
    coefficient: {}
})
export default class BallSkill {
    onUse(player: RpgPlayer) {
        const map = player.getCurrentMap();
        const events = Object.values(map!.createDynamicEvent({
            x: player.position.x,
            y: player.position.y,
            event: BallEvent,
        })) as RpgEvent[];

        const currentEvent = events[0];

        currentEvent.showAnimation('ball', 'throw');

        currentEvent.moveTo({ x: player.position.x + 500, y: player.position.y }, {
            onComplete: () => currentEvent.remove(),
            onStuck: () => currentEvent.remove(),
        }).subscribe({
            complete: () => currentEvent.remove(),
            error: () => currentEvent.remove()
        })
    }
}
