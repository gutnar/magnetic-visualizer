// Create a space
var space = new Space('space');

// Make canvas size equal to entire window size
window.onresize = function () {
    space.canvas.width = window.innerWidth;
    space.canvas.height = window.innerHeight;
    space.render();
};

// Interaction
var dragging = null;

space.canvas.onmousedown = function (e) {
    // Close all menus and modals
    var i, menus = document.getElementsByClassName('menu');

    for (i = 0; i < menus.length; ++i) {
        menus[i].style.display = 'none';
    }

    // Try to find element to drag
    dragging = space.getObjectAt(e.x, e.y);

    space.render();
};

space.canvas.addEventListener('mouseup', function () {
    dragging = null;
});

space.canvas.addEventListener('mousemove', function (e) {
    if (dragging) {
        dragging.x = e.x;
        dragging.y = e.y;

        space.render();
    }
});

/* Space menu */
var spaceMenu = document.getElementById('space-menu');
var addStraightWire = document.getElementById('add-straight-wire');
var addFieldLine = document.getElementById('add-field-line');
var addFieldVector = document.getElementById('add-field-vector');

// Add straight wire object handler
addStraightWire.onclick = function () {
    // Hide menu
    spaceMenu.style.display = 'none';

    // Create straight wire
    new StraightWire(space, parseInt(spaceMenu.style.left), parseInt(spaceMenu.style.top), {
        current: 2
    });
};

// Add field line object handler
addFieldLine.onclick = function () {
    // Hide menu
    spaceMenu.style.display = 'none';

    // Create field line
    new FieldLine(space, parseInt(spaceMenu.style.left), parseInt(spaceMenu.style.top));
};

// Add field vector object handler
addFieldVector.onclick = function () {
    // Hide menu
    spaceMenu.style.display = 'none';

    // Create field vector
    new FieldVector(space, parseInt(spaceMenu.style.left), parseInt(spaceMenu.style.top));
};

/* Object menu */
var object;
var objectMenu = document.getElementById('object-menu');
var objectSettings = document.getElementById('object-settings');
var removeObject = document.getElementById('remove-object');
var showObjectFieldLines = document.getElementById('show-object-field-lines');

// Modals
var objectSettingsModal = document.getElementById('object-settings-modal');

// Open object settings handler
objectSettings.onclick = function (e) {
    // Object
    var obj = object;

    // Hide menu
    objectMenu.style.display = 'none';

    // Create settings modal
    var modal = objectSettingsModal.cloneNode(true);
    delete modal.id;
    document.body.appendChild(modal);

    // Position
    modal.style.display = 'block';
    modal.style.left = e.x + 'px';
    modal.style.top = e.y + 'px';

    // Move modal
    var header = modal.childNodes[1];
    var dragRelative;

    // Drag
    var drag = function (e) {
        modal.style.left = (e.x - dragRelative.left) + 'px';
        modal.style.top = (e.y - dragRelative.top) + 'px';
    };

    // End dragging
    var endDrag = function () {
        document.body.removeEventListener('mousemove', drag);
        document.body.removeEventListener('mouseup', endDrag);
    };

    // Start dragging
    header.onmousedown = function (e) {
        e.preventDefault();

        // Remember relative position
        dragRelative = {
            left: e.x - parseInt(modal.style.left),
            top: e.y - parseInt(modal.style.top)
        };

        // Allow dragging
        document.body.addEventListener('mousemove', drag);
        document.body.addEventListener('mouseup', endDrag);
    };

    // Close modal
    var closeButton = header.childNodes[1];

    closeButton.onclick = function () {
        document.body.removeChild(modal);
    };

    // Straight wire settings
    var name = 'objectSettings' + new Date();
    modal.childNodes[3].setAttribute('name', name);
    var form = document[name];

    if (obj instanceof StraightWire) {
        // Current
        form.current.value = obj.settings.current;
        form.current.onchange = form.current.onkeyup = form.current.oninput = function () {
            if (!isNaN(this.value)) {
                obj.settings.current = parseFloat(this.value);
            }
        };

        // Period
        form.period.value = obj.settings.period;
        form.period.onchange = form.period.onkeyup = form.period.oninput = function () {
            if (!isNaN(this.value)) {
                obj.settings.period = parseFloat(this.value);
            }
        };

        // Phase
        form.phase.value = obj.settings.phase;
        form.phase.onchange = form.period.onkeyup = form.phase.oninput = function () {
            if (!isNaN(this.value)) {
                obj.settings.phase = parseFloat(this.value);
            }
        };
    }
};

// Only show selected object's field lines


// Remove object handler
removeObject.onclick = function () {
    // Hide menu
    objectMenu.style.display = 'none';

    // Remove object
    object.remove();
};

/* Open context menu */
space.canvas.addEventListener('contextmenu', function (e) {
    // Prevent default menu
    e.preventDefault();

    // Close all menus
    spaceMenu.style.display = 'none';

    // Menu to display
    var menu;

    // Check if object was clicked
    if (object = space.getObjectAt(e.x, e.y)) {
        menu = objectMenu;
    } else {
        menu = spaceMenu;
    }

    // Display menu
    menu.style.display = 'block';
    menu.style.left = e.x + 'px';
    menu.style.top = e.y + 'px';
});

// Test
new StraightWire(space, 510, 200, {current: 1});
new StraightWire(space, 800, 200, {current: 1, period: 30, phase: 180});

new FieldLine(space, 250, 300);

// Render
window.onresize();

// Render loop
setInterval(function () {
    space.render();
}, 50);