// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { TicTacToeSquares } from 'types'
import { LocalStorageKey } from '../constants'

interface BoardProps {
  onClick: (index: number) => void
  squares: TicTacToeSquares[]
}

const Board = ({ onClick, squares }: BoardProps) => {
  const renderSquare = (index: number) => {
    return (
      <button className="square" onClick={() => onClick(index)}>
        {squares[index]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const Game = () => {
  // 🐨 squares is the state for this component. Add useState for squares
  const { initialState, state, setState } = useLocalStorage(
    LocalStorageKey.TicTacToeSquares,
  )

  // 🐨 We'll need the following bits of derived state:
  const nextValue = calculateNextValue(state)
  const winner = calculateWinner(state)
  const status = calculateStatus(winner, state, nextValue)
  const currentSquares = state

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  const selectSquare = (square: number) => {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    if (winner || state[square]) {
      return
    }

    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    // 🐨 make a copy of the squares array
    const squaresCopy = [...state]

    // 🐨 set the value of the square that was selected
    squaresCopy[square] = nextValue

    // 🐨 set the squares to your copy
    setState(squaresCopy)
  }

  const restart = () => {
    // 🐨 reset the squares
    setState(initialState)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      {/* 🐨 put the status in the div below */}
      <div className="game-info">
        <div>{status}</div>
        {/* <ol>{moves}</ol> */}
      </div>
    </div>
  )
}

const calculateStatus = (winner: any, squares: any, nextValue: any) => {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

const calculateNextValue = (squares: any) => {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

const calculateWinner = (squares: any) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
