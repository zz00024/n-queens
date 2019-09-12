// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var allRows = this.rows();
      var currentRow = allRows[rowIndex];
      var count = 0;
      //iterates through the rowIndex Row(currentRow), if count gets greater than 1, return true, return false otherwise.
      for (var i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === 1) {
          count += 1;
          if (count > 1) {
            return true;
          }
        }

      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var allRows = this.rows();
      var currentRow = allRows[0];
      var count = 0;
      //iterates through the rowIndex Row(currentRow), if count gets greater than 1, return true, return false otherwise.
      for (var i = 0; i < currentRow.length; i++) {
        if (this.hasRowConflictAt(i) ) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //declare variable for this.rows() to get the entire chestboard
      var allCol = this.rows();
      var count = 0;
      var currentCol = allCol[0];
      //loop through all the rows, have the samem count variable
      for (var i = 0; i < currentCol.length; i++) {
        if (allCol[i][colIndex] === 1) {
          count += 1;
        }
        if (count > 1) {
          return true;
        }
      }
      //want to check a specific index on each array of the this.rows()
      //if the value on the specific index equals to 1 then add 1 to the count variable
      //if count is above 1, return true otherwise return false;
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var allCol = this.rows();

      // for loop to check for each column
      for (var i = 0; i < allCol[0].length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // have two variables, one to track the row and one for the column
      var colNum = majorDiagonalColumnIndexAtFirstRow;
      var board = this.rows();
      var count = 0;
      var rowNum = board[0].length;
      // have a counter variable to keep track of 1's
      // build a for loop, that goes until the last row of the matrix
      for (var i = 0; i < rowNum; i++) {
        if (colNum >= 0) {
          if (board[i][colNum]) {
            count += 1;
          }
          if (count > 1) {
            return true;
          }
        }
        colNum += 1;
      }
      // inside the for loop, if we run into a case where the column index does not exist, we set the value to 0;
      // if it does exist, check if it's 1, increase count if it is
      // if count > 1, return true

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // create variable for current column position
      var board = this.rows();
      var n = board[0].length;
      var negativeCol = 1 - n;
      for (var i = negativeCol; i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // use for loop to track how far negative to go to capture all possible diagonals
      // apply function hasMajorDiag for every col position
      // if statement in for loop with true/false of that function, inside if block, return true

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // have two variables, one to track the row and one for the column
      var colNum = minorDiagonalColumnIndexAtFirstRow;
      var board = this.rows();
      var count = 0;
      var rowNum = board[0].length;
      // have a counter variable to keep track of 1's
      // build a for loop, that goes until the last row of the matrix
      for (var i = 0; i < rowNum; i++) {
        if (colNum < rowNum) {
          if (board[i][colNum]) {
            count += 1;
          }
          if (count > 1) {
            return true;
          }
        }
        colNum -= 1;
      }
      // inside the for loop, if we run into a case where the column index does not exist, we set the value to 0;
      // if it does exist, check if it's 1, increase count if it is
      // if count > 1, return true

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // create variable for current column position
      var board = this.rows();
      var n = board[0].length;
      var positiveCol = (2 * n) - 2;
      for (var i = positiveCol; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
