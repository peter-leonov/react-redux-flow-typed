// @flow
import * as React from "react";
import { connect } from "react-redux";

export let e = [];

function checkSimplePropertyInjection() {
  type OwnProps = {|
    foo: number,
    bar: string,
  |};
  type Props = { ...OwnProps, foo: number };
  const mapStateToProps = () => ({ foo: 5 });

  class Com extends React.Component<Props> {}

  const Connected = connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(Com);

  <Connected foo={42} bar="str" />;
  //$ExpectError property `foo` is missing in props [1] but exists in `OwnProps`
  <Connected bar="str" />;
  e.push(Connected);

  function injectProp<Config: {}>(
    Component: React.AbstractComponent<Config>,
  ): React.AbstractComponent<$Diff<Config, { foo: number | void }>> {
    return function WrapperComponent(
      props: $Diff<Config, { foo: number | void }>,
    ) {
      return <Component {...props} foo={42} />;
    };
  }

  const Decorated = injectProp(Connected);
  // OK without `foo`
  <Decorated bar="str" />;
  // OK with a not needed `foo`
  <Decorated foo={42} bar="str" />;
  //$ExpectError property `bar` is missing in props [3] but exists in `Props` [4]
  <Decorated />;
  e.push(Decorated);
}

function composeWithOtherHOC() {
  type OwnProps = {|
    foo: number,
    bar: string,
  |};
  type Props = { ...OwnProps, foo: number };
  const mapStateToProps = () => ({ foo: 5 });

  class Com extends React.Component<Props> {}

  function injectProp<Config: {}>(
    Component: React.AbstractComponent<Config>,
  ): React.AbstractComponent<$Diff<Config, { foo: number | void }>> {
    return function WrapperComponent(
      props: $Diff<Config, { foo: number | void }>,
    ) {
      return <Component {...props} foo={42} />;
    };
  }

  declare var compose: $Compose;

  const composedDecorators = compose(
    injectProp,
    connect<Props, OwnProps, _, _, _, _>(mapStateToProps),
  );

  const Decorated = composedDecorators(Com);
  // OK without `foo`
  <Decorated bar="str" />;
  // OK with a not needed `foo`
  <Decorated foo={42} bar="str" />;
  //$ExpectError property `bar` is missing in props [3] but exists in `Props` [4]
  <Decorated />;
  e.push(Decorated);
}
