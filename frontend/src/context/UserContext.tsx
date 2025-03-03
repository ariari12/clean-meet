import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

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

  // 페이지 새로고침 후 로컬 스토리지에서 유저 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 유저 정보 로컬 스토리지에 저장
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); 
    }
  }, [user]);

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
