import React, { Component } from "react";
import { connect } from "react-redux";

// redux

type State = {|
  +state1: string,
  +state2: number,
|};

const getState1 = state => state.state1;
const getState2 = state => state.state2;

type Action1 = {|
  type: "ACTION1",
  payload: string,
|};
type Action2 = {|
  type: "ACTION2",
  payload: number,
|};
type Action = Action1 | Action2;

// type Dispatch = Action => Action;

const action1 = (payload, x) => ({ type: "ACTION1", payload: payload + x });
const action2 = payload => ({ type: "ACTION2", payload });

// component

// type OwnProps = {|
//   own1: Date,
//   // [string]: mixed,
// |};

// type StateProps = {|
//   state1: string,
//   state2: number,
// |};

type Props = {|
  own1: string,
  state1: string,
  state2: number,
  action1: typeof action1,
  action2: typeof action2,
|};

class WC extends Component<Props, {}> {
  render() {
    const { own1, state1, state2, ...rest } = this.props;
    this.props.own1.toString();
    // this.props.action2().a();
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

const mapDispatchToProps = {
  action1,
  action2,
  // // $FlowFixMe undefined property action3
  // action3: 1,
};

export const C = connect<Props, State, Action, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(WC);

<C own1="" />;
// // $FlowFixMe missing own1 exists in Props
// <C nonExisting="sdsd" />;
