import { useState, useEffect } from "react";

import localVersionHistory from "../assets/versions.json";
import { DataContext } from "../context/Data";
import { logger } from "../utils/logger";
import { ToastUpdate } from "../components/Toast/Updater";

const compareVersions = (v1: string, v2: string): number => {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }

  return 0;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);

  
  const totalFiles = 0;
  const progressIncrement = 100 / totalFiles;

  // `https://raw.githubusercontent.com/Zenzenzest/{repo}/refs/heads/{branch}/`
  const githubBase =
    "";

  // Fetch the latest commit hash
  const getLatestCommitHash = async (): Promise<string | null> => {
    try {
      // `https://api.github.com/repos/Zenzenzest/{repo}/commits/{branch}`
      const res = await fetch(
        "",
        { headers: { Accept: "application/vnd.github.v3+json" } }
      );
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data = await res.json();
      return data.sha || null;
    } catch (err) {
      logger.warn("Failed to get latest commit hash:", err);
      return null;
    }
  };
  const handleUpdate = () => {
    window.location.reload();
  };

  const checkForVersionUpdate = (fetchedLatestVersion: string) => {
    if (!fetchedLatestVersion) {
      logger.info("No fetched version found");
      return;
    }

    const localVersionHistoryArray = localVersionHistory as {
      version: string;
    }[];

    if (!localVersionHistoryArray || localVersionHistoryArray.length === 0) {
      logger.info("No local version history");
      return;
    }

    const localLatestVersion =
      localVersionHistoryArray[localVersionHistoryArray.length - 1].version;

    logger.info("Version comparison:", {
      fetched: fetchedLatestVersion,
      local: localLatestVersion,
    });

    const versionComparison = compareVersions(
      fetchedLatestVersion,
      localLatestVersion
    );

    if (versionComparison > 0) {
      logger.info("New version available! Showing notification.");
      setShowUpdateNotification(true);
      setLatestVersion(fetchedLatestVersion);
    } else {
      logger.info("App is up to date");
    }
  };

  // Function to check for updates from GitHub
  const checkForUpdates = async () => {
    try {
      logger.info("Checking for updates...");

      const commitHash = await getLatestCommitHash();

      // Fetch the plain text version file
      const jsdelivrUrl = commitHash
      // `https://cdn.jsdelivr.net/gh/Zenzenzest/{repo}@${commitHash}/app_ver.txt`
        ? ``
        // `https://cdn.jsdelivr.net/gh/Zenzenzest/{repo}@{branch}/app_ver.txt`
        : ``;

      const cacheBustedUrl = `${jsdelivrUrl}?t=${Date.now()}`;

      const res = await fetch(cacheBustedUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Parse as plain text and trim any whitespace/newlines
      const fetchedVersion = (await res.text()).trim();

      checkForVersionUpdate(fetchedVersion);
    } catch (err) {
      logger.warn("Failed to check for updates:", err);
    }
  };

  const contextValue = {
    // additional states here
    loading,
    error,
    loadingProgress,
    showUpdateNotification,
    latestVersion,
    handleUpdate,
    checkForUpdates,
  };

  useEffect(() => {
    const fetchWithFallback = async (
      path: string,
      commitHash: string | null
    ) => {
      const jsdelivrUrl = commitHash
      // `https://cdn.jsdelivr.net/gh/Zenzenzest/{repo}@${commitHash}/${path}`
        ? ``
        // `https://cdn.jsdelivr.net/gh/Zenzenzest/{repo}@{branch}/${path}`
        : ``;

      const urls = [jsdelivrUrl, `${githubBase}${path}`];

      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          logger.warn(`Failed to fetch ${url}:`, err);
        }
      }
      throw new Error(`All sources failed for ${path}`);
    };

    const fetchWithProgress = async (
      path: string,
      commitHash: string | null
    ) => {
      const data = await fetchWithFallback(path, commitHash);
      setLoadingProgress((prev) => Math.min(prev + progressIncrement, 100));
      return data;
    };

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setLoadingProgress(0);

        // Get latest commit hash
        const commitHash = await getLatestCommitHash();

        const [
          // somethingData
        ] = await Promise.all([
          // fetchWithProgress("file.json", commitHash),
      
        ]);
        // setState(somethingData)
        setError(null);
        setLoadingProgress(100);
      } catch (err) {
        logger.error("Error fetching data:", err);
        setError("Failed to load data from all sources.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [progressIncrement]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
      {/* TOAST */}
      <UpdateNotification
        show={showUpdateNotification}
        version={latestVersion}
        onUpdate={handleUpdate}
      />
    </DataContext.Provider>
  );
};

//TOAST
interface UpdateNotificationProps {
  show: boolean;
  version: string | null;
  onUpdate: () => void;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  show,
  onUpdate,
}) => {
  if (!show) return null;
  return <ToastUpdate onUpdate={onUpdate} />
};
