import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider, useSelector } from "react-redux";
import { store } from "./store/store.js";
import { useEffect } from "react";

function ThemeWrapper({ children }) {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </Provider>
);
