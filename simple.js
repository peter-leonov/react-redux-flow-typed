import React, { Component } from 'react'
import { connect } from 'react-redux'

// redux

type State = {
    state1: string,
    state2: number,
}

const getState1 = (state: State) => state.state1
const getState2 = (state: State) => state.state2

// component

type Dispatch = () => void

type OwnProps = {|
    own1: Date
|}

type StateProps = {|
    state1: string,
    state2: number,
|}

type Props = {|
    ...StateProps,
    ...OwnProps,
|}

class A_ extends Component<Props, {}> {
    render() {
        return null
    }
}

const mapStateToProps = state => ({
    state1: getState1(state),
    state2: getState2(state)
})

export const A = connect<State, Dispatch, OwnProps, StateProps>(mapStateToProps)(A_)

const render = <A own1={new Date} />
