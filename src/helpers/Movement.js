import Store from './Store';

export default function Movement() {
  const { movement, directions, map, pixelSize, gameState } = Store();
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
    let rightLimit = 800;
    let topLimit = 0;
    let bottomLimit = 640;
    if (movement.x < leftLimit) { movement.x = leftLimit; }
    if (movement.x > rightLimit) { movement.x = rightLimit; }
    if (movement.y < topLimit) { movement.y = topLimit; }
    if (movement.y > bottomLimit) { movement.y = bottomLimit; }
    
    checkIfBlockedTile(getCoordinates());
    
    
  }

  const getCoordinates = () => {
    return [Math.floor(movement.placeCharacter.x / (pixelSize * 16)), Math.floor(movement.placeCharacter.y / (pixelSize * 16))]
  }

  const checkIfBlockedTile = (coords) => {
    /**
     * 0 = Blocked
     * 1 = Not Blocked 
     * 
     *  */
    if(gameState.level.blocked[coords[1]][coords[0]] === 0){
      console.log(coords);
      switch(movement.facing) {
        case 'up':
          movement.y = coords[1] * 16 * pixelSize;
          break;
        case 'down':
          movement.y = (coords[1] - 1) * 16 * pixelSize;
          break;
        case 'left':
          console.log('left', coords, pixelSize); 
          movement.x = coords[0] * 16 * pixelSize;
          console.log(movement.x);
          console.log(getCoordinates());
          break;
        case 'right':
          movement.x = coords[0] * 16 * pixelSize;
          break;
        default:
          break;
      }
    } 
    
    movement.placeCharacter = { x: movement.x * pixelSize, y: movement.y * pixelSize}
  }
  
  const loadCharacterOnMap = () => {
    gameState.level.blocked.forEach((row, i) => {
      row.forEach((column, j) => {
        if(column === 5) {
          let camera_left = pixelSize * 132;
          let camera_top = pixelSize * 84;
          movement.placeCharacter.x = j * pixelSize * 8;
          movement.placeCharacter.y = i * pixelSize * 8;
          movement.x = j * pixelSize * 8;
          movement.y = i * pixelSize * 8;
          map.value.style.transform = `translate3d( ${-movement.x*pixelSize+camera_left}px, ${-movement.y*pixelSize+camera_top}px, 0 )`;
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