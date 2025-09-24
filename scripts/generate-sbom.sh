#!/usr/bin/env bash
set -euo pipefail
IMG="${1:-}"
if [[ -z "$IMG" ]]; then
  echo "usage: $0 ghcr.io/owner/repo:tag" >&2
  exit 1
fi
# Install syft if missing
if ! command -v syft >/dev/null 2>&1; then
  curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin
fi
syft "$IMG" -o spdx-json > sbom.spdx.json
echo "SBOM written to sbom.spdx.json"
