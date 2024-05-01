import React, { useRef, useState, useEffect } from "react";
import "./styles/drawCanvas.css"

type DrawCanvasProp = {
  saveImage: (base64: string) => void;
  color?: string;
};

export const DrawCanvas: React.FC<DrawCanvasProp> = ({ saveImage, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      setContext(ctx);
    }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, { passive: false });
    document.body.addEventListener("touchend", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, { passive: false });
    document.body.addEventListener("touchmove", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, { passive: false });

    window.addEventListener("resize", updateCanvasDimensions);

    updateCanvasDimensions();

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
    };
  }, []);

  const updateCanvasDimensions = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setCanvasDimensions({ width: canvas.offsetWidth, height: canvas.offsetHeight });
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (context) {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(getX(e), getY(e));
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isDrawing && context) {
      context.lineTo(getX(e), getY(e));
      context.lineWidth = 10
      context.lineCap = "round"
      context.strokeStyle = color ? color : "#000";
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
            width={canvasDimensions.width}
            height={canvasDimensions.height}
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
