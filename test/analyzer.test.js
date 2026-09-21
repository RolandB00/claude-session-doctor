import test from "node:test";
import assert from "node:assert/strict";
import { analyzeLog } from "../src/analyzer.js";

test("detects provider unavailable / pre-dispatch failure", () => {
  const report = analyzeLog(
    "503 Service temporarily unavailable: all targets were skipped by pre-dispatch filters"
  );

  assert.equal(report.count >= 1, true);
  assert.equal(
    report.diagnostics.some((item) => item.id === "PROVIDER_UNAVAILABLE"),
    true
  );
});

test("detects rate limiting", () => {
  const report = analyzeLog("HTTP 429 Too Many Requests: rate limit exceeded");

  assert.equal(
    report.diagnostics.some((item) => item.id === "RATE_LIMIT"),
    true
  );
});

test("detects context limit", () => {
  const report = analyzeLog(
    "Request rejected because the prompt is too long for the context window"
  );

  assert.equal(
    report.diagnostics.some((item) => item.id === "CONTEXT_LIMIT"),
    true
  );
});

test("detects local Ollama connection failures", () => {
  const report = analyzeLog(
    "ollama request failed: connect ECONNREFUSED 127.0.0.1:11434"
  );

  assert.equal(
    report.diagnostics.some((item) => item.id === "OLLAMA_UNAVAILABLE"),
    true
  );
});

test("returns an empty result for unrelated text", () => {
  const report = analyzeLog("Build completed successfully.");

  assert.equal(report.count, 0);
  assert.equal(report.highestSeverity, null);
});
