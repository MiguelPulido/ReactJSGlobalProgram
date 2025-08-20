import React, { Component } from 'react';
import './counter.css';


interface CounterProps {
  initialValue: number;
}

interface CounterState {
  value: number;
}

class Counter extends Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props);
        this.state = {
            value: props.initialValue
        };
    }

    decrement = (): void => {
        this.setState(prevState => ({value: prevState.value - 1}));
    };

    increment = (): void => {
        this.setState(prevState => ({value: prevState.value + 1}));
    };

    render() {
        return React.createElement(
            'div',
            {className: 'counter-container',},
            React.createElement(
                'button',
                {
                    onClick: this.decrement,
                    className: 'decrement-button',
                },
                '-'
            ),
            React.createElement(
                'span',
                {
                },
                this.state.value
            ),
            React.createElement(
                'button',
                {
                    onClick: this.increment,
                    className: 'increment-button',
                },
                '+'
            )
        );
    }
}

export default Counter;
