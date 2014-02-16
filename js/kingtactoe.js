$(document).ready(function() {
	console.log("javascript is working");

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
					"border": "10px solid black",
					"background-color": "white"
				}); // ENDS .CSS

				// loop to create the columns
				for (var y = 0; y < width; y++) {
					var cell2 = ("<td class ='columns" + y + " hovering'>");
					$("#" + what + "row" + x).append(cell2);
					$(".columns" + y).css({
						"border": "10px solid black",
						"background-color": "white",
						"width": size,
						"height": size
					}); // ENDS.CSS
				} //ENDS Y LOOP
			} // ENDS X LOOP


			$(".hovering").hover(function() {
				console.log("inside hover");
				$(this).append($("<span> X </span>"));
			}, function() {
				$(this).find("span:last").remove();
			}); // ENDS .SECTION_.HOVER

			$(".columns").hover(function() {
				$(this).fadeOut(100);
				$(this).fadeIn(500);
			}); // ENDS .COLUMNS.HOVER
		}; // ENDS THIS.RENDER
	} //ENDS GRID CLASS

	var tic = new Grid(3, 3, 200);
	tic.render("#container", "section_1");

}); // ENDS DOC.READY
