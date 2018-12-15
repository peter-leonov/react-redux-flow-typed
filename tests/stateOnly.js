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

type OwnProps = {|
  own1: string,
|};

type StateProps = {|
  state1: string,
  state2: number,
|};

type Props = {|
  ...OwnProps,
  ...StateProps,
|};

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
<C1 own1="" />;

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

const areStatesEqual = (next: State, prev: State) => true;
const areOwnPropsEqual = (next: OwnProps, prev: OwnProps) => true;
const areStatePropsEqual = (next: StateProps, prev: StateProps) => true;

export const C4 = connect<Props, State, _>(
  mapStateToProps,
  null,
  null,
  {
    pure: true,
    areStatesEqual,
    areOwnPropsEqual,
    areStatePropsEqual,
  },
)(WC);
export const c4 = <C3 own1="foo" />;
