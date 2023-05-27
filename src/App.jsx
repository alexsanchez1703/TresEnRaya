import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants/constants"
import { checkWinner, checkEnGame } from "./logic/Logic"
import { WinnerFrom } from "./components/WinnerFrom"

function App() {
// crear el tablero como un estado inicial de 9 posiciones y asignamos el valor null 
 const [board, setBoard] = useState(() => {
  const boardFromStorage = window.localStorage.getItem('board')
  return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
})
 // crear los turnos como un estado que empieza en el turno de X
 const [turn, setTurn] = useState(() => {
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ?? TURNS.X
})
 const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

 //funcion que actualiza el tablero segun el estado de los turnos y posiciones
 const updateBoard = (index) => {
  //Si en el tablero en la posicion index tiene algo no hacer nada
  if(board[index] || winner) return
  //Creamos una copia del tablero en una nuevoTablero
  const newBoard = [...board]
  //Al nuevo tablero segun la posicion le agregamos el turno 
  newBoard[index] = turn
  //Actualizamos el tablero 
  setBoard(newBoard)
  //Creamos una constante que ealue si el turno actual es X entonces le tocara 
  // a O y si esta en O le tocara a X
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  //Actulizamos el turno
  setTurn(newTurn)
  //Guardar aqui la partida
  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)


  //Revisar si hay un ganador
  const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }else if (checkEnGame(newBoard)){
      setWinner(false)
    }
  }
  return (
    //Creamos un main que contendra todo el juego
    <main className='board'>
      {/* Titulo del juego */}
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reset del juego</button>
      {/* seccion donde se se jugara */}
      <section className='game'>
        {
          board.map((celda, index) => {
            return(
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {celda}
              </Square>
            )
          })
        }
      </section>
      {/* Seccion donde estaran los tunos */}
      <section className="turn">
        {/* Se envia mediante props isSelected */}
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square  isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerFrom resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
