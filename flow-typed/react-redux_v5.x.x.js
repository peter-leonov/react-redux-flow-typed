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

  // The connector function actaully perfoms the wrapping,
  // returning a connected component.
  declare type Connector<OP, WC> = (WC) => Class<ConnectedComponent<OP, WC>>;

  declare type MapStateToProps<-S, -OP, +SP> = (state: S, ownProps: OP) => SP;

  declare type Dispatch<A> = (action: A) => A;

  declare type MapDispatchToPropsFn<A, -OP, +DP> = (
    dispatch: Dispatch<A>,
    ownProps: OP,
  ) => DP;

  declare type MergeProps<-SP, -DP, -OP, +MP> = (
    stateProps: SP,
    dispatchProps: DP,
    ownProps: OP,
  ) => MP;

  // Putting it all together.
  // Adding $Shape<P> everywhere makes error messages clearer.

  // No args.

  declare export function connect<-P, -A>(
    mapStateToProps?: null,
    mapDispatchToProps?: null,
    mergeProps?: null,
  ): Connector<$Diff<P, { dispatch: Dispatch<A> }>, React$ComponentType<P>>;

  // State only.

  declare export function connect<-P, -S, SP: $Shape<P>>(
    mapStateToProps: MapStateToProps<S, $Diff<P, SP>, SP>,
    mapDispatchToProps?: null,
    mergeProps?: null,
  ): Connector<$Diff<P, SP>, React$ComponentType<P>>;

  // State and dispatch.

  // map version
  declare export function connect<
    -P,
    -S,
    -A,
    SP: $Shape<P>,
    DP: $Shape<P> & { [string]: (any) => A },
  >(
    mapStateToProps: MapStateToProps<S, $Diff<$Diff<P, SP>, DP>, SP>,
    mapDispatchToProps: DP,
    mergeProps?: null,
  ): Connector<$Diff<$Diff<P, SP>, DP>, React$ComponentType<P>>;

  // function version
  declare export function connect<
    -P,
    -S,
    -A,
    SP: $Shape<P>,
    DP: $Shape<P> & { [string]: (any) => A },
  >(
    mapStateToProps: MapStateToProps<S, $Diff<$Diff<P, SP>, DP>, SP>,
    mapDispatchToProps: MapDispatchToPropsFn<A, $Diff<$Diff<P, SP>, DP>, DP>,
  ): Connector<$Diff<$Diff<P, SP>, DP>, React$ComponentType<P>>;

  // declare export function connect<S, D, OP, SP, DP, MP>(
  //   mapStateToProps: MapStateToProps<S, OP, DP>,
  //   mapDispatchToProps: MapDispatchToPropsFn<D, OP, SP>,
  //   mergeProps: MergeProps<SP, DP, OP, MP>,
  // ): Connector<S, D, OP, React$ComponentType<MP>>;
}
