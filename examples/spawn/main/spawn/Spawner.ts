import { RpgEvent, RpgMap, RpgShape } from "@rpgjs/server";
import SAT, { Polygon } from 'sat';
import { TileInfo } from '@rpgjs/tiled/lib/classes/Map';
import { MobsOnMap } from "./MapUtils";

export interface Hitbox {
    width: number,
    height: number,
}

export interface NPC {
    [key: string]: {
        class: typeof RpgEvent,
        hitbox: Hitbox
    }
}

export interface Spawn {
    polygon: SAT.Polygon,
    npc: string,
    quantity: number
}

const TILE_SIZE = [32, 32];

export class Spawner {
    shapes: RpgShape[];
    map: RpgMap;
    npcs: NPC;

    constructor(map: RpgMap, npcs: NPC) {
        this.shapes = map.getShapes();
        this.map = map;
        this.npcs = npcs;
    }

    generate = (name: string, x: number, y: number) => {
        if (!this.npcs[name]) return;
        this.map.createDynamicEvent({
            x,
            y,
            event: this.npcs[name].class
        });
        return this.npcs[name];
    }

    random = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    getTileMiddle = (data: { x: number, y: number }) => {
        const tile = this.map.getTileOriginPosition(data.x, data.y);
        const { x, y } = tile;

        return {
            x: x + (TILE_SIZE[0] / 2),
            y: y + (TILE_SIZE[1] / 2)
        };
    }

    isValid = (polygon: Polygon, hitbox: Hitbox, x: number, y: number) => {
        const tiles = this.getTilesByShapeSize(x, y, hitbox);
        const hasCollisionWithTiles = tiles.some(tile =>
            tile.hasCollision
            || tile.objectGroups.some(objectGroup => objectGroup.properties?.collision)
        );

        const hasCollisionWithEvent = this.checkCollisionWithEvent(x, y);

        const point = new SAT.Vector(x, y);
        const isInPolygon = SAT.pointInPolygon(point, polygon);

        return isInPolygon && !hasCollisionWithTiles && !hasCollisionWithEvent;
    }

    checkCollisionWithEvent = (x: number, y: number) => {
        const events = Object.entries(this.map.events);

        return events.some(([eventId, event]) => {
            const startX = event.position.x - this.roundToTileSize((event.width / 2));
            const endX = event.position.x + this.roundToTileSize((event.width / 2));
            const startY = event.position.y - this.roundToTileSize((event.height / 2));
            const endY = event.position.y + this.roundToTileSize((event.height / 2));

            return (x >= startX && x <= endX) && (y >= startY && y <= endY);
        })
    }

    roundToTileSize = (value: number) => {
        return Math.ceil(value / TILE_SIZE[0]) * TILE_SIZE[0];
    }

    getTilesByShapeSize = (x: number, y: number, hitbox: Hitbox) => {
        var tiles: TileInfo[] = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                tiles.push(this.map.getTileByPosition(
                    x + i * hitbox.width,
                    y + j * hitbox.height
                ));
            }
        }

        return tiles;
    }

    populate = (spawnedMobs: MobsOnMap) => {
        const spawns = this.getSpawnsFromShapes();

        spawns.forEach(spawn => this.populateSpawn(spawn, spawnedMobs[spawn.npc] || 0));
    }

    populateSpawn = (spawn: Spawn, existingQuantity: number) => {
        const box = spawn.polygon.getAABBAsBox();

        const startX = spawn.polygon.pos.x;
        const startY = spawn.polygon.pos.y;
        const endX = startX + box.w;
        const endY = startY + box.h;

        const { npc, quantity } = spawn;
        const quantityToGenerate = quantity - existingQuantity;

        console.log('populate missing', npc, quantityToGenerate);

        for (let i = 0; i < quantityToGenerate;) {
            const { x, y } = this.getTileMiddle({
                x: this.random(startX, endX),
                y: this.random(startY, endY)
            });

            if (!this.isValid(spawn.polygon, this.npcs[spawn.npc].hitbox, x, y)) continue;

            this.generate(npc, x, y);
            i++;
        }
    }

    getSpawnsFromShapes = (): Spawn[] => {
        const spawns: Spawn[] = [];
        this.shapes.forEach(shape => {
            if (shape.properties?.spawn) {
                spawns.push(this.getSpawnByShape(shape));
            }
        });
        return spawns;
    }

    getSpawnByShape = (shape: RpgShape): Spawn => {
        const { pos, w, h, points } = shape.hitbox;
        const { quantity, spawn } = shape.properties;

        let object: SAT.Polygon | null = null;

        if (!points) {
            // rectangle
            object = new SAT.Polygon(new SAT.Vector(pos.x, pos.y), [
                new SAT.Vector(0, 0),
                new SAT.Vector(w, 0),
                new SAT.Vector(w, h),
                new SAT.Vector(0, h)
            ]);
        } else {
            // polygon
            object = new SAT.Polygon(new SAT.Vector(pos.x, pos.y), points);
        }

        return {
            polygon: object,
            npc: spawn,
            quantity
        };
    }
}
