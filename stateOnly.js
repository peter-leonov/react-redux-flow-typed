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

type Dispatch = Action => Action;

// component

type Props = {
  own1: string,
  state1: string,
  state2: number,
};

class WC extends Component<Props, {}> {}

const mapStateToProps = (state, ownProps) => {
  // // $FlowFixMe state1 is missing in Props
  // ownProps.state1;
  return {
    state1: getState1(state).concat(ownProps.own1),
    state2: getState2(state),
  };
};

export const C1 = connect<Props, State, _>(mapStateToProps)(WC);
<C1 own1="" nonExisting="sdsd" />;

export const C2 = connect<Props, State, _>(
  mapStateToProps,
  null,
)(WC);
export const c2 = <C1 own1="foo" />;

export const C3 = connect<Props, State, _>(
  mapStateToProps,
  null,
  null,
)(WC);
export const c3 = <C2 own1="foo" />;

export const C4 = connect<Props, State, _>(
  mapStateToProps,
  null,
  null,
)(WC);
export const c4 = <C3 own1="foo" />;
