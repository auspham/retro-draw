type WaitingForOtherProps = {
  name: string,
}
export const WaitingForOther: React.FC<WaitingForOtherProps> = ({ name}) => {
  return <div className={"p-6 container"}>
    <h1 className={"is-size-3 mb-5"}>All good <span
        className={"has-text-weight-bold has-text-primary is-capitalized"}>{name}</span>, we are just
      waiting for others
      to be done.</h1>
    <h1 className={"is-size-5 mb-5"}>Sit back and relax. Look at the screen. Or tell others to hurry up.</h1>
    <h1 className={"is-size-5 mb-5"}>Please don't close this window.</h1>
  </div>
}