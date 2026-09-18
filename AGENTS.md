# Git coordination for Codex tasks

This repository has one release line: `main` tracking `origin/main`.

## Non-negotiable rules

1. Never edit, commit, merge, rebase, or push directly on `main` during a task.
2. Every implementation task must use its own `codex/<task-slug>` branch and a separate worktree. Create it with:

   ```bash
   scripts/new-codex-worktree.sh <task-slug>
   ```

3. Do not start a second task in an existing task's worktree.
4. A task finishes by committing its own branch and reporting the commit hash. It does not merge or push `main`.
5. Only a single, explicitly designated release task may integrate completed work, after all implementation tasks are idle.
6. The release task must fetch `origin/main`, inspect the candidate commits, test the combined result, then merge and push once.
7. Direct `main` commits and pushes are blocked by local Git hooks. A deliberate release uses `OCC_RELEASE=1` for the final commit and push.
8. Never use force-push, `git reset --hard`, or delete another task's branch/worktree without explicit approval.

## Release checklist

1. Confirm no implementation task is active and every worktree is clean.
2. Update the release checkout from `origin/main`.
3. Review each candidate commit; integrate only approved work.
4. Run relevant tests and inspect `git status --short --branch`.
5. Commit and push with the explicit release override:

   ```bash
   OCC_RELEASE=1 git commit -m "..."
   OCC_RELEASE=1 git push origin main
   ```

6. Record the resulting `origin/main` commit before starting the next task.
