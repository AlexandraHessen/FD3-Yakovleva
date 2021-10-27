const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
    filename: "bundle.css" // название создаваемого файла CSS
});

module.exports = { 
    entry: "./App.js", // основной файл приложения. webpack начнет с него
    // потом посмотрит какие у него есть require, перейдет к ним и т.д.
    output:{ 
        path: __dirname, // путь к каталогу выходных файлов
        filename: "bundle.js"  // название создаваемого JS файла 
    }, 
    devtool:'source-map', //обязательно прописываем для создание map файлов  
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать JS и JSX 
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/, // написали что делать с css файлами 
                use: extractCSS.extract({
                    use: ["css-loader"]
                })
            }            
        ] 
    },
    plugins: [
        extractCSS
    ]
}