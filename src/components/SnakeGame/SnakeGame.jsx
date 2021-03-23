import React from 'react';
import { render } from 'react-dom';
import './SnakeGame.scss';
import SnakeGameBoard from '../SnakeGameBoard/SnakeGameBoard';
import Button from '../Button/Button';


class SnakeGame extends React.Component {

    render() {

        return (
            <div id="snakeGame">
                test
                <h2>Le jeu du serpent</h2>
                <SnakeGameBoard />
                <div className="">
                    <Button/> <Button/>
                </div>
            </div>
        )
    }
}

export default SnakeGame
