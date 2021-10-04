import Header from "components/Header";
import { setUser } from "features/Auth/userSlice";
import { fetchProducts } from "features/Product/productsSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "utils/firebase";
import routes from "routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const createAt = user.metadata.creationTime;
        const createAtDate = new Date(createAt);

        const userInfo = {
          name: user.displayName,
          email: user.email,
          id: user.uid,
          memberFrom: createAtDate.toLocaleString().split(",")[0], // -> mm/dd/yyy
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
        {routes.map((item, index) => (
          <Route
            key={index}
            exact={item.exact}
            path={item.route}
            component={item.component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
