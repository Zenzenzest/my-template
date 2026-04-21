import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

import { useData } from "../../context/Data";
import LoadingComponent from "../Loading/Loading";

import { useState } from "react";

import Version from "../Version/Version";

const SIDEBAR_LINKS = [
  {
    path: "/",
    label: "",
    id: "",
  },
];
// routes for default top title/header
const app_routes = ["/"];

export default function SideNav() {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation().pathname;
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 relative">
        {/* MOBILE OVERLAY BACKGROUND */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDE NAV */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out flex flex-col border-r lg:sticky lg:top-0 lg:h-screen ${
            isDark
              ? "bg-[#0e1721] border-gray-800 text-gray-200"
              : "bg-[#ecfeff] border-gray-200 text-gray-700"
          } ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* HEADER */}
          <div className="pt-6 pb-4 px-4">
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className="block font-black tracking-wider text-2xl hover:opacity-80 transition-opacity ml-2 text-center lg:text-left"
            >
              HEAD
              <span
                className={`transition-colors duration-300 ${
                  isDark ? "text-cyan-300" : "text-cyan-500"
                }`}
              >
                ER
              </span>
            </Link>
          </div>

          <div
            className={`h-px w-full ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
          ></div>

          {/* MAIN LINKS */}
          <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
            {SIDEBAR_LINKS.map((link) => {
              const isActive =
                link.path === "/"
                  ? location === "/"
                  : location.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`relative block px-4 py-3 rounded-md font-bold transition-all active:scale-[0.98] ${
                    isActive
                      ? isDark
                        ? "bg-cyan-600/30 text-cyan-400 border border-cyan-500/30"
                        : "bg-cyan-500/20 text-cyan-700 border border-cyan-500/30"
                      : isDark
                        ? "text-gray-300 hover:bg-gray-800 border border-transparent"
                        : "text-gray-600 hover:bg-white/50 border border-transparent"
                  }`}
                >
                  <span className="block text-left pl-1">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* BOTTOM SECTION */}
          <div className="p-4 pb-10 md:pb-15 lg:pb-20 xl:pb-25 flex flex-col gap-1">
            {/* VERSION */}
            <div className="flex justify-center mb-1">
              <Version />
            </div>

            {/* SOCIALS */}
            <div
              className={`flex justify-center items-center gap-4 mb-2 mt-1 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {/* TWITTER */}
              <a
                href="https://twitter.com/realzenzenzest"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter: @realzenzenzest"
                className="hover:text-cyan-500 transition-colors"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* KO-FI */}
              <a
                href="https://ko-fi.com/zenzenzest"
                target="_blank"
                rel="noopener noreferrer"
                title="Support me on Ko-fi"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/icons/kofi.png"
                  alt="Ko-fi logo"
                  className={`w-5 h-5 shrink-0 ${isDark ? "opacity-80" : ""}`}
                />
              </a>{" "}
              {/* DISCORD */}
              <div
                title="Discord"
                className="flex items-center gap-1.5 cursor-help hover:text-cyan-500 transition-colors"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
                </svg>
                <span className="text-xs font-bold tracking-wide">
                  zenzenzest
                </span>
              </div>
            </div>

            <div
              className={`h-px w-full mb-1 ${
                isDark ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>

            {/* THEME SWITCH*/}
            <button
              onClick={toggleTheme}
              className={`relative flex items-center w-full p-1 rounded-md transition-all active:scale-[0.98] cursor-pointer ${
                isDark
                  ? "bg-[#131d27] border border-gray-700/50"
                  : "bg-gray-200/80 border border-transparent shadow-inner"
              }`}
            >
              {/*SLIDING BACKGROUND PILL*/}
              <div
                className={`absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-lg shadow-sm transition-transform duration-300 ease-out ${
                  isDark
                    ? "translate-x-full bg-gray-700"
                    : "translate-x-0 bg-white"
                }`}
              ></div>

              {/* SUN */}
              <div
                className={`relative z-10 flex-1 flex justify-center items-center py-2 transition-colors duration-300 ${
                  !isDark ? "text-amber-500" : "text-gray-500"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>

              {/* MOON */}
              <div
                className={`relative z-10 flex-1 flex justify-center items-center py-2 transition-colors duration-300 ${
                  isDark ? "text-cyan-300" : "text-gray-500 hover:text-gray-400"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col w-full min-w-0 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div
              className={`min-h-18 flex flex-row items-center justify-between px-4 ${
                isDark ? "bg-[#0e1721]" : "bg-[#ecfeff]"
              }`}
            >
              <div className="w-12 flex justify-start">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className={`lg:hidden flex items-center justify-center hover:opacity-80 transition-opacity p-2 -ml-2 rounded-md ${
                    isDark
                      ? "text-gray-200 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </div>

              {/* TOP TITLE */}
              <div className="flex-1 text-center flex justify-center">
                <h2
                  className={`text-lg md:text-xl lg:text-2xl font-black tracking-wide ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {location === "/1" ? (
                    <span>
                      #
                      <span
                        className={`${
                          isDark ? "text-cyan-300" : "text-cyan-500"
                        } transition-colors`}
                      >
                        1
                      </span>{" "}
                    </span>
                  ) : (
                    <span>
                      #
                      <span
                        className={`${
                          isDark ? "text-cyan-300" : "text-cyan-500"
                        } transition-colors`}
                      >
                        2
                      </span>{" "}
                    </span>
                  )}
                </h2>
              </div>
              <div className="w-12"></div>
            </div>
            <Outlet />
          </div>
          {/* FOOTER HERE */}
        </main>
      </div>
    </div>
  );
}
