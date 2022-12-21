import {
    PUT_WORKER,
    PUT_WORKER_PREMIUM,
    PAY,
    GET_WORKER_CONTRACTS,
    GET_USER_DETAIL,
    LOADING,
    GET_USERS_CONTRACTS,
    GET_WORKER_DETAIL,
    GET_WORKERS,
    GET_JOBS,
    GET_USERS,
    GET_USERNAME,
    POST_USER,
    GET_WORKERS_PREMIUM,
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
    AGREGAR_SOCKET,
    ADD_FAVORITE,
    DELETED_FAVORITE,
    GET_USER,
    GET_CHATS,
    GET_CHAT_BY_PK,
    SET_CONECTED,
    GET_CHAT_BY_USERS,
  } from "../actions/actions_vars";


const localStorageAuth = () => {
    const auth = localStorage.getItem("auth");
    if (JSON.parse(auth)) return JSON.parse(auth);
    return { isLoggedIn: false, user: { id: "", name: "", img: "", token: "" } };
  };
  //Probando
  
  const storagedData = localStorageAuth();
  
  const initialState = {
    users: [],
    authState: storagedData,
    isLoading: false,
    userDetail: {},
    user: {},
    uploadedImg: "",
    chats: [],
    chat: {},
    onlineUsers: [],
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONECTED:
            return {
              ...state,
              onlineUsers: action.payload,
            };
            case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
      case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
        isLoading: false,
      };

    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
      case GET_CHATS:
        return {
          ...state,
          chats: action.payload,
        };
      case GET_CHAT_BY_PK:
        return {
          ...state,
          chat: action.payload,
        };
        case GET_CHAT_BY_USERS:
          return {
            ...state,
            chat: action.payload,
          };
          case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
      case GET_USERNAME:
      return {
        ...state,
        user: action.payload,
      };
    case POST_USER:
      return {
        ...state,
      };
      case LOGIN_SUCCES:
      const authState = {
        isLoggedIn: true,
        user: action.payload,
      };

      localStorage.setItem("auth", JSON.stringify(authState));
      return {
        ...state,
        authState,
      };
      case TEMPORAL_LOGOUT: {
        const authState = {
          isLoggedIn: false,
        };
  
        localStorage.setItem("auth", JSON.stringify(authState));
        return {
          ...state,
          authState,
        };
      }
  
      case GET_USER_ID:
        return {
          ...state,
         
          user: action.payload,
        };
      case PUT_USER: {
        return {
          ...state,
        };
      }
      case CLEAN_DETAIL: {
        return {
          ...state,
          userDetail: {},
        };
      }
      case DELETE_USER: {
        return {
          ...state,
        };
      }
            default:
      return state;
  }
};

export default reducer;