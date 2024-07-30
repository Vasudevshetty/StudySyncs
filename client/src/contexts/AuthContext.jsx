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
  const [isLoading, setIsLoading] = useState({
    fetchUser: false,
    login: false,
    logout: false,
    signup: false,
    addBookmark: false,
    removeBookmark: false,
    addDownload: false,
    removeDownload: false,
  });
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");

  // Function to fetch user data
  const fetchUserData = async () => {
    setIsLoading((prev) => ({ ...prev, fetchUser: true }));
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
      setError(error.message);
      skipAuth();
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchUser: false }));
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (formData) => {
    setIsLoading((prev) => ({ ...prev, login: true }));
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
      setError(err.message);
      skipAuth();
      throw err;
    } finally {
      setIsLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const logout = async () => {
    setIsLoading((prev) => ({ ...prev, logout: true }));
    try {
      if (isAuth) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/auth/logout`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          skipAuth();
        } else {
          throw new Error("Logout failed");
        }
      } else skipAuth();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading((prev) => ({ ...prev, logout: false }));
    }
  };

  const signup = async (formData) => {
    setIsLoading((prev) => ({ ...prev, signup: true }));
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
      setError(err.message);
      skipAuth();
      throw err;
    } finally {
      setIsLoading((prev) => ({ ...prev, signup: false }));
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

  const addBookmark = async (resource) => {
    setIsLoading((prev) => ({ ...prev, addBookmark: true }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/me/bookmarks`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resource }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData((prev) => ({
          ...prev,
          bookmarks: [...prev.bookmarks, resource],
        }));
        setNotification(data.message);
      } else {
        const data = await response.json();
        setNotification(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, addBookmark: false }));
    }
  };

  const removeBookmark = async (resource) => {
    setIsLoading((prev) => ({ ...prev, removeBookmark: true }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/me/bookmarks`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resource }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData((prev) => ({
          ...prev,
          bookmarks: prev.bookmarks.filter((item) => item.url !== resource.url),
        }));
        setNotification(data.message);
      } else {
        const data = await response.json();
        setNotification(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, removeBookmark: false }));
    }
  };

  const addDownload = async (resource) => {
    setIsLoading((prev) => ({ ...prev, addDownload: true }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/me/downloads`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resource }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData((prev) => ({
          ...prev,
          downloads: [...prev.downloads, resource],
        }));
        setNotification(data.message);
      } else {
        const data = await response.json();
        setNotification(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, addDownload: false }));
    }
  };

  const removeDownload = async (resource) => {
    setIsLoading((prev) => ({ ...prev, removeDownload: true }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/users/me/downloads`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resource }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData((prev) => ({
          ...prev,
          downloads: prev.downloads.filter((item) => item.url !== resource.url),
        }));
        setNotification(data.message);
      } else {
        const data = await response.json();
        setNotification(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, removeDownload: false }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userData,
        isLoading,
        error,
        login,
        logout,
        signup,
        skipAuth,
        addBookmark,
        removeBookmark,
        addDownload,
        removeDownload,
        notification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
