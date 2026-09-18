#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: scripts/new-codex-worktree.sh <task-slug>" >&2
  exit 64
fi

slug="$1"
if [[ ! "$slug" =~ ^[a-z0-9][a-z0-9._-]*$ ]]; then
  echo "Task slug must use lowercase letters, numbers, dots, hyphens, or underscores." >&2
  exit 64
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Refusing to create a task worktree from a dirty checkout. Commit or stash the current work first." >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
branch="codex/$slug"
worktree_path="$repo_root/.worktrees/$slug"

if [[ -e "$worktree_path" ]]; then
  echo "Worktree path already exists: $worktree_path" >&2
  exit 1
fi

git fetch origin main
mkdir -p "$repo_root/.worktrees"

if git show-ref --verify --quiet "refs/heads/$branch"; then
  git worktree add "$worktree_path" "$branch"
else
  git worktree add -b "$branch" "$worktree_path" origin/main
fi

echo "Task worktree ready: $worktree_path"
echo "Branch: $branch"
