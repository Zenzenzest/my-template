module.exports = {
  git: {
    commitMessage: "chore(release): v${version}",
    tagName: "v${version}",
    requireCleanWorkingDir: true,
  },
  npm: {
    publish: false,
  },
  github: {
    release: false,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: {
        name: "conventionalcommits",
        types: [
          { type: "fix", section: "Bug Fixes" },
          { type: "feature", section: "Features" },
          { type: "major", section: "Major Changes" },
          { type: "overhaul", section: "System Overhauls" },
          // Hide ignored commits from the changelog
          { type: "chore", hidden: true },
          { type: "no-release", hidden: true }
        ],
      },
      infile: "CHANGELOG.md",
      whatBump: (commits) => {
        let level = null; 

        commits.forEach((commit) => {
          // 1. Major bump
          if (
            commit.type === "major" ||
            commit.type === "overhaul" ||
            commit.notes.length > 0
          ) {
            level = 0;
          } 
          // 2. Minor bump
          else if (commit.type === "feature") {
            if (level === null || level === 2) {
              level = 1;
            }
          } 
          // 3. Ignored commits (Leave level as null)
          else if (commit.type === "chore" || commit.type === "no-release") {
            // Do nothing
          } 
          // 4. Patch bump (fix, refactor, style, etc.)
          else {
            if (level === null) {
              level = 2;
            }
          }
        });

        return { level };
      },
    },
  },
};module.exports = {
  git: {
    commitMessage: "chore(release): v${version}",
    tagName: "v${version}",
    requireCleanWorkingDir: true,
  },
  npm: {
    publish: false,
  },
  github: {
    release: false,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: {
        name: "conventionalcommits",
        types: [
          { type: "fix", section: "Bug Fixes" },
          { type: "feature", section: "Features" },
          { type: "major", section: "Major Changes" },
          { type: "overhaul", section: "System Overhauls" },
          // Hide ignored commits from the changelog
          { type: "chore", hidden: true },
          { type: "no-release", hidden: true }
        ],
      },
      infile: "CHANGELOG.md",
      whatBump: (commits) => {
        let level = null; // Default to NO bump instead of Patch

        commits.forEach((commit) => {
          //Major bump
          if (
            commit.type === "major" ||
            commit.type === "overhaul" ||
            commit.notes.length > 0
          ) {
            level = 0;
          } 
          // Minor bump
          else if (commit.type === "feature") {
            if (level === null || level === 2) {
              level = 1;
            }
          } 
          // Ignored commits (Leave level as null)
          else if (commit.type === "chore" || commit.type === "no-release") {
            // Do nothing
          } 
          // 4. Patch bump (fix, refactor, style, etc.)
          else {
            if (level === null) {
              level = 2;
            }
          }
        });

        return { level };
      },
    },
  },
};
