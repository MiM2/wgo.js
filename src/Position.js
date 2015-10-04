/**
 * Contains implementation of go position class.
 * @module Position
 */
 
/**
 * Creates instance of position object.
 *
 * @alias WGo.Position
 * @class `WGo.Position` represents a certain position of the go game. It is composed from a grid containing black and white stones, capture counts, and actual turn.
 *
 * @param {number} [size = 19] - Size of the board.
 */

var Position = function(size) {
	/** 
	 * @property {number} size Size of the board.
	 * @constant 
	 */
	 
	this.size = size || 19;
	
	/** @property {Array.<Array.<(WGo.B|WGo.W|WGo.E)>>} grid - Two dimensional array containing stones of the position. */
	this.grid = [];
	for(var i = 0; i < this.size*this.size; i++) {
		this.grid[i] = 0;
	}
	
	/** @property {{black: number, white: number}} capCount - Contains numbers of stones that both players captured. */
	this.capCount = {
		black: 0,
		white: 0
	}
	
	/** @property {(WGo.B|WGo.W)} turn - Who plays next move. */
	this.turn = WGo.B;
}

Position.prototype = {
	constructor: Position,
	
	/**
	 * Returns stone on the given field.
	 *
	 * @param {number} x - X coordinate
	 * @param {number} y - Y coordinate
	 * @return {(WGo.B|WGo.W|WGo.E)} Color
	 */

	get: function(x,y) {
		if(x < 0 || y < 0 || x >= this.size || y >= this.size) return undefined;
		return this.grid[x*this.size+y];
	},

	/**
	 * Sets stone on the given field.
	 *
	 * @param {number} x - X coordinate
	 * @param {number} y - Y coordinate
	 * @param {(WGo.B|WGo.W|WGo.E)} c - Color
	 */

	set: function(x,y,c) {
		this.grid[x*this.size+y] = c;
		return this;
	},

	/**
	 * Clears the whole position (every value is set to 0).
	 */

	clear: function() {
		for(var i = 0; i < this.size*this.size; i++) this.grid[i] = 0;
		return this;
	},

	/**
	 * Clones the whole position.
	 * 
	 * @return {WGo.Position} Copy of the position.
	 * @todo Clone turn as well.
	 */

	clone: function() {
		var clone = new Position(this.size);
		clone.grid = this.grid.slice(0);
		clone.capCount.black = this.capCount.black;
		clone.capCount.black = this.capCount.black;
		return clone;
	},
	
	/**
	 * Compares this position with another position and return object with changes
	 *
	 * @param {WGo.Position} position - Position to compare to.
	 * @return {ChangeObject} Change object
	 */
	
	compare: function(position) {
		var add = [], remove = [];
		
		for(var i = 0; i < this.size*this.size; i++) {
			if(this.grid[i] && !position.grid[i]) remove.push({
				x: Math.floor(i/this.size),
				y: i%this.size
			});
			else if(this.grid[i] != position.grid[i]) add.push({
				x: Math.floor(i/this.size),
				y: i%this.size,
				c: position.grid[i]
			});
		}
		
		return {
			add: add,
			remove: remove
		}
	}
}

module.exports = Position;
