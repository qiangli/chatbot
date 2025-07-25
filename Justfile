#!/usr/bin/env -S just --justfile

ADDRESS := env_var("ADDRESS")

default:
  @just --list

start:
    go run server/main.go --address={{ADDRESS}}
