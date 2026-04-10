# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## アーキテクチャ

### 技術スタック

- **フレームワーク**: Astro 5・React 19
- **スタイリング**: Tailwind CSS v4 + Radix UI
- **状態管理**: nanostores
- **テスト**: Playwright（E2E、VRT）

### ディレクトリ構造

- `src/pages/`: ページコンポーネント
- `src/components/`: 再利用可能なコンポーネント
- `src/constants/`: 定数定義、キャラクター情報
- `src/store/`: nanostoresによるグローバル状態
- `src/assets/`: 静的アセット
- `tests/e2e/`: Playwrightテスト

## コマンド

`README.md`

## コーディング規約

`docs/コーディング規約.md`

## デザインルール

`docs/デザインルール.md`
