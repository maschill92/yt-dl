# oclif-hello-world

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [oclif-hello-world](#oclif-hello-world)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g yt-dl
$ yt-dl COMMAND
running command...
$ yt-dl (--version)
yt-dl/0.0.0 win32-x64 node-v16.13.2
$ yt-dl --help [COMMAND]
USAGE
  $ yt-dl COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`yt-dl help [COMMAND]`](#yt-dl-help-command)
* [`yt-dl playlist [ID]`](#yt-dl-playlist-id)

## `yt-dl help [COMMAND]`

Display help for yt-dl.

```
USAGE
  $ yt-dl help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for yt-dl.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `yt-dl playlist [ID]`

Download all the videos in a youtube playlist.

```
USAGE
  $ yt-dl playlist [ID] [-f <value>]

ARGUMENTS
  ID  ID or link to a YouTube playlist

FLAGS
  -f, --file=<value>  [default: <$ title $>.mp3] File name template for each video in the playlist. Template properties
                      are 'id', 'title', 'author' 'playlist', and 'playlistId'. Note that you must supply an extension.
                      The application will do it's best to convert to the request format.

DESCRIPTION
  Download all the videos in a youtube playlist.

EXAMPLES
  $ yt-dl playlist https://www.youtube.com/playlist?list=PL062A00534D28BD25

  $ yt-dl playlist PLi9drqWffJ9FWBo7ZVOiaVy0UQQEm4IbP -f '<$= author $>-<$= title $>.mp3'
```

_See code: [dist/commands/playlist.ts](https://github.com/maschill92/yt-dl/blob/v0.0.0/dist/commands/playlist.ts)_
<!-- commandsstop -->
