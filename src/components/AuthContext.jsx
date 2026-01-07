import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include"
      });
      const data = await res.json();
      setUser(data.isLogged ? data.username : null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  async function signUp(username, password) {
    const request = await fetch("/api/auth/signUp", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    });
    
    const isOk = request.ok;   
    if(!isOk) {
        alert("User already exists!");
        return;
    }
    alert("User has been successfully created!");
  }

  async function signIn(username, password) {
    const request = await fetch("/api/auth/signIn", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    });

    const isOk = request.ok;   
    if(!isOk) {
        alert("Failed to sign in!");
        return;
    }
    const data = await request.json();
    alert("Welcome, " + data.username + "!");
    setUser(data.username);
  }

  async function updateUserData(username, password) {
    const request = await fetch("/api/auth/updateUserData", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    });

    const isOk = request.ok;   
    if(!isOk) {
        alert("Failed to update!");
        return;
    }
    signOut();
  }

  async function removeUser() {
    const request = await fetch("/api/auth/removeUser", {
                        method: "GET",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        credentials: 'include'
                    });

    const isOk = request.ok;   
    if(!isOk) {
        alert("Failed to remove!");
        return;
    }
    signOut();
  }

  async function signOut () {
    const request = await fetch('/api/auth/signOut', {
      method: 'GET',
      credentials: 'include',
    })
    const isOk = request.ok;
    if(!isOk) {
        alert("Failed to sign out");
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, signIn, signUp, signOut, updateUserData, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
