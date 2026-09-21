#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import process from "node:process";
import { analyzeLog } from "./analyzer.js";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  printHelp();
  process.exit(0);
}

if (args.includes("--version") || args.includes("-v")) {
  console.log("0.1.0");
  process.exit(0);
}

const json = args.includes("--json");
const fileArg = args.find((arg) => !arg.startsWith("-"));

try {
  const input = fileArg ? await readFile(fileArg, "utf8") : await readStdin();

  if (!input.trim()) {
    console.error("No log input received. Pass a file path or pipe log text via stdin.");
    printHelp();
    process.exit(1);
  }

  const report = analyzeLog(input);

  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    renderText(report);
  }
} catch (error) {
  console.error(`session-doctor: ${error.message}`);
  process.exit(1);
}

function renderText(report) {
  if (report.count === 0) {
    console.log("No known failure pattern detected.");
    console.log("The log may describe an application-specific or currently unsupported error.");
    return;
  }

  console.log(`Found ${report.count} diagnostic${report.count === 1 ? "" : "s"}.\n`);

  for (const item of report.diagnostics) {
    console.log(`[${item.severity.toUpperCase()}] ${item.id}`);
    console.log(item.summary);

    if (item.matches.length > 0) {
      console.log("\nMatched:");
      for (const match of item.matches) {
        console.log(`  ${truncate(match, 180)}`);
      }
    }

    console.log("\nTry:");
    for (const action of item.actions) {
      console.log(`- ${action}`);
    }
    console.log("");
  }
}

async function readStdin() {
  if (process.stdin.isTTY) return "";

  process.stdin.setEncoding("utf8");
  let data = "";
  for await (const chunk of process.stdin) {
    data += chunk;
  }
  return data;
}

function truncate(value, max) {
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}

function printHelp() {
  console.log(`Claude Session Doctor

Usage:
  session-doctor <log-file>
  cat session.log | session-doctor
  session-doctor <log-file> --json

Options:
  --json       Machine-readable JSON output
  -h, --help   Show this help
  -v, --version Show version
`);
}
