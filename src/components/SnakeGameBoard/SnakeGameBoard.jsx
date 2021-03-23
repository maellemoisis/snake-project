import React, { useState } from 'react';
import classNames from 'classnames';
import style from './SnakeGameBoard.scss';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';

class SnakeGameBoard extends React.Component {

    render() {

        return (
            <div>
                <h2>La fenêtre du jeu du serpent</h2>
                <Snake />
                <Food />
            </div>
        )
    }
}

export default SnakeGameBoard
