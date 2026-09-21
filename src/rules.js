export const RULES = [
  {
    id: "OLLAMA_UNAVAILABLE",
    severity: "high",
    patterns: [
      /ollama.*(?:ECONNREFUSED|connection refused|failed to connect)/i,
      /(?:ECONNREFUSED|connection refused|failed to connect).*ollama/i
    ],
    summary: "A local Ollama endpoint appears to be unreachable.",
    actions: [
      "Check whether Ollama is running.",
      "Verify the configured host and port.",
      "Run `ollama list` to confirm the local service responds.",
      "If Ollama runs remotely, check firewall and network access."
    ]
  },
  {
    id: "PROVIDER_UNAVAILABLE",
    severity: "high",
    patterns: [
      /\b503\b/i,
      /service temporarily unavailable/i,
      /all targets were skipped/i,
      /pre-dispatch filters/i,
      /no (?:healthy|available|eligible) (?:target|provider|endpoint)/i
    ],
    summary: "The request reached a provider/router, but no target was available.",
    actions: [
      "Retry after a short delay.",
      "Check provider status and model availability.",
      "Verify that configured fallback targets are enabled and eligible.",
      "If a router is in front of the provider, inspect its filtering/routing rules."
    ]
  },
  {
    id: "RATE_LIMIT",
    severity: "medium",
    patterns: [
      /\b429\b/i,
      /too many requests/i,
      /rate[ -]?limit(?:ed|ing)?/i
    ],
    summary: "The provider is rate-limiting requests.",
    actions: [
      "Wait before retrying and use exponential backoff.",
      "Reduce request concurrency.",
      "Check account or organization rate limits.",
      "Use an eligible fallback model/provider if your setup supports it."
    ]
  },
  {
    id: "OVERLOADED",
    severity: "medium",
    patterns: [
      /\b529\b/i,
      /overloaded/i,
      /capacity temporarily unavailable/i
    ],
    summary: "The upstream model service appears overloaded.",
    actions: [
      "Retry with backoff rather than immediately looping.",
      "Check the provider status page.",
      "Temporarily switch to another eligible model if appropriate."
    ]
  },
  {
    id: "AUTHENTICATION",
    severity: "high",
    patterns: [
      /\b401\b/i,
      /unauthorized/i,
      /authentication failed/i,
      /invalid (?:api )?key/i,
      /invalid token/i
    ],
    summary: "Authentication credentials were rejected or are missing.",
    actions: [
      "Verify the API key or access token used by the current process.",
      "Check that the credential belongs to the expected provider/account.",
      "Confirm the credential has not expired or been revoked.",
      "Do not paste credentials into public bug reports."
    ]
  },
  {
    id: "ACCESS_DENIED",
    severity: "high",
    patterns: [
      /\b403\b/i,
      /forbidden/i,
      /permission denied/i,
      /not authorized to use/i
    ],
    summary: "The request is authenticated but appears not to have access.",
    actions: [
      "Check model, project and organization permissions.",
      "Verify that the requested model is enabled for the account.",
      "Confirm endpoint and region restrictions where applicable."
    ]
  },
  {
    id: "QUOTA_EXHAUSTED",
    severity: "high",
    patterns: [
      /quota exceeded/i,
      /insufficient (?:credits|funds)/i,
      /credit balance/i,
      /billing limit/i,
      /usage limit exceeded/i
    ],
    summary: "The account may have exhausted a usage, credit or billing limit.",
    actions: [
      "Check provider usage and billing limits.",
      "Confirm the correct account/project is being used.",
      "Avoid repeated retries until quota is available again."
    ]
  },
  {
    id: "REQUEST_TIMEOUT",
    severity: "medium",
    patterns: [
      /ETIMEDOUT/i,
      /timed out/i,
      /request timeout/i,
      /timeout after/i
    ],
    summary: "The request exceeded a timeout before completing.",
    actions: [
      "Retry once with backoff.",
      "Check network stability and provider status.",
      "If supported, increase the client timeout for genuinely long requests.",
      "Reduce extremely large requests when possible."
    ]
  },
  {
    id: "CONNECTION_REFUSED",
    severity: "high",
    patterns: [
      /ECONNREFUSED/i,
      /connection refused/i,
      /failed to connect/i
    ],
    summary: "A configured endpoint refused the network connection.",
    actions: [
      "Confirm the target service is running.",
      "Verify host, port and protocol.",
      "Check local firewall, VPN or proxy configuration."
    ]
  },
  {
    id: "DNS_FAILURE",
    severity: "high",
    patterns: [
      /ENOTFOUND/i,
      /EAI_AGAIN/i,
      /DNS lookup failed/i,
      /could not resolve host/i
    ],
    summary: "The endpoint hostname could not be resolved reliably.",
    actions: [
      "Check the endpoint hostname for typos.",
      "Verify DNS and internet connectivity.",
      "Check VPN, proxy or custom DNS settings."
    ]
  },
  {
    id: "CONTEXT_LIMIT",
    severity: "medium",
    patterns: [
      /context window/i,
      /context length/i,
      /maximum context/i,
      /too many tokens/i,
      /token limit/i,
      /prompt is too long/i
    ],
    summary: "The request appears to exceed the model's context/token limit.",
    actions: [
      "Start a fresh or compacted session.",
      "Reduce attached logs/files and repeated context.",
      "Split the task into smaller steps.",
      "Verify the context limit of the selected model."
    ]
  },
  {
    id: "MODEL_NOT_AVAILABLE",
    severity: "high",
    patterns: [
      /model not found/i,
      /unknown model/i,
      /model .* not available/i,
      /does not have access to model/i
    ],
    summary: "The configured model name is invalid or unavailable to the account.",
    actions: [
      "Verify the exact model identifier.",
      "Check whether the account has access to that model.",
      "Update stale aliases or routing configuration."
    ]
  }
];

export const SEVERITY_ORDER = {
  low: 1,
  medium: 2,
  high: 3
};
