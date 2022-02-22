import React from 'react';
import './App.scss';
// import { isOperator, endsWithOperator, endsWithNegativeSign } from './regex';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentValue: '0',
      previousValue: '0',
      formula: '',
    };

    this.inialState = this.inialState.bind(this);
    this.handleEqualSign = this.handleEqualSign.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }

  maxDigitReached() {
    this.setState({
      currentValue: 'Maximum digits reached',
      previousValue: this.state.currentValue,
    });
    setTimeout(
      () => this.setState({ currentValue: this.state.previousValue }),
      1000
    );
  }

  usingOperators = (e) => {
    const value = e.target.value;
    const { formula, previousValue, evaluated } = this.state;
    this.setState({ currentValue: value, evaluated: false });
    if (evaluated) {
      this.setState({ formula: previousValue + value });
    } else if (!/[x+-/]$/.test(formula)) {
      this.setState({
        previousValue: formula,
        formula: formula + value,
      });
    } else if (!/\d[x/+-]{1}-$/.test(formula)) {
      this.setState({
        formula:
          (/\d[x/+-]{1}-$/.test(formula + value) ? formula : previousValue) +
          value,
      });
    } else if (value !== '-') {
      this.setState({
        formula: previousValue + value,
      });
    }
  };

  handleNumbers = (e) => {
    const { currentValue, formula, evaluated } = this.state;
    const value = e.target.value;
    this.setState({ evaluated: false });
    if (currentValue.length > 15) {
      this.maxDigitReached();
    } else if (evaluated) {
      this.setState({
        currentValue: value,
        formula: value !== '0' ? value : '',
      });
    } else {
      this.setState({
        currentValue:
          currentValue === '0' || /[x/+‑]/.test(currentValue)
            ? value
            : currentValue + value,
        formula:
          currentValue === '0' && value === '0'
            ? formula === ''
              ? value
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value,
      });
    }
  };

  handleEqualSign = () => {
    let equation = this.state.formula;
    while (/[x+‑/]$/.test(equation)) {
      equation = equation.slice(0, -1);
    }
    equation = equation.replace(/x/g, '*').replace(/‑/g, '-');

    let answer = Math.round(1000000000000 * eval(equation)) / 1000000000000;
    this.setState({
      currentValue: answer.toString(),
      formula: equation.replace(/\*/g, '⋅') + '=' + answer,
      previousValue: answer,
      evaluated: true,
    });
  };

  inialState = () => {
    this.setState({
      currentValue: '0',
      previousValue: '0',
      formula: '',
      evaluated: false,
    });
  };

  handleDecimal = () => {
    const { currentValue, formula, evaluated } = this.state;

    if (currentValue.length > 15) {
      this.maxDigitReached();
    } else if (
      /[x+‑/]$/.test(this.state.formula) ||
      (currentValue === '0' && formula === ' ')
    ) {
      this.setState({ currentValue: '0.', formula: formula + '0.' });
    } else {
      this.setState({
        currentValue: currentValue.includes('.')
          ? currentValue
          : formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
        formula: formula + '.',
      });
    }
  };

  render() {
    return (
      <div className='App'>
        <div id='display' className='display'>
          <div className='previous-value'>{this.state.formula}</div>
          <div className='current-value'>{this.state.currentValue}</div>
        </div>
        <div className='key-layout'>
          <button
            id='clear'
            value='AC'
            className='large clear-button'
            onClick={this.inialState}
          >
            AC
          </button>

          <button
            id='divide'
            value='/'
            className='operators'
            onClick={(e) => this.usingOperators(e)}
          >
            /
          </button>

          <button
            id='multiply'
            value='x'
            className='operators'
            onClick={(e) => this.usingOperators(e)}
          >
            x
          </button>

          <button
            id='seven'
            value='7'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            7
          </button>

          <button
            id='eight'
            value='8'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            8
          </button>

          <button
            id='nine'
            value='9'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            9
          </button>

          <button
            id='subtract'
            value='-'
            className='operators'
            onClick={(e) => this.usingOperators(e)}
          >
            -
          </button>

          <button
            id='four'
            value='4'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            4
          </button>

          <button
            id='five'
            value='5'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            5
          </button>

          <button
            id='six'
            value='6'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            6
          </button>

          <button
            id='plus'
            value='+'
            className='operators'
            onClick={(e) => this.usingOperators(e)}
          >
            +
          </button>

          <button
            id='one'
            value='1'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            1
          </button>

          <button
            id='two'
            value='2'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            2
          </button>

          <button
            id='three'
            value='3'
            className='numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            3
          </button>

          <button
            id='zero'
            value='0'
            className='large numbers'
            onClick={(e) => this.handleNumbers(e)}
          >
            0
          </button>

          <button
            id='decimal'
            value='.'
            className='numbers'
            onClick={this.handleDecimal}
          >
            .
          </button>

          <button
            id='equals'
            value='='
            className='long'
            onClick={this.handleEqualSign}
          >
            =
          </button>
        </div>
        <p>Created by Aman</p>
      </div>
    );
  }
}

export default App;
