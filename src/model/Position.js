class Position {
  x;

  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }

  /**
   * Retourne true si la position p est la même que la position courante
   * @param  {Position} p position
   * @return {bool}   true si la position est la même, false sinon
   */
  equals(p) {
    return p && (p instanceof Position) && this.x === p.x && this.y === p.y;
  }
}

export default Position;
