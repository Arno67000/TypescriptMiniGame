import { Brick } from './sprites/Brick';
import {
    BRICK_IMAGES,
    LEVEL,
    STAGE_COLS,
    STAGE_PADDING,
    BRICK_ENERGY,
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_WIDTH
} from './setup';

export function createBricks(): Brick[] {
    return LEVEL.reduce((acc, elt, i) => {
        const row = Math.floor(i+1) / STAGE_COLS;
        const col = i % STAGE_COLS;

        const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
        const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

        if(elt === 0) return acc;

        return [
            ...acc,
            new Brick(
                BRICK_WIDTH,
                BRICK_HEIGHT,
                { x, y },
                BRICK_ENERGY[elt],
                BRICK_IMAGES[elt]
            )
        ];
    }, [] as Brick[]);
}