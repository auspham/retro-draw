export type UserModel = {
  id: string
  name: string,
  avatar: string,
  color: string,
  answers: Answer[]
}


export type Answer = {
  question: string,
  answerText?: string,
  answerImage?: string
}