import { RpgEvent, EventData, RpgPlayer, Components } from '@rpgjs/server'

@EventData({
    name: 'EV-1', 
    hitbox: {
        width: 32,
        height: 16
    }
})
export default class VillagerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female')

        this.setComponentsTop([
            Components.hpBar()
        ])
    }
    async onAction(player: RpgPlayer) {
        const dealt = this.applyDamage(player)

        this.popText({
            text: Math.round(dealt.damage).toString(),
            color: 0xff0000,
        })

        if (this.hp <= 0) {
            this.remove();

            player.exp += 10;
            player.popText({
                text: '+10 exp',
                color: 0x00ff00,
                fontSize: 35,
                duration: 50,
            })
        }
    }
}
