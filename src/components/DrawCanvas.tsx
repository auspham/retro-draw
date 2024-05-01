import React, { useRef, useState, useEffect } from "react";
import "./styles/drawCanvas.css"

type DrawCanvasProp = {
  saveImage: (base64: string) => any;
};

export const DrawCanvas: React.FC<DrawCanvasProp> = ({ saveImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setContext(ctx);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (context) {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(getX(e), getY(e));
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawing && context) {
      context.lineTo(getX(e), getY(e));
      context.lineWidth = 10
      context.lineCap = "round"
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    saveCanvas();
  };

  const clearCanvas = () => {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  };

  const saveCanvas = () => {
    if (canvasRef.current) {
      const base64 = canvasRef.current.toDataURL();
      saveImage(base64);
    }
  };

  const getX = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): number => {
    if ('touches' in event) {
      return event.touches[0].clientX - canvasRef.current!.getBoundingClientRect().left;
    } else {
      return event.nativeEvent.offsetX;
    }
  };

  const getY = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): number => {
    if ('touches' in event) {
      return event.touches[0].clientY - canvasRef.current!.getBoundingClientRect().top;
    } else {
      return event.nativeEvent.offsetY;
    }
  };

  return (
      <div className={"is-flex is-flex-direction-column is-align-items-center mb-6"}>
        <canvas
            width={window.innerWidth}
            height={500}
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
        ></canvas>
        <button className={"button mt-3"} onClick={clearCanvas}>Clear drawing</button>
      </div>
  );
};
