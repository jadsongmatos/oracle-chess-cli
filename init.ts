import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { Chess } from "chess.js";

const aberturas = new Chess();

function map_gameover_depth4(game: Chess) {
  return game.moves({ verbose: false }).map((move1d) => {
    let game1d = new Chess(game.fen());
    game1d.move(move1d);

    const game_over1d = game1d.isGameOver();
    if (game_over1d) {
      return [{ gameover: true, checkmate: game1d.isCheckmate() }];
    }

    const moves1dResult = game1d.moves({ verbose: false }).map((move2d) => {
      let game2d = new Chess(game1d.fen());
      game2d.move(move2d);

      const game_over2d = game2d.isGameOver();
      if (game_over2d) {
        return [{ gameover: true, checkmate: game2d.isCheckmate() }];
      }

      const moves3dResult = game2d.moves({ verbose: false }).map((move3d) => {
        let game3d = new Chess(game2d.fen());
        game3d.move(move3d);

        const game_over3d = game3d.isGameOver();
        if (game_over3d) {
          return [{ gameover: true, checkmate: game3d.isCheckmate() }];
        }

        const moves4dResult = game3d.moves({ verbose: false }).map((move4d) => {
          let game4d = new Chess(game3d.fen());
          game4d.move(move4d);

          return {
            gameover: game4d.isGameOver(),
            checkmate: game4d.isCheckmate(),
          };
        });

        return [{ gameover: game_over3d, checkmate: false }, moves4dResult];
      });

      return [{ gameover: game_over2d, checkmate: false }, moves3dResult];
    });

    return [{ gameover: game_over1d, checkmate: false }, moves1dResult];
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

async function salvando_aberturas(matrix1: Array<any>) {
  try {
    for (let i = 0; i < matrix1.length; i++) {
      const e1d = await prisma.tree.create({
        data: {
          user_id: "0",
          gameover: matrix1[i][0].gameover,
          checkmate: matrix1[i][0].checkmate,
          move: i,
        },
      });

      const e2dPromises = matrix1[i][1].map((elem: any, j: number) => prisma.tree.create({
        data: {
          user_id: "0",
          gameover: elem[0].gameover,
          checkmate: elem[0].checkmate,
          move: j,
          previousMoveId: e1d.id
        },
      }));

      const e2ds = await Promise.all(e2dPromises);

      for (let j = 0; j < e2ds.length; j++) {
        const e3dPromises = matrix1[i][1][j][1].map((elem: any, k: number) => prisma.tree.create({
          data: {
            user_id: "0",
            gameover: elem[0].gameover,
            checkmate: elem[0].checkmate,
            move: k,
            previousMoveId: e2ds[j].id
          },
        }));

        const e3ds = await Promise.all(e3dPromises);

        for (let k = 0; k < e3ds.length; k++) {
          console.log("i:", i, "j:", j, "k:", k);
          const e4dPromises = matrix1[i][1][j][1][k][1].map((elem: any, n: number) => prisma.tree.create({
            data: {
              user_id: "0",
              gameover: elem.gameover,
              checkmate: elem.checkmate,
              move: n,
              previousMoveId: e3ds[k].id
            },
          }));

          await Promise.all(e4dPromises);
        }
      }
    }
  } catch (err) {
    console.log("catch", err);
  }
}


salvando_aberturas(aberturas_map);
