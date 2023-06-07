import { Chess } from "chess.js";

const aberturas = new Chess();

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

const aberturas_map: any = map_gameover_depth3(aberturas);
console.log(aberturas_map)

function loop(matrix1: any) {
  for (let i = 0; i < matrix1.length; i++) {
    //console.log("i:",i,matrix1[i])
    for (let j = 0; j < matrix1[0].length; j++) {
      console.log("i:",i,"j:",j,matrix1[i][1][j])
      for (let k = 0; k < matrix1[0][0].length; k++) {
        console.log("i:",i,"j:",j,"k:",k,matrix1[i][1][j][1][k])
        /*for (let n = 0; n < matrix1[0][0][0].length; n++) {
          console.log(
            "loop:",
            i,
            j,
            k,
            n,
            matrix1[i][j][k][n]
          );
        }*/
      }
    }
  }
}

//loop(aberturas_map);
