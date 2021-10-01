import "utils/firebase";
import Header from "components/Header";
import AboutUs from "features/AboutUs";
import SignIn from "features/Auth/pages/SignIn";
import SignUp from "features/Auth/pages/SignUp";
import Contact from "features/Contact";
import Home from "features/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Product from "./features/Product";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "features/Auth/userSlice";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { setProducts } from "features/Product/productsSlice";

function App() {
  const dispatch = useDispatch();
  const db = getFirestore();

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
    const getAllProducts = async () => {
      const productsRef = await collection(db, "products");
      const productsSnapShot = await getDocs(productsRef);
      const products = [];

      productsSnapShot.forEach((product) => {
        const data = product.data();
        const id = product.id;

        products.push({
          ...data,
          id,
        });
      });

      dispatch(setProducts(products));
    };

    getAllProducts();
  }, [db, dispatch]);

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

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
