/**
 * Straight wire current
 * @param {Space} space
 * @param {Number} x
 * @param {Number} y
 * @param settings
 * @constructor
 */

var StraightWire = function (space, x, y, settings) {
    // Call parent constructor
    SpaceObject.call(this, space, x, y);

    // Settings
    this.settings = settings;

    // Current strength in amperes (A)
    this.settings.current = settings.current || 1;

    // Period and phase if alternating current
    this.settings.period = settings.period || 0;
    this.settings.phase = settings.phase || 0;

    // Magnetic field strength multiplier
    this.multiplier = space.mu/2/Math.PI;
};

// Extend base space object
StraightWire.prototype = Object.create(SpaceObject.prototype);
StraightWire.prototype.constructor = StraightWire;

/**
 * Render
 */

StraightWire.prototype.render = function (ctx) {
    // Current
    this.current = this.settings.current;

    // Alternating current
    if (this.settings.period) {
        this.current *= Math.cos(2*Math.PI*this.space.time/this.settings.period + this.settings.phase*Math.PI/180);
    }

    // Draw
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x - 1, this.y - 1, 2, 2);

    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2*Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
};

/**
 * Get the magnetic field vector at a given point
 * @param {Vector} point
 * @returns {Vector}
 */

StraightWire.prototype.getMagneticField = function (point) {
    // Get distance from point
    var r = this.position.getDistance(point);

    // Calculate magnetic field strength
    var B = this.current * this.multiplier/r;

    // Return magnetic field vector
    return new Vector(this.y - point.y, point.x - this.x).normalize().multiply(B);
};

/**
 * Hit test
 * @param x
 * @param y
 * @returns {boolean}
 */

StraightWire.prototype.hitTest = function (x, y) {
    return x >= -5 && x <= 5 && y >= -5 && y <= 5;
};