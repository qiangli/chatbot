#!/usr/bin/env -S just --justfile

default:
  @just --list

install:
    pnpm install

build: tidy
    pnpm build

tidy:
    pnpm lint

start:
    pnpm run dev
