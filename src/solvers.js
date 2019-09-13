/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n}); //fixme
  var board = solution.rows();
  // create a board
  var col = n;
  var row = n;
  // create two variables to represent the row and column
  // first for loop is looping through all the rows,
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      board[i][j] = 1;
      if (solution.hasRowConflictAt(i) || solution.hasColConflictAt(j)) {
        board[i][j] = 0;
      }
    }
  }
  // nested for loop is going through each column in that row
  // inside the for loop, if statement that checks if there is conflict in the row or column
  //  change the value from 0 to 1
  // set var solution to the board we created


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //create a blink board
  var boardMatrix = new Board({n: n});
  var board = boardMatrix.rows();
  var solutionCount = 0; //fixme

  //create a recursive function that takes in board as a parameter
  var countRookSolutionInner = function (oldBoard, row) {
    var newMatrix = new Board (oldBoard);
    var newBoard = newMatrix.rows();
    // var rookCount = 0;
    //give a stop point for recursion to end
    if (row === n ) {
      return;
    }

    for (var i = 0; i < newBoard[0].length; i++) {
      newMatrix.togglePiece(row, i);
      //test if the current place pass the row and col tests
      if (newMatrix.hasAnyColConflicts() || newMatrix.hasAnyRowConflicts()) {
        newMatrix.togglePiece(row, i);
      } else {
        //this is where we found a legit place for a rook without causing any conflict
        //create an if statement that test if it hit the last row
        if (row === n - 1) {
          solutionCount += 1;
        } else {
          countRookSolutionInner(newBoard, row + 1);
        }
        newMatrix.togglePiece(row, i);
      }

    }

    // for loop is over!!! return to previous row!!! yay!!!
  };
  countRookSolutionInner(board, 0);

  //the function ahve to be able to track how many rooks on the board already, rooks should be a parameter
  //should have a count variable that record the number of the solutions
  //inside the recursive function, have a for loop for length of n. And adding rooks on the row
  //we add a rook on each column of that row and each time adding it we are checking if it has any conflict
  //call the recursive function if it passed the test, otherwise go to the next row position
  //if the rook count reaches n, the recursion should end.

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //repeat whave we have done for findNRooksSolution
  //add one more search condition which is checking diagonal test
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
