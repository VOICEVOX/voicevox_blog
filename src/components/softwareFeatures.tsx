import React from "react"

const SoftwareFeatures = () => {
  const features = [
    {
      title: "無料で使えるテキスト読み上げソフトウェア",
      subtitle: "すべての人に音声合成ソフトウェアを。",
      description:
        "「VOICEVOX」は、商用利用可能なフリーの音声読み上げソフトで、商用・非商用にかかわらず、誰でも利用可能です。",
    },
    {
      title: "AI技術を活用した表情豊かな合成音声",
      subtitle: "キャラクターの性格を反映した表情豊かな合成音声",
      description:
        "機械学習技術を活用した人工知能で自然なTTS（テキスト音声合成）を実現します。",
    },
    {
      title: "多種多様な音声サンプル",
      subtitle: "好きなキャラクターに読んでもらおう",
      description:
        "多くのキャラクターが高頻度で追加され、女性・男性問わず多様なキャラクターボイスをお使いになれます。",
    },
    {
      title: "今すぐはじめよう",
      subtitle: "お使いのPCですぐに使えます",
      description: "「VOICEVOX」は、 Windows , Mac , Linux に対応しています。",
    },
  ]
  return (
    <section className="section">
      <p className="title mb-6 has-text-centered">VOICEVOXの特徴</p>
      <div className="is-max-desktop columns is-multiline is-centered SoftwareFeatures ">
        {features.map((feature, index) => (
          <div className="card m-3 column is-6-tablet is-4-desktop" key={index}>
            <div className="card-content">
              <p className="title">{feature.title}</p>
              <p className="subtitle">{feature.subtitle}</p>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SoftwareFeatures
