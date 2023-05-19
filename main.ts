const PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15],
};

const PIECE_OFFSETS = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1],
};

// prettier-ignore
const ATTACKS = [
  20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0,
  0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0,
  0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0,
  0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0,
  0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
  24, 24, 24, 24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0,
  0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0,
  0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0,
  0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0,
  0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0,
  20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20
];

// prettier-ignore
const RAYS = [
  17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0,
  0, 17, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0,
  0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0,
  0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0,
  0, 0, 0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0,
  0, 0, 0, 0, 0, 0, -15, -16, -17, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0,
  0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0,
  0, 0, -15, 0, 0, 0, 0, -16, 0, 0, 0, 0, -17, 0, 0, 0,
  0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0,
  -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17
];

const PIECE_MASKS = { p: 0x1, n: 0x2, b: 0x4, r: 0x8, q: 0x10, k: 0x20 };

const Ox88: Record<any, number> = {
  a8: 0,
  b8: 1,
  c8: 2,
  d8: 3,
  e8: 4,
  f8: 5,
  g8: 6,
  h8: 7,
  a7: 16,
  b7: 17,
  c7: 18,
  d7: 19,
  e7: 20,
  f7: 21,
  g7: 22,
  h7: 23,
  a6: 32,
  b6: 33,
  c6: 34,
  d6: 35,
  e6: 36,
  f6: 37,
  g6: 38,
  h6: 39,
  a5: 48,
  b5: 49,
  c5: 50,
  d5: 51,
  e5: 52,
  f5: 53,
  g5: 54,
  h5: 55,
  a4: 64,
  b4: 65,
  c4: 66,
  d4: 67,
  e4: 68,
  f4: 69,
  g4: 70,
  h4: 71,
  a3: 80,
  b3: 81,
  c3: 82,
  d3: 83,
  e3: 84,
  f3: 85,
  g3: 86,
  h3: 87,
  a2: 96,
  b2: 97,
  c2: 98,
  d2: 99,
  e2: 100,
  f2: 101,
  g2: 102,
  h2: 103,
  a1: 112,
  b1: 113,
  c1: 114,
  d1: 115,
  e1: 116,
  f1: 117,
  g1: 118,
  h1: 119,
};

const BITS: Record<string, number> = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64,
};

type InternalMove = {
  color: Color;
  from: number;
  to: number;
  piece: PieceSymbol;
  captured?: PieceSymbol;
  promotion?: PieceSymbol;
  flags: number;
};

interface History {
  move: InternalMove;
  kings: Record<Color, number>;
  turn: Color;
  castling: Record<Color, number>;
  epSquare: number;
  halfMoves: number;
  moveNumber: number;
}

const ROOKS = {
  w: [
    { square: Ox88.a1, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h1, flag: BITS.KSIDE_CASTLE },
  ],
  b: [
    { square: Ox88.a8, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h8, flag: BITS.KSIDE_CASTLE },
  ],
};

export type Color = "w" | "b";
export type PieceSymbol = "p" | "n" | "b" | "r" | "q" | "k";

export type Piece = {
  color: Color;
  type: PieceSymbol;
};

const EMPTY = -1;
export const WHITE = "w";
export const BLACK = "b";
export const PAWN = "p";
export const KNIGHT = "n";
export const BISHOP = "b";
export const ROOK = "r";
export const QUEEN = "q";
export const KING = "k";

const PROMOTIONS: PieceSymbol[] = [KNIGHT, BISHOP, ROOK, QUEEN];

const RANK_1 = 7;
const RANK_2 = 6;
/*
 * const RANK_3 = 5
 * const RANK_4 = 4
 * const RANK_5 = 3
 * const RANK_6 = 2
 */
const RANK_7 = 1;
const RANK_8 = 0;

const FLAGS: Record<string, string> = {
  NORMAL: "n",
  CAPTURE: "c",
  BIG_PAWN: "b",
  EP_CAPTURE: "e",
  PROMOTION: "p",
  KSIDE_CASTLE: "k",
  QSIDE_CASTLE: "q",
};

const SECOND_RANK = { b: RANK_7, w: RANK_2 };

export class Chess {
  private _board = new Array<Piece>(128);
  private _turn: Color = WHITE;

