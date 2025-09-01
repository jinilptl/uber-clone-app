import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./Context/UserContext.jsx";
import CaptainContext from "./Context/CaptainContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <CaptainContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CaptainContext>
  </UserContextProvider>
);
