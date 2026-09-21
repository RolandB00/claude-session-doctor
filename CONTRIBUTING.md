# Contributing

Thanks for considering a contribution.

## Good contributions

Useful additions include:

- new error signatures with reproducible examples
- clearer remediation steps
- false-positive reductions
- tests for provider/client error variants
- documentation improvements

## Development

Requires Node.js 20+.

```bash
git clone https://github.com/RolandB00/claude-session-doctor.git
cd claude-session-doctor
npm install
npm test
```

## Adding a diagnostic rule

1. Add the rule to `src/rules.js`.
2. Keep patterns as specific as practical.
3. Add at least one test in `test/analyzer.test.js`.
4. Avoid including credentials, private URLs or proprietary logs in tests.
5. Describe what the rule detects in your pull request.

## Pull requests

Please keep PRs focused and explain:

- the error being detected or behavior being changed
- a sanitized example
- why the suggested remediation is appropriate

## Security and privacy

Logs can contain API keys, tokens, local paths and private project information. Always sanitize examples before opening an issue or pull request.
