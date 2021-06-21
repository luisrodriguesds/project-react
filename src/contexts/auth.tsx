import React, { createContext, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

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
        // simualte request to server
        await new Promise((resolve) => setTimeout(resolve, 4000));

        const mockSignInResponse = {
          user: {
            id: "id-mock",
            name: "Carlos Vasconcelos",
            email: credentials.email,
            starts: [],
          },
          token: "unique-token-here",
        };

        const { user, token } = mockSignInResponse;

        // Set mock data in state var data
        setData(mockSignInResponse);

        // put on localstorage
        localStorage.setItem("@pr:token", token);
        localStorage.setItem("@pr:user", JSON.stringify(user));

        // redirect
        history.push("/catalog");
      } catch (error) {
        throw new Error("Something is wrong");
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
