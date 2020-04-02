import React, { Component } from 'react'
import Visor from '../Visor/Visor'
import Botoes from '../Botoes/Botoes'
import './Calculadora.css'

class Calculadora extends Component {
    state = {
        valor_display: '0',
        clear_display: false,
        operation: null,
        valores: [0, 0],
        index: 0
    }
    limpar_memoria(){
        this.setState({
            valor_display: '0',
            clear_display: false,
            operation: null,
            valores: [0, 0],
            index: 0
        })
    }
    add_operacao(operacao){
        if ( this.state.index === 0) {
            this.setState({operation: operacao, index:1, clear_display:true})
        }
        else{
            const equals = operacao === '='
            const current_op = this.state.operation

            const valores = [...this.state.valores]

            switch (current_op) {
                case '+':
                    valores[0] = valores[0] + valores[1]
                    break
                case '-':
                    valores[0] = valores[0] - valores[1]
                    break
                case '*':
                    valores[0] = valores[0] * valores[1]
                    break
                case '/':
                    try {
                        valores[0] = valores[0] / valores[1]
                    }catch(e){
                        valores[0] = this.state.valores[0]
                        console.log('erro!! divisão por 0')    
                    }
                    break
                default:
                    break
            }
            valores[1] = 0

            this.setState({
                valor_display: valores[0],
                operation: equals ? null : operacao,
                index: equals ? 0 : 1,
                clear_display: !equals,
                valores
            })
        }
    }

    add_digito(n){
        if ( n === '.' && this.state.valor_display.includes('.')){
            return
        }
        const clear_display = this.state.valor_display === '0' || this.state.clear_display

        const current_value = clear_display ? '' : this.state.valor_display
        const display_value = current_value + n

        this.setState({valor_display: display_value, limpar_memoria: false})

        if (n !== '.') {
            const i = this.state.index
            const novo_valor = parseFloat(display_value)
            const valores = [...this.state.valores]
            valores[i] = novo_valor
            this.setState({valores})
        }
    }
    render(){
        
       
        const add_dig = (n) => this.add_digito(n)
        const add_op = (op) => this.add_operacao(op)
        
        return(
            <>
                <h1>CALCULADORA</h1>
                <div className= 'calculator'>
                    <Visor value= { this.state.valor_display }/>
                    <Botoes label= 'AC' click ={ () => this.limpar_memoria() } triple/>
                    <Botoes label= '/' click = {add_op} operation/>
                    <Botoes label= '7' click = {add_dig}/>
                    <Botoes label= '8' click = {add_dig}/>
                    <Botoes label= '9' click = {add_dig}/>
                    <Botoes label= '*' click = {add_op} operation/>
                    <Botoes label= '4' click = {add_dig}/>
                    <Botoes label= '5' click = {add_dig}/>
                    <Botoes label= '6' click = {add_dig}/>
                    <Botoes label= '-' click = {add_op} operation/>
                    <Botoes label= '1' click = {add_dig}/>
                    <Botoes label= '2' click = {add_dig}/>
                    <Botoes label= '3' click = {add_dig}/>
                    <Botoes label= '+' click = {add_op} operation/>
                    <Botoes label= '0' click = {add_dig} double/>
                    <Botoes label= '.' click = {add_dig}/>
                    <Botoes label= '=' click = {add_op} operation/>
                </div>
            </>
        )
    }
}

export default Calculadora