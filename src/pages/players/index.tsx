import { PageContext } from "../../hooks/usePage.tsx";
import {useState} from "react";
import {SetNamePage} from "./SetNamePage.tsx";

const PlayerPage = () => {
  const [page, setPage] = useState<number>(0);

  return <PageContext.Provider value={{page, setPage}}>
      {page === 0 && <SetNamePage/>}
  </PageContext.Provider>
}

export default PlayerPage;