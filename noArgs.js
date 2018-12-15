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

const action1 = (payload, x) => ({ type: "ACTION1", payload: payload + x });
const action2 = payload => ({ type: "ACTION2", payload });

type Dispatch = Action => Action;

// component

type Props = {
  own1: string,
  dispatch: Dispatch,
};

class WC extends Component<Props, {}> {
  render() {
    const { dispatch } = this.props;
    dispatch(action1("foo", "bar"));
    return null;
  }
}

export const C = connect<Props, _>()(WC);

<C own1="" nonExisting="sdsd" />;
