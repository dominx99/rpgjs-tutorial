import { RpgPlayer } from "@rpgjs/server"

export const PoppingNumberSchema = {
    text: String,
    color: Number,
    fontFamily: String,
    fontSize: Number,
    duration: Number,
}

const DefaultSchema = {
    poppingNumber: PoppingNumberSchema,
}

export const EventSchema = {
    ...RpgPlayer.schemas,
    ...DefaultSchema,
    events: {
        ...RpgPlayer.schemas.events,
        ...DefaultSchema
    }
}

export const MapSchema = {
    events: [
        EventSchema
    ]
}
