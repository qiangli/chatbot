#!/usr/bin/env -S just --justfile

default:
  @just --list

install:
    pnpm install

build: tidy
    pnpm build

tidy:
    pnpm lint
    pnpm format

start:
    #pnpm run dev
    go run server/main.go
