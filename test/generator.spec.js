const path = require('path')

const extendedGenerators = [
  [helpers.createDummyGenerator(), 'node:git/app']
]

describe('generator', () => {
  it('should generate package.json', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withGenerators(extendedGenerators)
      .then(() => {
        assert.file(['package.json'])
      })
  })
  it('should generate .gitignore', () => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withGenerators(extendedGenerators)
      .then(() => {
        assert.file(['.gitignore'])
        assert.fileContent('.gitignore',
          `node_modules\ncoverage`)
      })
  })
})
