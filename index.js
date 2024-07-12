import { levels } from './levels.js';
import { playerImageNames } from './playerImages.js';
import { blockImageNames, Wall, Floor, Target, Box, BoxOnTarget } from './blockImages.js';

const game = document.getElementById('game');
const player = document.getElementById('player');
let level = [...levels[1]];
const playerPos = findPlayer();
generateBlocks(level);
player.style.transform = `translate(${playerPos.x * 64}px, ${playerPos.y * 64}px)`;

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

    // Return if target of movement is a wall
    const target = level[playerPos.y + movement.y][playerPos.x + movement.x];
    if (target === 'X') {
        return;
    }

    // Move box if target is a box. Box can only be moved if the target of the box is not a wall or another box.
    if (target === 'b' || target === 'B') {
        const boxTarget = level[playerPos.y + movement.y * 2][playerPos.x + movement.x * 2];
        if (boxTarget === 'X' || boxTarget === 'b' || boxTarget === 'B') {
            return;
        }

        // Move box
        level[playerPos.y + movement.y * 2] = replaceAt(level[playerPos.y + movement.y * 2], playerPos.x + movement.x * 2, target === 'b' ? 'b' : 'B');
        level[playerPos.y + movement.y] = replaceAt(level[playerPos.y + movement.y], playerPos.x + movement.x, target === 'b' ? ' ' : '.');
        generateBlocks(level);
        
    }

    // update player position
    playerPos.x += movement.x;
    playerPos.y += movement.y;
    
    player.style.transform = `translate(${playerPos.x * 64}px, ${playerPos.y * 64}px)`;
};

/**
 * Replace a character at a specific index in a string
 * @param {string} str 
 * @param {number} index 
 * @param {string} replacement 
 * @returns {string}
 */
function replaceAt(str, index, replacement) {
    let firstPart = str.substring(0, index);
    let secondPart = str.substring(index + 1);
    return firstPart + replacement + secondPart;
}

// Method that generates the blocks of the game. Each block is 64x64 pixels.
// The block image names are set using image background in CSS. Blocks are positioned
// using translate transform. The blocks are added to #game div. Before the blocks are
// added, all divs in #game are to be removed EXCEPT the player div (#player).
function generateBlocks(level) {
    // Remove all divs in #game except #player
    for (const item of game.children) {
        if (item.id !== 'player') {
            game.removeChild(item);
        }
    }

    // Add all blocks as divs
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            const block = document.createElement('div');
            block.style.width = '64px';
            block.style.height = '64px';
            block.style.position = 'absolute';
            block.className = 'cell';
            block.style.transform = `translate(${x * 64}px, ${y * 64}px)`;
            block.style.backgroundImage = `url(${getBlockImageBySymbol(level[y][x])})`;
            // add blcck to game and after that the player
            game.appendChild(block);
            game.appendChild(player);
        }
    }
}

// Method that returns the position of the player in the level.
// The player is marked with '@' in the level array. Once the player
// has been found, the character is replaced with a blank space.
function findPlayer() {
    for (let y = 0; y < level.length; y++) {
        for (let x = 0; x < level[y].length; x++) {
            if (level[y][x] === '@') {
                level[y] = replaceAt(level[y], x, ' ');
                return { x, y };
            }
        }
    }
}

function getBlockImageBySymbol(type) {
    switch (type) {
        case 'X': return blockImageNames[Wall];
        case ' ': return blockImageNames[Floor];
        case '@': return blockImageNames[Floor];
        case 'b': return blockImageNames[Box];
        case 'B': return blockImageNames[BoxOnTarget];
        case '.': return blockImageNames[Target];
    }
}