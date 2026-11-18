#!/bin/sh
set -eu
umask 077
mkdir -p backups
destination="backups/athar-$(date -u +%Y%m%d-%H%M%S).dump"
temporary="${destination}.tmp"
trap 'rm -f "$temporary"' EXIT HUP INT TERM
docker compose exec -T db pg_dump -U athar -d athar --format=custom > "$temporary"
mv "$temporary" "$destination"
printf '%s\n' "$destination"
