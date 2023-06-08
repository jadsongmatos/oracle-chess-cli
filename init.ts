import { Chess } from "chess.js";

const aberturas = new Chess();

function map_gameover_depth4(game: Chess) {
  return game.moves({ verbose: false }).map((move1d) => {
    let game1d = new Chess(game.fen());
    game1d.move(move1d);

    const game_over1d = game1d.isGameOver();
    if (game_over1d) {
      return [true];
    }

    const moves1dResult = game1d.moves({ verbose: false }).map((move2d) => {
      let game2d = new Chess(game1d.fen());
      game2d.move(move2d);

      const game_over2d = game2d.isGameOver();
      if (game_over2d) {
        return [true];
      }

      const moves3dResult = game2d.moves({ verbose: false }).map((move3d) => {
        let game3d = new Chess(game2d.fen());
        game3d.move(move3d);

        const game_over3d = game3d.isGameOver();
        if (game_over3d) {
          return [true];
        }

        const moves4dResult = game3d.moves({ verbose: false }).map((move4d) => {
          let game4d = new Chess(game3d.fen());
          game4d.move(move4d);

          const game_over4d = game4d.isGameOver();
          if (game_over4d) {
            return [true];
          }

          const moves5dResult = game4d
            .moves({ verbose: false })
            .map((move5d) => {
              let game5d = new Chess(game4d.fen());
              game5d.move(move5d);

              return [game5d.isGameOver()];
            });

          return [game_over4d, moves5dResult];
        });

        return [game_over3d, moves4dResult];
      });

      return [game_over2d, moves3dResult];
    });

    return [game_over1d, moves1dResult];
  });
}

let testLoad = new Chess();

function loadGame(game: Chess, moves: Array<any>) {
  if (0 < moves.length) {
    let tmp = game.moves({ verbose: false });
    //console.log("tmp", tmp);
    game.move(tmp[moves[0]]);
    moves.shift();
    loadGame(game, moves);
  }
}
loadGame(testLoad, [19, 19, 19, 20]);
console.log("loadGame", testLoad.history(), testLoad.fen());

function copy_game(game: Chess, moves: Array<number>) {
  // Create a new game instance from the FEN of the current game
  let copy = new Chess(game.fen());

  // Apply moves to the copy
  moves.forEach((moveIndex) => {
    let availableMoves = copy.moves();
    if (moveIndex >= 0 && moveIndex < availableMoves.length) {
      copy.move(availableMoves[moveIndex]);
    } else {
      console.error(`Invalid move index: ${moveIndex}`);
    }
  });

  return copy;
}

testLoad = new Chess();
copy_game(testLoad, [19, 19, 19, 20]);
console.log("copy_game", testLoad.history(), testLoad.fen());

const aberturas_map: any = map_gameover_depth4(aberturas);

var checkmates = 0;
function loop(matrix1: any) {
  for (let i = 0; i < matrix1.length; i++) {
    //console.log("i:",i,matrix1[i])
    for (let j = 0; j < matrix1[i][1].length; j++) {
      //console.log("i:",i,"j:",j,matrix1[i][1][j])
      for (let k = 0; k < matrix1[i][1][j][1].length; k++) {
        //console.log("i:", i, "j:", j, "k:", k, matrix1[i][1][j][1][k][1]);
        for (let n = 0; n < matrix1[i][1][j][1][k][1].length; n++) {
          for (let m = 0; m < matrix1[i][1][j][1][k][1][n][1].length; m++) {
            if (matrix1[i][1][j][1][k][1][n][1][m][0]) {
              checkmates++;
              console.log("checkmates", checkmates);
            }
          }

          /*let tmp = new Chess();
          loadGame(tmp, [i, j, k, n]);

          const tmp_map: any = map_gameover_depth4(tmp);
          loop2(tmp_map);*/
          /*console.log(
            "i:",
            i,
            "j:",
            j,
            "k:",
            k,
            "n:",
            n,
            matrix1[i][1][j][1][k][1][n][0]
          );*/
        }
      }
    }
  }
}

loop(aberturas_map);
