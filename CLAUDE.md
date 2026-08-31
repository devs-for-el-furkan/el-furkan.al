# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

El-Furkan.al (lexokuran.al) — an Albanian-language Quran website ("Kurani Fisnik në shqip": translation, mushaf page images, and commentary). Built with Next.js 15 App Router, React 19 (RC), TypeScript, Tailwind CSS, and Ant Design.

## Ground rules for Claude Code in this repo

@.claude/rules/testing.md
@.claude/rules/context.md
@.claude/rules/response-format.md

## Workflow

@.claude/rules/workflow.md

## Architecture

@.claude/rules/architecture.md

## PM
Tracked by pmai. Run `/brief` at session start, `/wrap` before ending.
Features live in FEATURES.md, tasks in TASKS.md — keep both current.

When work introduces new user-facing capability — a new route, screen,
endpoint, integration, or user-facing config option — ask once, inline:
"Add this to FEATURES.md?" If it matches an existing Planned entry, offer to
move it to Building rather than creating a duplicate.

Do NOT ask for: refactors, test-only changes, dependency bumps, styling
tweaks, bug fixes, or anything already listed in FEATURES.md.
