import { Provider } from "react-redux";
import { store } from "./store/store";
import ToastProvider from "./components/ui/ToastProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </Provider>
  );
}

export default App;
