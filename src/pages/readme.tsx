import React from "react"
import shareThumb from "../images/landing-share-thumb.jpg"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"

export default () => {
	const html = useStaticQuery(graphql`
      query {
        markdownRemark(fileAbsolutePath: { regex: "/softwareReadme/" }) {
          html
        }
      }
    `).markdownRemark.html
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
						<h1 className="title">利用規約</h1>
						<div
							className="markdown"
							dangerouslySetInnerHTML={{ __html: html }}
						/>
					</div>
				</div>
			</div>
		</Page>
	)
}
