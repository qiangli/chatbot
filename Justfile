#!/usr/bin/env -S just --justfile

default:
  @just --list

install:
    pnpm install

build: tidy
    pnpm build

build-web: tidy
    pnpm build:web

build-ext: tidy
    pnpm build:ext

tidy:
    pnpm lint
    pnpm format

clean:
    rm -rf dist/*
    rm -rf extension/chrome/sidepanel/dist/*

start:
    #pnpm run dev
    go run server/main.go
