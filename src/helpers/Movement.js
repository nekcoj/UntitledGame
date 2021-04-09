import Store from './Store';

export default function Movement() {
  const { movement, directions, pixelSize, gameState, character, characterState } = Store();

  const placeCharacter = () => {
    const held_direction = movement.held_directions[0];
    if (held_direction) {
      if (held_direction === directions.right) { movement.x += movement.speed; }
      if (held_direction === directions.left) { movement.x -= movement.speed; }
      if (held_direction === directions.down) { movement.y += movement.speed; }
      if (held_direction === directions.up) { movement.y -= movement.speed; }
      movement.facing = held_direction;
    }
    movement.isWalking = held_direction ? 'true' : 'false';
    
    let leftLimit = 0;
    let rightLimit = 400 - (8 * pixelSize);
    let topLimit = 0;
    let bottomLimit = 320 - (8 * pixelSize);
    if (movement.x < leftLimit) { movement.x = leftLimit; }
    if (movement.x > rightLimit) { movement.x = rightLimit; }
    if (movement.y < topLimit) { movement.y = topLimit; }
    if (movement.y > bottomLimit) { movement.y = bottomLimit; }
    
    checkIfBlockedTile();
    //checkEnemyCollision();
  }

  const getCoordinates = () => {
    return [Math.floor(movement.placeCharacter.x / (pixelSize * 16)), Math.floor(movement.placeCharacter.y / (pixelSize * 16))]
  }

  const checkIfBlockedTile = () => {
    let isBlocked = false;
    const collDivs = Array.from(document.querySelectorAll('.obstacle'));
    const enemies = Array.from(document.querySelectorAll('.enemy'));
    enemies.forEach(enemy => collDivs.push(enemy));
    collDivs.forEach(div => {
      const { x, y } = div.getBoundingClientRect();
      const charX = character.value.getBoundingClientRect().x;
      const charY = character.value.getBoundingClientRect().y;
      const size = 16 * pixelSize;
      if (x < charX + size - 3 && x + size > charX + 3 && y < charY + (size) && y + (size / 2) > charY ) {
        isBlocked = true;
        if(isBlocked){
          let pushback = 1;
          if (div.classList.contains('enemy')) {
            characterState.setHealth(-5);
            pushback = 15;
          }
          switch(movement.facing) {
            case 'up':
              if (charX + (size / 2) > x + (size / 2)) {
                movement.x += 1;
              }
              if (charX + (size / 2) < x + (size / 2)){
                movement.x -= 1;
              }
              movement.y += pushback;
              break;
            case 'down':
              if (x + size <= charX + (size / 2)) {
                movement.x += 1;
              }
              if (charX + (size / 2)  < x) {
                movement.x -= 1;
              }
              movement.y -= pushback;
              break;
            case 'left':
              movement.x += pushback; 
              break;
            case 'right':
              movement.x -= pushback;
              break;
            default:
              break;
          }
        }
      }
    })
    
    movement.placeCharacter = { x: movement.x * pixelSize, y: movement.y * pixelSize}
  }
  
  const loadCharacterOnMap = () => {
    gameState.level.blocked.forEach((row, i) => {
      row.forEach((column, j) => {
        if(column === 5) {
          movement.x = j * pixelSize * 16 / 2;
          movement.y = i * pixelSize * 16 / 2;
        }
      });
    });
  }

  return {
    placeCharacter,
    getCoordinates,
    checkIfBlockedTile,
    loadCharacterOnMap,
  }
}