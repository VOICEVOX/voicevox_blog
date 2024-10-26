import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, navigate, PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useMemo, useState } from "react"
import { Page } from "../../components/page"
import PlayButton from "../../components/playButton"
import Seo from "../../components/seo"
import { characterKeys } from "../../constants"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import { CharacterKey } from "../../types/dormitoryCharacter"
import { getProductPageUrl } from "../../urls"

type DescriptionType = "プロフィール" | "呼び方"

export default ({
  location,
  params,
}: PageProps<null, null, { fromDormitory?: boolean }>) => {
  const characterId: string = params.characterId

  const { characterInfos, callNameInfos } = useDetailedCharacterInfo()

  const selectedCharacterInfoEntry = Object.entries(characterInfos).find(
    ([, characterInfo]) => characterInfo?.id === characterId
  )
  const selectedCharacterKey = selectedCharacterInfoEntry![0] as CharacterKey
  const selectedCharacterInfo = characterInfos[selectedCharacterKey]

  const [descriptionType, setDescriptionType] =
    useState<DescriptionType>("プロフィール")

  const characterInfo = useMemo(
    () => characterInfos[selectedCharacterKey],
    [selectedCharacterKey]
  )

  const TypeButton = ({ targetType }: { targetType: DescriptionType }) => {
    const selected = descriptionType === targetType
    return (
      <button
        className={`button is-rounded description-type-button ${
          selected && "description-type-button-selected"
        }`}
        style={{
          color: characterInfo.color,
          borderColor: characterInfo.color,
          backgroundColor: selected ? characterInfo.lightColor : undefined,
        }}
        onClick={() => setDescriptionType(targetType)}
        type="button"
      >
        <span>{targetType}</span>
      </button>
    )
  }

  const CallBox = ({
    targetCharacterKey,
  }: {
    targetCharacterKey: CharacterKey
  }) => {
    const Arrow = ({ leftOrRight }: { leftOrRight: "left" | "right" }) => (
      <span
        className="description-call-arrow"
        style={{
          color:
            leftOrRight === "right"
              ? characterInfo.color
              : characterInfos[targetCharacterKey].color,
        }}
      >
        {leftOrRight === "left" ? "←" : "→"}
      </span>
    )
    return (
      <div className="columns is-mobile is-vcentered is-variable is-1 description-call-box">
        <div className="column description-call-line">
          <div className="description-call-one">
            <span
              className={`description-call-text ${
                callNameInfos[selectedCharacterKey][targetCharacterKey]
                  ? ""
                  : "unknown"
              }`}
              style={{ borderColor: characterInfo.color }}
            >
              {callNameInfos[selectedCharacterKey][targetCharacterKey] || "？"}
            </span>
            <Arrow leftOrRight="right" />
          </div>
          <div className="description-call-one">
            <Arrow leftOrRight="left" />
            <span
              className={`description-call-text ${
                callNameInfos[targetCharacterKey][selectedCharacterKey]
                  ? ""
                  : "unknown"
              }`}
              style={{ borderColor: characterInfos[targetCharacterKey].color }}
            >
              {callNameInfos[targetCharacterKey][selectedCharacterKey] || "？"}
            </span>
          </div>
        </div>
        <div className="column is-narrow py-1" style={{ height: "100%" }}>
          <GatsbyImage
            className="border-icon"
            image={characterInfos[targetCharacterKey].bustupImage}
            alt={characterInfos[targetCharacterKey].name}
            style={{
              borderColor: characterInfos[targetCharacterKey].color,
              height: "100%",
              aspectRatio: "1/1",
            }}
            imgStyle={{ height: "100%", aspectRatio: "1/1" }}
            objectFit="contain"
          />
        </div>
      </div>
    )
  }

  // TODO: anchorにする
  const hideCharacterModal = () => {
    if (location.state?.fromDormitory) {
      // ボイボ寮ページから遷移した場合はスクロール位置保持のため戻るを使う
      navigate(-1)
    } else {
      // 検索流入や共有されたページから直接飛んだ場合は戻れないのでボイボ寮ページのurlを指定
      navigate("/dormitory/")
    }
  }

  return (
    <Page>
      <Seo
        title={`${selectedCharacterInfo.name} | ボイボ寮 | VOICEVOX`}
        description={selectedCharacterInfo.description}
        image={selectedCharacterInfo.ogpImage.images.fallback?.src}
      />

      <div className="dormitory-character">
        <main className="section py-1">
          <div className="container is-max-desktop">
            <div className="box" style={{ borderColor: characterInfo.color }}>
              <div className="columns m-0" style={{ height: "100%" }}>
                <div
                  className="column is-4 portrait-column"
                  style={{ borderColor: characterInfo.color }}
                >
                  <GatsbyImage
                    image={characterInfo.portraitImage}
                    alt={characterInfo.name}
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
                <div className="column description-column">
                  <div className="section">
                    <div className="description-top">
                      <h1
                        className="title"
                        dangerouslySetInnerHTML={{
                          __html: characterInfo.rubyName,
                        }}
                      />
                      <a
                        className="button description-top-button"
                        style={{
                          color: characterInfo.color,
                          borderColor: characterInfo.color,
                          visibility: characterInfo.detailUrl
                            ? "visible"
                            : "hidden",
                        }}
                        href={characterInfo.detailUrl}
                        aria-label={`${characterInfo.name}の詳細ページ`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </div>
                    <div className="buttons has-addons">
                      <TypeButton targetType="プロフィール" />
                      <TypeButton targetType="呼び方" />
                    </div>
                    {descriptionType === "プロフィール" && (
                      <>
                        <div
                          className="description-profile"
                          dangerouslySetInnerHTML={{
                            __html: characterInfo.description,
                          }}
                        />
                        <div className="columns is-variable is-1 is-multiline">
                          {characterInfo.labelInfos.map((labelInfo, index) => (
                            <div
                              key={index}
                              className={`column ${
                                labelInfo.size == 1 ? "is-6" : "is-12"
                              } description-box`}
                            >
                              <span
                                className="description-label"
                                style={{ backgroundColor: characterInfo.color }}
                              >
                                {labelInfo.label}
                              </span>
                              <span
                                className="description-text"
                                dangerouslySetInnerHTML={{
                                  __html: labelInfo.value,
                                }}
                              />
                            </div>
                          ))}
                          <div className="column is-12 description-box">
                            <span
                              className="description-label"
                              style={{ backgroundColor: characterInfo.color }}
                            >
                              音声サンプル
                            </span>
                            {characterInfo.dormitoryVoiceUrls ? (
                              <div className="description-samples">
                                {characterInfo.dormitoryVoiceUrls.map(
                                  (url, index) => (
                                    <PlayButton
                                      key={index}
                                      url={url}
                                      name={`${
                                        characterInfo.name
                                      }のサンプルボイス${index + 1}`}
                                      color={characterInfo.color}
                                      className="ml-1 mr-1"
                                    />
                                  )
                                )}
                              </div>
                            ) : (
                              <span className="description-text">準備中</span>
                            )}
                          </div>
                        </div>
                        {characterInfo.infoImages && (
                          <div className="description-info-images">
                            {characterInfo.infoImages.map((image, index) => (
                              <GatsbyImage
                                key={index}
                                image={image}
                                alt={characterInfo.name}
                                objectFit="contain"
                                style={{
                                  maxHeight: "8rem",
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    {descriptionType === "呼び方" && (
                      <div className="columns description-call">
                        <div className="column is-3 description-call-other-column">
                          <div className="description-call-other-cell">
                            <div>
                              <span>一人称</span>
                            </div>
                            <div>
                              {callNameInfos[selectedCharacterKey].me.map(
                                callName => (
                                  <p>{callName}</p>
                                )
                              )}
                            </div>
                          </div>
                          <div className="description-call-other-cell">
                            <div>
                              <span>二人称</span>
                            </div>
                            <div>
                              {callNameInfos[selectedCharacterKey].you.map(
                                callName => (
                                  <p>{callName}</p>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="column is-9 description-call-character">
                          {characterKeys
                            .filter(
                              targetCharacterKey =>
                                targetCharacterKey !== selectedCharacterKey
                            )
                            .map((targetCharacterKey, index) => (
                              <CallBox
                                key={index}
                                targetCharacterKey={targetCharacterKey}
                              />
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="link-buttons has-text-weight-bold">
              <Link
                to={getProductPageUrl(characterInfo)}
                className="button is-normal is-rounded character-list-button"
                style={{ borderColor: characterInfo.color }}
              >
                ダウンロードページ
              </Link>
              <Link
                to={
                  // ボイボ寮ページから遷移した場合は前のキャラクターへ戻る
                  // 検索流入や共有されたページから直接飛んだ場合は先頭へ戻る
                  location.state?.fromDormitory
                    ? `/dormitory/#${characterInfo.id}`
                    : `/dormitory/`
                }
                className="button is-normal is-rounded character-list-button"
                style={{ borderColor: characterInfo.color }}
              >
                キャラクター一覧
              </Link>
            </div>
          </div>
        </main>
      </div>
    </Page>
  )
}
