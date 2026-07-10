#!/bin/sh
# Coolify mounts the persistent volume at /app/data root-owned. Start as root
# only to make it writable by the unprivileged node user, then drop privileges.
set -e

mkdir -p /app/data
chown -R node:node /app/data 2>/dev/null || true

exec gosu node "$@"
