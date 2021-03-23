import SnakeEngine from './SnakeEngine';
import DirectionManager from './DirectionManager';

const READY_STATE = 0;
const PLAYING_STATE = 1;
const PAUSED_STATE = 2;
const STOPPED_STATE = 3;

class SnakeGame {
  _engine;

  _directionManager;

  _state = READY_STATE;

  _score = 0;

  _level = 1;

  _intervalId = null;

  constructor(gridSize) {
    this._engine = new SnakeEngine(gridSize);
    this._directionManager = new DirectionManager();
  }

  get score() {
    return this._score;
  }

  get level() {
    return this._level;
  }

  set level(newLevel) {
    // Precondition 1 : je dois être dans un état qui permet la modification du niveau
    if (this.state !== READY_STATE && this.state !== STOPPED_STATE) {
      return;
    }
    // Precondition 2 : newLevel doit être un nombre entre 1 et 5 compris
    const parsedNewLevel = Number(newLevel);
    if (Number.isNaN(parsedNewLevel) || parsedNewLevel < 1 || parsedNewLevel > 5) {
      return;
    }
    this._level = parsedNewLevel;
  }

  /**
   * Retourne la vitesse du serpent (en ms) d'après le niveau
   * @return {Number} la vitesse en ms
   */
  get speed() {
    const vitesseMin = 200;
    const vitesseMax = 50;
    // f(niveau) = vitesse avec f(1) = vitesseMin, f(5) = vitesseMax, f(niveau) = a*niveau + b
    // f(1) = a + b = vitesseMin f(5) = 5a + b = vitesseMax
    // 5a + b - ( a + b) = 4a = vitesseMax - vitesseMin => a = (vitesseMax - vitesseMin) / 4
    // b = vitesseMin - a
    const a = (vitesseMax - vitesseMin) / 4;
    const b = vitesseMin - a;
    return a * this._level + b;
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    switch (this._state) {
      case READY_STATE:
        if (newState === PLAYING_STATE) {
          this._initGame(); // init du snake ; score à 0
          this._startPlaying(); // lance le directionManager et la boucle de jeu
          this._state = PLAYING_STATE;
        } else {
          console.error(`TRANSITION IMPOSSIBLE: ${this._state} -> ${newState}`);
        }
        break;
      case PLAYING_STATE:
        if (newState === STOPPED_STATE) {
          this._stopPlaying();
          this._state = STOPPED_STATE;
        } else if (newState === PAUSED_STATE) {
          this._stopPlaying();
          this._state = PAUSED_STATE;
        } else {
          console.error(`TRANSITION IMPOSSIBLE: ${this._state} -> ${newState}`);
        }
        break;
      case PAUSED_STATE:
        if (newState === PLAYING_STATE) {
          this._startPlaying(); // lance le directionManager et la boucle de jeu
          this._state = PLAYING_STATE;
        } else {
          console.error(`TRANSITION IMPOSSIBLE: ${this._state} -> ${newState}`);
        }
        break;
      case STOPPED_STATE:
        if (newState === PLAYING_STATE) {
          this._initGame(); // init du snake ; score à 0
          this._startPlaying(); // lance le directionManager et la boucle de jeu
          this._state = PLAYING_STATE;
        } else {
          console.error(`TRANSITION IMPOSSIBLE: ${this._state} -> ${newState}`);
        }
        break;
      default:
        console.error(`ETAT ACTUEL NON GERE: ${this._state}`);
    }
  }

  _initGame() {
    this._engine.initSnake();
    this._directionManager.initDirection();
    this._score = 0;
  }

  _startPlaying() {
    // Précondition : il n'y a pas déjà un interval
    if (this._intervalId !== null) {
      return;
    }
    this._directionManager.startListening();
    this._intervalId = setInterval(() => this._playATurn(), this.speed);
  }

  _stopPlaying() {
    // Précondition : il y a un interval
    if (this._intervalId === null) {
      return;
    }
    this._directionManager.stopListening();
    clearInterval(this._intervalId);
    this._intervalId = null;
  }

  _playATurn() {
    // Déplace le serpent
    switch (this._engine.move(this._directionManager.direction)) {
      case -1: // Le serpent s'est mordu la queue
        this.state = STOPPED_STATE;
        break;
      case 1: // Le serpent a mangé une nourriture
        this._score += 5 * (this.level + 1);
        break;
      case 0: // le serpent a simplement bougé
        // Rien à faire
        break;
      default:
        console.error('retour de move invalide');
    }
  }
}

export default SnakeGame;
