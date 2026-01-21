import type { Root, Link, LinkReference, Definition } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * プラグインオプション
 * - baseUrl: 前置するベースURL（例: https://example.com）
 */
export interface PrefixBaseUrlOptions {
  baseUrl: string;
}

/* ==================================================================
URL helpers（純関数） 
================================================================== */
/**
 * 前置のスキップ対象を判定
 * - スキーム付き: http:, https:, mailto:, tel:, data: など
 * - プロトコル相対: //example.com
 * - ハッシュのみ: #section
 * - クエリのみ: ?foo=bar
 */
const shouldSkipPrefixing = (href: string): boolean =>
  /^(?:[a-zA-Z][\w+.-]*:|\/\/|#|\?)/.test(href);

/**
 * base の末尾スラッシュを落として正規化
 */
const normalizeBase = (base: string): string => base.replace(/\/+$/, "");

/**
 * 正規化済み base と相対／ルート相対 href を結合
 * - new URL(href, base + '/') による相対解決
 * - 失敗時はフォールバックで単純結合
 */
const resolveWithBase = (href: string, normalizedBase: string): string => {
  try {
    return new URL(href, normalizedBase + "/").toString();
  } catch {
    return `${normalizedBase}/${String(href).replace(/^\/+/, "")}`;
  }
};

/* ==================================================================
共通ロジック：Link / Definition 用 
================================================================== */
// 後述のprefixUrl()に使用
type UrlNode = Link | Definition;

/**
 * url を base で前置する
 * - 型は Link | Definition に限定
 */
const prefixUrl = (node: UrlNode, normalizedBase: string): void => {
  const href = node.url.trim();
  if (href && !shouldSkipPrefixing(href)) {
    node.url = resolveWithBase(href, normalizedBase);
  }
};

/* ==================================================================
プラグイン本体
================================================================== */
/**
 * 1) インラインの Link を前置
 * 2) 本文に出現した LinkReference の identifier を収集
 * 3) その identifier と一致する Definition だけ前置（= 参照画像の Definition は変更しない）
 */
const remarkPrefixBaseUrl: Plugin<[PrefixBaseUrlOptions], Root> = (options) => {
  const rawBase = options.baseUrl?.trim();
  if (!rawBase) throw new Error("baseUrl must be a non-empty string");

  const normalizedBase = normalizeBase(rawBase);

  return (tree: Root) => {
    // 1) インライン記法のリンク（[text](href)）
    visit(tree, "link", (node: Link) => {
      prefixUrl(node, normalizedBase);
    });

    // 2) 本文で使われている LinkReference の id を収集
    const linkIds = new Set<string>();
    visit(tree, "linkReference", (ref: LinkReference) => {
      // identifier は mdast 側で正規化済み（大小文字/空白）
      linkIds.add(ref.identifier);
    });

    // 3) 参照リンクに使われる Definition だけ処理（参照画像の Definition はスルー）
    if (linkIds.size > 0) {
      visit(tree, "definition", (def: Definition) => {
        if (linkIds.has(def.identifier)) {
          prefixUrl(def, normalizedBase);
        }
      });
    }
  };
};

export default remarkPrefixBaseUrl;

// ユニットテストで利用するため公開
export { normalizeBase, resolveWithBase, shouldSkipPrefixing, prefixUrl };
