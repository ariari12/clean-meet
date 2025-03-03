import React from "react";
import PersonalProfilePage from "./profile/personalProfile";
import CompanyProfilePage from "./profile/companyProfile";
import { useUser } from "@/context/UserContext";

const ProfilePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, setUser } = useUser(); // 사용자 정보

  console.log("user.authorities", user?.authorities);

  return (
    <div>
      {user &&
      // user.authorities.some((auth) => auth.authority === "ROLE_PERSONAL") ? (
      user.authorities[0].authority === "ROLE_PERSONAL" ? (
        <PersonalProfilePage />
      ) : (
        <CompanyProfilePage />
      )}
    </div>
  );
};

export default ProfilePage;
