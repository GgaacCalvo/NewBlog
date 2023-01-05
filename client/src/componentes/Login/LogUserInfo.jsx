import UserInfo from "./UserInfo";
import style from "./LogUserInfo.module.css";
import { useAuth0 } from "@auth0/auth0-react";
export const LogUserInfo = () => {
  const { user } = useAuth0();

  return (
    <div className={style.mainContainer}>
      <div className={style.middleContainer}>
        <div className={style.topInformation}>
          Finaliza de completar tu perfil
        </div>

        <div className={style.userForm}>
          <UserInfo authID={user?.sub} />
        </div>
      </div>
    </div>
  );
};
