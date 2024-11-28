export const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };
  
  export const clearTokens = () => {
    localStorage.clear();
  };
  
  export const isLoggedIn = () => localStorage.getItem("loggedIn") === "true";
  