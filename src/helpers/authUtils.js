export const getToken = () => {
    return localStorage.getItem("token");
}

export const isUserAuthenticated = () => {
    return getToken() ? true : false;
}