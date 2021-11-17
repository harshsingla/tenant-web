import { LOCATION_CHANGE } from 'connected-react-router'
const initialState = {
    minSideMenuWidth: 56,
    collapsed: false,
    maxSideMenuWidth: 200
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR_COLLAPSED':
            return {
                ...state,
                collapsed: !state.collapsed
            }
        default:
            return state
    }
}
