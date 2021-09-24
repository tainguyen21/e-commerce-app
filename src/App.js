import { BrowserRouter } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Banner />
    </BrowserRouter>
  );
}

export default App;
