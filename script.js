// Display Constants
let W = window.innerWidth;
let H = window.innerHeight;

// Tree Constants
let tree = 0;
let RATIO = 5 / 11;
let L = RATIO * H;
let PHI = Math.PI / 3;
let LAYERS = 0;
let MAX_DEPTH = 5;
let TREE_MAX = 20;
let arr = [];
let click_count = 0;
let X1 = 0;
let Y1 = 0;
let THETA = 2 * Math.PI / TREE_MAX;
let R = 300;

function setup() {
    createCanvas(W, H);
    background(0);
    // Initialize first root
    //arr[0] = new Tree(W/2, H/2+L, 0, 0, 0);
    set_points();
}

function set_points() {
    let x1 = R * Math.cos(0) + W/2;
    let y1 = R * Math.sin(0) + H/2;
    let x2 = R * Math.cos(THETA) + W/2;
    let y2 = R * Math.sin(THETA) + H/2;
    arr[0] = new Tree(x1, y1, x2, y2, 0, 0, 0);
    for (let i = 1; i < TREE_MAX; i++) {
        x1 = arr[i-1].node2.x;
        y1 = arr[i-1].node2.y;
        x2 = R * Math.cos(i * THETA) + W/2;
        y2 = R * Math.sin(i * THETA) + H/2;
        arr[i] = new Tree(x1, y1, x2, y2, 0, i*THETA, 0);
    }
    x1 = R * Math.cos((TREE_MAX-1)*THETA) + W/2;
    y1 = R * Math.sin((TREE_MAX-1)*THETA) + H/2;
    x2 = arr[0].node1.x;
    y2 = arr[0].node1.y;
    arr[TREE_MAX] = new Tree(x1, y1, x2, y2, 0, THETA, TREE_MAX);
}

/*function mouseDragged() {
    if (click_count === 0) {
        X1 = mouseX;
        Y1 = mouseY;
        click_count += 1;
    } else if (click_count === 1) {
        arr[0] = new Tree(X1, Y1, mouseX, mouseY, 0);
        arr[0].create_layer()
        click_count += 1;
    } else {
        let prev = arr[arr.length - 1];
        arr.push(new Tree(prev.node2.x, prev.node2.y, mouseX, mouseY, 0));
        for (let i = 0; i < arr.length-1; i++) {
            arr[i].create_layer();
        }
    }
}

function mouseReleased() {
    click_count = 0;
}*/

function mouseClicked() {
    for (let i = 0; i < arr.length; i++) {
        arr[i].create_layer();
    }
}

function doubleClicked() {
    for (let i = 0; i < arr.length; i++) {
        arr[i].prune();
    }
    LAYERS -= 1;
}



function draw() {
    background(0);
    /*if (arr.length >= TREE_MAX) {
        arr.shift();
    }*/
    for (let i = 0; i < arr.length; i++) {
        arr[i].show();
        arr[i].update();
        //arr[i].create_layer();
    }
}






