import React from 'react'
import './Visor.css'

const Visor = (props) => {
    return(
        <div className= 'display'>{props.value}</div>
    )
}

export default Visor

