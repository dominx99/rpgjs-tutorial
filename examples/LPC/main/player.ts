import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const graphics = ['pale-green-body', 'pale-green-head', 'pale-green-wings', 'pale-green-wings-fg', 'dark-grey-coat', 'boots-black', 'hood-black'];

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'Dragon'
        player.setComponentsTop(Components.text('{name}'))

        player.setGraphic(graphics);
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }

        if (input === Control.Attack) {
            player.showAnimation(graphics, 'attack', true);
        }

        if (input === Control.Skill) {
            player.showAnimation(graphics, 'skill', true);
        }
    },
    async onJoinMap(player: RpgPlayer) {
    }
}

export default player
