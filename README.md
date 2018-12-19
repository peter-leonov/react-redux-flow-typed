## Expectations

OwnProps has to be of an exact type.

## Placeholders

The rule of thumb is: if something gets fishy, then just provide more concrete types instead of `_`. Split the big `Props` in `OwnProps`, `StateProps` and `DispatchProps` and provide to the `connect()` function.

## Error messages

If you find that type error messages Flow gives you can be better, don't wait for the next release of Flow and just replace `_` type placeholders with concrete types.

```js
type State = {|
  +state1: string,
|};
type Props = {|
  own1: string,
  state1: string,
|};
const mapStateToProps = state => ({
  state1: state => state.state1,
  doesNotExistInOwnProps: state => "foobar",
});
connect < Props, State, _ > mapStateToProps(A_);
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
connect < OwnProps, State, StateProps > mapStateToProps(A_);
```

You can also ommit `State` parameter like this:

```js
connect < OwnProps, _, _ > mapStateToProps(A_);
```

but then Flow will be only able to infer the proper type for the state argument and match the return value type if the exact `State` type is specified either for the `mapStateToProps` or for each state getter function. Personally I prefer just providing the `State` to the `connect()` function explicitly and allow flow to match it all together.

## Using with thunks

These typings expect that the `dispatch()` function of your store is of type `Action => Action` which it is by default. If you use thunks then insted of giving `connect()` the raw `Action` type of your application provide a more complex type `Action | Thunk`. I like to call it `Dispatchable` and decare once, say, in `rootReducer.js` or `createStore.js`.
