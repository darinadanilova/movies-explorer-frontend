import { useLayoutEffect, useState } from "react";

function SizeScreen() {
  const [size, setSize] = useState({ width: 0 });

  const handleSize = () => {
    setSize({ width: window.innerWidth });
  };

  useLayoutEffect(() => {
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return size;
}

export default SizeScreen;
