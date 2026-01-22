import { useEffect, useState } from "react";

export default function ColorBox({ color }) {
  const [currentColor, setCurrentColor] = useState(color);

  useEffect(() => {
    setInterval(() => {
      setCurrentColor((prev) => (prev == color ? "black" : color));
    }, 1000);
  }, []);

  return (
    <div
      style={{
        backgroundColor: currentColor,
        width: "100px",
        height: "100px",
      }}
    ></div>
  );
}
