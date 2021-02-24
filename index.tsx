import "react-native-gesture-handler";
import React from 'react'
import { registerRootComponent } from 'expo';

import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./store";

const store = createStore(rootReducer);

import App from "./App";

function Root() {
  return (
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
  );
}

registerRootComponent(Root);
