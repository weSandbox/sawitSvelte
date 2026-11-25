# Taste

## Workflow

- Wants to review and approve a proposed architecture/plan before any implementation begins, delivered in incremental phases rather than one big pass; expects architectural decisions written down (ADRs / architecture doc) with trade-offs stated before hard-to-reverse choices are made. Confidence: 0.75
- Prefers minimal dependencies and no unnecessary abstraction layers — build on platform/framework primitives and own the implementation rather than wrapping or adopting a third-party library for the core. Confidence: 0.65
- Wants fixes scoped tightly to the reported problem: run the real build/test, fix only errors directly related to it, and leave unrelated files alone — no speculative investigation, simulated reproductions, or probing of hypothetical failure modes unless asked. Confidence: 0.6
- Retains control of version-control actions: wants changes left uncommitted and unpushed until explicitly asked, and states this up front as a standing rule rather than a per-task detail. Confidence: 0.7

## Communication

- Wants terse, results-oriented reporting at the end of a task — files changed, build/test outcome, and remaining manual steps — rather than a narrative of the work. Confidence: 0.65
