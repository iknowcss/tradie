import {ConcatSource} from 'webpack-sources';

const mochaSetup = `

const Mocha = require('mocha');
Mocha.reporters.Base.window.width = ${process.stdout.columns || 80};
Mocha.reporters.Base.symbols.dot = '.';

const _mocha = new Mocha({});
_mocha.ui('bdd');
_mocha.reporter('spec');
_mocha.useColors(true);
_mocha.suite.emit('pre-require', global, '', _mocha);

setTimeout(() => {
  _mocha.run(errors => {
    process.exit(errors ? 1 : 0);
  });
}, 1);
`;

export default class MochaSetupPlugin {
  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            compilation.assets[file] = new ConcatSource(
              mochaSetup,
              compilation.assets[file]
            );
          });
        });
        callback();
      });
    });
  }
}
