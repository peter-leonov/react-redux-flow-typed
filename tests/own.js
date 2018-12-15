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

type PropsNonStrict = {
  own1: string,
  dispatch: Dispatch,
};

class WC extends Component<Props, {}> {}

export const C7 = connect<Props, _>()(WC);
export const c7 = <C7 own1="" />;

class WC8 extends Component<PropsNonStrict, {}> {}

export const C8 = connect<PropsNonStrict, _>()(WC8);
export const c8 = <C8 own1="" />;

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
export const c2 = <C2 own1="foo" />;

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

declare function mergeProps(
  stateProps: {||},
  dispatchProps: {||},
  ownProps: Props,
): Props;

export const C9 = connect<Props, Action, _>(
  null,
  null,
  mergeProps,
  null,
)(WC);
export const c9 = <C9 own1="foo" />;
