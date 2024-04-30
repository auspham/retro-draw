import React, {useState} from "react";

type QRCodePageProp = {
  roomId: string
}

export const QRCodePage: React.FC<QRCodePageProp> =({ roomId }) => {
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);

  const handleQRCodeLoad = () => {
    setQrCodeLoaded(true);
  }

  return <section className={"section box has-text-centered is-flex-direction-column is-align-items-center is-flex"}>
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