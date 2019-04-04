import {UserActions} from "../actions/userActions";
import {LoginActionTypes} from "../actions/Actions";
import {Constants} from "../../constants/Constants";

interface IUserState {
    isLoggedIn: boolean;
    userDetails: IUserDto;
}

const initialState: IUserState = {
    isLoggedIn: false,
    userDetails: {
        userId: -1,
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        amount: 0
    }
};


export default function (state:IUserState = initialState, action: UserActions):IUserState {
    switch (action.type) {
        case LoginActionTypes.SET_LOGGED_USER_ACTION:
            localStorage.setItem(Constants.USER_LOGGED, JSON.stringify(action.payload));
            return {
                isLoggedIn: true,
                userDetails: action.payload,
            };
        case LoginActionTypes.RESET_LOGGED_USER_ACTION:
            localStorage.setItem(Constants.USER_LOGGED, "");
            return initialState;
        default:
            return state;
    }
}