/**
 * Base space object
 * @param {Space} space
 * @param {Number} x
 * @param {Number} y
 * @constructor
 */

var SpaceObject = function (space, x, y) {
    // Add object into space
    space.add(this);

    // Space
    this.space = space;

    // Position in centimeters (cm)
    this.position = new Vector(x, y);
};

/**
 * Position getters
 */

Object.defineProperty(SpaceObject.prototype, 'x', {
    get: function () {
        return this.position.x;
    },
    set: function (x) {
        this.position.x = x;
    }
});

Object.defineProperty(SpaceObject.prototype, 'y', {
    get: function () {
        return this.position.y;
    },
    set: function (y) {
        this.position.y = y;
    }
});

/**
 * Remove object
 */

SpaceObject.prototype.remove = function () {
    this.space.remove(this);
};