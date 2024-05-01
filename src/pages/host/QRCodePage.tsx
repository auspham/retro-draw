import React, {useState} from "react";
import {useFirestore} from "../../hooks/useFireStore.tsx";
import {doc, onSnapshot} from "firebase/firestore";
import {UserModel} from "../../models/UserModel.tsx";
import {UserProfile} from "../../components/UserProfile.tsx";
import {getRandomArbitrary} from "../../utils/NumberUtils.ts";

type QRCodePageProp = {
  roomId: string
}

export const QRCodePage: React.FC<QRCodePageProp> =({ roomId }) => {
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
  const [users, setUser] = useState<UserModel[]>()
  const db = useFirestore();

  const ubsub = onSnapshot(doc(db, "rooms", roomId), (data) => {
    setUser(data.get("people"));
  })

  const handleQRCodeLoad = () => {
    setQrCodeLoaded(true);
  }

  return <section className={"section full-height has-text-centered is-flex-direction-column is-align-items-center is-flex is-justify-content-center"}>
    <h1 className="title">{"Join the retro"}</h1>
    <h2 className="subtitle">
      Scan the QR code below to join
    </h2>
    <figure>
      {!qrCodeLoaded && <div className="skeleton-block" style={{width: 320, height: 320}}></div>}
      <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${window.location.href + "?join=" + roomId}`}
          onLoad={handleQRCodeLoad}/>
    </figure>
  </section>
}