/**
 Space
 */

var Space = function (canvasId) {
    // Canvas
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    // Magnetic permeability (μT * pixel / A)
    //this.mu = 4*Math.PI/100*38*1000;
    this.mu = 4775.22083346;

    // Objects
    this.objects = [];
};

/**
 * Add object
 * @param object
 */

Space.prototype.add = function (object) {
    this.objects.push(object);
};

/**
 * Remove object
 * @param object
 */

Space.prototype.remove = function (object) {
    var index = this.objects.indexOf(object);

    if (index !== -1) {
        this.objects.splice(index, 1);
    }
};

/**
 * Get the magnetic field vector at a given point
 * @param {Vector} point
 * @param {SpaceObject} excludeObject - object to exclude in calculation
 * @returns {Vector}
 */

Space.prototype.getMagneticField = function (point, excludeObject) {
    // Initial value
    var B = new Vector(0, 0);

    // Add fields of objects in space
    for (var i = 0; i < this.objects.length; ++i) {
        if (this.objects[i] !== excludeObject) {
            B.add(this.objects[i].getMagneticField(point));
        }
    }

    // Return magnetic field vector
    return B;
};

/**
 * Render
 */

Space.prototype.render = function () {
    // Time since last render
    if (this.time) {
        this.delta = new Date().getTime()/1000 - this.time;
    } else {
        this.time = new Date().getTime()/1000;
    }

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render objects
    for (var i = 0; i < this.objects.length; ++i) {
        this.objects[i].render(this.ctx);
    }

    // Pass time
    if (this.delta) {
        this.time += this.delta;
    }
};

/**
 * Get object at given position
 * @param x
 * @param y
 */

Space.prototype.getObjectAt = function (x, y) {
    // Try to find object at given position
    for (var i = 0; i < this.objects.length; ++i) {
        if (this.objects[i].hitTest(this.objects[i].x - x, this.objects[i].y - y)) {
            return this.objects[i];
        }
    }
};