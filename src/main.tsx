import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {FireBaseProvider} from "./contexts/FireBaseContext.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {App} from "./App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FireBaseProvider>
      <App/>
    </FireBaseProvider>
    <ToastContainer position={"bottom-right"}
                    autoClose={1000}
                    hideProgressBar={false}
                    closeOnClick/>
  </React.StrictMode>,
)
