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

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export const C = connect<Props, State, Action, _, _>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(WC);

<C own1="" />;

type Props1 = {| ...OwnProps, ...StateProps |};

class WC1 extends Component<Props1, {}> {
  render() {
    const { own1, state1, state2, ...rest } = this.props;
    this.props.own1.toString();
    return null;
  }
}

const mergeProps1 = (stateProps, dispatchProps, ownProps) => {
  (dispatchProps: {||});
  return {
    ...ownProps,
    ...stateProps,
  };
};

export const C1 = connect<Props1, State, Action, _>(
  mapStateToProps,
  null,
  mergeProps1,
)(WC1);

<C1 own1="" />;

type Props2 = {| ...OwnProps, ...DispatchProps |};

class WC2 extends Component<Props2, {}> {
  render() {
    const { own1, action1, action2, ...rest } = this.props;
    action1("sdsd", "bar").type;
    action2(123).type;
    return null;
  }
}

const mergeProps2 = (stateProps, dispatchProps, ownProps) => {
  (stateProps: {||});
  return {
    ...ownProps,
    ...dispatchProps,
  };
};

export const C2 = connect<Props2, Action, _>(
  null,
  mapDispatchToProps,
  null,
)(WC2);

<C2 own1="" />;
