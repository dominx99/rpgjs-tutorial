import { RpgPlayer, type RpgPlayerHooks, Control, Components, Presets } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'YourName'
        player.setComponentsTop(Components.text('{name}'))
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },
    async onJoinMap(player: RpgPlayer) {
        player.paramsModifier = {
            [Presets.ATK]: {
                value: 10
            }
        };
    }
}

export default player
