import { RULES, SEVERITY_ORDER } from "./rules.js";

export function analyzeLog(input) {
  const text = String(input ?? "");
  const lines = text.split(/\r?\n/);
  const diagnostics = [];

  for (const rule of RULES) {
    const matchedLines = [];

    for (const line of lines) {
      if (rule.patterns.some((pattern) => pattern.test(line))) {
        matchedLines.push(line.trim());
      }
    }

    if (matchedLines.length > 0) {
      diagnostics.push({
        id: rule.id,
        severity: rule.severity,
        summary: rule.summary,
        actions: rule.actions,
        matches: [...new Set(matchedLines)].slice(0, 5)
      });
    }
  }

  diagnostics.sort(
    (a, b) => SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity]
  );

  return {
    diagnostics,
    count: diagnostics.length,
    highestSeverity: diagnostics[0]?.severity ?? null
  };
}
