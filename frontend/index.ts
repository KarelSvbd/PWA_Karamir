const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}

fetch('http://localhost:3000/notes')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));