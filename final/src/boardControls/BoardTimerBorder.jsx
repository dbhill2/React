import { useEffect, useState, useRef } from "react";

export default function BoardTimerBorder({ size, duration, active, ogTime, setStatusMessage }) { //Takes in this data to be used throughout the function
  const [progress, setProgress] = useState(1);
  const frameRef = useRef(null);

  useEffect(() => {// timer checker if it's not active timer is full
    if (!active) {
      setProgress(1);
      if (frameRef.current) cancelAnimationFrame(frameRef.current); //cancels a potential tick if timer goes inactive
      return;
    }
    const start = performance.now();

    const tick = (now) => {//timer countdown
      const elapsed = now - start;
      const pct = Math.max(1 - elapsed / duration, 0);
      setProgress(pct);

      if (pct > 0) {
        frameRef.current = requestAnimationFrame(tick);//ticks timer down until it reaches 0
      }
    };

    frameRef.current = requestAnimationFrame(tick);//calls the function above

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current); //stops the clock when timer is stopped
    };
  }, [active, duration]);// uses these states to signal when to start

  //svg
  const strokeWidth = 8; //border px subtracts from size
  const perimeter = (size - strokeWidth) * 4; // total length of border
  const dashOffset = perimeter * (1 - progress);// animation that makes the "dashed" border slide away. 1 = full border 0= no border

  const remaining = progress * (duration / 1000);
  const warnedHalf = useRef(false);

  useEffect(() => {
    if (active) {
      warnedHalf.current = false;
    }
  }, [active, duration]); // watches for these states to change and then flags as half the time is remaining

  useEffect(() => {
    if (!active) return; //if the timer isn't active get outta here

    const remaining = progress * (duration / 1000); // calculates time left

    if (!warnedHalf.current && remaining <= ogTime * 0.5) {// displays status message when hallf the time is gone.
      warnedHalf.current = true;
      setStatusMessage("You have used half your allotted time!!!");
    }

    if(remaining <= 5){
      setStatusMessage("5")
    }
    if(remaining <= 4){
      setStatusMessage("4")
    }
    if(remaining <= 3){
      setStatusMessage("3")
    }
    if(remaining <= 2){
      setStatusMessage("2")
    }
    if(remaining <= 1){
      setStatusMessage("1")
    }
  }, [progress, active, duration, ogTime, setStatusMessage]); // uses these states 



  let color = "#81b29a";

  if (remaining <= ogTime * 0.5) {
    color = "#ffd23f";
  }

  let opacity = 1;

  if (remaining <= 5) {// blinks with 5 seconds left
    color = "#ef4444";
    const now = performance.now();
    opacity = 0.5 + 0.5 * Math.sin(now / 100);
  }


  return (
    <svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none"
      }}
    >
      <rect // centering the rect inside the svg border
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={size - strokeWidth}
        height={size - strokeWidth}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
        strokeDasharray={perimeter}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
    </svg>
  );
}
