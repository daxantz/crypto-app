"use client";

import { useEffect, useState } from "react";

export default function CurrentTime() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const date = new Date();
    const dateString = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const time = date.toLocaleTimeString();
    setTimeString(`${dateString} ${time}`);
  }, []);

  return <p className="text-[#9E9E9E] text-sm font-normal">{timeString}</p>;
}
