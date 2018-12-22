import React, { Component } from "react";
import { connect } from "react-redux";

type OwnProps10 = {|
  defaulted: number,
  x: string,
|};
type Props10 = {
  ...OwnProps10,
};
class WC10 extends Component<Props10> {
  static defaultProps = { defaulted: 1 };
  render() {
    this.props.defaulted.toFixed();
    return null;
  }
}
export const C10 = connect<Props10, OwnProps10, _, _, _, _>()(WC10);

C10.WrappedComponent;
<C10 x="foo" />;
<C10 x="foo" defaulted={7} />;
//$ExpectError
<C10 x="foo" defaulted="foo" />;

type OwnProps = {|
  defaultBooleanProp: boolean,
|};
type StateProps = {|
  stringProp: string,
|};
type Props = {|
  ...OwnProps,
  ...StateProps,
|};
class WC extends Component<Props> {
  static defaultProps = {
    defaultBooleanProp: false,
  };
  render() {
    const { defaultBooleanProp, stringProp } = this.props;
    return defaultBooleanProp && stringProp;
  }
}

const mapStateToProps = (state, props): StateProps => ({
  stringProp: "a",
});

export const C11 = connect<Props, OwnProps, StateProps, empty, empty, empty>(
  mapStateToProps,
)(WC);

C11;

//$ExpectError does not work with StateProps :(
<C11 />;
<C11 defaultBooleanProp={true} />;
//$ExpectError
<C11 defaultBooleanProp="foo" />;
