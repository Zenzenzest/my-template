import { useTheme } from "../../hooks/useTheme";
import VersionLogs from "../../assets/versions.json";
import { createPortal } from "react-dom";
import { IsDeviceIpad } from "../../utils/isIpad";

export default function VersionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const isIpad = IsDeviceIpad();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const scrollable = target.scrollHeight > target.clientHeight;

    if (!scrollable) {
      e.preventDefault();
    }
  };

  function formatUnixToDate(unixMs: number): string {
    const date = new Date(unixMs);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  if (!isOpen) return null;

  // Teleport the entire overlay directly to the <body> tag
  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      onTouchMove={handleTouchMove}
    >
      {/* BACKDROP */}
      <div
        className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
          isDark ? "bg-black/70" : "bg-black/40"
        }`}
      ></div>

      {/* MODAL CONTAINER */}
      <div
        className={`relative z-10 flex flex-col ${
          isIpad ? "w-2/3" : "w-full"
        } max-w-lg max-h-[85vh] rounded-lg shadow-2xl border overflow-hidden transition-all duration-300 ${
          isDark ? "bg-[#0e1721] border-gray-700" : "bg-white border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div
          className={`px-6 py-4 border-b flex justify-between items-center shrink-0 ${
            isDark
              ? "border-gray-700 bg-[#0e1721]"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <h2
            className={`text-xl font-black tracking-wide ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Changelog
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDark
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* SCROLLABLE LOGS */}
        <div
          className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 ${
            isDark ? "bg-[#151e2e] " : "bg-gray-200"
          }`}
        >
          {VersionLogs.slice()
            .reverse()
            .map((version, index) => (
              <div
                className={`flex flex-col ${
                  index !== VersionLogs.length - 1 ? "border-b pb-6" : ""
                } ${isDark ? "border-gray-700/50" : "border-gray-200"}`}
                key={`${version.version}`}
              >
                {/* BADGE & DATE */}
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      isDark
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-cyan-100 text-cyan-700"
                    }`}
                  >
                    {version.version}
                  </span>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {formatUnixToDate(version.date)}
                  </span>
                </div>

                {/* TITLE */}
                <h3
                  className={`text-lg font-bold mb-2 ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {version.title}
                </h3>

                {/* DESCRIPTION*/}
                {version.description && version.description.length > 1 && (
                  <p
                    className={`text-sm mb-3 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {version.description}
                  </p>
                )}

                {/* BULLET POINTS*/}
                {version.logs && version.logs.length > 0 && (
                  <ul className="space-y-1.5 mt-1">
                    {version.logs.map((log, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 text-sm ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                            isDark ? "bg-cyan-500" : "bg-cyan-500"
                          }`}
                        />
                        <span className="leading-snug">{log}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>

        {/* FOOTER */}
        <div
          className={`px-6 py-4 border-t flex justify-end shrink-0 ${
            isDark
              ? "bg-[#0e1721] border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-white shadow-md shadow-gray-900/50"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-sm"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
