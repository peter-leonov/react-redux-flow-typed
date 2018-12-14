import React, { Component } from "react";
import { connect } from "react-redux";

// redux

type State = {|
  +state1: string,
  +state2: number,
|};

const getState1 = (state: State) => state.state1;
const getState2 = (state: State) => state.state2;

type Dispatch = () => void;

// component

type OwnProps = {|
  own1: Date,
  // [string]: mixed,
|};

type StateProps = {|
  state1: string,
  state2: number,
|};

type Props = {|
  ...OwnProps,
  ...StateProps,
|};

class WC extends Component<Props, {}> {
  render() {
    this.props.own1.toString();
    return null;
  }
}

const mapStateToProps = state => ({
  state1: getState1(state),
  state2: getState2(state),
  // state3: getState2(state)
});

export const C = connect<OwnProps, _, _>(mapStateToProps)(WC);

const render = <C own1={new Date()} />;
