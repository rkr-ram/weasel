import { reducerCases } from "./constants";

export const initialState = {
  userInfo: undefined,
  newUser: false,
  contactpage: false,
  currentChatUser: undefined,
  messages:[],
  socket:undefined
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };
    case reducerCases.SET_CONTACT_PAGE:
      return {
        ...state,
        contactpage: !state.contactpage,
      };
    case reducerCases.SET_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.user,
      };
    case reducerCases.SET_MESSAGES:
      return {
        ...state,
        messages:action.messages
      }

    case reducerCases.UPDATE_NEW_MESSAGES:
      return{
        ...state,
        messages:[...state.messages,action.message]
      }
    case reducerCases.SET_SOCKET:
      return {
        ...state,
        socket:action.socket
      }
    default:
      return state;
  }
};

export default reducer;
