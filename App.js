import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "./src/redux/store";
import AppNav from "./AppNav";
import { DrawerNav } from "./AppNav";
import { Drawer } from "react-native-paper";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        {/* <AppNav /> */}

        <DrawerNav />
      </PersistGate>
    </Provider>
  );
};
export default App;
