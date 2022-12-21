import axios from "axios";




export function getUserDetail(id, type = GET_USER_DETAIL) {
    return function (dispatch) {
      dispatch({ type: LOADING });
  
      return fetch(baseURL + "users/" + id)
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          dispatch({ type: type, payload: json });
          return json;
        });
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
        .catch((err) => {});
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
  export function getChats(id) {
    return function (dispatch) {
      axios
        .get(baseURL + "chat/" + id)
        .then((chat) => {
          dispatch({
            type: GET_CHATS,
            payload: chat.data,
          });
        })
        .catch((err) => {console.log(err.message)});
    };
  }
  export function getChatByPk(id) {
    return function (dispatch) {
      axios
        .get(baseURL + "chat/?id=" + id)
        .then((chat) => {
          dispatch({
            type: GET_CHAT_BY_PK,
            payload: chat.data,
          });
        })
        .catch((err) => {console.log(err.message)});
    };
  }
  export function getChatByUsers(idparam, idsub) {
    return function (dispatch) {
      axios
        .get(baseURL + "chat/?idparam=" + idparam+ "&idsub=" + idsub)
        .then((chat) => {
          dispatch({
            type: GET_CHAT_BY_USERS,
            payload: chat.data,
          });
        })
        .catch((err) => {console.log(err.message)});
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


  export function createUser(payload, jobs) {
    return async function (dispatch) {
      const user = await axios.post(baseURL + "users", payload);
      const user_id = await user.data.ID;
      if (jobs.length) {
        const worker = {
          user_id,
          jobs,
        };
        const res = await axios.post(baseURL + "worker", worker);
      }
  
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
      const { name, lastName, phone, dni, location, city, street, address } =
        data;
  
      const coordinate = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address},${street},${city},${location}&format=json`
      );
  
      if (!coordinate.data.length) {
        return { res: { status: 404 } };
      } else {
        const toSend = {
          name,
          lastName,
          phone,
          dni,
          city,
          street,
          address,
          location,
          coordinates: [coordinate.data[0].lat, coordinate.data[0].lon],
          onBoarded: true,
        };
        const user = await axios.put(baseURL+`users/${id}`, toSend);
  
        if (jobs.length) {
          const worker = {
            user_id: id,
            jobs,
          };
          const res = await axios.post(baseURL+"worker", worker);
        }
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