import axios from "axios";
import {
    DELETED_FAVORITE,
    ADD_FAVORITE,
    AGREGAR_SOCKET,
    PUT_WORKER,
    PUT_WORKER_PREMIUM,
    PAY,
    LOADING,
    GET_WORKER_CONTRACTS,
    GET_USERS_CONTRACTS,
    GET_USER_DETAIL,
    GET_WORKER_DETAIL,
    GET_WORKERS_PREMIUM,
    GET_WORKERS,
    GET_JOBS,
    GET_USERS,
    GET_USERNAME,
    POST_USER,
    LOGIN_SUCCES,
    GET_WORKERS_SEARCH,
    ORDER_BY_RATING,
    FILTER,
    RESET,
    TEMPORAL_LOGOUT,
    PUT_USER,
    GET_USER_ID,
    GET_COUNTRIES,
    UPLOAD_IMAGE,
    CLEAN_DETAIL,
    POST_COUNTRY,
    POST_JOB,
    DELETE_USER,
    DELETE_JOB,
    DELETE_COUNTRY,
    GET_CHATS,
    GET_CHAT_BY_PK,
    SET_CONECTED,
    GET_CHAT_BY_USERS
  } from "./actions_vars";


const baseURL = "http://localhost:3001/";

export function setOnline(conectados){
    return function(dispatch){
      dispatch({type:SET_CONECTED,payload:conectados})
    }
  }
  
export function getUserDetail(id, type = GET_USER_DETAIL) {
    return async function (dispatch) {
      dispatch({ type: LOADING });
  
      const data = await fetch(baseURL + "users/" + id);
        const json = await data.json();
        dispatch({ type: type, payload: json });
        return json;
    };
  }
  export function getUserId(id) {
    return function (dispatch) {
      axios
        .get(baseURL + "users/" + id)
        .then((u) => {
          dispatch({
            type: GET_USER_ID,
            payload: u.data,
          });
        })
        .catch((err) => console.log(err));
    };
  }
  
  export function getUsers() {
    return function (dispatch) {
      axios
        .get(baseURL + "users")
        .then((u) => {
          dispatch({
            type: GET_USERS,
            payload: u.data,
          });
        })
        .catch((err) => {});
    };
  }
  
  export function getUsersName(search) {
    return function (dispatch) {
      axios.get(baseURL + "users?name=" + search).then((u) =>
        dispatch({
          type: GET_USERNAME,
          payload: u.data,
        })
      );
    }.catch((err) => {});
  }


  export function createUser(payload) {
    return async function (dispatch) {
      const user = await axios.post("http://localhost:3001/users", payload);
    //   const user_id = await user.data.ID;
        
      dispatch({
        type: POST_USER,
      });
      return user;
    };
  }

  export function authenticate(credentials) {
    return async function (dispatch) {
      try {
        const res = await axios.post(baseURL + "auth", credentials);
        const { data } = res;
        dispatch({ type: LOGIN_SUCCES, payload: data });
      } catch (error) {
        return error.response.status;
      }
    };
  }


  export function temporalLogout() {
    return async function (dispatch) {
      dispatch({ type: TEMPORAL_LOGOUT });
    };
  }
  
  export function updateUser(payload, payloadId) {
    return async function (dispatch) {
      const user = await axios.put(baseURL + "users/" + payloadId, payload);
      dispatch({
        type: PUT_USER,
      });
      //return user;
    };
  }
  
  export function finishUserCreation(id, data, jobs) {
    return async function (dispatch) {
      const { name, lastName, city, street, address } =
        data;
        const location = "Argentina";
      const coordinate = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address},${street},${city},${location}&format=json`
      );
  
      if (!coordinate.data.length) {
        return { res: { status: 404 } };
      } else {
        const toSend = {
          name,
          lastName,
          city,
          street,
          address,
          coordinates: [coordinate.data[0].lat, coordinate.data[0].lon],
          onBoarded: true,
        };
        const user = await axios.put(baseURL+`users/${id}`, toSend);
  
        dispatch({
          type: POST_USER,
        });
        return user;
      }
    };
  }
  
  export const cleanDetail = () => (dispatch) => {
    dispatch({ type: CLEAN_DETAIL });
  };
  
  export const changeStatus = (payload, status) => async (dispatch) => {
    const online = await axios.put(baseURL+"users/" + payload, {
      isOnline: status,
    });
  };


  export function deleteUser(id, deleted) {
    return async function (dispatch) {
      try {
        await axios.delete(
          baseURL+`users/${id}?deleted=${deleted}`,
          deleted
        );
        dispatch({ type: DELETE_USER });
      } catch (error) {
      }
    };
  }