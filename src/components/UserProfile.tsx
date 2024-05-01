import {UserModel} from "../models/UserModel.tsx";
import "./styles/userProfile.css";

type UserProfileProp = {
  x: string,
  y: string
  user: UserModel
}
export const UserProfile: React.FC<UserProfileProp> = ({ x, y, user}) => {
  return <div className={"user-profile"} style={{ left: x, top: y }}>
    <img src={user.avatar}/>
    {user.name}
  </div>
}