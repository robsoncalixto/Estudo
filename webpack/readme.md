# Anotações importantes para webpack

Primeiro passo baixar babel-core e webpack nas dependências de desenvolvimento.

**npm install webpack babel-core --save-dev**.

## configurações do webpack

Na raiz do projeto criar um arquivo webpack.config.js e exportar estas configurações.

```js
    //variável para carregar o modulo nativo do node.
    const path = require('path');


    module.exports = {
        entry: './app-src/app.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },//module permite aplicar regras de carregamento antes do webpack.
        module: {
            rules: [
                {
                    test: /\.js$/,//verifica todos os arquivos com extensão js
                    exclude: /node_modules/, //retira do processo do webpack
                    use: {
                        loader: 'babel-loader' //qual será o loader a ser utilizado antes do webpack
                    }
                }
            ]
        }
    }
```