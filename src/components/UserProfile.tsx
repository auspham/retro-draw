import {UserModel} from "../models/UserModel.tsx";
import "./styles/userProfile.css";

type UserProfileProp = {
  user: UserModel
}
export const UserProfile: React.FC<UserProfileProp> = ({ user }) => {
  return <div className={"user-profile mb-5"}>
    <img src={user.avatar}/>
    <span style={{ color: user.color }}>{user.name}</span>
  </div>
}