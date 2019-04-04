import {LoginActionTypes} from "./Actions";
import {createAction} from "../helper/action-helper";
import {ActionTypesUnion} from "../helper/types-helper";
import {push} from "connected-react-router";
// @ts-ignore
import {Routes} from "../../constants/Routes";

export const UserActions = {
    setLoggedUserAction: (loginInfo: IUserDto) => createAction(LoginActionTypes.SET_LOGGED_USER_ACTION, loginInfo),
    resetLoggedUserAction: () => createAction(LoginActionTypes.RESET_LOGGED_USER_ACTION),
};
export type UserActions = ActionTypesUnion<typeof UserActions>

export function setLoggedUser(user: IUserDto) {
    alert(JSON.stringify(user));
    return (dispatch: any) => {
        dispatch(UserActions.setLoggedUserAction(user));
    }
}

export function setUserAction(user: IUserDto): any  {
    return (dispatch: any) => {
        dispatch(UserActions.setLoggedUserAction(user));
        dispatch(push(Routes.HOME_PAGE));
    }
}

export function doLogoutAction(): any {
    return (dispatch: any) => {
        dispatch(UserActions.resetLoggedUserAction());
        dispatch(push(Routes.LOGIN_PAGE));
    }
}