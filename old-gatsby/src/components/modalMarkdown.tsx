import React, { useEffect } from "react"

export default (props: {
  isActive: boolean
  title: string
  html: string
  hide: () => void
  className?: string
}) => {
  useEffect(() => {
    if (props.isActive) {
      document.body.classList.add("is-clipped")
    } else {
      document.body.classList.remove("is-clipped")
    }
  }, [props.isActive])

  return (
    <div
      className={
        `${props.className} modal` + (props.isActive ? " is-active" : "")
      }
    >
      <div className="modal-background" onClick={props.hide}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">{props.title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.hide}
            type="button"
          ></button>
        </header>
        <section className="modal-card-body">
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: props.html,
            }}
          ></div>
        </section>
        <footer className="modal-card-foot is-justify-content-flex-end"></footer>
      </div>
    </div>
  )
}
