class DirectionManager {
  _direction;

  _eventHandler = null;

  constructor() {
    this.initDirection();
  }

  get direction() {
    return this._direction;
  }

  initDirection() {
    this._direction = 'right';
  }

  startListening() {
    if (this._eventHandler !== null) {
      this.stopListening();
    }
    this._eventHandler = this._captureKeyboard.bind(this);
    window.addEventListener('keydown', this._eventHandler, true);
  }

  stopListening() {
    if (this._eventHandler !== null) {
      window.removeEventListener('keydown', this._eventHandler, true);
      this._eventHandler = null;
    }
  }

  _captureKeyboard(evt) {
    // On change la direction selon la touche appuyée
    switch (evt.key) {
      case 'ArrowUp':
      case 'z':
      case 'Z':
        this._changeDirection('up');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        this._changeDirection('down');
        break;
      case 'ArrowLeft':
      case 'q':
      case 'Q':
        this._changeDirection('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        this._changeDirection('right');
        break;
      default:
        return;
    }
    // On annule le traitement par defaut
    evt.preventDefault();
  }

  _changeDirection(newDirection) {
    // Précondition : on ne peut paschanger la direction pour une direction "opposée"
    if ((this._direction === 'down' && newDirection === 'up')
    || (this._direction === 'up' && newDirection === 'down')
    || (this._direction === 'left' && newDirection === 'right')
    || (this._direction === 'right' && newDirection === 'left')) {
      return;
    }
    this._direction = newDirection;
  }
}

export default DirectionManager;
