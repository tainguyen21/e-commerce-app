import "utils/firebase";
import Header from "components/Header";
import { setUser } from "features/Auth/userSlice";
import { fetchProducts } from "features/Product/productsSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "routes";
import { doc, getDoc } from "@firebase/firestore";
import db from "utils/db";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const createAt = user.metadata.creationTime;
        const createAtDate = new Date(createAt);
        const extraInfo = await getDoc(doc(db, `users/${user.uid}`));

        const userInfo = {
          name: user.displayName,
          email: user.email,
          id: user.uid,
          memberFrom: createAtDate.toLocaleString().split(",")[0], // -> mm/dd/yyy
          ...extraInfo.data(),
        };

        dispatch(setUser(userInfo));
      } else {
        dispatch(setUser({}));
      }
    });

    return () => unsub();
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
