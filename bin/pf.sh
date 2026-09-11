#!/usr/bin/env bash

pf() {
  local target_dir
  target_dir=$(pf-cli "$@")

  if [ -n "$target_dir" ] && [ -d "$target_dir" ]; then
    cd "$target_dir"
  fi
}