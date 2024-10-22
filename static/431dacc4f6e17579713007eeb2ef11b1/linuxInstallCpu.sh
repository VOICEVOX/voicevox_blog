#!/usr/bin/env bash

## ファイルの内容
# このファイルはLinux用のVOICEVOXインストールスクリプトです。
# 実行権限を与えてからこのファイルをダブルクリックするか、後述の方法を使ってターミナルで実行してください。

## ダブルクリックでインストールを実行する方法
# 1. このファイルを閉じる
# 2. ローンチ左上の「ファイル」→「設定」→「動作」→「実行可能なテキストファイル」を「どうするか確認する」にする
# 3. ファイルを右クリック→「プロパティ」→「アクセス権」→「プログラムとして実行可能」にチェックを入れる
# 4. ファイルをタブルクリックする

## ターミナルでインストールを実行する
# 1. ターミナルを起動する
# 2. 次のように入力して実行する
#    chmod +x [ファイル名].sh
#    ./[ファイル名].sh

set -euo pipefail

if ! command -v curl &>/dev/null; then
    cat <<'EOS'
* curl コマンドが見つかりません。

以下のコマンドを実行してください。

Ubuntu/Debian:
    sudo apt install curl

CentOS/Fedora:
    sudo dnf install curl
もしくは
    sudo yum install curl
EOS
    sleep 365d
    exit 1
fi

curl -fsSL https://raw.githubusercontent.com/VOICEVOX/voicevox/0.21.0/build/installer_linux.sh >tmp_voicevox_installer.sh
VERSION=0.21.0 NAME=linux-cpu-appimage bash tmp_voicevox_installer.sh
rm tmp_voicevox_installer.sh
