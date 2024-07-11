# Requirements

## Sokoban

Sokoban is a classic puzzle game where the player needs to push boxes to their designated locations. The objective is to solve each level by strategically moving the boxes without getting trapped.

To play Sokoban, you can use the arrow keys to move the player character. The player can only push one box at a time, and boxes can only be pushed, not pulled. Be careful not to push a box into a corner or against a wall, as it may become impossible to complete the level.

Sokoban is a great game to challenge your problem-solving skills and spatial reasoning. Have fun playing and enjoy the puzzles!

## Level Defenition

The levels are defined in text files. The text files contain the following characters:

| Character | Description     |
| --------- | --------------- |
| `X`       | Wall            |
| ` `       | Empty space     |
| `@`       | Player          |
| `b`       | Box             |
| `B`       | Box on a target |
| `.`       | Target          |

## Movement

The user controls the player using the arrow keys. The player can move in four directions: up, down, left, and right. The player can push a box if there is an empty space behind the box.

