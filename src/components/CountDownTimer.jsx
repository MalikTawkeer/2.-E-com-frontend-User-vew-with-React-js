import React, { useEffect, useState } from "react";

const CountdownTimer = ({ valid_until }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(valid_until) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearInterval(timer);
  }, [valid_until]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 rounded-lg w-full">
      <div className=" w-fit shadow-md px-2 py-2 flex flow-row justify-center items-center gap-3">
        <p className=" font-bold text-red-600">Limited Offer</p>

        {timeLeft.hours !== undefined ? (
          <div className="flex space-x-4 text-lg font-semibold text-gray-700">
            <span>
              <span className="text-red-500">{timeLeft.hours}h</span>
            </span>
            <span>
              <span className="text-red-500">{timeLeft.minutes}m</span>
            </span>
            <span>
              <span className="text-red-600">{timeLeft.seconds}s</span>
            </span>
          </div>
        ) : (
          <span className="text-red-500 font-bold">Time expired</span>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
