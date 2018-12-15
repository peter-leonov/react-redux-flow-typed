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

type OnlyOwnProps = {|
  own1: string,
  dispatch: Dispatch,
|};

type OwnProps = {|
  own1: string,
|};

type StateProps = {|
  state1: string,
  state2: number,
|};

type Props = {
  ...OwnProps,
  ...StateProps,
};

class ComponentOnlyOwn extends Component<OnlyOwnProps, {}> {}
class ComponentProps extends Component<Props, {}> {}

const mapStateToProps = (state, ownProps) => {
  // // $FlowFixMe state1 is missing in Props
  // ownProps.state1;
  return {
    state1: getState1(state).concat(ownProps.own1),
    state2: getState2(state),
  };
};

export const C = connect<Props, State, _>(mapStateToProps)(ComponentProps);

<C own1="" nonExisting="sdsd" />;

export const C1 = connect<Props, State, _>(
  mapStateToProps,
  null,
)(ComponentProps);
export const c1 = <C1 own1="foo" />;

export const C2 = connect<Props, State, _>(
  mapStateToProps,
  null,
  null,
)(ComponentProps);
export const c2 = <C2 own1="foo" />;

export const C3 = connect<Props, State, _>(
  mapStateToProps,
  null,
  null,
)(ComponentProps);
export const c3 = <C3 own1="foo" />;

export const OnlyOwn1 = connect<OnlyOwnProps, Action, _>(
  null,
  null,
  null,
  null,
)(ComponentOnlyOwn);
export const onlyOwn1 = <OnlyOwn1 own1="foo" />;

export const OnlyOwn2 = connect<OnlyOwnProps, Action, _>(
  null,
  null,
  null,
  { pure: false },
)(ComponentOnlyOwn);
export const onlyOwn2 = <OnlyOwn1 own1="foo" />;

const equalNoop = (next, prev) => {
  (next: {||});
  (prev: {||});
  return true;
};

export const C6 = connect<OnlyOwnProps, Action, _>(
  null,
  null,
  null,
  {
    pure: true,
    areStatesEqual: equalNoop,
    areOwnPropsEqual: (next, prev) => {
      (next: OnlyOwnProps);
      (prev: OnlyOwnProps);
      return true;
    },
    areStatePropsEqual: equalNoop,
  },
)(ComponentOnlyOwn);
export const c6 = <C6 own1="foo" />;
