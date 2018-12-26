// @flow
import React from "react";
import { connect } from "react-redux";

// here goes a minimal Redux type set
type State = {|
  +stateProp: string,
|};
type Action = {|
  +type: "action",
|};
type Dispatch = Action => Action;
// WORK IN PROGRESS: in this version of typings we do not check
// if the return value is at all compatible with the dispatch function
const dispatchAction = () => ({ type: "action" });

// notice that OwnProps is an exact type
// as of Flow v0.89 it's required
type OwnProps = {|
  // this prop goes through the ConnectedComponent to WrappedComponent as is
  passesThrough: string,
  // this prop is only used by the mapStateToProps function
  forMapStateToProps: string,
|};
type Props = {
  // connect passes all the own props of the ConnectedComponent
  ...OwnProps,
  // a prop provided by mapStateToProps
  fromMapStateToProps: string,
  // a prop provided by mapDispatchToProps
  dispatchAction: typeof dispatchAction,
};

class WrappedComponent extends React.Component<Props> {}

const mapStateToProps = (state: State, ownProps) => ({
  fromMapStateToProps: state.stateProp + ownProps.forMapStateToProps,
});

const mapDispatchToProps = {
  dispatchAction,
};

// hover over those underscore signs in VS Code to see which types Flow inferred for you
export const ConnectedComponent = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedComponent);
<ConnectedComponent passesThrough="foo" forMapStateToProps="bar" />;
