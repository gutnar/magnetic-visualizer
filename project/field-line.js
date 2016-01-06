/**
 * Field line
 * @param {Space} space
 * @param {Number} x
 * @param {Number} y
 * @param settings
 * @constructor
 */

var FieldLine = function (space, x, y, settings) {
    // Call parent constructor
    SpaceObject.call(this, space, x, y);
};

// Extend base space object
FieldLine.prototype = Object.create(SpaceObject.prototype);
FieldLine.prototype.constructor = FieldLine;

/**
 * Render
 */

FieldLine.prototype.render = function (ctx) {
    // Start line
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);

    // Current point along line
    var point = this.position.clone();

    // Magnetic field vector
    var B;

    // Closing status
    var closing = false;

    // Move along line
    for (var i = 0; i < 100000; ++i) {
        // Get magnetic field direction vector at point
        B = this.space.getMagneticField(point).normalize();

        // Move along field line
        point.add(B.multiply(0.2));

        // Draw segment of field line
        ctx.lineTo(point.x, point.y);

        // Moved away from start point - begin to try and close the line
        if (!closing && point.getDistanceSq(this.position) > 20) {
            closing = true;
        }

        // Near finish point - try and close the line
        else if (closing && point.getDistanceSq(this.position) < 20) {
            ctx.lineTo(this.x, this.y);
            break;
        }

        //console.log(point);
    }

    // End line
    ctx.strokeStyle = '#00ffff';
    ctx.stroke();

    // Small circle to indicate field line start position
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2*Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
};

/**
 * Get the magnetic field vector at a given point
 * @returns {Vector}
 */

FieldLine.prototype.getMagneticField = function () {
    // Field lines are not magnetic field sources
    return new Vector(0, 0);
};

/**
 * Hit test
 * @param x
 * @param y
 * @returns {boolean}
 */

FieldLine.prototype.hitTest = function (x, y) {
    return x >= -5 && x <= 5 && y >= -5 && y <= 5;
};