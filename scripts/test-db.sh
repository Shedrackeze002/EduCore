#!/usr/bin/env bash
# Runs the database tests against a throwaway database on a PostgreSQL 15+ server.
# Connection settings come from the standard libpq variables, for example:
#   PGHOST=localhost PGPORT=5432 PGUSER=postgres PGPASSWORD=postgres scripts/test-db.sh
set -euo pipefail
cd "$(dirname "$0")/.."
DB="educore_test_$$"
psql -d postgres -q -c "create database $DB"
trap 'psql -d postgres -q -c "drop database if exists $DB" >/dev/null' EXIT
psql -d "$DB" -q -v ON_ERROR_STOP=1 -f supabase/tests/00_supabase_stub.sql
for f in supabase/migrations/*.sql; do
  psql -d "$DB" -q -v ON_ERROR_STOP=1 -f "$f" 2>&1 | { grep -v NOTICE || true; }
done
out=$(psql -d "$DB" -q -t -A -v ON_ERROR_STOP=1 -f supabase/tests/10_policies_test.sql 2>&1) || { echo "$out" | grep -E "ERROR|ASSERT|psql:" ; echo "Database tests failed"; exit 1; }
echo "$out" | grep "PASSED"
