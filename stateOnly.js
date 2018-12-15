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

class WC extends Component<Props, {}> {
  render() {
    const { own1, state1, state2, ...rest } = this.props;
    this.props.own1.toString();
    return null;
  }
}

class OwnOnly extends Component<OwnProps, {}> {
  render() {
    const { own1 } = this.props;
    (own1: string);
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

export const C1 = connect<Props, State, _>(
  mapStateToProps,
  null,
)(WC);

export const C2 = connect<Props, State, _>(
  mapStateToProps,
  null,
  null,
)(WC);

export const C3 = connect<Props, State, _>(
  mapStateToProps,
  null,
  null,
)(WC);

export const C4 = connect<Props, State, _>(
  null,
  null,
  null,
  null,
)(WC);

export const C5 = connect<Props, State, _>(
  null,
  null,
  null,
  { pure: false },
)(WC);

const equalNoop = (next, prev) => {
  (next: {||});
  (prev: {||});
  return true;
};

export const C6 = connect<OwnProps, State, _>(
  null,
  null,
  null,
  {
    pure: true,
    areStatesEqual: equalNoop,
    areOwnPropsEqual: (next, prev) => {
      (next: OwnProps);
      (prev: OwnProps);
      return true;
    },
    areStatePropsEqual: equalNoop,
  },
)(OwnOnly);
