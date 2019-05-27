import {LoginActionTypes} from "./Actions";
import {createAction} from "../helper/action-helper";
import {ActionTypesUnion} from "../helper/types-helper";
import {push} from "connected-react-router";
// @ts-ignore
import {Routes} from "../../constants/Routes";

export const UserActions = {
    setLoggedUserAction: (loginInfo: IUserDto) => createAction(LoginActionTypes.SET_LOGGED_USER_ACTION, loginInfo),
    resetLoggedUserAction: () => createAction(LoginActionTypes.RESET_LOGGED_USER_ACTION),
    updateUserBudget: (budget: number) => createAction(LoginActionTypes.UPDATE_BUDGET, budget),
};
export type UserActions = ActionTypesUnion<typeof UserActions>

export function setLoggedUser(user: IUserDto) {
    alert(JSON.stringify(user));
    return (dispatch: any) => {
        dispatch(UserActions.setLoggedUserAction(user));
    }
}

export function setUserAction(user: IUserDto): any  {
    console.log("setUser called")
    return (dispatch: any) => {
        dispatch(UserActions.setLoggedUserAction(user));
        // window. = (Routes.HOME_PAGE);
        // window.location.href = Routes.HOME_PAGE;
        dispatch(push(Routes.HOME_PAGE));
        // window.location.reload();
    }
}

export function updateUserBudget(budget: number): any  {
    return (dispatch: any) => {
        dispatch(UserActions.updateUserBudget(budget));
    }
}

export function userCreatedSuccess(): any  {
    return (dispatch: any) => {
        dispatch(push(Routes.LOGIN_PAGE));
    }
}

export function doLogoutAction(): any {
    return (dispatch: any) => {
        dispatch(UserActions.resetLoggedUserAction());
        dispatch(push(Routes.LOGIN_PAGE));
    }
}