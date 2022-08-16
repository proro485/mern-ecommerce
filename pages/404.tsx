import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-full mt-80 flex flex-col justify-center items-center">
      <span className="text-2xl font-semibold text-slate-800">
        404 | Page Not Found
      </span>
      <Link href="/">
        <div className="cursor-pointer px-7 py-2 my-3 border-2 border-slate-800 hover:bg-slate-800 hover:text-white">
          Visit Homepage
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
