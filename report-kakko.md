# Tailwind arbitrary value と数値クラスの整理

## カスタムspacingトークン

| トークン | 値 |
|---|---|
| `2xs` | 4px |
| `xs` | 8px |
| `sm` | 12px |
| `md` | 16px |
| `lg` | 20px |
| `xl` | 24px |
| `2xl` | 32px |
| `3xl` | 48px |
| `4xl` | 80px |

## container幅トークン

| トークン | 値 |
|---|---|
| `3xs` | 256px |
| `2xs` | 288px |
| `xs` | 320px |
| `sm` | 384px |
| `md` | 448px |
| `lg` | 512px |
| `xl` | 576px |
| `2xl` | 672px |
| `3xl` | 768px |
| `4xl` | 896px |
| `5xl` | 1024px |
| `6xl` | 1152px |
| `7xl` | 1280px |

## A. （変更完了済み）arbitrary value → 標準ユーティリティ: 置換可能

| ファイル | 行 | 現在 | 提案 |
|---|---|---|---|
| `src/pages/dev/ui/character-card-dormitory/index.astro` | 28 | `-m-[0.75rem]` | `-m-sm` |
| `src/pages/dormitory/_CharacterCard.astro` | 24 | `border-[3px]` | `border-3` |
| `src/pages/dormitory/[characterId]/_CallBox.astro` | 30,47,64 | `border-[3px]` | `border-3` |
| `src/pages/dormitory/[characterId]/[...descriptionType].astro` | 55 | `border-[3px]` | `border-3` |
| `src/pages/dormitory/[characterId]/[...descriptionType].astro` | 61 | `border-r-[3px]` | `border-r-3` |
| `src/pages/product/[characterId].astro` | 42 | `border-t-[5px]` | `border-t-5` |
| `src/pages/talk/_AudioSample.tsx` | 31,49 | `w-[100px]` | `w-25` |
| `src/pages/product/_TopContainer.astro` | 156 | `w-[200px]` | `w-50` |

## B. arbitrary value → 要判断: ぴったり一致しない

| ファイル | 行 | 現在 | 候補 | spacingトークンに寄せるなら |
|---|---|---|---|---|
| `src/pages/talk/_AudioSample.tsx` | 30,48 | `gap-y-[3px]` | `gap-y-0.5`(2px) / `gap-y-1`(4px) | `gap-y-2xs`(4px) |
| `src/pages/talk/_AudioSample.tsx` | 34,52 | `gap-[3px]` | `gap-0.5`(2px) / `gap-1`(4px) | `gap-2xs`(4px) |
| `src/pages/dormitory/[characterId]/_DescriptionTypeSwitch.astro` | 35 | `border-[1.8px]` | `border-2`(2px) | -- |
| `src/pages/dormitory/[characterId]/_DescriptionTypeSwitch.astro` | 37 | `-ml-[1.8px]` | `-ml-0.5`(2px) | -- |
| `src/pages/dormitory/_CharacterCard.astro` | 37 | `border-t-[2.5px]` | `border-t-2`(2px) / `border-t-3`(3px) | -- |
| `src/pages/dormitory/[characterId]/_CallBox.astro` | 30,47 | `text-[0.8rem]` | `text-xs`(0.75rem) / `text-sm`(0.875rem) | -- |
| `src/pages/dormitory/[characterId]/[...descriptionType].astro` | 93 | `py-[7px]` | `py-1.5`(6px) / `py-2`(8px) | `py-xs`(8px) |
| `src/pages/dormitory/[characterId]/_DescriptionTypeSwitch.astro` | 35 | `px-[19px]` | `px-5`(20px) | `px-lg`(20px) |
| `src/pages/dormitory/[characterId]/_DescriptionTypeSwitch.astro` | 35 | `py-[7px]` | `py-1.5`(6px) / `py-2`(8px) | `py-xs`(8px) |

## C. （変更完了済み）数値クラス → spacingトークン/containerトークンに置換可能

| ファイル | 行 | 現在 | 提案 |
|---|---|---|---|
| `src/components/modal/NemoGuidanceModal.tsx` | 26 | `space-y-4` | `space-y-md` |
| `src/components/modal/download/DownloadModal.tsx` | 220 | `space-y-4` | `space-y-md` |
| `src/components/modal/download/DownloadModal.tsx` | 230,248 | `space-y-2` | `space-y-xs` |
| `src/components/modal/download/DownloadNemoModal.tsx` | 114 | `space-y-4` | `space-y-md` |
| `src/components/modal/download/DownloadNemoModal.tsx` | 124 | `space-y-2` | `space-y-xs` |
| `src/pages/dev/ui/header/index.astro` | 21 | `space-y-4` | `space-y-md` |
| `src/pages/dev/ui/index.astro` | 62,77,92 | `space-y-2` | `space-y-xs` |
| `src/pages/_SoftwareFeature.astro` | 18 | `space-y-2` | `space-y-xs` |
| `src/components/modal/ModalShell.tsx` | 44 | `right-5` | `right-lg` |
| `src/pages/index.astro` | 60 | `w-80` | `w-xs` |

## D. 変更不要: arbitrary valueが妥当

calc式、grid定義、パーセント値、標準値に該当しない固有値など。

- `_TopContainer.astro`: `w-[calc(100%-48px)]`, `grid-rows-[...]`, `md:h-[calc(100vh-3.25rem)]`, `md:max-h-[1024px]`, `md:min-h-[512px]`, `right-[5%]`, `top-[10%]`, `left/right-[calc(...)]`
- `call_names/`: `w-[150px]`, `md:w-[190px]` — テーブルセル幅
- `[...descriptionType].astro`: `md:min-h-[calc(100vh-52px)]`, `md:max-w-[820px]`, `md:h-[550px]`
- `_SpeakerComponent.astro`: 複雑な擬似要素スタイリング
