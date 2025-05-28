import ErrorMessage from "../components/common/ErrorMessage";

const PageNotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full text-center border-1 border-slate-100/50">
          <ErrorMessage message="The page you are looking for does not exist." />
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
