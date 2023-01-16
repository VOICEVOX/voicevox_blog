/**
 * サムネイル画像を生成する
 */

import fs from "fs"
import path from "path"
import puppeteer from "puppeteer"

import { characterInfos, characterKeys } from "./constants.js"

const sleep = (msec: number) =>
  new Promise(resolve => setTimeout(resolve, msec))

;(async () => {
  const imageDir = path.resolve(process.cwd(), "src", "images")

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({ width: 1200, height: 630 })

  // キャラクターごとの製品ページ
  for (const key of characterKeys) {
    const savePath = path.join(
      imageDir,
      "product",
      `thumb-${characterInfos[key].id}.png`
    )
    if (fs.existsSync(savePath)) {
      continue
    }

    await page.goto(
      `http://localhost:8000/__thumb_generator/product/${characterInfos[key].id}/`
    )
    await sleep(1000)
    await page.screenshot({ path: savePath })
  }

  await browser.close()
})().catch(e => {
  console.error(e)
  process.exit(1)
})
