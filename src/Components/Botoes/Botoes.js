import React from 'react'
import './Botoes.css'

const Botoes = (props) => {
    return( 
        <button className= {`
            buttom
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}
        onClick ={e => props.click && props.click(props.label)}
        >
            {props.label}
        </button>
    )
}

export default Botoes