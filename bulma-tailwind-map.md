### 主要なBulmaクラスとTailwind対応（適宜更新）

| Bulmaクラス                  | Tailwind対応例                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `section`                    | `py-12`                                                                                                            |
| `title`                      | `text-3xl font-bold text-gray-950 mb-6`                                                                            |
| `title is-1`                 | `text-5xl font-bold text-gray-950 mb-6`                                                                            |
| `title is-4`                 | `text-2xl font-bold text-gray-950 mb-6`                                                                            |
| `subtitle`                   | `text-xl font-bold text-gray-700 mb-6`                                                                             |
| `is-size-5`                  | `text-xl`                                                                                                          |
| `is-size-6`                  | `text-base`                                                                                                        |
| `has-text-weight-bold`       | `font-bold`                                                                                                        |
| `is-underlined`              | `underline`                                                                                                        |
| `button`                     | `px-4 py-2 rounded font-medium`                                                                                    |
| `buttons`                    | `flex flex-wrap gap-2`                                                                                             |
| `is-primary`                 | `bg-primary text-white hover:bg-primary-dark`                                                                      |
| `is-small`                   | `text-sm px-3 py-1`                                                                                                |
| `is-dark`                    | `bg-gray-800 text-white`                                                                                           |
| `is-loading`                 | カスタムローディングスピナー＋`opacity-50 cursor-wait`                                                             |
| `is-rounded`                 | `rounded-full`                                                                                                     |
| `container`                  | `max-w-7xl mx-auto px-4`                                                                                           |
| `is-max-desktop`             | `max-w-[960px]`                                                                                                    |
| `is-flex`                    | `flex`                                                                                                             |
| `is-flex-direction-column`   | `flex-col`                                                                                                         |
| `is-justify-content-center`  | `justify-center`                                                                                                   |
| `mt-3`                       | `mt-3`                                                                                                             |
| リンク色 (`$link: $primary`) | `text-[rgb(48,100,57)] hover:text-[rgb(38,80,47)] dark:text-[rgb(165,212,173)] dark:hover:text-[rgb(185,232,193)]` |
| `jump-anchor-header-padding` | `pt-[calc(3.25rem+1rem)] -mt-[calc(3.25rem+1rem)]`                                                                 |
| `navbar`                     | `fixed top-0 w-full bg-white shadow`                                                                               |
| `dropdown`                   | zag.jsのドロップダウン + Tailwindスタイル                                                                          |
| `has-background-black`       | `bg-zinc-900 text-white`                                                                                           |
| `has-background-white`       | `bg-white text-black`                                                                                              |
| `.content h2`                | `text-3xl font-extrabold text-gray-700 dark:text-gray-300 mb-4 [mt-5 for not first]`                               |
| `.content ul`                | `ml-8 mb-4 list-disc list-outside`                                                                                 |
| `.content p`                 | `mb-4 last:mb-0`                                                                                                   |
| `.content a`                 | リンク色と同じ（上記参照）                                                                                         |
| `hr`                         | `my-6 border-0 h-[2px] bg-gray-100`                                                                                |
