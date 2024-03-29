// Create board
var board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

// Arrays for the scoreboard


// Create variable to store the winning player
var winningPlayer = 0;

// Keep track of whose turn it is
var turn = {
	number: 0,
	current_player_color: function() {
		if (this.number % 2 === 0) {
			return 1;
		} else {
			return 2;
		}
	},
	change_turn: function() {
		this.number += 1;
	}
}; // ENDS TURN



// Check to see if any of the rows has 3 in a row
function check_rows() {
	for (var i = 0; i < board.length; i++) {
		var same = true;
		for (var j = 0; j < board[i].length; j++) {
			if (board[i][j] === 0 || board[i][j] !== board[i][0]) {
				same = false;
			}
		} // ENDS j LOOP
		if (same) {
			return same;
		}
	} // ENDS i LOOP
} // ENDS CHECK_ROWS



// Check to see if any of the columns has 3 in a row
function check_cols() {
	for (var i = 0; i < board.length; i++) {
		var same = true;
		for (var j = 0; j < board[i].length; j++) {
			if (board[j][i] === 0 || board[j][i] !== board[0][i]) {
				same = false;
			}
		} // ENDS j LOOP
		if (same) {
			return same;
		}
	} // ENDS i LOOP
} // ENDS CHECK_COLS



// Check to see if any of the diagonals has a 3 in a row
function check_diag() {
	var same = true;
	for (var i = 0; i < board.length; i++) {
		if (board[i][i] === 0 || board[i][i] !== board[0][0]) {
			same = false;
		}
	} // ENDS i LOOP
	if (same) {
		return same;
	}
	same = true;
	for (var i = 0; i < board.length; i++) {
		if (board[i][2 - i] === 0 || board[i][2 - 1] !== board[0][2]) {
			same = false;
		}
	} // ENDS j LOOP
	if (same) {
		return same;
	}
} //ENDS CHECK_DIAG



// Check to see if it's a tie
function check_tie() {
	var flattened_board = Array.prototype.concat.apply([], board);
	for (var i = 0; i < flattened_board.length; i++) {
		if (flattened_board[i] === 0) {
			return false;
		}
	}
	return true;
} // ENDS CHECK_TIE



// Check to see if either player has won
function check_winner() {
	if (check_rows() === true || check_cols() === true || check_diag() === true) {
		winningPlayer = turn.current_player_color();
		// Alert winner
		end_game("Player " + winningPlayer + ", you win!");
		if (winningPlayer === 1) {
			console.log("in check_winner" + winningPlayer);
			score1.push("|");
		} else if (winningPlayer === 2) {
			score2.push("|");
		}

	} else if (check_tie() === true) {
		end_game("It's a tie...");

	} else {
		turn.change_turn();
	}
} // ENDS CHECK_WINNER



// End the game, alert the winner and refresh the page
function end_game(message) {
	alert(message);
	location.reload();
} // END END_GAME



$(document).ready(function() {
	console.log("javascript is working");


	// Check the value of a cell
	function check_cell(cell) {
		var row = $(cell).data("row");
		var col = $(cell).data("col");
		return (board[row][col]);
	} // ENDS CHECK_CELL


	// Placing the X's and O's on the board
	function change_cell(cell) {
		var row = $(cell).data("row");
		var col = $(cell).data("col");
		board[row][col] = turn.current_player_color();

		if (turn.current_player_color() == 1) {
			// Remove hover class immediately once clicked
			$(".hovering").click(function() {
				$(this).removeClass("hover");
			}); // ENDS .HOVERING.CLICK
			$(cell).addClass("red");
			$(cell).append("X");
		} else {
			$(cell).addClass("blue");
			$(cell).append("O");
		}
	} // ENDS CHANGE_CELL


	//This is the class that will construct the grid
	function Grid(height, width, size) {
		this.height = height;
		this.width = width;
		this.size = size;
		this.render = function(where, what) {

			//loop to create the rows
			for (var x = 0; x < height; x++) {
				var cell1 = ("<tr id='" + what + "row" + x + "'>");
				$(where).append(cell1);
				$("#" + what + "row" + x).css({
					"border": "10px solid black"
					// "background-color": "white"
				}); // ENDS .CSS

				// loop to create the columns
				for (var y = 0; y < width; y++) {
					var cell2 = ("<td class ='columns" + y + " hovering' data-row='" + x + "'data-col='" + y + "'data>");
					$("#" + what + "row" + x).append(cell2);
					$(".columns" + y).css({
						"border": "10px solid black",
						// "background-color": "white",
						"width": size,
						"height": size
					}); // ENDS.CSS
				} //ENDS Y LOOP
			} // ENDS X LOOP


			$(".hovering").hover(function() {
				$(this).addClass($("hover"));
			}, function() {
				$(this).removeClass("hover");
			}); // ENDS .SECTION_.HOVER


			$(".hovering").click(function() {

				// Check if cell is 0 on the board
				if (check_cell(this) === 0 && winningPlayer === 0) {

					// Change color if it's 0
					change_cell(this);

					// Check if we have a winner
					check_winner();
				}
			}); // ENDS .HOVERING.CLICK
		}; // ENDS THIS.RENDER
	} //ENDS GRID CLASS

	var tic = new Grid(3, 3, 120);
	tic.render("#container", "section_1");

}); // ENDS DOC.READY