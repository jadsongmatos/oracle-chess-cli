//const Chess: any = import("chess.js");
import { Chess } from "chess.js";
import { Move } from "chess.js";

const game = new Chess();

function allMoves(chess: Chess, depth: number = 1): Move[] {
  let moves: Move[] = [];

  if (depth <= 0) {
    return moves;
  }

  const legalMoves = chess.moves({ verbose: true });

  for (const move of legalMoves) {
    chess.move(move);

    if (chess.isGameOver()) {
      moves.push(move);
    } else {
      const nextMoves = allMoves(chess, depth - 1);
      moves.push(...nextMoves);
    }

    chess.undo();
  }

  return moves;
}

//console.log(allMoves(game, 2));

function listMovesToDepth3(game: Chess, depth: number): any {
  const moves: any = [];

  // Recursive function to generate and explore moves
  function exploreMoves(currentGame: Chess, currentDepth: number) {
    if (currentDepth === 0) {
      return;
    }

    const allMoves = currentGame.moves({ verbose: true });

    for (const move of allMoves) {
      const nextGame = new Chess(currentGame.fen());
      nextGame.move(move);

      // Recursively explore next moves
      let tmp = listMovesToDepth3(nextGame, currentDepth - 1);
      moves.push(move.to, tmp);
    }
  }

  exploreMoves(game, depth);

  return moves;
}

//console.log(listMovesToDepth3(game,2));
//let moves = game.moves({ verbose: false })
//console.log(moves)
//console.log(moves.length)

function listMovesDepth3_old(game: Chess) {
  let moves1d = game.moves({ verbose: false });

  return moves1d.map((move1d) => {
    const game1d = new Chess(game.fen());
    game1d.move(move1d);

    let moves2d = game1d.moves({ verbose: false });

    return [
      move1d,
      moves2d.map((move2d) => {
        const game3d = new Chess(game1d.fen());
        game3d.move(move2d);

        let moves3d = game3d.moves({ verbose: false });

        return [
          move2d,
          moves3d.map((move3d) => {
            return move3d;
          }),
        ];
      }),
    ];
  });
}

function listMovesDepth3(game: Chess) {
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

        //const moves4dResult = [game.isGameOver()];

        game.undo();
        return move3d;
      });

      game.undo();
      return [move2d, moves3dResult];
    });

    game.undo();
    return [move1d, moves1dResult];
  });
}

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


const list_old = listMovesDepth3_old(game);
//console.log(list_old[0][0]);
//console.log(list_old[0][1]);

const list = listMovesDepth3(game);
console.log(list[0][0]);
console.log(list[0][1]);


function matricesAreEqual(matrix1: any, matrix2: any) {
  // Check if matrices have the same dimensions
  if (matrix1.length !== matrix2.length) return false;
  if (matrix1[0].length !== matrix2[0].length) return false;
  if (matrix1[0][0].length !== matrix2[0][0].length) return false;
  if (matrix1[0][0][0].length !== matrix2[0][0][0].length) return false;

  // Check if each element is equal
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1[0].length; j++) {
      for (let k = 0; k < matrix1[0][0].length; k++) {
        for (let n = 0; n < matrix1[0][0][0].length; n++) {
          if (matrix1[i][j][k][n] !== matrix2[i][j][k][n]) {
            console.log(
              "matricesAreEqual",
              i,
              j,
              k,
              n,

              matrix1[i][j][k][n],
              matrix2[i][j][k][n]
            );
            return false;
          }
        }
      }
    }
  }

  // If we made it through the above loop without returning false, the matrices are equal
  return true;
}

console.log("igual", matricesAreEqual(list_old, list));
