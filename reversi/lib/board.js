let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let squares =  Array.from({length: 8}, () => Array.from({length: 8}));
  squares[3][3] = new Piece("white");
  squares[3][4] = new Piece("black");
  squares[4][3] = new Piece("black");
  squares[4][4] = new Piece("white");
  return squares;
}

function addPositions(pos1, pos2) {
  return [pos1[0] + pos2[0], pos1[1] + pos2[1]];
}
/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (this.isValidPos(pos)) {
    return this.grid[pos[0]][pos[1]];
  } else {
    throw new Error("not valid position!");
  }

};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0; 
};

Board.prototype.isFlippable = function(color, space, dir) {
  let next_space = space.m
  if (this.grid[next_space[0]][next_space[1]].oppColor      ) {

  }
}
/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.grid[pos[0]][pos[1]]) {
    return this.grid[pos[0]][pos[1]].color === color;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return this.grid[pos[0]][pos[1]] != undefined;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove("white") && !this.hasMove("black");
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  if (pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8) {
    return true;
  } else {
    return false;
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {

};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos) || !this.isValidPos(pos)) {
    return false;
  }
  return Board.DIRS.some(function(dir) {
    let cur_pos = pos;
    cur_pos = addPositions(cur_pos, dir);
    if (this.isValidPos(cur_pos) && !this.isMine(cur_pos, color) && this.isOccupied(cur_pos)) {
      while(this.isValidPos(cur_pos)) {
        cur_pos = addPositions(cur_pos, dir);
        if (this.isValidPos(cur_pos) && this.isMine(cur_pos, color)) {
          return true;
        } 
      }
    }
  }, this);
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {

  let playable_positions = [];
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid.length; j++) {
      if (this.validMove([i, j], color)) {
        playable_positions.push([i, j]);
      }
    }
  }
  return playable_positions;
};

module.exports = Board;

// let yord = new Board();
// yord.validMoves("white");