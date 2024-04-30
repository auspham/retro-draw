import {createContext, Dispatch, useContext} from "react";

type PageContextProp = {
  page: number,
  setPage: Dispatch<number>
}

export const PageContext = createContext<PageContextProp | undefined>(undefined);

export const usePage = (): PageContextProp => {
  const context = useContext(PageContext);
  if (!context) {
    return { page: 0, setPage: () => {} }
  }
  return context;
}