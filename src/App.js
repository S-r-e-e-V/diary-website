import "./App.css";

import Routes from "./routes/routes";
import { AppContextProvider } from "./context/AppContext";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <AppContextProvider>
          <Routes />
        </AppContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
