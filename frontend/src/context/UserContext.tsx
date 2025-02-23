import React, { createContext, useState, useContext, ReactNode } from "react";

interface Authority {
  authority: string;
}

interface User {
  email: string;
  name: string;
  accessToken: string; 
  authorities: Authority[]; 
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("사용자 정보 context에서 에러가 발생했습니다.");
  }
  return context;
};