  private _kings: Record<Color, number> = { w: EMPTY, b: EMPTY };
  private _epSquare = -1;
  private _halfMoves = 0;
  private _moveNumber = 0;
  private _history: History[] = [];
  private _castling: Record<Color, number> = { w: 0, b: 0 };

  constructor(moves: any) {
    this.load(moves);
  }

  _updateCastlingRights() {
    const whiteKingInPlace =
      this._board[Ox88.e1]?.type === KING &&
      this._board[Ox88.e1]?.color === WHITE;
    const blackKingInPlace =
      this._board[Ox88.e8]?.type === KING &&
      this._board[Ox88.e8]?.color === BLACK;

    if (
      !whiteKingInPlace ||
      this._board[Ox88.a1]?.type !== ROOK ||
      this._board[Ox88.a1]?.color !== WHITE
    ) {
      this._castling.w &= ~BITS.QSIDE_CASTLE;
    }

    if (
      !whiteKingInPlace ||
      this._board[Ox88.h1]?.type !== ROOK ||
      this._board[Ox88.h1]?.color !== WHITE
    ) {
      this._castling.w &= ~BITS.KSIDE_CASTLE;
    }

    if (
      !blackKingInPlace ||
      this._board[Ox88.a8]?.type !== ROOK ||
      this._board[Ox88.a8]?.color !== BLACK
    ) {
      this._castling.b &= ~BITS.QSIDE_CASTLE;
    }

    if (
      !blackKingInPlace ||
      this._board[Ox88.h8]?.type !== ROOK ||
      this._board[Ox88.h8]?.color !== BLACK
    ) {
      this._castling.b &= ~BITS.KSIDE_CASTLE;
    }
  }

  _swapColor(color: Color): Color {
    return color === WHITE ? BLACK : WHITE;
  }

  _updateEnPassantSquare() {
    if (this._epSquare === EMPTY) {
      return;
    }

    const startSquare = this._epSquare + (this._turn === WHITE ? -16 : 16);
    const currentSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
    const attackers = [currentSquare + 1, currentSquare - 1];

    if (
      this._board[startSquare] !== null ||
      this._board[this._epSquare] !== null ||
      this._board[currentSquare]?.color !== this._swapColor(this._turn) ||
      this._board[currentSquare]?.type !== PAWN
    ) {
      this._epSquare = EMPTY;
      return;
    }

    const canCapture = (square: number) =>
      !(square & 0x88) &&
      this._board[square]?.color === this._turn &&
      this._board[square]?.type === PAWN;

    if (!attackers.some(canCapture)) {
      this._epSquare = EMPTY;
    }
  }

