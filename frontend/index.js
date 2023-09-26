"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const world = 'world';
function hello(who = world) {
    return `Hello ${who}! `;
}
exports.hello = hello;
fetch('http://localhost:3000/notes')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
