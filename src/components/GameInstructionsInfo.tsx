const Instructions = () => {
  return (
    <>
      <h1 className="font-semibold text-green-700 mb-6">Your Turn!</h1>
      <h3 className="text-green-500 italic">
        Refreshing page will reset your turn!
      </h3>
      <div>
        <p>
          Click cards that you want to swap then press the "Swap Cards" button.{" "}
        </p>

        <p className="italic mb-2">Careful! You can only swap once.</p>
      </div>
      <h3 className="mb-4">When you've finished, press end turn</h3>
    </>
  );
};

export default Instructions;