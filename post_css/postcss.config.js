module.exports = {
    plugins: [
        /*require('autoprefixer')({
            grid:true
        }),*/
        require('postcss-import')({
            plugins: [
                require('stylelint')
            ]
        }),
        require('postcss-font-magician')({
            variants: {
                'Lato': {
                    '300': ['woff'],
                    '400': []
                }
            }
        }),
        require('postcss-cssnext')({
            features: {
                autoprefixer: {
                    /*grid:true,
                    flexbox:false*/
                }
            }
        }),
        require('css-mqpacker'),
        require('cssnano')
    ]
}