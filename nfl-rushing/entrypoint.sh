#!/bin/bash

set -e

rm -f /ClubReady/tmp/pids/server.pid

exec "$@"