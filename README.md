## Error messages

If you find that type error messages Flow gives you can be better, don't wait for the next release of Flow and just replace `_` type placeholders with concrete types.

```js
type OwnProps = {|
  own1: string,
|};
const mapStateToProps = state => ({
  state1: state => state.state1,
  doesNotExistInOwnProps: state => "foobar",
});
connect < State, OwnProps, _ > mapStateToProps(A_);
```

will give a type error in `react-redux_v5.x.x` file, while the following code gives error in the `mapStateToProps` function referring `StateProps` type:

```js
type OwnProps = {|
  own1: string,
|};
type StateProps = {|
  state1: string,
|};
const mapStateToProps = state => ({
  state1: state => state.state1,
  doesNotExistInOwnProps: state => "foobar",
});
connect < State, OwnProps, StateProps > mapStateToProps(A_);
```

## Non-strict `OwnTypes`

As far as it's almost useless to type a wrapper component with a non-strict `Props` type the current typings support only strict `OwnProps`, `StateProps` and `DispatchProps`. In case where you really need to pass an unknown number of parameters to a nested component try this trick:

```js
type OwnProps = {|
  own1: number,
  own2: number,
  deepProps: { [string]: mixed },
|};
```

or:

```js
type OwnProps = {|
  own1: number,
  own2: number,
  [string]: mixed,
|};
```

Please, do not use `any` instead of `mixed` otherwise Flow will allow to use any mistyped property in any context.
