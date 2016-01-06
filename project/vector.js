/**
 * Vector
 * @param x
 * @param y
 * @constructor
 */

var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Check if vector is zero vector
 * @returns {Boolean}
 */

Vector.prototype.isZero = function () {
    return this.x === 0 && this.y === 0;
};

/**
 * Get vector magnitude
 * @returns {Number}
 */

Vector.prototype.getMagnitude = function () {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};

/**
 * Get vector magnitude square
 * @returns {number}
 */

Vector.prototype.getMagnitudeSq = function () {
    return this.x*this.x + this.y*this.y;
};

/**
 * Get distance from point squared
 * @param {Vector} point
 * @returns {Number}
 */

Vector.prototype.getDistanceSq = function (point) {
    return Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2);
};

/**
 * Get distance from point
 * @param {Vector} point
 * @returns {Number}
 */

Vector.prototype.getDistance = function (point) {
    return Math.sqrt(this.getDistanceSq(point));
};

/**
 * Get vector slope
 * @returns {number}
 */

Vector.prototype.getSlope = function () {
    return this.y/this.x;
};

/**
 * Multiply vector
 * @returns {Vector}
 */

Vector.prototype.multiply = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
};

/**
 * Divide vector
 * @returns {Vector}
 */

Vector.prototype.divide = function (scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
};

/**
 * Normalize vector
 * @returns {Vector}
 */

Vector.prototype.normalize = function () {
    // Do nothing if vector is zero vector
    if (this.isZero()) {
        return this;
    }

    return this.divide(this.getMagnitude());
};

/**
 * Add vector
 * @param {Vector} vector
 * @returns {Vector}
 */

Vector.prototype.add = function (vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
};

/**
 * Get vector clone
 * @returns {Vector}
 */

Vector.prototype.clone = function () {
    return new Vector(this.x, this.y);
};