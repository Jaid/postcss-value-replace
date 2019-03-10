import {configureNodeLib} from "webpack-config-jaid"

export default configureNodeLib({
  publishimo: {fetchGithub: true},
})