import React from "react"
import shareThumb from "../images/landing-share-thumb.jpg"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"

export default () => {
	const data = useStaticQuery(graphql`
    query {
      allUpdateInfosJson {
        edges {
          node {
			  version
			  descriptions
			  contributors
          }
        }
      }
    }
  `)
	const events = data.allUpdateInfosJson.edges
	return (
		<Page>
			<Seo
				title="VOICEVOX | 無料で使える中品質なテキスト読み上げソフトウェア"
				description="無料で使える中品質なテキスト読み上げソフトウェア"
				image={shareThumb}
			/>
			<div className="container my-5">
				<div className="columns">
					<div className="column is-10 is-offset-1">
						<h1 className="title">アップデート</h1>
						{events.map(e => (
							<>
								<div key={e.node.version}>
									<h2 className="is-size-4">バージョン{e.node.version}</h2>
									<h3 className="is-size-5">アップデートの詳細</h3>
									<div
										dangerouslySetInnerHTML={{
											__html: e.node.descriptions,
										}} />
									<h3 className="is-size-5">貢献者</h3>
									<div
										dangerouslySetInnerHTML={{
											__html: e.node.contributors,
										}} />
								</div>
								<hr />
							</>
						))}
					</div>
				</div>
			</div>
		</Page>
	)
}
