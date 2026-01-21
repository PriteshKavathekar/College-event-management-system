export const getRole = () => localStorage.getItem("role");
export const getId = () => localStorage.getItem("id");

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
