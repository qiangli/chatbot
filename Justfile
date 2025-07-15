#!/usr/bin/env -S just --justfile

default:
  @just --list

install:
    pnpm install

build: tidy
    pnpm build

build-web: tidy
    pnpm build:web

build-chrome: tidy
    pnpm build:chrome

build-vscode: tidy
    pnpm build:vscode

tidy:
    pnpm lint
    pnpm format

clean:
    rm -rf dist/*
    rm -rf extension/chrome/sidepanel/dist/*

start:
    #pnpm run dev
    go run server/main.go
