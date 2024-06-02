import React, {useEffect, useState} from 'react';

interface ProgressBarProps {
  duration: number; // Total duration of progress in seconds
}

export const ProgressBar: React.FC<ProgressBarProps> = ({duration}) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const intervalTime = (duration * 1000) / 100;
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 1;
        if (nextProgress > 100) {
          //clearInterval(interval);
          //return 100;
          return 0;
        }
        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="w-full bg-white h-2.5 dark:bg-gray-700">
      <div
        className="bg-[#00ff66] h-2.5"
        style={{width: `${progress}%`}}
      ></div>
    </div>
  );
};

export default ProgressBar;