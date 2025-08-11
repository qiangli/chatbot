#!/usr/bin/env -S just --justfile

ADDR := env_var_or_default("ADDR", ":8080")

default:
  @just --list

start:
    go run server/main.go --address={{ADDR}}
