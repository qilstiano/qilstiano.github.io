# Brainfart — Ghost theme

A flat, monospace **ASCII / terminal** blog theme for [Ghost](https://ghost.org).
Two-tone by design: dark mode is **white on black with a yellow accent**, light
mode is **black on white with a blue accent**. Uppercase mono type, inverted
heading bars, and ASCII rule dividers throughout.

## Features

- Flat two-tone ASCII aesthetic, monospace everywhere (Geist Mono)
- **Light + dark mode** with a title-bar toggle; defaults to dark, remembers your choice
- `p3-logo.png` as favicon and title-bar logo (white art, auto-inverted in light mode)
- **Search** via Ghost's built-in search (title-bar icon + a search bar on the feed)
- **Highlight section**: the most recent post is featured, the rest follow as an ASCII list
- Single post + static page templates with full content styling (code, quotes, tables, lists)
- Members subscribe form, comments (when enabled), pagination, error page

## Requirements

- Ghost `>= 5.0.0` (validated against Ghost 6.x)

## Install

1. Zip the **contents** of `ghost-theme/` so `package.json` is at the zip root
   (the provided `brainfart.zip` is already built this way):

   ```powershell
   Compress-Archive -Path ghost-theme/* -DestinationPath brainfart.zip -Force
   ```

2. Ghost Admin → **Settings → Design → Change theme → Upload theme**, then activate.

## Color scheme

Defaults to **dark** (white on black, yellow accent). The sun/moon button in the
title bar toggles to **light** (black on white, blue accent). The choice is stored
in `localStorage` and applied inline in `<head>` so there's no flash.

Palettes are CSS variables at the top of `assets/css/screen.css`
(`[data-theme="dark"]` / `[data-theme="light"]`): `--bg`, `--text`, `--accent`,
`--accent-ink`, and `--logo-invert`.

## Search & navigation

Search uses Ghost's built-in search (Sodo Search), injected via
`{{ghost_head}}`/`{{ghost_foot}}`. The menubar and tab nav are driven by your
site's **primary navigation** (Settings → Navigation).

## License

MIT.
