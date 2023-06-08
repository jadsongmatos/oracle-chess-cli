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

          const moves4dResult = [game4d.isGameOver()];

          return moves4dResult;
        });

        return [game_over3d, moves4dResult];
      });

      return [game_over2d, moves3dResult];
    });

    return [game_over1d, moves1dResult];
  });
}

function load_game(moves: Array<number>) {
  const game = new Chess();

  // Apply moves
  moves.forEach((moveIndex) => {
    let availableMoves = game.moves();
    if (moveIndex >= 0 && moveIndex < availableMoves.length) {
      game.move(availableMoves[moveIndex]);
    } else {
      console.error(`Invalid move index: ${moveIndex}`);
    }
  });

  return game;
}

const testLoad = load_game([19, 19, 19, 20]);
console.log("load_game", testLoad.history(), testLoad.fen());

const aberturas_map = map_gameover_depth4(aberturas);

var checkmates = 0;

function loop(matrix1: any) {
  for (let i = 0; i < matrix1.length; i++) {
    //console.log("i:",i,matrix1[i])
    for (let j = 0; j < matrix1[i][1].length; j++) {
      //console.log("i:",i,"j:",j,matrix1[i][1][j])
      for (let k = 0; k < matrix1[i][1][j][1].length; k++) {
        //console.log("i:", i, "j:", j, "k:", k, matrix1[i][1][j][1][k][1]);
        console.log("i:", i, "j:", j, "k:", k, "checkmates:", checkmates);
        for (let n = 0; n < matrix1[i][1][j][1][k][1].length; n++) {
          if (matrix1[i][1][j][1][k][1][n][0]) {
            checkmates++;
          } else {
            checkmates = checkmates + add_deep([i, j, k, n]);
          }
        }
      }
    }
  }
}

function add_deep(moves: Array<number>) {
  const game = load_game(moves);
  let checkmates = 0;

  game.moves({ verbose: false }).forEach((move1d) => {
    let game1d = new Chess(game.fen());
    game1d.move(move1d);

    if (game1d.isGameOver()) {
      checkmates++;
    }
  });

  return checkmates
}

loop(aberturas_map);
