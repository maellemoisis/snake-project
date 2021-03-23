import React from 'react'
import './Snake.scss'

class Snake extends React.Component {

    constructor(props) {
        super(props)
    }
    handleKeyDown(event) {
        console.log(event.keyCode)
        // if spacebar is pressed to run a new game
        if ((this.state.isGameOver && event.keyCode === 32)||(event.keyCode === 32)) {
            this.resetGame()
            return
        }

        if (this.state.directionChanged) return

        switch (event.keyCode) {
            case 37:
            case 65:
                this.goLeft()
                break
            case 38:
            case 87:
                this.goUp()
                break
            case 39:
            case 68:
                this.goRight()
                break
            case 40:
            case 83:
                this.goDown()
                break
            default:
        }
        this.setState({ directionChanged: true })
    }

    goLeft() {
        let newDirection = this.state.direction === 'right' ? 'right' : 'left'
        this.setState({ direction: newDirection })
    }

    goUp() {
        let newDirection = this.state.direction === 'down' ? 'down' : 'up'
        this.setState({ direction: newDirection })
    }

    goRight() {
        let newDirection = this.state.direction === 'left' ? 'left' : 'right'
        this.setState({ direction: newDirection })
    }

    goDown() {
        let newDirection = this.state.direction === 'up' ? 'up' : 'down'
        this.setState({ direction: newDirection })
    }

    render() {

        return (
            <div>
                <h2>Je suis le serpent</h2>
            </div>
        )
    }
}

export default Snake
