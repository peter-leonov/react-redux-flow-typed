import React, { Component } from "react";
import { connect } from "react-redux";

// redux

type State = {|
  +state1: string,
  +state2: number,
|};

const getState1 = state => state.state1;
const getState2 = state => state.state2;

// component

// type OwnProps = {|
//   own1: Date,
//   // [string]: mixed,
// |};

// type StateProps = {|
//   state1: string,
//   state2: number,
// |};

type Props = {
  own1: string,
  state1: string,
  state2: number,
};

class WC extends Component<Props, {}> {
  render() {
    const { own1, state1, state2, ...rest } = this.props;
    this.props.own1.toString();
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  // // $FlowFixMe state1 is missing in Props
  // ownProps.state1;
  return {
    state1: getState1(state).concat(ownProps.own1),
    state2: getState2(state),
  };
};

export const C = connect<Props, State, _>(mapStateToProps)(WC);

<C own1="" nonExisting="sdsd" />;
// // $FlowFixMe missing own1 exists in Props
// <C nonExisting="sdsd" />;
