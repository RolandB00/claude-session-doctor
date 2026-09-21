# Claude Session Doctor

A small open-source CLI that turns common AI coding-agent and provider error logs into actionable diagnostics.

It is useful when a long-running coding session fails with messages such as:

- `429 Too Many Requests`
- `503 Service temporarily unavailable`
- `all targets were skipped by pre-dispatch filters`
- timeouts and connection failures
- authentication or quota errors
- context-window / token-limit errors

The tool is deliberately simple: it reads a log, matches known failure patterns, and explains the likely category and practical next steps.

> **Unofficial community project.** This project is not affiliated with or endorsed by Anthropic.

## Why this exists

AI coding workflows increasingly depend on several moving parts: a coding agent, one or more model providers, local model servers, API gateways, network connections, and account limits. When something fails, the raw error is often much less useful than a short diagnosis.

Claude Session Doctor provides a transparent, local-first first pass. It does **not** upload logs anywhere and has no telemetry.

## Quick start

Requires Node.js 20+.

```bash
git clone https://github.com/RolandB00/claude-session-doctor.git
cd claude-session-doctor
npm install
npm test
```

Analyze a file:

```bash
node src/cli.js ./session.log
```

Pipe a log into it:

```bash
cat session.log | node src/cli.js
```

JSON output:

```bash
node src/cli.js ./session.log --json
```

## Example

Input:

```text
503 Service temporarily unavailable: all targets were skipped by pre-dispatch filters
```

Output:

```text
[HIGH] PROVIDER_UNAVAILABLE
The request reached a provider/router, but no target was available.

Try:
- Retry after a short delay.
- Check provider status and model availability.
- Verify that configured fallback targets are enabled and eligible.
- If a router is in front of the provider, inspect its filtering/routing rules.
```

## What it detects

Current rules cover:

- rate limiting
- provider/service unavailability
- overloaded services
- authentication failures
- exhausted quota / credits
- request timeouts
- refused network connections
- DNS failures
- context-window / token-limit failures
- local Ollama connection failures

Rules live in `src/rules.js` and are intentionally easy to extend.

## Privacy

Everything runs locally. The CLI sends no network requests and includes no telemetry.

Logs may contain API keys, tokens, file paths, or other sensitive data. Review logs before posting them publicly in issues.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
