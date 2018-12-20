import React from "react";
import { Provider, createProvider } from "react-redux";

type StoreN = Array<number>;
const storeN: StoreN = [1, 2, 3];

type StoreS = Array<string>;
const storeS: StoreS = ["a", "b", "c"];

export const MyProvider = createProvider("ikea");

export const x1 = <Provider store={storeN} />;
export const x2 = <Provider store={storeS} />;
export const x3 = <MyProvider store={storeN} />;
export const x4 = <MyProvider store={storeS} />;
