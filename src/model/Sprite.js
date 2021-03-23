class Sprite {
  position;

  _color;

  constructor(position, color = 'black') {
    this.position = position;
    this._color = color;
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  get color() {
    return this._color;
  }

  set color(c) {
    // Précondition : c doit exister
    if (!c) {
      return;
    }
    this._color = c;
  }
}

Sprite.colors = ['black', 'red', 'orange', 'blue', 'green', 'yellow'];

export default Sprite;
