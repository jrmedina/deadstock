import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { deleteAccessToken, fetchInventory } from "../apiCalls";
import { setUser, removeSetUser } from "../redux/actions/userAction";

import EditModal from "./EditModal";
import LoadingWheel from "./LoadingWheel";

const UserInventory = () => {
  const { username } = useParams();
  const token = localStorage.getItem("token");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    if (!token) {
      history.push("/login");
      return;
    }

    const tokenExpired = decodedToken.exp < Date.now() / 1000;

    if (tokenExpired) {
      dispatch(removeSetUser());
      deleteAccessToken(token);
      localStorage.removeItem("token");
      history.push("/login");
      return;
    }

    if (token && token !== null) {
      fetchInventory(token).then((res) => {
        dispatch(setUser({ username, ...res.data }));
      });
    }
  }, [token, username]);

  const inventoryList = user.inventory?.map((product) => (
    <div className="card" key={product._id}>
      <div className="card-details">
        <p>{product.title}</p>
        <p>{product.size}</p>
      </div>
      <img className="card-image" src={product.url} alt={product.title} />
      <EditModal id={product._id} />
    </div>
  ));

  if (!user.inventory) {
    return <LoadingWheel />;
  }

  return (
    <div className="inventory-container">
      <p className="greeting">{`${username}'s inventory (${user.inventory.length})`}</p>
      <div className="user-inventory">{inventoryList}</div>
    </div>
  );
};
export default UserInventory;
