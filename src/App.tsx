import { Provider } from "react-redux";
import { store } from "./app/store";
import AssignmentPage from "./pages/AssignmentPage";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <AssignmentPage />
    </Provider>
  );
}

export default App;
