import API from "./api";

export const registerUser = async (userData) => {
  const res = await API.post("/users/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post("/users/login", userData);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user)); 
  }

  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};