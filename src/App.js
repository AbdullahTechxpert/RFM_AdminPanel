import './App.css';
import Main from "./pages/main";
import { AuthProvider } from "./Authentication/AuthProvider"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Main />
      </AuthProvider>
    </div>
  );
}

export default App;
