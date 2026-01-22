import { useEffect, useState } from "react";

const CountDown = ({ start }) => {
  const [seconds, setSeconds] = useState(start);
  useEffect(() => {
    const interValId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(interValId);
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
  }, []);
  return <div>CountDown : {seconds}</div>;
};

export default CountDown;
