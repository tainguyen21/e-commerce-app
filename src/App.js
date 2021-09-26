import Home from "features/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Product from "./features/Product";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products" component={Product} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
