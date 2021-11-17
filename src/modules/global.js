const initialState = {
  currentUser: null,
  mobileNo: null,
  token: null,
  buttonLoading: false,
  showPlan:false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }
      case 'SET_PLAN':
        return {
          ...state,
          showPlan: action.payload
        }

    case 'SET_MOBILE':
      return {
        ...state,
        mobileNo: action.payload
      }

    case 'LOGOUT':
      window.localStorage.clear()
      return {
        ...state,
        currentUser: null
      }

    case 'SHOW_BTN_LOADING':
      return {
        ...state,
        buttonLoading: true
      }

    case 'HIDE_BTN_LOADING':
      return {
        ...state,
        buttonLoading: false
      }


    case 'SET_AUTH_TOKEN':
      window.localStorage.setItem('token', action.payload)
      return {
        ...state,
        token: action.payload
      }

    default:
      return state
  }
}
