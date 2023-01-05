import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../redux/actions/actions";
import { useNavigate, Link } from "react-router-dom";
import s from "./profileuser.module.css";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
export const ProfileUser = () => {
  const login = useAuth0();
  const params = useParams();
  let sub = false;
  if (login.isAuthenticated) sub = login.user.sub;
  const chat = useSelector((state) => state.chat);
  const status = useSelector((state) => state.userDetail.isOnline);
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const socket = useSelector((state) => state.socket);
  const navigate = useNavigate();
  const handleOpen = () => {
    if (!login.isAuthenticated) {
      return setOpenLogin(true); // pendiente pop up para avisar que debe logearse
    }

    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  console.log(users);

  useEffect(() => {
    if (user) {
      dispatch(getUserId(user?.sub));
    }
  }, [dispatch, user]);

  const handleChat = () => {
    socket?.emit("messageCreation", {
      id_emisor: login.user.sub,
      id_receptor: params.id,
      texto: "",
      redirect: true,
    });
    navigate(`/chat/${chat.id}`);
  };
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
      {users.id !== sub ? (
        <Button
          className="buttonStyled"
          variant="contained"
          size="large"
          disabled={params.id === sub ? true : false}
          onClick={handleChat}
        >
          Mensaje
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
