export default function Stack() {
    this.head = -1;
    this.stack = [];
}

Stack.prototype.push = function push(...x) {
    x.forEach(el => {
        this.stack.push(el);
        this.head++;
    });
}

Stack.prototype.pop = function pop() {
    this.stack.pop();
    this.head--;
}

Stack.prototype.returnFirst = function returnFirst() {
    return this.stack[this.head];
}

Stack.prototype.size = function size() {
    return this.stack.length;
}

Stack.prototype.empty = function empty() {
    return !this.stack.length;
}

