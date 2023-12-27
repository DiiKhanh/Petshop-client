import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./configs/theme.config.js";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <BrowserRouter>
        <CssVarsProvider theme={theme}>
          <Suspense>
            <App />
          </Suspense>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
