import Header from "components/Header";
import AboutUs from "features/AboutUs";
import SignIn from "features/Auth/pages/SignIn";
import Contact from "features/Contact";
import Home from "features/Home";
import { initializeApp } from "firebase/app";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Product from "./features/Product";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKyj3vkJP_r1s-3ZQuJ5pV3c-eDf1ikho",
  authDomain: "e-commerce-app-5de96.firebaseapp.com",
  projectId: "e-commerce-app-5de96",
  storageBucket: "e-commerce-app-5de96.appspot.com",
  messagingSenderId: "258453209631",
  appId: "1:258453209631:web:fc378f2ffa78b3097acb2a",
  measurementId: "G-S8GT8GJXT4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={AboutUs} />
        <Route path="/products" component={Product} />
        <Route path="/contact" component={Contact} />
        <Route path="/sign-in" component={SignIn} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
