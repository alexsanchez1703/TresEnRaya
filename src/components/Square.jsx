//Creamos un componente Square y le enviamos el children, la actualizacion del tablero y la posicion
export const Square = ({children, isSelected, updateBoard, index}) =>
{
  //Crar una variable que dependiendo de la square seleccionada nos cambia la clase CSS
  const className = `square ${isSelected ? 'is-selected' : ''}`
  //Funcion que al hacer click ejecuta la funcion UpdateBoard
  const handleClick = () => {
    //Se envia el indice a traves de la funcion 
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}