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

type Props = {|
  own1: string,
  dispatch: Dispatch,
|};

class WC extends Component<Props, {}> {}

export const C1 = connect<Props, Action, _>(
  null,
  null,
  null,
  null,
)(WC);
export const c1 = <C1 own1="foo" />;

export const C2 = connect<Props, Action, _>(
  null,
  null,
  null,
  { pure: false },
)(WC);
export const c2 = <C1 own1="foo" />;

const equalNoop = (next, prev) => {
  (next: {||});
  (prev: {||});
  return true;
};

export const C6 = connect<Props, Action, _>(
  null,
  null,
  null,
  {
    pure: true,
    areStatesEqual: equalNoop,
    areOwnPropsEqual: (next, prev) => {
      (next: Props);
      (prev: Props);
      return true;
    },
    areStatePropsEqual: equalNoop,
  },
)(WC);
export const c6 = <C6 own1="foo" />;
