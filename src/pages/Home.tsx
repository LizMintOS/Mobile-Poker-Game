import { useState } from "react";

const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <img src="/icon.png" className="logo" />
      </div>
      <h1>poker-game</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};

export default HomePage;
