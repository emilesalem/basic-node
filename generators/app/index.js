const Generator = require('yeoman-generator');

class BasicNode extends Generator {
  initializing() {
    this.composeWith(require.resolve('generator-node/generators/git'));
  }

  installDependencies() {
    this.yarnInstall(
      [
        'chai',
        'chai-as-promised',
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
    );
  }
}

module.exports = BasicNode;
