import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Product from "./features/Product";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Product} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
