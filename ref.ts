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


function listMovesDepth3(game: Chess) {
    let moves1d = game.moves({ verbose: false })


    return moves1d.map(move1d => {
        const game1d = new Chess(game.fen());
        game1d.move(move1d);

        let moves2d = game1d.moves({ verbose: false })

        return [move1d, moves2d.map(move2d => {
            const game3d = new Chess(game1d.fen());
            game3d.move(move2d);

            let moves3d = game3d.moves({ verbose: false })

            return [move2d, moves3d.map(move3d => {
                return move3d
            })]
        })]
    })
}

const list = listMovesDepth3(game)
console.log(list[0][0])
console.log(list[0][1]);