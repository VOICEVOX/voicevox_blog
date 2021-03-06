import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useContext, useEffect, useRef, useState } from "react"
import hau001 from "../audios/hau-001.wav"
import hau002 from "../audios/hau-002.wav"
import hau003 from "../audios/hau-003.wav"
import himari001 from "../audios/himari-001.wav"
import himari002 from "../audios/himari-002.wav"
import himari003 from "../audios/himari-003.wav"
import kotarou001 from "../audios/kotarou-001.wav"
import kotarou002 from "../audios/kotarou-002.wav"
import kotarou003 from "../audios/kotarou-003.wav"
import kyoko001 from "../audios/kyoko-001.wav"
import kyoko002 from "../audios/kyoko-002.wav"
import kyoko003 from "../audios/kyoko-003.wav"
import mesuo001 from "../audios/mesuo-001.wav"
import mesuo002 from "../audios/mesuo-002.wav"
import mesuo003 from "../audios/mesuo-003.wav"
import metanAma001 from "../audios/metan-ama-001.wav"
import metanAma002 from "../audios/metan-ama-002.wav"
import metanAma003 from "../audios/metan-ama-003.wav"
import metanNormal001 from "../audios/metan-normal-001.wav"
import metanNormal002 from "../audios/metan-normal-002.wav"
import metanNormal003 from "../audios/metan-normal-003.wav"
import metanSexy001 from "../audios/metan-sexy-001.wav"
import metanSexy002 from "../audios/metan-sexy-002.wav"
import metanSexy003 from "../audios/metan-sexy-003.wav"
import metanTsun001 from "../audios/metan-tsun-001.wav"
import metanTsun002 from "../audios/metan-tsun-002.wav"
import metanTsun003 from "../audios/metan-tsun-003.wav"
import ritsu001 from "../audios/ritsu-001.wav"
import ritsu002 from "../audios/ritsu-002.wav"
import ritsu003 from "../audios/ritsu-003.wav"
import ryusei001 from "../audios/ryusei-001.wav"
import ryusei002 from "../audios/ryusei-002.wav"
import ryusei003 from "../audios/ryusei-003.wav"
import soraAma001 from "../audios/sora-ama-001.wav"
import soraAma002 from "../audios/sora-ama-002.wav"
import soraAma003 from "../audios/sora-ama-003.wav"
import soraNormal001 from "../audios/sora-normal-001.wav"
import soraNormal002 from "../audios/sora-normal-002.wav"
import soraNormal003 from "../audios/sora-normal-003.wav"
import soraSexy001 from "../audios/sora-sexy-001.wav"
import soraSexy002 from "../audios/sora-sexy-002.wav"
import soraSexy003 from "../audios/sora-sexy-003.wav"
import soraTsun001 from "../audios/sora-tsun-001.wav"
import soraTsun002 from "../audios/sora-tsun-002.wav"
import soraTsun003 from "../audios/sora-tsun-003.wav"
import soraWhis001 from "../audios/sora-whis-001.wav"
import soraWhis002 from "../audios/sora-whis-002.wav"
import soraWhis003 from "../audios/sora-whis-003.wav"
import takehiro001 from "../audios/takehiro-001.wav"
import takehiro002 from "../audios/takehiro-002.wav"
import takehiro003 from "../audios/takehiro-003.wav"
import tsumugi001 from "../audios/tsumugi-001.wav"
import tsumugi002 from "../audios/tsumugi-002.wav"
import tsumugi003 from "../audios/tsumugi-003.wav"
import zundamonAma001 from "../audios/zundamon-ama-001.wav"
import zundamonAma002 from "../audios/zundamon-ama-002.wav"
import zundamonAma003 from "../audios/zundamon-ama-003.wav"
import zundamonNormal001 from "../audios/zundamon-normal-001.wav"
import zundamonNormal002 from "../audios/zundamon-normal-002.wav"
import zundamonNormal003 from "../audios/zundamon-normal-003.wav"
import zundamonSexy001 from "../audios/zundamon-sexy-001.wav"
import zundamonSexy002 from "../audios/zundamon-sexy-002.wav"
import zundamonSexy003 from "../audios/zundamon-sexy-003.wav"
import zundamonTsun001 from "../audios/zundamon-tsun-001.wav"
import zundamonTsun002 from "../audios/zundamon-tsun-002.wav"
import zundamonTsun003 from "../audios/zundamon-tsun-003.wav"
import AudioSample from "../components/audioSample"
import "../components/layout.scss"
import ModalReadmeLibrary from "../components/modalReadmeLibrary"
import { Page } from "../components/page"
import Seo from "../components/seo"
import { CharacterContext, GlobalContext } from "../contexts/context"
import landingMovieThumb from "../images/landing-movie-thumb.png"
import shareThumb from "../images/landing-share-thumb.jpg"
import landingMovie from "../movies/landing.mp4"
import { CharacterKey } from "../types/dormitoryCharacter"

