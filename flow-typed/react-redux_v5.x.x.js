// see here for details
// https://medium.com/@samgoldman/ville-saukkonen-thanks-and-thanks-for-your-thoughtful-questions-24aedcfed518
// https://github.com/facebook/flow/issues/7125

// react-redux merges props as in:
// Object.assign({}, ownProps, stateProps, dispatchProps)

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
  declare export class Provider<Store> extends React$Component<{
    store: Store,
    children?: React$Node,
  }> {}

  declare export function createProvider<Store>(
    storeKey?: string,
    subKey?: string,
  ): Class<Provider<Store>>;

  declare type Equal<T: {}> = (next: T, prev: T) => boolean;
  declare export type Options<S, OP, SP, MP> = {|
    pure?: boolean,
    areStatesEqual?: Equal<S>,
    areOwnPropsEqual?: Equal<OP>,
    areStatePropsEqual?: Equal<SP>,
    areMergedPropsEqual?: Equal<MP>,
    storeKey?: string,
  |};

  // A connected component wraps some component WC. Note that S (State) and D (Action)
  // are "phantom" type parameters, as they are not constrained by the definition but
  // rather by the context at the use site.
  declare class ConnectedComponent<OP, +WC> extends React$Component<OP> {
    static +WrappedComponent: WC;
    getWrappedInstance(): React$ElementRef<WC>;
  }

  declare type Dispatch<A> = (action: A) => A;

  declare type MapStateToProps<-S, -OP, +SP> = (state: S, ownProps: OP) => SP;
  declare type MapDispatchToPropsFn<A, -OP, +DP> = (
    dispatch: Dispatch<A>,
    ownProps: OP,
  ) => DP;

  declare type MergeProps<
    +P,
    -OP: $Shape<P>,
    -SP: $Shape<P>,
    -DP: $Shape<P>,
  > = (stateProps: SP, dispatchProps: DP, ownProps: OP) => P;

  // The connector function actaully perfoms the wrapping,
  // returning a connected component.
  declare type Connector<OP, WC> = (WC) => Class<ConnectedComponent<OP, WC>>;

  // Putting it all together.
  // Adding $Shape<P> everywhere makes error messages clearer.

  // No args.

  declare export function connect<-P, -A>(
    mapStateToProps?: null,
    mapDispatchToProps?: null,
    mergeProps?: ?MergeProps<P, P, {||}, {||}>,
    options?: ?Options<{||}, P, {||}, P>,
  ): Connector<$Diff<P, { dispatch: Dispatch<A> }>, React$ComponentType<P>>;

  // State only.

  declare export function connect<-P, -S, SP: $Shape<P>>(
    mapStateToProps: MapStateToProps<S, $Diff<P, SP>, SP>,
    mapDispatchToProps?: null,
    mergeProps?: ?MergeProps<P, $Diff<P, SP>, SP, {||}>,
    options?: ?Options<S, $Diff<P, SP>, SP, P>,
  ): Connector<$Diff<P, SP>, React$ComponentType<P>>;

  // State and dispatch.

  // map version
  declare export function connect<
    -P,
    -S,
    -A,
    SP: $Shape<P>,
    DP: $Shape<P> & { [string]: (...Array<any>) => A },
  >(
    mapStateToProps: MapStateToProps<S, $Diff<$Diff<P, SP>, DP>, SP>,
    mapDispatchToProps: DP,
    mergeProps?: ?MergeProps<P, $Diff<$Diff<P, SP>, DP>, SP, DP>,
    options?: ?Options<S, $Diff<$Diff<P, SP>, DP>, SP, P>,
  ): Connector<$Diff<$Diff<P, SP>, DP>, React$ComponentType<P>>;

  // function version
  declare export function connect<
    -P,
    -S,
    -A,
    SP: $Shape<P>,
    DP: $Shape<P> & { [string]: (...Array<any>) => A },
  >(
    mapStateToProps: MapStateToProps<S, $Diff<$Diff<P, SP>, DP>, SP>,
    mapDispatchToProps: MapDispatchToPropsFn<A, $Diff<$Diff<P, SP>, DP>, DP>,
    mergeProps?: ?MergeProps<P, $Diff<$Diff<P, SP>, DP>, SP, DP>,
    options?: ?Options<S, $Diff<$Diff<P, SP>, DP>, SP, P>,
  ): Connector<$Diff<$Diff<P, SP>, DP>, React$ComponentType<P>>;

  // Dispatch only.

  // map version
  declare export function connect<
    -P,
    -A,
    DP: $Shape<P> & { [string]: (...Array<any>) => A },
  >(
    mapStateToProps: null,
    mapDispatchToProps: DP,
    mergeProps?: ?MergeProps<P, $Diff<P, DP>, {||}, DP>,
    options?: ?Options<{||}, $Diff<P, DP>, {||}, P>,
  ): Connector<$Diff<P, DP>, React$ComponentType<P>>;

  // function version
  declare export function connect<
    -P,
    -A,
    DP: $Shape<P> & { [string]: (...Array<any>) => A },
  >(
    mapStateToProps: null,
    mapDispatchToProps: MapDispatchToPropsFn<A, $Diff<P, DP>, DP>,
    mergeProps?: ?MergeProps<P, $Diff<P, DP>, {||}, DP>,
    options?: ?Options<{||}, $Diff<P, DP>, {||}, P>,
  ): Connector<$Diff<P, DP>, React$ComponentType<P>>;
}
