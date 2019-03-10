import path from "path"

import fss from "@absolunet/fss"
import postcss from "postcss"

const indexModule = process.env.MAIN ? path.resolve(__dirname, "..", process.env.MAIN) : path.join(__dirname, "..", "src")
const {default: plugin} = require(indexModule)

const inPath = path.join(__dirname, "in.css")
const expectedPath = path.join(__dirname, "expected.css")
const outPath = path.join(__dirname, "dist", "out.css")

it("should run", async () => {
  const inCss = fss.readFile(inPath)
  const expectedCss = fss.readFile(expectedPath, "utf8")
  const result = await postcss([
    plugin({
      replace: {
        linkColor: "#00CC00",
        red: 200,
        green: 60,
        blue: 80,
        alpha: 0.5,
        margin: "5px 2px 5px 2px",
        "font-weight": "bold",
      },
    }),
  ]).process(inCss, {
    from: inPath,
    to: outPath,
  })
  fss.outputFile(outPath, result.css)
  expect(result.css).toBe(expectedCss)
})