import {UserModel} from "../models/UserModel.tsx";
import React from "react";
import {UserProfile} from "./UserProfile.tsx";

type RightUserColumnProp = {
  users?: UserModel[]
}

export const RightUserColumn: React.FC<RightUserColumnProp> = ({ users }) => {
  return <div className={"full-height is-flex-direction-column is-justify-content-space-around is-align-content-space-around is-flex"}> {users?.map((user, i) => <UserProfile key={i} user={user}/>)} </div>
}