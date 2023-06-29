export const ReducerFunc = (state, action) => {
  if (action.type === "SET_USER") {
    return { ...state, user: action.user };
  }
  if (action.type === "IS_LOADING") {
    return { ...state, isLoading: action.isLoading };
  }
  if (action.type === "IS_ONBOARDED") {
    return { ...state, isOnboared: action.isOnboared };
  }
  if (action.type === "IS_AUTHONTICATED") {
    return { ...state, isAuthounticated: action.isAuthounticated };
  }
  if (action.type === "IS_AUTHONTICATED") {
    return { ...state, isAuthounticated: action.isAuthounticated };
  }
  if (action.type === "IS_MODALOPEN") {
    return { ...state, isModalOpen: action.isModalOpen };
  }
};
