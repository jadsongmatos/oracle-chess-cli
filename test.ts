import { Chess } from "chess.js";
//import * as _ from "lodash";
import _ from "lodash";

const stalemate = new Chess();

// stalemate
stalemate.load('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78')
console.log('4k3/4P3/4K3/8/8/8/8/8 b - - 0 78', stalemate.isGameOver())
stalemate.load('3pk3/8/4P3/4K3/8/8/8/8 w - - 0 1')
console.log('3pk3/8/4P3/4K3/8/8/8/8 w - - 0 1', stalemate.isGameOver())

function map_gameover_depth3(game: Chess) {
  return game.moves({ verbose: false }).map((move1d) => {
    game.move(move1d);
    const game_over1d = game.isGameOver();
    if (game_over1d) {
      return [true];
    }

    const moves1dResult = game.moves({ verbose: false }).map((move2d) => {
      game.move(move2d);
      const game_over2d = game.isGameOver();
      if (game_over2d) {
        return [true];
      }

      const moves3dResult = game.moves({ verbose: false }).map((move3d) => {
        game.move(move3d);

        const moves4dResult = [game.isGameOver()];

        game.undo();
        return moves4dResult;
      });

      game.undo();
      return [game_over2d, moves3dResult];
    });

    game.undo();
    return [game_over1d, moves1dResult];
  });
}

const stalemate_map:any = map_gameover_depth3(stalemate)
console.log("stalemate_map", stalemate_map)

function findValue(arr:any, target:any):any {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      if (findValue(arr[i], target)) {
        return true;
      }
    } else if (arr[i] === target) {
      return true;
    }
  }
  return false;
}

function findPath(arr:any, target:any):any {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const pathFromHere = findPath(arr[i], target);
      if (pathFromHere) {
        return [i, ...pathFromHere];
      }
    } else if (arr[i] === target) {
      return [i];
    }
  }
  return null;
}

console.log("stalemate_test", findValue(stalemate_map,true));
console.log("stalemate_test", findPath(stalemate_map,true));//[ 0, 1, 2, 1, 4, 0 ]
console.log(stalemate_map[0][1][2][1])