import Store from './Store';

export default function Movement() {
  const { movement, directions, map, pixelSize, gameState, character } = Store();

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
  }

  const getCoordinates = () => {
    return [Math.floor(movement.placeCharacter.x / (pixelSize * 16)), Math.floor(movement.placeCharacter.y / (pixelSize * 16))]
  }

  const checkIfBlockedTile = () => {
    /**
     * 0 = Blocked
     * 1 = Not Blocked 
     * 
     *  */
    let isBlocked = false;
    const collDivs = document.querySelectorAll('.obstacle');
    collDivs.forEach(div => {
      const { x, y } = div.getBoundingClientRect();
      const charX = character.value.getBoundingClientRect().x;
      const charY = character.value.getBoundingClientRect().y;
      const size = 16 * pixelSize;
      if (x < charX + size - 2 && x + size > charX + 2 && y < charY + (size / 2) + 1 && y + (size / 2) + 1 > charY ) {
        isBlocked = true;
        if(isBlocked){
          switch(movement.facing) {
            case 'up':
              console.log('UP - nope');
              movement.y += 1;
              break;
            case 'down':
              console.log('DOWN - nope');
              movement.y -= 1;
              break;
            case 'left':
              console.log('LEFT - nope');
              movement.x += 1; 
              break;
            case 'right':
              console.log('RIGHT - nope');
              movement.x -= 1;
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
          let camera_left = pixelSize * 132;
          let camera_top = pixelSize * 84;
          movement.placeCharacter.x = j * pixelSize;
          movement.placeCharacter.y = i * pixelSize;
          movement.x = j * pixelSize * 8;
          movement.y = i * pixelSize * 8;
          map.value.style.transform = `translate3d( ${-movement.x*pixelSize+camera_left}px, ${-movement.y*pixelSize+camera_top}px, 0 )`;
        }
      });
    });
  }

  const collision = () => {
    const collElems = document.querySelectorAll('.obstacle');
    collElems.forEach( div => {
      if (
        div.getBoundingClientRect().left < movement.placeCharacter.x + (16 * pixelSize) &&
        div.getBoundingClientRect().left + (16 * pixelSize) > movement.placeCharacter.x &&
        div.getBoundingClientRect().top < movement.placeCharacter.y + (16 * pixelSize) &&
        div.getBoundingClientRect().top + (16 * pixelSize) > movement.placeCharacter.y) {
          console.log('collision!');
      }
    })
    console.log(collElems);
    console.log(character.value.getAttribute('posx'));
  }


  return {
    collision,
    placeCharacter,
    getCoordinates,
    checkIfBlockedTile,
    loadCharacterOnMap,
  }
}