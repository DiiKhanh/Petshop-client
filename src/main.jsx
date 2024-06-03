import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./configs/theme.config.js";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "./redux/store.js";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <BrowserRouter>
        <CssVarsProvider theme={theme}>
          <Suspense>
            <QueryClientProvider client={queryClient} >
              <App />
            </QueryClientProvider >
          </Suspense>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
