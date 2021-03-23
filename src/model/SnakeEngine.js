import Sprite from './Sprite';
import Position from './Position';

class SnakeEngine {
  _gridSize;

  _initialSnakeSize;

  _isSnakeBlocked = false;

  _snake = [];

  _food = null;

  constructor(gridSize, initialSnakeSize = 5) {
    this._gridSize = gridSize;
    this._initialSnakeSize = initialSnakeSize;
  }

  /**
   * Créer un snake de taille initial positionné horizontalement
   * vers la droite au centre de la grille
   * @return {void}
   */
  initSnake() {
    // RAZ de la food et de isBlocked
    this._food = null;
    this._isSnakeBlocked = false;
    // Création d'un nouveau serpent
    // Calcul de la position "milieu vertical"
    const middleY = Math.floor(this._gridSize / 2);
    // calcul de la position "milieu horizontal" - la moitié du serpent
    const middleX = Math.floor((this._gridSize - this._initialSnakeSize) / 2);

    this._snake = Array(this._initialSnakeSize).fill(null)
      .map((_, i) => new Sprite(new Position(middleX + i, middleY)));
  }

  /**
   * Déplace le serpent d'une case dans la direction donnée.
   * Si le serpent "mange" une nourriture : fais grandir le serpent,
   * rajoutera une nouvelle nourriture, retournera 1.
   * Si le serpent se mange lui-même : bloque le serpent et retournera -1
   * Sinon retourne 0
   * @param  {[type]} direction la direction
   * @return {Number}           -1, 0 ou 1
   */
  move(direction) {
    // Précondition : le serpent n'est pas déjà bloqué
    if (this._isSnakeBlocked) {
      return -1;
    }
    // Calculer la nouvelle position de la tête
    const newHeadPos = this._createNewHeadPosition(direction);
    let ret;
    // Vérifie si le serpent ne va se mordre lui-même
    if (this._snake.some((sprite) => sprite.position.equals(newHeadPos))) {
      // Le serpent s'est mordu
      this._isSnakeBlocked = true;
      return -1;
    } if (this._food !== null && newHeadPos.equals(this._food.position)) {
      // Le serpent mange une nourriture
      this._snake.push(this._food);
      this._food = null;
      ret = 1;
    } else {
      // Le serpent a simplement bougé
      this._moveSnake(newHeadPos);
      ret = 0;
    }
    // Création de nourriture au besoin
    if (this._food === null) {
      // TODO : créer une nourriture
      this._createNewFood();
    }
    return ret;
  }

  /**
   * Créer une nouvelle position de la tête selon la direction
   * @param  {[type]} direction [description]
   * @return {[type]}           [description]
   */
  _createNewHeadPosition(direction) {
    const oldHeadPosition = this._snake[this._snake.length - 1].position;
    let newHeadPosition;
    switch (direction) {
      case 'up':
        newHeadPosition = new Position(oldHeadPosition.x,
          oldHeadPosition.y === 0 ? this._gridSize - 1 : oldHeadPosition.y - 1);
        break;
      case 'down':
        newHeadPosition = new Position(oldHeadPosition.x,
          oldHeadPosition.y === this._gridSize - 1 ? 0 : oldHeadPosition.y + 1);
        break;
      case 'left':
        newHeadPosition = new Position(
          oldHeadPosition.x === 0 ? this._gridSize - 1 : oldHeadPosition.x - 1,
          oldHeadPosition.y,
        );
        break;
      case 'right':
        newHeadPosition = new Position(
          oldHeadPosition.x === this._gridSize - 1 ? 0 : oldHeadPosition.x + 1,
          oldHeadPosition.y,
        );
        break;
      default:
        console.error(`Mauvais indicateur de position: ${direction}`);
        newHeadPosition = oldHeadPosition;
    }
    return newHeadPosition;
  }

  /**
   * Déplace le serpent à la nouvelle position de tête
   * @param  {[type]} newHeadPosition [description]
   * @return {[type]}                 [description]
   */
  _moveSnake(newHeadPosition) {
    // Décale toutes les positions des sprites de la queue à la tête - 1
    for (let i = 0; i < this._snake.length - 1; i += 1) {
      this._snake[i].position = this._snake[i + 1].position;
    }
    // la tête prend la nouvelle position
    this._snake[this._snake.length - 1].position = newHeadPosition;
  }

  /**
   * Créer une nouvelle nourriture aléatoirement sur la grille, sans la placer sur le serpent
   * @return {[type]} [description]
   */
  _createNewFood() {
    // Vérifier en premier lieu s'il y a encore de la place
    const T = this._gridSize * this._gridSize;
    if (this._snake.length === T) {
      return;
    }
    // Calcule au hasard un indice sur [0; T - taille du serpent[
    let i = Math.floor(Math.random() * (T - this._snake.length));
    // Créer un tableau des indices triés sur serpent à 1 dimension
    const snakeIndices = this._snake.map(
      (sprite) => sprite.y * this._gridSize + sprite.x,
    ).sort();
    // Ajuste la valeur de i avec les indices du serpent
    for (let j = 0; j < snakeIndices.length && snakeIndices[j] <= i; j += 1) {
      i += 1;
    }
    // Ici i est l'indice d'une case libre dans le reférentiel à 1 dimension
    // i = y * this._gridSize + x
    const x = i % this._gridSize;
    const y = Math.floor(i / this._gridSize);
    // Calcul de l'indice de couleur aléatoirement
    const colorIdx = Math.floor(Math.random() * Sprite.colors.length);
    this._food = new Sprite(new Position(x, y), Sprite.colors[colorIdx]);

    // let foundPos = null;
    // while (foundPos === null) {
    //   const x = Math.floor(Math.random() * this._gridSize); // [0; gridSize-1]
    //   const y = Math.floor(Math.random() * this._gridSize);
    //   const pos = new Position(x, y);
    //   if (!this._snake.some((sprite) => sprite.position.equals(pos))) {
    //     foundPos = pos;
    //   }
    // }
    // this._food = new Sprite(pos);
  }
}

export default SnakeEngine;
