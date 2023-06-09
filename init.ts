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
/*
//cotando numero de checkmates
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
*/

/*
async function salvando_aberturas(matrix1: Array<any>) {
  const insert1dPromises = matrix1.map(async (e1d: Array<any>, i: number) => {
    const insert2dPromises = e1d[1].map(async (e2d: Array<any>, j: number) => {
      const insert3dPromises = e2d[1].map(
        async (e3d: Array<any>, k: number) => {
          const insert4dPromises = e3d[1].map(
            async (e4d: any, n: number) => {
              console.log(i, j, k, n,e4d);
              return prisma.tree.create({
                data: {
                  user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
                  gameover: e4d[0].gameover,
                  checkmate: e4d[0].checkmate,
                  moves: Buffer.from([0, i, j, k, n]).toString("base64"),
                },
              });
            }
          );
          await Promise.all(insert4dPromises);
          //console.log(i, j, k);
          return prisma.tree.create({
            data: {
              user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
              gameover: e3d[0].gameover,
              checkmate: e3d[0].checkmate,
              moves: Buffer.from([0, i, j, k]).toString("base64"),
            },
          });
        }
      );
      await Promise.all(insert3dPromises);

      //console.log(i, j);
      return prisma.tree.create({
        data: {
          user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
          gameover: e2d[0].gameover,
          checkmate: e2d[0].checkmate,
          moves: Buffer.from([0, i, j]).toString("base64"),
        },
      });
    });

    await Promise.all(insert2dPromises);

    //console.log(i);
    return prisma.tree.create({
      data: {
        user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
        gameover: e1d[0].gameover,
        checkmate: e1d[0].checkmate,
        moves: Buffer.from([0, i]).toString("base64"),
      },
    });
  });

  await Promise.all(insert1dPromises);
}
*/

async function salvando_aberturas(matrix1: Array<any>) {
  const insert1dPromises = matrix1.map(async (e1d: Array<any>, i: number) => {
    return prisma.tree.create({
      data: {
        user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
        gameover: e1d[0].gameover,
        checkmate: e1d[0].checkmate,
        move: i,
      },
    });
  });

  await Promise.all(insert1dPromises);

  for (let i = 0; i < matrix1.length; i++) {
    const insert1dPromises = matrix1.map(async (e1d: Array<any>, i: number) => {
      return prisma.tree.create({
        data: {
          user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
          gameover: e1d[0].gameover,
          checkmate: e1d[0].checkmate,
          move: i,
        },
      });
    });

    const result_1d = await Promise.all(insert1dPromises);

    const insert2dPromises = result_1d.map((e1d: any, i: number) => {
      return prisma.tree.create({
        data: {
          user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
          gameover: matrix1[i][1][0].gameover,
          checkmate: matrix1[i][1][0].checkmate,
          move: i,
          previousMoveId: e1d.id,
        },
      });
    });

    const result_2d = await Promise.all(insert2dPromises);

    const insert3dPromises = result_1d.map((e1d: any, i: number) => {
      return result_2d.map((e2d: any, j: number) => {
        console.log(i, j);
        return prisma.tree.create({
          data: {
            user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
            gameover: matrix1[i][1][j][0].gameover,
            checkmate: matrix1[i][1][j][0].checkmate,
            move: i,
            previousMoveId: e2d.id,
          },
        });
      });
    });

    const result_3d = await Promise.all(insert3dPromises);

    const insert4dPromises = result_1d.map((e1d: any, i: number) => {
      return result_2d.map((e2d: any, j: number) => {
        return result_3d.map((e3d: any, k: number) => {
          console.log(i, j, k);
          return prisma.tree.create({
            data: {
              user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
              gameover: matrix1[i][1][j][1][k][0].gameover,
              checkmate: matrix1[i][1][j][1][k][0].checkmate,
              move: i,
              previousMoveId: e3d.id,
            },
          });
        });
      });
    });

    const result_4d = await Promise.all(insert4dPromises);

    const insert5dPromises = result_1d.map((e1d: any, i: number) => {
      return result_2d.map((e2d: any, j: number) => {
        return result_3d.map((e3d: any, k: number) => {
          return result_4d.map((e4d: any, k: number) => {
            console.log(i, j, k, matrix1[i][1][j][1][k][1]);
            /*return prisma.tree.create({
              data: {
                user_id: "4c57cec3-a797-4366-a442-bdffbb3f7428",
                gameover: matrix1[e1d.move][1][j][1][k][1].gameover,
                checkmate: matrix1[e1d.move][1][j][1][k][1].checkmate,
                move: i,
                previousMoveId: e4d.id,
              },
            });*/
          });
        });
      });
    });

    //const result_5d = await Promise.all(insert5dPromises);
  }
}

salvando_aberturas(aberturas_map);
