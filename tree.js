class Tree {
    constructor(x1, y1, x2, y2, depth, ang, id) {
        // node1 and node2 define the root
        this.node1 = createVector(x1, y1);
        this.node2 = createVector(x2, y2);
        // depth is what layer this root is at
        this.depth = depth;
        // len is length of the root
        this.len = this.node1.dist(this.node2);
        // ang is the angle between root's children
        this.ang = ang;
        // ratio determines root's children's len
        this.ratio = 0.5;
        // len of children
        this.r = 0;
        // these are the child branches off of root
        this.left = 0;
        this.right = 0;

        this.layers = 0;
        this.id = id;
    }
    show() {
        // recursively displays the tree whose base is this root
        colorMode(HSB, 2*Math.PI, 1, 1);
        strokeWeight(2/(this.depth));
        stroke(this.ang%(2*Math.PI), 1, 1);
        line(this.node1.x, this.node1.y, this.node2.x, this.node2.y);
        if (this.left != 0) { // check if children exist
            this.left.show();
            this.right.show();
        }
    }
    create_layer() {
        // recursively finds outer most layer and gives them all children
        if (this.node2 != 0 && this.depth < MAX_DEPTH) { // check if root exists
            if (this.left === 0) { // unique condition satisfied by outer most layer
                this.fork();
                LAYERS = this.left.depth; // update root's layer count
                this.layers = this.left.depth;
            } else {
                this.left.create_layer();
                this.right.create_layer();
            }
        }
    }
    fork() {
        // calculate coordinates for node2 of left and right children
        let opp = this.node2.y - this.node1.y;
        let adj = this.node2.x - this.node1.x;
        let theta = Math.atan2(opp, adj);
        let r = this.ratio * this.len;
        let x1 = r * Math.cos(theta + this.ang) + this.node2.x;
        let y1 = r * Math.sin(theta + this.ang) + this.node2.y;
        let x2 = r * Math.cos(theta - this.ang) + this.node2.x;
        let y2 = r * Math.sin(theta - this.ang) + this.node2.y;
        // create the children
        this.left = new Tree(this.node2.x, this.node2.y, x1, y1, this.depth+1, this.ang, this.id);
        this.right = new Tree(this.node2.x, this.node2.y, x2, y2, this.depth+1, this.ang, this.id);
    }
    update() {
        if (this.left != 0) {
            this.ang += 0.1 / (LAYERS - this.depth + 1);
            let opp = this.node2.y - this.node1.y;
            let adj = this.node2.x - this.node1.x;
            let theta = Math.atan2(opp, adj);
            this.left.node2.x = this.left.len * Math.cos(theta + this.ang) + this.left.node1.x;
            this.left.node2.y = this.left.len * Math.sin(theta + this.ang) + this.left.node1.y;

            this.right.node2.x = this.right.len * Math.cos(theta - this.ang) + this.right.node1.x;
            this.right.node2.y = this.right.len * Math.sin(theta - this.ang) + this.right.node1.y;

            this.left.node1.x = this.node2.x;
            this.left.node1.y = this.node2.y;
            this.right.node1.x = this.node2.x;
            this.right.node1.y = this.node2.y;
            this.left.update();
            this.right.update();
        }
    }
    prune() {
        if (this.left != 0) {
            if (this.depth === LAYERS-1) {
                this.left = 0;
                this.right = 0;
            } else {
                this.left.prune();
                this.right.prune();
            }
        }
    }
}