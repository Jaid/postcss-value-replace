import {plugin} from "postcss"
import valueParser from "postcss-value-parser"
import isEmpty from "lodash.isempty"

const debug = require("debug")("postcss-value-replace")

export default plugin("postcss-value-replace", options => {

    options = options || {}
    options.functionName = options.functionName || "replace"

    return css => {

        if (!options.replace || isEmpty(options.replace)) {
            debug("options.replace is empty")
            return
        }

        debug(`Loaded replacements for keys ${Object.keys(options.replace)}`)

        css.walkDecls(node => {
            if (!node.value || !node.value.includes(options.functionName)) { // Search for function name for better performance
                return
            }
            node.value = parseValue(node.value, options)
        })

    }

})

function parseValue(value, options) {
    return valueParser(value).walk(node => {
        if (node.type !== "function") {
            return
        }
        if (node.value !== options.functionName) {
            return
        }
        const key = node.nodes[0].value
        if (!key) {
            debug(`Skipping ${node.value}`)
            return
        }
        if (!options.replace.hasOwnProperty(key)) {
            debug(`"${key}" not found in options.replace`)
        }
        node.type = "word"
        node.value = options.replace[key]
    }).toString()
}