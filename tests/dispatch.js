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

type OwnProps = {|
  own1: string,
|};

type StateProps = {|
  state1: string,
  state2: number,
|};

type DispatchProps = {|
  action1: typeof action1,
  action2: typeof action2,
|};

type Props = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
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

export const c1 = <C own1="" />;
// // missing own1 exists in Props
// <Cfn nonExisting="sdsd" />;

// function version

const mapDispatchToPropsFn = dispatch => ({
  action1: (...args) => dispatch(action1(...args)),
  action2: (...args) => dispatch(action2(...args)),
});

export const Cfn = connect<Props, State, Action, _, _>(
  mapStateToProps,
  mapDispatchToPropsFn,
)(WC);

export const cfn1 = <Cfn own1="" />;
// // missing own1 exists in Props
// <Cfn nonExisting="sdsd" />;

// no state version

type Props2 = {|
  own1: string,
  action1: typeof action1,
  action2: typeof action2,
|};

class WC2 extends Component<Props2, {}> {
  render() {
    const { own1, action1, action2 } = this.props;
    this.props.own1.toString();
    this.props.action2(123).type;
    return null;
  }
}

export const C2 = connect<Props2, Action, _>(
  null,
  mapDispatchToProps,
)(WC2);

export const c2 = <C2 own1="" />;

export const Cfn2 = connect<Props2, Action, _>(
  null,
  mapDispatchToPropsFn,
)(WC2);

export const cfn2 = <Cfn2 own1="" />;

export const C3 = connect<Props2, Action, _>(
  null,
  mapDispatchToProps,
  null,
)(WC2);

export const c3 = <C3 own1="" />;

const areStatesEqual = (next: State, prev: State) => true;
const areOwnPropsEqual = (next: OwnProps, prev: OwnProps) => true;
const areStatePropsEqual = (next: StateProps, prev: StateProps) => true;

export const C4 = connect<Props, State, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatesEqual,
    areOwnPropsEqual,
    areStatePropsEqual,
  },
)(WC);
export const c4 = <C4 own1="foo" />;

declare function mergeProps(
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps,
): Props;

export const C5 = connect<Props, State, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(WC);
export const c5 = <C5 own1="foo" />;
