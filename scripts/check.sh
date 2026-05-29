#!/usr/bin/env bash
# Type-check wrapper. In a non-interactive shell `node`/`npm` aren't available
# as commands (they're zsh profile functions), so put the nvm install on PATH
# and run vue-tsc via the project's `check` script. Run as: bash scripts/check.sh
set -e
export PATH="$HOME/.nvm/versions/node/v22.22.2/bin:$PATH"
exec npm run check
