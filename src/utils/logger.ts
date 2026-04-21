/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// I keep forgetting to remove console.logs when pushing
const isDev = import.meta.env.DEV;

type LogLevel = "log" | "warn" | "error" | "info" | "debug";

class Logger {
  private isDev: boolean;
  constructor(isDev: boolean) {
    this.isDev = isDev;
  }

  private write(level: LogLevel, ...args: any[]) {
    if (this.isDev) {
      console[level](...args);
    } else if (level === "error") {
      console.error(...args);
    }
  }

  log(...args: any[]) {
    this.write("log", ...args);
  }

  warn(...args: any[]) {
    this.write("warn", ...args);
  }

  error(...args: any[]) {
    this.write("error", ...args);
  }

  info(...args: any[]) {
    this.write("info", ...args);
  }

  debug(...args: any[]) {
    this.write("debug", ...args);
  }
}

export const logger = new Logger(isDev);
