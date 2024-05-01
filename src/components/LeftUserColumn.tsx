import {UserModel} from "../models/UserModel.tsx";
import {UserProfile} from "./UserProfile.tsx";

type LeftUserColumnProp = {
  users?: UserModel[]
}
export const LeftUserColumn: React.FC<LeftUserColumnProp> = ({ users }) => {
  return <div className={"full-height is-flex-direction-column is-justify-content-space-around is-align-content-space-around is-flex"}>
    {users?.map((user, i) => <UserProfile key={i} user={user}/>)}
  </div>
}