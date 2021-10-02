import Header from "components/Header";
import AboutUs from "features/AboutUs";
import SignIn from "features/Auth/pages/SignIn";
import SignUp from "features/Auth/pages/SignUp";
import { setUser } from "features/Auth/userSlice";
import Contact from "features/Contact";
import Home from "features/Home";
import "utils/firebase";
import { fetchProducts } from "features/Product/productsSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Product from "./features/Product";
import ProfilePage from "features/Auth/pages/ProfilePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          name: user.displayName,
          email: user.email,
        };

        dispatch(setUser(userInfo));
      } else {
        dispatch(setUser({}));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={AboutUs} />
        <Route path="/products" component={Product} />
        <Route path="/contact" component={Contact} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/profile" component={ProfilePage} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
