// type Dispatch = ((1) => "1") & ((2) => "2");
// type A1 = $Call<Dispatch, 1>;
// const aaa: A1 = 0;

declare function dispatch(action: 1): "1";
declare function dispatch(action: 2): "2";

type Bind<D> = <A, R>((...A) => R) => (...A) => $Call<D, R>;

type a1 = (1, 2, "foo") => 1;
type R1 = $Call<Bind<typeof dispatch>, a1>;
const r1: R1 = x => "1";
r1(1, 2, "foo");

type a2 = (2) => 2;
type R2 = $Call<Bind<typeof dispatch>, a2>;
const r2: R2 = () => "2";
r2(2);

type Map1 = {
  a1: a1,
  a2: a2,
};

type AB = <A, B>(A) => B;

type DP = $ObjMap<Map1, Bind<typeof dispatch>>;

const dp: DP = { a1: () => "1", a2: () => "2" };
