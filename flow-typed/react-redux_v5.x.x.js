// see here for details
// https://medium.com/@samgoldman/ville-saukkonen-thanks-and-thanks-for-your-thoughtful-questions-24aedcfed518
// https://github.com/facebook/flow/issues/7125

/*
  WC = Component being wrapped
  S = State
  A = Action
  OP = OwnProps
  SP = StateProps
  DP = DispatchProps
  MP = Merge props
  MDP = Map dispatch to props object
  RSP = Returned state props
  RDP = Returned dispatch props
  RMP = Returned merge props
  CP = Props for returned component
  Com = React Component
  ST = Static properties of Com
  EFO = Extra factory options (used only in connectAdvanced)
*/

declare module "react-redux" {
  // A connected component wraps some component WC. Note that S (State) and D (Action)
  // are "phantom" type parameters, as they are not constrained by the definition but
  // rather by the context at the use site.
  declare class ConnectedComponent<OP, +WC> extends React$Component<OP> {
    static +WrappedComponent: WC;
    getWrappedInstance(): React$ElementRef<WC>;
  }

  declare type MapStateToProps<-S, -OP, +SP> = (state: S, ownProps: OP) => SP;

  // Same as above, but the derivation is based on dispatch instead of state.
  declare type MapDispatchToPropsFn<-D, -OP, +DP> = (
    dispatch: D,
    ownProps: OP,
  ) => DP;

  declare type MergeProps<-SP, -DP, -OP, +MP> = (
    stateProps: SP,
    dispatchProps: DP,
    ownProps: OP,
  ) => MP;

  // The connector function actaully perfoms the wrapping, giving us a connected
  // component.
  declare type Connector<OP, WC> = (WC) => Class<ConnectedComponent<OP, WC>>;

  // Putting it all together.
  // declare export function connect<S, D, OP, SP, DP>(
  //     mapStateToProps: MapStateToProps<S, OP, SP>,
  //     mapDispatchToProps: MapDispatchToPropsFn<D, OP, DP>,
  // ): Connector<S, D, OP, React$ComponentType<{| ...OP, ...SP, ...DP |}>>;

  // declare export function connect<S, D, OP, SP, DP>(
  //     mapStateToProps: MapStateToProps<S, OP, SP>,
  //     mapDispatchToProps: DP,
  // ): Connector<S, D, OP, React$ComponentType<{| ...OP, ...SP, ...DP |}>>;

  declare export function connect<-P, +S, +SP>(
    mapStateToProps: MapStateToProps<S, $Diff<P, SP>, SP>,
  ): Connector<$Diff<P, SP>, React$ComponentType<P>>;

  // declare export function connect<S, D, OP, SP, DP, MP>(
  //   mapStateToProps: MapStateToProps<S, OP, DP>,
  //   mapDispatchToProps: MapDispatchToPropsFn<D, OP, SP>,
  //   mergeProps: MergeProps<SP, DP, OP, MP>,
  // ): Connector<S, D, OP, React$ComponentType<MP>>;
}
