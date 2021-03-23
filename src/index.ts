import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Collision } from './Collison';
//Images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
//Level and colors
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup';
import { createBricks } from './helpers';

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over !!');
    gameOver = false;
}

function setGameWin(view: CanvasView) {
    view.drawInfo('You Win !!');
    gameOver = false;
}

function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision
) {
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);

    //Move ball
    ball.moveBall();

    //Move paddle and check so it won't exit the playField
    if(
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle();
    }

    collision.checkPadWallCollision(ball, paddle, view);
    const collidingBrick = collision.isCollidingBricks(ball, bricks);

    if(collidingBrick) {
        score += 1;
        view.drawScore(score);
    }

    //Game Over when ball leaves
    if(ball.pos.y > view.canvas.height) {
        gameOver = true;
        return setGameOver(view);
    }
    //Game won
    if(bricks.length === 0) {
        gameOver = true; 
        setTimeout(() => {
            return setGameWin(view);
        },1000); 
    }

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView) {
    //reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    //Create a collision instance
    const collision = new Collision();
    //Create all bricks
    const bricks = createBricks();
    //Create a Ball
    const ball = new Ball(
        BALL_SIZE,
        {
            x: BALL_STARTX,
            y: BALL_STARTY
        },
        BALL_SPEED,
        BALL_IMAGE        
    )
    //Create a paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    )
    

    gameLoop(view, bricks, paddle, ball, collision);
}

//Create a new view
const view = new CanvasView('#playField');
view.initStartButton(startGame);