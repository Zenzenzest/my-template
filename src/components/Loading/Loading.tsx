import { useTheme } from "../../hooks/useTheme";
// import { useData } from "../../context/Data";

export default function LoadingComponent() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col gap-5 items-center justify-center space-x-1 min-h-screen ${
        theme === "dark" ? "bg-[#0e1721]" : "bg-gray-100"
      } `}
    >
      {/* <span
        className={`text-xs sm:text-sm ${
          theme === "dark" ? "text-pink--200" : "text-pink-400"
        }`}
      >
        Sticker generated from:{" "}
        <a href="https://st.ayaka.one/" target="_blank" className="underline">
          https://st.ayaka.one/
        </a>
      </span>
      <img src={sticker} alt="Loading..." /> */}
      <h1>Loading....</h1>
      {/*PROGRESS BAR*/}
      {/* <div className="w-64 bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-[#efb2ae] h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div> */}

      {/* PERCENTAGE */}
      {/* <div
        className={`text-sm font-medium ${
          theme === "dark" ? "text-pink-200" : "text-pink-600"
        }`}
      >
        {Math.round(loadingProgress)}%
      </div> */}
    </div>
  );
}
