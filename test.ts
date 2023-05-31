import { Chess } from "chess.js";

const stalemate = new Chess();

// teste stalemate -- nessa posição existe
stalemate.load('3pk3/8/4P3/4K3/8/8/8/8 w - - 0 1')
console.log('stalemate 3pk3/8/4P3/4K3/8/8/8/8 w - - 0 1', stalemate.isGameOver())

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

console.log("stalemate_test findValue", findValue(stalemate_map,true));
console.log("stalemate_test findPath", findPath(stalemate_map,true));//[ 0, 1, 2, 1, 4, 0 ]
//console.log(stalemate_map[0][1][2][1])

stalemate.load('3pk3/8/4P3/4K3/8/8/8/8 w - - 0 1')
const move_1 = stalemate.moves({ verbose: false })
//console.log(move_1[0])
stalemate.move(move_1[0]);
//console.log(stalemate.fen())

const move_2 = stalemate.moves({ verbose: false })
//console.log(move_2[2])
stalemate.move(move_2[2]);
//console.log(stalemate.fen())

const move_3 = stalemate.moves({ verbose: false })
//console.log(move_3[4])
stalemate.move(move_3[4]);

console.log(stalemate.fen(), stalemate.isGameOver())

// teste se game over no inicio do jogo -- impossivel
const init_game = new Chess();
console.log("init_game",init_game.isGameOver())

const init_game_map:any = map_gameover_depth3(init_game)

console.log("init_game_map findValue", findValue(init_game_map,true));
console.log("init_game_map findPath", findPath(init_game_map,true));