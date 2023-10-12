import { RpgPlayer, type RpgPlayerHooks, Control, Components } from '@rpgjs/server'
import BallSkill from './database/skills/BallSkill';

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'YourName'
        player.throughOtherPlayer = false
        player.through = false
        player.setComponentsTop(Components.text('{name}'))
        player.learnSkill(BallSkill);
        player.getSkill(BallSkill)
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }

        if (input === 'skill') {
            player.useSkill(BallSkill);
        }
    },
    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            return
        }
    }
}

export default player