  _attacked(color: Color, square: number) {
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      // did we run off the end of the board
      if (i & 0x88) {
        i += 7;
        continue;
      }

      // if empty square or wrong color
      if (this._board[i] === undefined || this._board[i].color !== color) {
        continue;
      }

      const piece = this._board[i];
      const difference = i - square;

      // skip - to/from square are the same
      if (difference === 0) {
        continue;
      }

      const index = difference + 119;

      if (ATTACKS[index] & PIECE_MASKS[piece.type]) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true;
          } else {
            if (piece.color === BLACK) return true;
          }
          continue;
        }

        // if the piece is a knight or a king
        if (piece.type === "n" || piece.type === "k") return true;

        const offset = RAYS[index];
        let j = i + offset;

        let blocked = false;
        while (j !== square) {
          if (this._board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }

        if (!blocked) return true;
      }
    }

    return false;
  }

  private _isKingAttacked(color: Color) {
    const square = this._kings[color];
    return square === -1
      ? false
      : this._attacked(this._swapColor(color), square);
  }

  private _makeMove(move: InternalMove) {
    const us = this._turn;
    const them = this._swapColor(us);

    this._board[move.to] = this._board[move.from];
    delete this._board[move.from];

    // if ep capture, remove the captured pawn
    if (move.flags & BITS.EP_CAPTURE) {
      if (this._turn === BLACK) {
        delete this._board[move.to - 16];
      } else {
        delete this._board[move.to + 16];
      }
    }

    // if pawn promotion, replace with new piece
    if (move.promotion) {
      this._board[move.to] = { type: move.promotion, color: us };
    }

    // if we moved the king
    if (this._board[move.to].type === KING) {
      this._kings[us] = move.to;

      // if we castled, move the rook next to the king
      if (move.flags & BITS.KSIDE_CASTLE) {
        const castlingTo = move.to - 1;
        const castlingFrom = move.to + 1;
        this._board[castlingTo] = this._board[castlingFrom];
        delete this._board[castlingFrom];
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        const castlingTo = move.to + 1;
        const castlingFrom = move.to - 2;
        this._board[castlingTo] = this._board[castlingFrom];
        delete this._board[castlingFrom];
      }

      // turn off castling
      this._castling[us] = 0;
    }

    // turn off castling if we move a rook
    if (this._castling[us]) {
      for (let i = 0, len = ROOKS[us].length; i < len; i++) {
        if (
          move.from === ROOKS[us][i].square &&
          this._castling[us] & ROOKS[us][i].flag
        ) {
          this._castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }

    // turn off castling if we capture a rook
    if (this._castling[them]) {
      for (let i = 0, len = ROOKS[them].length; i < len; i++) {
        if (
          move.to === ROOKS[them][i].square &&
          this._castling[them] & ROOKS[them][i].flag
        ) {
          this._castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }

    // if big pawn move, update the en passant square
    if (move.flags & BITS.BIG_PAWN) {
      if (us === BLACK) {
        this._epSquare = move.to - 16;
      } else {
        this._epSquare = move.to + 16;
      }
    } else {
      this._epSquare = EMPTY;
    }

    // reset the 50 move counter if a pawn is moved or a piece is captured
    if (move.piece === PAWN) {
      this._halfMoves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this._halfMoves = 0;
    } else {
      this._halfMoves++;
    }

    if (us === BLACK) {
      this._moveNumber++;
    }

    this._turn = them;
  }

  private _undoMove() {
    const old: any = this._history.pop();
    if (old === undefined) {
      return null;
    }

    const move = old.move;

    this._kings = old.kings;
    this._turn = old.turn;
    this._castling = old.castling;
    this._epSquare = old.epSquare;
    this._halfMoves = old.halfMoves;
    this._moveNumber = old.moveNumber;

    const us = this._turn;
    const them = this._swapColor(us);

    this._board[move.from] = this._board[move.to];
    this._board[move.from].type = move.piece; // to undo any promotions
    delete this._board[move.to];

    if (move.captured) {
      if (move.flags & BITS.EP_CAPTURE) {
        // en passant capture
        let index: number;
        if (us === BLACK) {
          index = move.to - 16;
        } else {
          index = move.to + 16;
        }
        this._board[index] = { type: PAWN, color: them };
      } else {
        // regular capture
        this._board[move.to] = { type: move.captured, color: them };
      }
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      let castlingTo: number, castlingFrom: number;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castlingTo = move.to + 1;
        castlingFrom = move.to - 1;
      } else {
        castlingTo = move.to - 2;
        castlingFrom = move.to + 1;
      }

      this._board[castlingTo] = this._board[castlingFrom];
      delete this._board[castlingFrom];
    }

    return move;
  }

  _moves({
    legal = true,
    piece = undefined,
    square = undefined,
  }: {
    legal?: boolean;
    piece?: PieceSymbol;
    square?: any;
  } = {}) {
    const forSquare = square ? square.toLowerCase() : undefined;
    const forPiece = piece?.toLowerCase();

    const moves: any[] = [];
    const us = this._turn;
    const them = this._swapColor(us);

    let firstSquare = Ox88.a8;
    let lastSquare = Ox88.h1;
    let singleSquare = false;

    // are we generating moves for a single square?
    if (forSquare) {
      // illegal square, return empty moves
      if (!(forSquare in Ox88)) {
        return [];
      } else {
        firstSquare = lastSquare = Ox88[forSquare];
        singleSquare = true;
      }
    }

    for (let from = firstSquare; from <= lastSquare; from++) {
      // did we run off the end of the board
      if (from & 0x88) {
        from += 7;
        continue;
      }

      // empty square or opponent, skip
      if (!this._board[from] || this._board[from].color === them) {
        continue;
      }
      const { type } = this._board[from];

      let to: number;
      if (type === PAWN) {
        if (forPiece && forPiece !== type) continue;

        // single square, non-capturing
        to = from + PAWN_OFFSETS[us][0];
        if (!this._board[to]) {
          this.addMove(moves, us, from, to, PAWN);

          // double square
          to = from + PAWN_OFFSETS[us][1];
          if (SECOND_RANK[us] === this.rank(from) && !this._board[to]) {
            this.addMove(moves, us, from, to, PAWN, undefined, BITS.BIG_PAWN);
          }
        }

        // pawn captures
        for (let j = 2; j < 4; j++) {
          to = from + PAWN_OFFSETS[us][j];
          if (to & 0x88) continue;

          if (this._board[to]?.color === them) {
            this.addMove(
              moves,
              us,
              from,
              to,
              PAWN,
              this._board[to].type,
              BITS.CAPTURE
            );
          } else if (to === this._epSquare) {
            this.addMove(moves, us, from, to, PAWN, PAWN, BITS.EP_CAPTURE);
          }
        }
      } else {
        if (forPiece && forPiece !== type) continue;

        for (let j = 0, len = PIECE_OFFSETS[type].length; j < len; j++) {
          const offset = PIECE_OFFSETS[type][j];
          to = from;

          while (true) {
            to += offset;
            if (to & 0x88) break;

            if (!this._board[to]) {
              this.addMove(moves, us, from, to, type);
            } else {
              // own color, stop loop
              if (this._board[to].color === us) break;

              this.addMove(
                moves,
                us,
                from,
                to,
                type,
                this._board[to].type,
                BITS.CAPTURE
              );
              break;
            }

            /* break, if knight or king */
            if (type === KNIGHT || type === KING) break;
          }
        }
      }
    }

    /*
     * check for castling if we're:
     *   a) generating all moves, or
     *   b) doing single square move generation on the king's square
     */

    if (forPiece === undefined || forPiece === KING) {
      if (!singleSquare || lastSquare === this._kings[us]) {
        // king-side castling
        if (this._castling[us] & BITS.KSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom + 2;

          if (
            !this._board[castlingFrom + 1] &&
            !this._board[castlingTo] &&
            !this._attacked(them, this._kings[us]) &&
            !this._attacked(them, castlingFrom + 1) &&
            !this._attacked(them, castlingTo)
          ) {
            this.addMove(
              moves,
              us,
              this._kings[us],
              castlingTo,
              KING,
              undefined,
              BITS.KSIDE_CASTLE
            );
          }
        }

        // queen-side castling
        if (this._castling[us] & BITS.QSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom - 2;

          if (
            !this._board[castlingFrom - 1] &&
            !this._board[castlingFrom - 2] &&
            !this._board[castlingFrom - 3] &&
            !this._attacked(them, this._kings[us]) &&
            !this._attacked(them, castlingFrom - 1) &&
            !this._attacked(them, castlingTo)
          ) {
            this.addMove(
              moves,
              us,
              this._kings[us],
              castlingTo,
              KING,
              undefined,
              BITS.QSIDE_CASTLE
            );
          }
        }
      }
    }

    /*
     * return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal || this._kings[us] === -1) {
      return moves;
    }

    // filter out illegal moves
    const legalMoves: any[] = [];
    let len = moves.length;
    for (let i = 0; i < len; i++) {
      this._makeMove(moves[i]);
      if (!this._isKingAttacked(us)) {
        legalMoves.push(moves[i]);
      }
      this._undoMove();
    }

    return legalMoves;
  }

  rank(square: number): number {
    return square >> 4;
  }

  addMove(
    moves: any[],
    color: Color,
    from: number,
    to: number,
    piece: PieceSymbol,
    captured: PieceSymbol | undefined = undefined,
    flags: number = BITS.NORMAL
  ) {
    const r = this.rank(to);

    if (piece === PAWN && (r === RANK_1 || r === RANK_8)) {
      for (let i = 0; i < PROMOTIONS.length; i++) {
        const promotion = PROMOTIONS[i];
        moves.push({
          color,
          from,
          to,
          piece,
          captured,
          promotion,
          flags: flags | BITS.PROMOTION,
        });
      }
    } else {
      moves.push({
        color,
        from,
        to,
        piece,
        captured,
        flags,
      });
    }
  }

  clear() {
    this._board = new Array<Piece>(128);
    this._kings = { w: EMPTY, b: EMPTY };
    this._turn = WHITE;
    this._castling = { w: 0, b: 0 };
    this._epSquare = EMPTY;
    this._halfMoves = 0;
    this._moveNumber = 1;
    this._history = [];
  }

  load(moves: any[]) { }

  get(square: any) {
    return this._board[Ox88[square]] || false;
  }

  remove(square: any) {
    const piece = this.get(square);
    delete this._board[Ox88[square]];
    if (piece && piece.type === KING) {
      this._kings[piece.color] = EMPTY;
    }

    this._updateCastlingRights();
    this._updateEnPassantSquare();

    return piece;
  }

  isAttacked(square: any, attackedBy: Color) {
    return this._attacked(attackedBy, Ox88[square]);
  }

  isCheck() {
    return this._isKingAttacked(this._turn);
  }

  inCheck() {
    return this.isCheck();
  }

  isCheckmate() {
    return this.isCheck() && this._moves().length === 0;
  }

  isStalemate() {
    return !this.isCheck() && this._moves().length === 0;
  }

  isInsufficientMaterial() {
    /*
     * k.b. vs k.b. (of opposite colors) with mate in 1:
     * 8/8/8/8/1b6/8/B1k5/K7 b - - 0 1
     *
     * k.b. vs k.n. with mate in 1:
     * 8/8/8/8/1n6/8/B7/K1k5 b - - 2 1
     */
    const pieces: Record<PieceSymbol, number> = {
      b: 0,
      n: 0,
      r: 0,
      q: 0,
      k: 0,
      p: 0,
    };
    const bishops: number[] = [];
    let numPieces = 0;
    let squareColor = 0;

    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      squareColor = (squareColor + 1) % 2;
      if (i & 0x88) {
        i += 7;
        continue;
      }

      const piece = this._board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(squareColor);
        }
        numPieces++;
      }
    }

    // k vs. k
    if (numPieces === 2) {
      return true;
    } else if (
      // k vs. kn .... or .... k vs. kb
      numPieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true;
    } else if (numPieces === pieces[BISHOP] + 2) {
      // kb vs. kb where any number of bishops are all on the same color
      let sum = 0;
      const len = bishops.length;
      for (let i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }

    return false;
  }

  isThreefoldRepetition() { }

  isDraw() {
    return (
      this._halfMoves >= 100 || // 50 moves per side = 100 half moves
      this.isStalemate() ||
      this.isInsufficientMaterial() ||
      this.isThreefoldRepetition() // TODO:
    );
  }

  isGameOver() {
    return this.isCheckmate() || this.isStalemate() || this.isDraw();
  }

  move() { }

  moves({
    legal = true,
    piece = undefined,
    square = undefined,
  }: {
    legal?: boolean;
    piece?: PieceSymbol;
    square?: any;
  } = {}) {
    const forSquare = square;
    const forPiece = piece?.toLowerCase();

    const moves: InternalMove[] = [];
    const us = this._turn;
    const them = this._swapColor(us);

    let firstSquare = Ox88.a8;
    let lastSquare = Ox88.h1;
    let singleSquare = false;

    // are we generating moves for a single square?
    if (forSquare) {
      // illegal square, return empty moves
      if (!(forSquare in Ox88)) {
        return [];
      } else {
        firstSquare = lastSquare = Ox88[forSquare];
        singleSquare = true;
      }
    }

    for (let from = firstSquare; from <= lastSquare; from++) {
      // did we run off the end of the board
      if (from & 0x88) {
        from += 7;
        continue;
      }

      // empty square or opponent, skip
      if (!this._board[from] || this._board[from].color === them) {
        continue;
      }
      const { type } = this._board[from];

      let to: number;
      if (type === PAWN) {
        if (forPiece && forPiece !== type) continue;

        // single square, non-capturing
        to = from + PAWN_OFFSETS[us][0];
        if (!this._board[to]) {
          this.addMove(moves, us, from, to, PAWN);

          // double square
          to = from + PAWN_OFFSETS[us][1];
          if (SECOND_RANK[us] === this.rank(from) && !this._board[to]) {
            this.addMove(moves, us, from, to, PAWN, undefined, BITS.BIG_PAWN);
          }
        }

        // pawn captures
        for (let j = 2; j < 4; j++) {
          to = from + PAWN_OFFSETS[us][j];
          if (to & 0x88) continue;

          if (this._board[to]?.color === them) {
            this.addMove(
              moves,
              us,
              from,
              to,
              PAWN,
              this._board[to].type,
              BITS.CAPTURE
            );
          } else if (to === this._epSquare) {
            this.addMove(moves, us, from, to, PAWN, PAWN, BITS.EP_CAPTURE);
          }
        }
      } else {
        if (forPiece && forPiece !== type) continue;

        for (let j = 0, len = PIECE_OFFSETS[type].length; j < len; j++) {
          const offset = PIECE_OFFSETS[type][j];
          to = from;

          while (true) {
            to += offset;
            if (to & 0x88) break;

            if (!this._board[to]) {
              this.addMove(moves, us, from, to, type);
            } else {
              // own color, stop loop
              if (this._board[to].color === us) break;

              this.addMove(
                moves,
                us,
                from,
                to,
                type,
                this._board[to].type,
                BITS.CAPTURE
              );
              break;
            }

            /* break, if knight or king */
            if (type === KNIGHT || type === KING) break;
          }
        }
      }
    }

    /*
     * check for castling if we're:
     *   a) generating all moves, or
     *   b) doing single square move generation on the king's square
     */

    if (forPiece === undefined || forPiece === KING) {
      if (!singleSquare || lastSquare === this._kings[us]) {
        // king-side castling
        if (this._castling[us] & BITS.KSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom + 2;

          if (
            !this._board[castlingFrom + 1] &&
            !this._board[castlingTo] &&
            !this._attacked(them, this._kings[us]) &&
            !this._attacked(them, castlingFrom + 1) &&
            !this._attacked(them, castlingTo)
          ) {
            this.addMove(
              moves,
              us,
              this._kings[us],
              castlingTo,
              KING,
              undefined,
              BITS.KSIDE_CASTLE
            );
          }
        }

        // queen-side castling
        if (this._castling[us] & BITS.QSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom - 2;

          if (
            !this._board[castlingFrom - 1] &&
            !this._board[castlingFrom - 2] &&
            !this._board[castlingFrom - 3] &&
            !this._attacked(them, this._kings[us]) &&
            !this._attacked(them, castlingFrom - 1) &&
            !this._attacked(them, castlingTo)
          ) {
            this.addMove(
              moves,
              us,
              this._kings[us],
              castlingTo,
              KING,
              undefined,
              BITS.QSIDE_CASTLE
            );
          }
        }
      }
    }

    /*
     * return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal || this._kings[us] === -1) {
      return moves;
    }

    // filter out illegal moves
    const legalMoves: InternalMove[] = [];

    for (let i = 0, len = moves.length; i < len; i++) {
      this._makeMove(moves[i]);
      if (!this._isKingAttacked(us)) {
        legalMoves.push(moves[i]);
      }
      this._undoMove();
    }

    return legalMoves;
  }

  // pretty = external move object
  private _makePretty(uglyMove: any): any {
    const { color, piece, from, to, flags, captured, promotion } = uglyMove;

    let prettyFlags = "";

    for (const flag in BITS) {
      if (BITS[flag] & flags) {
        prettyFlags += FLAGS[flag];
      }
    }

    const move: any = {
      color,
      piece,
      flags: prettyFlags,
    };

    // generate the FEN for the 'after' key
    this._makeMove(uglyMove);
    this._undoMove();

    if (captured) {
      move.captured = captured;
    }
    if (promotion) {
      move.promotion = promotion;
      move.lan += promotion;
    }

    return move;
  }

  undo() {
    const move = this._undoMove();
    return move ? this._makePretty(move) : null;
  }

  turn() {
    return this._turn;
  }

  allMoves(depth: number): any[][] {
    if (depth === 0 || this.isGameOver()) {
      return [];
    }

    let movesList: any[][] = [];
    for (let move of this.moves()) {
      this._makeMove(move);
      let newMovesList: any[][] = [[move]].concat(this.allMoves(depth - 1));
      this._undoMove();
      movesList.push(newMovesList);
    }

    return movesList;
  }
}

const game = new Chess([]);

console.log(game.allMoves(1));
