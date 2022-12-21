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
      let onlyUser = action.payload.filter((el) => el.Worker === null);
      return {
        ...state,
        users: action.payload,
        newUser: action.payload,
        onlyUser: onlyUser,
      };
      case GET_USERNAME:
      return {
        ...state,
        users: action.payload,
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
          users: action.payload,
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