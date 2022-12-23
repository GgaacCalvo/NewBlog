import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../redux/actions/actions";

import s from "./profileuser.module.css";

export const ProfileUser = () => {
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  console.log(users);

  useEffect(() => {
    if (user) {
      dispatch(getUserId(user?.sub));
    }
  }, [dispatch, user]);
  return (
    <div className={s.cont}>
      <div className={s.head}>a</div>
      <div>
        <img src={users.img} alt="a" className={s.img} />
      </div>
      <div className="bod">
        <h2>{users.name}</h2>
        <span>{users.description}</span>
      </div>
    </div>
  );
};
