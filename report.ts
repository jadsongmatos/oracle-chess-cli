import { Chess } from "chess.js";

let aberturas = new Chess();

var index = 0;
function map_gameover_depth5(game: Chess) {
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
        console.log(index);

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

          const moves4dResult = game4d
            .moves({ verbose: false })
            .map((move5d) => {
              let game5d = new Chess(game4d.fen());
              game5d.move(move5d);
              index++;

              const moves5dResult = [game5d.isGameOver()];

              game5d.undo();
              return moves5dResult;
            });

          return [game_over4d, moves4dResult];
        });

        return [game_over3d, moves4dResult];
      });

      return [game_over2d, moves3dResult];
    });

    return [game_over1d, moves1dResult];
  });
}

console.log(map_gameover_depth5(aberturas));

aberturas = new Chess();
index = 0;

function map_gameover_depth5_erro(game: Chess) {
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
        console.log(index);

        const game_over3d = game.isGameOver();
        if (game_over3d) {
          return [true];
        }

        const moves4dResult = game.moves({ verbose: false }).map((move4d) => {
          game.move(move4d);

          const game_over4d = game.isGameOver();
          if (game_over4d) {
            return [true];
          }

          const moves4dResult = game.moves({ verbose: false }).map((move5d) => {
            game.move(move5d);
            index++;

            const moves5dResult = [game.isGameOver()];

            game.undo();
            return moves5dResult;
          });

          game.undo();
          return [game_over4d, moves4dResult];
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

console.log(map_gameover_depth5_erro(aberturas)); //throw new Error(`Invalid move: ${move}`)