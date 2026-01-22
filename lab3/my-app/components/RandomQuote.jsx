import { useEffect, useState } from "react";

export default function RandomQuote() {
  const quotes = [
    "quotes1",
    "quotes2 B",
    "c quotes 3",
    "quotes 4",
    "quotes 5 Ee",
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 2000);
  }, []);

  return <div>{currentQuote}</div>;
}
