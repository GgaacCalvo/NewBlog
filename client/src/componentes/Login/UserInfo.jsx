import { useState, useEffect } from "react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { finishUserCreation } from "../../redux/actions/actions";
import style from "./UserInfo.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import { validator } from "./validator";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

const User = (props) => {
  const dispatch = useDispatch();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(finishUserCreation(props.authID, data)).then((res) => {
      if (res.status === 200) {
        loginWithRedirect();
      }
    });
  };

  if (isAuthenticated) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={style.userclient}>
        <div className={style.inputContainer}>
          <TextField
            label="Nombre"
            type="text"
            error={errors.name ? true : false}
            helperText={validator(errors.name?.type, "name")}
            placeholder="Alfonso.."
            {...register("name", {
              required: true,
              minLength: 4,
              maxLength: 15,
            })}
          />
        </div>
        <div className={style.inputContainer}>
          <TextField
            label="Apellido"
            type="text"
            error={errors.lastName ? true : false}
            helperText={validator(errors.lastName?.type, "lastname")}
            placeholder="Gutierrez.."
            {...register("lastName", {
              required: true,
              minLength: 4,
              maxLength: 15,
            })}
          />
        </div>

        <div className={`${style.inputContainer} ${style.horizontal}`}>
          <TextField
            label="Localidad"
            type="text"
            fullWidth
            placeholder="Buenos aires"
            error={errors.city ? true : false}
            helperText={validator(errors.city?.type, "city")}
            {...register("city", {
              required: true,
            })}
          />
          <TextField
            label="Direccion"
            type="text"
            fullWidth
            error={errors.street ? true : false}
            helperText={validator(errors.street?.type, "street")}
            placeholder="Avenida siempreviva"
            {...register("street", {
              required: true,
            })}
          />
          <TextField
            label="Numero"
            type="text"
            placeholder="742"
            {...register("address", {
              required: true,
              pattern: /^[0-9]*$/,
            })}
          />
        </div>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          value="Registrarse"
          sx={{ background: "#06283d" }}
        >
          Registrarse
        </Button>
      </form>
    );
  } else {
    Navigate("/home");
  }
};

export default User;
