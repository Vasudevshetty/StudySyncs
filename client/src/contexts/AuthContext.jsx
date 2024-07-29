import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({
    bookmarks: [],
    downloads: [],
    photo: "",
    coverPhoto: "",
    name: "Guest",
    college: "",
    course: "",
    currentSemester: "",
    email: "guest@example.com",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsAuth(true);
        setUserData(data.data.user);
      } else {
        setIsAuth(false);
        setUserData({
          name: "Guest",
          email: "guest@example.com",
          photo: "/img/guest.png",
          coverPhoto: "/img/cover.png",
          college: "sjce",
          course: "cse",
          currentSemester: "4",
          bookmarks: [],
          downloads: [],
        });
      }
    } catch (error) {
      setIsAuth(false);
      setError(error.message);
      setUserData({
        name: "Guest",
        email: "guest@example.com",
        photo: "/img/guest.png",
        coverPhoto: "/img/cover.png",
        college: "sjce",
        course: "cse",
        currentSemester: "4",
        bookmarks: [],
        downloads: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        await fetchUserData();
        setIsAuth(true);
      } else {
        const result = await response.json();
        throw new Error(result.message);
      }
    } catch (err) {
      setIsAuth(false);
      setError(err.message);
      setUserData(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsAuth(false);
        setUserData({
          name: "Guest",
          email: "guest@example.com",
          photo: "/img/guest.png",
          coverPhoto: "/img/cover.png",
          college: "sjce",
          course: "cse",
          currentSemester: "4",
          bookmarks: [],
          downloads: [],
        });
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        await fetchUserData();
        setIsAuth(true);
      } else {
        const result = await response.json();
        throw new Error(result.message);
      }
    } catch (err) {
      setIsAuth(false);
      setError(err.message);
      setUserData(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const skipAuth = () => {
    setIsAuth(false);
    setUserData({
      name: "Guest",
      email: "guest@example.com",
      photo: "/img/guest.png",
      coverPhoto: "/img/cover.png",
      college: "sjce",
      course: "cse",
      currentSemester: "4",
      bookmarks: [],
      downloads: [],
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userData,
        isLoading,
        error,
        login,
        signup,
        skipAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
