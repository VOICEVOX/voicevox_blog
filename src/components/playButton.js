import React, { Component } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons"

class PlayButton extends Component {
  constructor(props) {
    super(props)

    const audio = new Audio(this.props.audio)
    this.state = { audio, isPlaying: false }

    audio.addEventListener("play", () => {
      this.state.isPlaying = true
      this.forceUpdate()
    })
    audio.addEventListener("pause", () => {
      this.state.isPlaying = false
      this.forceUpdate()
    })
  }

  static defaultProps = {
    className: "",
    style: {},
  }

  play = () => {
    this.state.audio.play()
  }

  stop = () => {
    this.state.audio.pause()
    this.state.audio.currentTime = 0
  }

  render() {
    return (
      <button
        onClick={this.state.isPlaying ? this.stop : this.play}
        className={"button is-primary circle-icon " + this.props.className}
        style={this.props.style}
      >
        <FontAwesomeIcon icon={this.state.isPlaying ? faStop : faPlay} />
      </button>
    )
  }
}

export default PlayButton
