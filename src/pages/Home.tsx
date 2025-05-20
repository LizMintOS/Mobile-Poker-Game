import { useState } from "react";

const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/icon.png" className="logo" />
        </a>
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
