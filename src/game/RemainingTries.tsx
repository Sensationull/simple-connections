import { useState } from "react";
import "./RemainingTries.css";
import { RemainingTriesProps } from "../utils/types";

const RemainingTries = ({ count }: RemainingTriesProps) => {
  const [tries, setTries] = useState(new Array(count).fill(0));
  const [prevCount, setPrevCount] = useState(count);
  if (count !== prevCount) {
    setPrevCount(count);
    setTries(new Array(count).fill(0));
  }
  // ^This is more efficient than a useEffect but
  //  we should revisit whether or not we can calculate this during rendering.
  // https://react.dev/learn/you-might-not-need-an-effect#fetching-data:~:text=Although%20this%20pattern%20is%20more%20efficient%20than%20an%20Effect%2C%20most%20components%20shouldn%E2%80%99t%20need%20it%20either.

  return (
    <div className="remaining-tries-container">
      <span>Mistakes remaining: </span>
      <div className="circle-container">
        {tries.map(() => (
          <span key={crypto.randomUUID()} className="circle"></span>
        ))}
      </div>
    </div>
  );
};

export default RemainingTries;
