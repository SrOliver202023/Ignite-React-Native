export default {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-inline-import-loader',
        {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['inline-import', {
                extensions: ['.txt']
              }]
            ],
            // Make sure cacheDirectory is disabled so that Babel
            // always rebuilds dependent modules
            cacheDirectory: false // default
          }
        }
      ]
    ]
}
]