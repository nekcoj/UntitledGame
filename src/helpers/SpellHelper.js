import Store from './Store';

export default function SpellHelper() {
  const duration = 0.7;
  const { characterState, character, movement, map, enemyPosRefs, enemyRefs } = Store();
  const castSkill = (skillNumber, origin = 'player') => {
    if (characterState.activeSkills[skillNumber].type === 'support') {
      let char = document.getElementById('character_shadow');
        char.classList.add(`${characterState.activeSkills[skillNumber].name.toLowerCase()}`);
        setTimeout(() => {
          char.classList.remove(`${characterState.activeSkills[skillNumber].name.toLowerCase()}`);
        }, 600);
      characterState.activeSkills[skillNumber].effect(skillNumber);
    } else if (characterState.activeSkills[skillNumber].type === 'attack') {
      const spell = animateSpell(skillNumber);
      let collDivs; 
      if ( origin === 'player') {
        collDivs = enemyPosRefs.value;
      } else {
        collDivs = Array.from(character.value);
      }
      collDivs.forEach(div => {
        checkSkillHit(spell, div) ? spellOnHitAction(spell, div) : null;
      });
      setTimeout(() => {
        collDivs.forEach(div => {
          checkSkillHit(spell, div) ? spellOnHitAction(spell, div) : null;
        });
        spell.remove();
      }, duration * 1000);
    }
  }

  const checkSkillHit = (spell, target) => {
    let pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
    const { x, y } = target.getBoundingClientRect();
    const spellX = spell.getBoundingClientRect().x;
    const spellY = spell.getBoundingClientRect().y;
    const size = 16 * pixelSize;
    if (x < spellX + (size / 2) && x + (size / 2) > spellX && y < spellY + size && y + size > spellY) {
      return true;
    }
    return false;
  }

  const spellOnHitAction = (spellElement, collisionElement) => {
    const spell = characterState.activeSkills.find(spell => spell.name.toLowerCase() === Array.from(spellElement.classList)[0]);
    const target = collisionElement.getAttribute('player') === 'true' ? character : enemyRefs.value[parseInt(collisionElement.getAttribute('id').split('enemy-')[1])];
    //collisionElement.getAttribute('player') === 'true' ? characterState.setHealth(-spell.baseDamage) : target.enemy.currentHealth -= spell.baseDamage;
    target.setHealth(-spell.baseDamage);
    console.log('Hit! You sunk my battleship!');
  }

  const animateSpell = (skillNumber) => {
    let root = document.documentElement;
    root.style.setProperty('--spell-end-x', movement.mousePosition.x + 'px');
    root.style.setProperty('--spell-end-y', movement.mousePosition.y + 'px');
    let spell = document.createElement('div');
    let posX = character.value.getAttribute('posx');
    let posY = character.value.getAttribute('posy');
    let size = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')) * 16) / 2;
    spell.style.left = parseInt(posX) + (size / 2) + 'px';
    spell.style.x = parseInt(posY) + (size / 2) + 'px';
    root.style.setProperty('--spell-start-x', parseInt(posX) + (size / 2) + 'px');
    root.style.setProperty('--spell-start-y', parseInt(posY) + (size / 2) + 'px');
    spell.style.animationDuration = duration + 's';
    let dy = movement.mousePosition.y - (parseInt(posY) + (size / 2));
    let dx = movement.mousePosition.x - (parseInt(posX) + (size / 2));
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    spell.style.transform = `rotate(${theta}deg)`;
    spell.classList.add(`${characterState.activeSkills[skillNumber].name.toLowerCase()}`);
    map.value.appendChild(spell);
    return spell;
  }
  return { castSkill }
}