const Main: React.FC<{ setShowingHeader: (show: boolean) => void }> = ({
  setShowingHeader,
}) => {
  const query: {
    allFile: {
      nodes: {
        name: string
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }[]
    }
  } = useStaticQuery(graphql`
    {
      allFile(filter: { absolutePath: { regex: "/bustup/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(height: 640)
          }
        }
      }
    }
  `)

  const context = useContext(GlobalContext)
  const { characterKeys } = useContext(CharacterContext)

  const characterInfos: {
    [key in CharacterKey]: {
      name: string
      bustupImage: IGatsbyImageData
      voiceFeature: string // ????????????????????????
      voiceUrls: {
        style: string
        urls: string[]
      }[]
      releaseStatus: "released" | "comingSoon"
    }
  } = {
    ???????????????: {
      name: "???????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-metan"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "?????????????????????????????????",
      voiceUrls: [
        {
          style: "????????????",
          urls: [metanNormal001, metanNormal002, metanNormal003],
        },
        { style: "????????????", urls: [metanAma001, metanAma002, metanAma003] },
        { style: "????????????", urls: [metanTsun001, metanTsun002, metanTsun003] },
        { style: "????????????", urls: [metanSexy001, metanSexy002, metanSexy003] },
      ],
      releaseStatus: "released",
    },
    ???????????????: {
      name: "???????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-zundamon"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "???????????????????????????",
      voiceUrls: [
        {
          style: "????????????",
          urls: [zundamonNormal001, zundamonNormal002, zundamonNormal003],
        },
        {
          style: "????????????",
          urls: [zundamonAma001, zundamonAma002, zundamonAma003],
        },
        {
          style: "????????????",
          urls: [zundamonTsun001, zundamonTsun002, zundamonTsun003],
        },
        {
          style: "????????????",
          urls: [zundamonSexy001, zundamonSexy002, zundamonSexy003],
        },
      ],
      releaseStatus: "released",
    },
    ??????????????????: {
      name: "??????????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-tsumugi"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "?????????????????????",
      voiceUrls: [
        { style: "????????????", urls: [tsumugi001, tsumugi002, tsumugi003] },
      ],
      releaseStatus: "released",
    },
    ????????????: {
      name: "????????????",
      bustupImage: query.allFile.nodes.find(node => node.name === "bustup-hau")!
        .childImageSharp.gatsbyImageData,
      voiceFeature: "?????????????????????",
      voiceUrls: [{ style: "????????????", urls: [hau001, hau002, hau003] }],
      releaseStatus: "released",
    },
    ????????????: {
      name: "????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-ritsu"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "????????????????????????",
      voiceUrls: [{ style: "????????????", urls: [ritsu001, ritsu002, ritsu003] }],
      releaseStatus: "released",
    },
    ????????????: {
      name: "????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-takehiro"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "????????????????????????",
      voiceUrls: [
        { style: "????????????", urls: [takehiro001, takehiro002, takehiro003] },
      ],
      releaseStatus: "released",
    },
    ???????????????: {
      name: "???????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-kotarou"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "?????????????????????????????????",
      voiceUrls: [
        { style: "????????????", urls: [kotarou001, kotarou002, kotarou003] },
      ],
      releaseStatus: "released",
    },
    ????????????: {
      name: "????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-ryusei"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "?????????????????????",
      voiceUrls: [
        { style: "????????????", urls: [ryusei001, ryusei002, ryusei003] },
      ],
      releaseStatus: "released",
    },
    ???????????????: {
      name: "???????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-himari"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "????????????????????????",
      voiceUrls: [
        { style: "????????????", urls: [himari001, himari002, himari003] },
      ],
      releaseStatus: "released",
    },
    ????????????: {
      name: "????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-sora"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "???????????????????????????",
      voiceUrls: [
        {
          style: "????????????",
          urls: [soraNormal001, soraNormal002, soraNormal003],
        },
        {
          style: "????????????",
          urls: [soraAma001, soraAma002, soraAma003],
        },
        {
          style: "????????????",
          urls: [soraTsun001, soraTsun002, soraTsun003],
        },
        {
          style: "????????????",
          urls: [soraSexy001, soraSexy002, soraSexy003],
        },
        {
          style: "????????????",
          urls: [soraWhis001, soraWhis002, soraWhis003],
        },
      ],
      releaseStatus: "released",
    },
    ?????????????????????: {
      name: "???????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-kyoko"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "????????????????????????",
      voiceUrls: [{ style: "????????????", urls: [kyoko001, kyoko002, kyoko003] }],
      releaseStatus: "released",
    },
    ????????????: {
      name: "????????????",
      bustupImage: query.allFile.nodes.find(
        node => node.name === "bustup-mesuo"
      )!.childImageSharp.gatsbyImageData,
      voiceFeature: "????????????????????????????????????",
      voiceUrls: [{ style: "????????????", urls: [mesuo001, mesuo002, mesuo003] }],
      releaseStatus: "released",
    },
  }

  // ?????????????????????????????????????????????????????????????????????????????????
  const firstViewRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!firstViewRef.current) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setShowingHeader(!entry.isIntersecting)
      })
    })
    observer.observe(firstViewRef.current)
  }, [firstViewRef])

  const [
    showingLibraryReadmeModalCharaterKey,
    setShowingLibraryReadmeModalCharaterKey,
  ] = useState<CharacterKey | undefined>(undefined)

  const showLibraryReadmeModal = (characterKey: CharacterKey) => {
    document.documentElement.classList.add("is-clipped")
    setShowingLibraryReadmeModalCharaterKey(characterKey)
  }

  const hideLibraryReadmeModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingLibraryReadmeModalCharaterKey(undefined)
  }

  // ????????????????????????
  const CharacterCard = ({ characterKey }: { characterKey: CharacterKey }) => {
    const characterInfo = characterInfos[characterKey]
    return (
      <div className="column is-6-tablet is-4-desktop">
        <div className="card">
          <GatsbyImage
            className="card-image"
            image={characterInfo.bustupImage}
            alt={characterInfo.name}
          />
          <div className="card-content has-text-centered">
            <h3 className="title is-4">{characterInfo.name}</h3>
            <p className="subtitle is-5">{characterInfo.voiceFeature}</p>
            {characterInfo.releaseStatus === "comingSoon" && (
              <p className="py-0" style={{ marginTop: "-1rem", color: "red" }}>
                Coming Soon
              </p>
            )}
            <AudioSample audioSamples={characterInfo.voiceUrls} />
            <div className="pt-3">
              <button
                onClick={() => showLibraryReadmeModal(characterKey)}
                className="button is-normal is-rounded"
                type="button"
              >
                <span>{characterInfo.name} ????????????</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Seo
        title="VOICEVOX | ????????????????????????????????????????????????????????????????????????"
        description="????????????????????????????????????????????????????????????????????????"
        image={shareThumb}
      />

      <div className="landing">
        <div ref={firstViewRef} className="first-view">
          <header className="hero is-primary is-small">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title top-title">VOICEVOX</h1>
                <h2 className="subtitle has-text-weight-semibold">
                  ????????????????????????????????????????????????????????????????????????
                </h2>
              </div>
            </div>
          </header>
          <section className="section not-header is-flex is-justify-content-center">
            <div className="container is-max-desktop columns is-desktop is-vcentered">
              <div className="column has-text-centered">
                <video controls poster={landingMovieThumb}>
                  <source src={landingMovie} type="video/mp4" />
                </video>
              </div>
              <div className="column is-narrow is-flex is-flex-direction-column">
                <h2 id="feature" className="title">
                  ??????
                </h2>
                <div className="content">
                  <ul className="mt-0">
                    <li>
                      ?????????????????????????????????{" "}
                      <span style={{ fontSize: "0.7em" }}>(???1)</span>
                    </li>
                    <li>
                      ????????????????????????????????????{" "}
                      <span style={{ fontSize: "0.7em" }}>(???2)</span>
                    </li>
                    <li>???????????????????????????????????????????????????</li>
                  </ul>
                </div>
                <p className="is-size-7">
                  ???1 ????????????????????????????????????????????????????????????????????????
                </p>
                <p className="is-size-7">
                  ???2 ????????? Windows / Mac / Linux ????????????????????????
                </p>
                <a
                  className="button is-align-self-center mt-5 is-primary is-rounded is-large"
                  onClick={() => {
                    context.downloadModal.show()
                    context.sendEvent("download", "software")
                  }}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={0}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faDownload} />
                  </span>
                  <span className="has-text-weight-semibold">??????????????????</span>
                </a>
                <p className="is-align-self-center is-size-6">Version 0.12.4</p>
              </div>
            </div>
          </section>
        </div>

        <main>
          <section className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 id="characters" className="title">
                ????????????????????????
              </h2>
              <div className="columns is-multiline is-centered">
                {characterKeys.map((characterKey, index) => (
                  <CharacterCard key={index} characterKey={characterKey} />
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 id="oss" className="title">
                ?????????????????????
              </h2>
              <p className="is-size-5">
                VOICEVOX ??? OSS??????????????????????????????????????????????????? VOICEVOX
                ???????????????????????????????????????
              </p>
              <p className="is-size-5">
                ???????????? OSS ???????????????????????????????????????&nbsp;
                <a
                  href="https://github.com/VOICEVOX/voicevox/blob/main/docs/%E5%85%A8%E4%BD%93%E6%A7%8B%E6%88%90.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  VOICEVOX ???????????????
                </a>
                &nbsp;???????????????????????????
              </p>
              <p className="is-size-5">
                ??????????????????????????? Electron + Vue ????????????????????????????????????
                Python + FastAPI ?????????
              </p>
              <p className="is-size-5">
                ?????????????????????????????????????????????????????????????????????????????????????????????
              </p>
              <div className="buttons mt-3">
                <a
                  className="button is-outlined"
                  href="https://github.com/VOICEVOX/voicevox"
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  role={"button"}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faGithub} />
                  </span>
                  <span>VOICEVOX ???????????????</span>
                </a>
                <a
                  className="button is-outlined"
                  href="https://github.com/VOICEVOX/voicevox_engine"
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  role={"button"}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faGithub} />
                  </span>
                  <span>VOICEVOX ????????????</span>
                </a>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 id="core_library" className="title">
                ?????????????????????
              </h2>
              <p className="is-size-5">
                VOICEVOX??????????????????????????????????????????????????????????????????????????????VOICEVOX???????????????????????????????????????????????????
              </p>
              <p className="is-size-5">
                ????????????&nbsp;
                <a
                  href="https://github.com/VOICEVOX/voicevox_core"
                  className="has-text-primary has-text-weight-bold is-underlined"
                  target="_blank"
                  rel="noreferrer"
                >
                  VOICEVOX CORE
                </a>
                &nbsp;???????????????????????????
              </p>
            </div>
          </section>

          <section className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 className="title">?????????</h2>
              <ul className="is-size-5">
                <li>
                  <Link
                    to={"/term"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    ????????????
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/how_to_use"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    ?????????
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/qa"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    Q&amp;A
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dormitory"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    ????????????
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/update_history"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    ????????????
                  </Link>
                </li>
                <li>
                  <a
                    href="https://hiho.fanbox.cc/"
                    target={"_blank"}
                    rel={"noreferrer"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    pixivFANBOX
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
      <ModalReadmeLibrary
        hide={hideLibraryReadmeModal}
        {...(showingLibraryReadmeModalCharaterKey != undefined
          ? {
              isActive: true,
              characterKey: showingLibraryReadmeModalCharaterKey,
            }
          : {
              isActive: false,
              characterKey: undefined,
            })}
      />
    </>
  )
}

export default () => {
  const [showingHeader, setShowingHeader] = useState(false)
  return (
    <Page showingHeader={showingHeader}>
      <Main setShowingHeader={setShowingHeader} />
    </Page>
  )
}
