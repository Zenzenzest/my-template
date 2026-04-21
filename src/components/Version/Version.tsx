import { useState } from "react";

import VersionLogs from "../../assets/versions.json";
import VersionModal from "./Version_modal";

export default function Version() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Automatically grab the latest version number (newest is at the bottom of JSON)
  const latestVersion =
    VersionLogs.length > 0
      ? VersionLogs[VersionLogs.length - 1].version
      : "v1.0.0";

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-cyan-500 transition-colors py-2 cursor-pointer"
      >
        {latestVersion}
      </button>

      <VersionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
