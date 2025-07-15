#!/usr/bin/env -S just --justfile

default:
  @just --list

start:
    go run server/main.go
