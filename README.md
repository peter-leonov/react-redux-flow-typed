If you find that type error messages Flow gives you can be better, don't wait for the next release of Flow and just replace `_` type placeholders with concrete types.

```js
type OwnProps = {|
  own1: string
|};
const mapStateToProps = state => ({
  state1: state => state.state1,
  doesNotExistInOwnProps: state => "foobar"
});
connect < State, OwnProps, _ > mapStateToProps(A_);
```

will give a type error in `react-redux_v5.x.x` file, while the following code gives error in the `mapStateToProps` function referring `StateProps` type:

```js
type OwnProps = {|
  own1: string
|};
type StateProps = {|
  state1: string
|};
const mapStateToProps = state => ({
  state1: state => state.state1,
  doesNotExistInOwnProps: state => "foobar"
});
connect < State, OwnProps, StateProps > mapStateToProps(A_);
```
