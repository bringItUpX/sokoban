import { playerImageNames } from './playerImages.js';

const player = document.getElementById('player');
const playerPos = { x: 0, y: 0 };

document.onkeydown = (e) => {
    let movement = { x: 0, y: 0 };
    let image;

    // handle arrow keys
    if (e.key === 'ArrowLeft') {
        movement.x = -1;
        image = playerImageNames[0];
    } else if (e.key === 'ArrowRight') {
        movement.x = 1;
        image = playerImageNames[2];
    } else if (e.key === 'ArrowUp') {
        movement.y = -1;
        image = playerImageNames[1];
    } else if (e.key === 'ArrowDown') {
        movement.y = 1;
        image = playerImageNames[3];
    }

    // update player image
    if (image) {
        player.style.backgroundImage = `url(${image})`;
    }

    // update player position
    playerPos.x += movement.x;
    playerPos.y += movement.y;
    
    player.style.transform = `translate(${playerPos.x * 64}px, ${playerPos.y * 64}px)`;
};
