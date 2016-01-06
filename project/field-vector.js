/**
 * Field vector
 * @param {Space} space
 * @param {Number} x
 * @param {Number} y
 * @param settings
 * @constructor
 */

var FieldVector = function (space, x, y, settings) {
    // Call parent constructor
    SpaceObject.call(this, space, x, y);
};

// Extend base space object
FieldVector.prototype = Object.create(SpaceObject.prototype);
FieldVector.prototype.constructor = FieldVector;

/**
 * Render
 */

FieldVector.prototype.render = function (ctx) {
    // Get magnetic field at this point
    var B = this.space.getMagneticField(this.position, this);
    var e_B = B.clone().normalize().multiply(50);

    // Style
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ff0000';
    ctx.strokeStyle = '#ff0000';

    // Draw an arrow in the direction of the magnetic field
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + e_B.x, this.y + e_B.y);
    ctx.stroke();

    // Small circle to indicate position
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2*Math.PI, false);
    ctx.stroke();
    ctx.fill();

    // Field strength
    ctx.fillStyle = '#ffffff';
    ctx.fillText(Math.round(B.getMagnitude(), 1) + 'μT', this.x + 5, this.y);
};

/**
 * Get the magnetic field vector at a given point
 * @returns {Vector}
 */

FieldVector.prototype.getMagneticField = function () {
    // Field vectors are not magnetic field sources
    return new Vector(0, 0);
};

/**
 * Hit test
 * @param x
 * @param y
 * @returns {boolean}
 */

FieldVector.prototype.hitTest = function (x, y) {
    return x >= -5 && x <= 5 && y >= -5 && y <= 5;
};