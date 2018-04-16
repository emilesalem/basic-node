const Generator = require('yeoman-generator')

class BasicNode extends Generator {
  initializing () {
    this.composeWith(require.resolve('generator-node/generators/git'))
  }

  async prompting () {
    const questions = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Baptize this project! (default to current folder name)',
        default: this.appname // Default to current folder name
      }, {
        type: 'input',
        name: 'projectDescription',
        message: 'give a short description'
      },
      {
        type: 'input',
        name: 'nodeVersion',
        message: 'minimum Node version (default to 7)',
        default: 7
      }
    ]
    this.userPreferences = await this.prompt(questions)
  }

  configuring () {
    const {
      projectName,
      projectDescription,
      nodeVersion
    } = this.userPreferences

    const projectNameMin = projectName.toLowerCase()
    const pkgJson = {
      name: projectNameMin,
      version: '0.0.1',
      main: 'index.js',
      engines: {
        node: `>=${nodeVersion}`
      },
      scripts: {
        start: 'dotenv nodemon index.js | bunyan',
        lint: 'eslint .',
        'lint:fix': 'npm run lint -- --fix',
        test: 'eslint . && NODE_ENV=test NODE_PATH=./  nyc mocha --opts ./test/unit/mocha.opts',
        tdd: 'NODE_PATH=./ NODE_ENV=test NODE_PATH=./  nyc mocha --opts ./test/unit/mocha.opts --watch'
      },
      author: 'Motivate',
      license: 'UNLICENSED'
    }
    if (projectDescription) {
      pkgJson.description = projectDescription
    }
    this.fs.writeJSON(this.destinationPath('package.json'), pkgJson)
  }

  install () {
    this.yarnInstall(
      [
        'chai',
        'chai-as-promised',
        'chai-http',
        'nock',
        'eslint',
        'eslint-config-eslint',
        'eslint-config-standard',
        'eslint-plugin-import',
        'eslint-plugin-mocha',
        'eslint-plugin-node',
        'eslint-plugin-promise',
        'eslint-plugin-standard',
        'mocha',
        'nodemon',
        'proxyquire',
        'sinon',
        'sinon-chai'
      ],
      { dev: true }
    )
  }

  writing () {
    const {
      projectName,
      projectDescription,
      nodeVersion
    } = this.userPreferences

    this.fs.copyTpl(
      this.templatePath('readme.md'),
      this.destinationPath('./README.md'),
      {
        projectName,
        projectDescription,
        nodeVersion
      }
    )

    this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'))
    this.fs.copy(this.templatePath('setup.js'), this.destinationPath('test/unit/setup.js'))
    this.fs.copy(this.templatePath('mocha.opts'), this.destinationPath('test/unit/mocha.opts'))
    this.fs.copy(this.templatePath('.eslintrc.test'), this.destinationPath('test/unit/.eslintrc'))
  }
}

module.exports = BasicNode
