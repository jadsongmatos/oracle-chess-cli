import { Chess } from "chess.js";

const aberturas = new Chess();

function map_gameover_depth4(game: Chess) {
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
        const game_over3d = game.isGameOver()
        if (game_over3d) {
          return [true];
        }

        const moves4dResult = game.moves({ verbose: false }).map((move4d) => {
          game.move(move4d);

          const moves5dResult = [game.isGameOver()];

          game.undo();
          return moves5dResult;
        });

        game.undo();
        return [game_over3d, moves4dResult];
      });

      game.undo();
      return [game_over2d, moves3dResult];
    });

    game.undo();
    return [game_over1d, moves1dResult];
  });
}

const aberturas_map: any = map_gameover_depth4(aberturas);

function loop(matrix1: any) {
  for (let i = 0; i < matrix1.length; i++) {
    //console.log("i:",i,matrix1[i])
    for (let j = 0; j < matrix1[i][1].length; j++) {
      //console.log("i:",i,"j:",j,matrix1[i][1][j])
      for (let k = 0; k < matrix1[i][1][j][1].length; k++) {
        //console.log("i:", i, "j:", j, "k:", k, matrix1[i][1][j][1][k][1]);
        for (let n = 0; n < matrix1[i][1][j][1][k][1].length; n++) {
          console.log(
            "i:",
            i,
            "j:",
            j,
            "k:",
            k,
            "n:",
            n,
            matrix1[i][1][j][1][k][1][n][0]
          );
        }
      }
    }
  }
}

loop(aberturas_map);
