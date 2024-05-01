import React, {useState} from "react";

type QRCodePageProp = {
  roomId: string
  handleStartRetro: () => void
}

export const QRCodePage: React.FC<QRCodePageProp> =({ roomId, handleStartRetro }) => {
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);

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
    <button className={"button is-fullwidth mt-5 is-info"} onClick={handleStartRetro}>Start the retro</button>
  </section>
}