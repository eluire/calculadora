import React, { Component } from 'react'
import Visor from '../Visor/Visor'
import Botoes from '../Botoes/Botoes'
import './Calculadora.css'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

class Calculadora extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)

        this.limpar_memoria = this.limpar_memoria.bind(this)
        this.add_operacao = this.add_operacao.bind(this)
        this.add_digito = this.add_digito.bind(this)
    }

    limpar_memoria() {
        this.setState({ ...initialState })
    }

    add_operacao(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    add_digito(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render(){
        return(
            <>
                <h1>CALCULADORA</h1>
                <div className= 'calculator'>
                    <Visor value= { this.state.displayValue }/>
                    <Botoes label= 'AC' click ={this.limpar_memoria} triple/>
                    <Botoes label= '/' click = {this.add_digito} operation/>
                    <Botoes label= '7' click = {this.add_digito}/>
                    <Botoes label= '8' click = {this.add_digito}/>
                    <Botoes label= '9' click = {this.add_digito}/>
                    <Botoes label= '*' click = {this.add_operacao} operation/>
                    <Botoes label= '4' click = {this.add_digito}/>
                    <Botoes label= '5' click = {this.add_digito}/>
                    <Botoes label= '6' click = {this.add_digito}/>
                    <Botoes label= '-' click = {this.add_operacao} operation/>
                    <Botoes label= '1' click = {this.add_digito}/>
                    <Botoes label= '2' click = {this.add_digito}/>
                    <Botoes label= '3' click = {this.add_digito}/>
                    <Botoes label= '+' click = {this.add_operacao} operation/>
                    <Botoes label= '0' click = {this.add_digito} double/>
                    <Botoes label= '.' click = {this.add_digito}/>
                    <Botoes label= '=' click = {this.add_operacao} operation/>
                </div>
            </>
        )
    }
}
export default Calculadora