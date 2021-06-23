import React, { createContext, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { checkCredentials } from "../utils/check-credentials";

interface IUser {
  id: string;
  name: string;
  email: string;
  starts: string[];
}

interface ISignInResponse {
  token: string;
  user: IUser;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  signIn: (credentials: ICredentials) => Promise<void>;
  user: IUser;
  isLogged: boolean;
}

const AuthContext = createContext({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [data, setData] = useState<ISignInResponse>(() => {
    const token = localStorage.getItem("@pr:token");
    const user = localStorage.getItem("@pr:user")
      ? JSON.parse(localStorage.getItem("@pr:user") as string)
      : {};

    if (token && user) {
      return { token, user };
    }
    return {} as ISignInResponse;
  });

  const signIn = useCallback(
    async (credentials: ICredentials) => {
      try {
        const { user, token } = await checkCredentials({
          email: credentials.email,
          password: credentials.password,
        });

        // Check user starts
        const starts = [] as Array<string>;

        // Set mock data in state var data
        setData({
          token,
          user: {
            ...user,
            starts,
          },
        });

        // put on localStorage
        localStorage.setItem("@pr:token", token);
        localStorage.setItem(
          "@pr:user",
          JSON.stringify({
            ...user,
            starts,
          })
        );

        // redirect
        history.push("/catalog");
      } catch (error) {
        throw new Error(error.message);
      }
    },
    [history]
  );

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!data.user,
        signIn,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
