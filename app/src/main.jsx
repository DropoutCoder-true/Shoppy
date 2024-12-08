import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";

export const server = "http://localhost:5000";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </UserContextProvider>
  </StrictMode>
);
