import { jwtDecode } from "jwt-decode";

// Store token in localStorage
function setToken(token) {
  localStorage.setItem("access_token", token);
}

// Get token from localStorage
export function getToken() {
  try {
    console.log("getToken ", localStorage.getItem("access_token"));
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

// Remove token from localStorage
export function removeToken() {
  localStorage.removeItem("access_token");
}

// Read and decode JWT token
export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  const token = readToken();
  console.log;
  "isAuthenticated - token:", token;
  return token ? true : false;
}

// Authenticate user with login credentials
export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ userName: user, password: password }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

// Register new user
export async function registerUser(user, password, password2) {
  console.log(
    "process.env.NEXT_PUBLIC_API_URL:",
    process.env.NEXT_PUBLIC_API_URL
  );
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({
      userName: user,
      password: password,
      password2: password2,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return true;
  } else {
    throw new Error(data.message);
  }
}
