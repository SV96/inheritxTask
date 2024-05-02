import { setUserInfoActionType } from "../actionTypes"

export const setUserInfoAction = useInfo => {
    return {
        type: setUserInfoActionType,
        payload: useInfo,
    }
}

