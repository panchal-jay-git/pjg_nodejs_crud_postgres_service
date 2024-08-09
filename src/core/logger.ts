import { createLogger, transports, format } from "winston";
import fs from "fs";
import path from "path";
import DailyRotateFile, {
  DailyRotateFileTransportOptions,
} from "winston-daily-rotate-file";
import { logDirectory } from "../config";
import { isObject } from "lodash";

const { SPLAT } = require("triple-beam");
let dir = logDirectory;
if (!dir) dir = path.resolve("logs");

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

const logLevel = "debug";

const options = {
  file: {
    level: logLevel,
    filename: dir + "/%DATE%.log",
    datePattern: "YYYY-MM-DDTHH",
    zippedArchive: false,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    maxSize: "20m",
    colorize: true,
    maxFiles: "30d",
  },
};

function formatObject(param: string) {
  if (isObject(param)) {
    return JSON.stringify(param);
  }
  return param;
}

// Ignore log messages if they have { private: true }
const all = format((info) => {
  const splat = info[SPLAT] || [];
  const message = formatObject(info.message);
  const rest = splat.map(formatObject).join(" ");
  info.message = `${message} ${rest}`;
  return info;
});

const dailyRotateFileTransportOptions: DailyRotateFileTransportOptions = {
  level: logLevel,
  filename: dir + "/Timesheet-%DATE%.log",
  datePattern: "YYYY-MM-DDTHH",
  zippedArchive: false,

  handleExceptions: true,
  maxSize: "20m",
  maxFiles: "30d",
  format: format.combine(
    all(),
    format.timestamp(),
    format.colorize(),
    format.align(),
    format.printf(
      (info) =>
        `${info.timestamp} [${info.level}: ${formatObject(info.message)}`
    )
    //   format.json()
  ),
};

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.prettyPrint()
      ),
    }),
    new transports.DailyRotateFile(dailyRotateFileTransportOptions),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on handled exceptions
});
// trigger reanalysis
