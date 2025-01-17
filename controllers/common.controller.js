var SpotifyWebApi = require('spotify-web-api-node');

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
SpotifyApi
  .clientCredentialsGrant()
  .then(data => SpotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:

module.exports.home = (req,res,next) => {
    res.render('common/home')
}



module.exports.search = (req,res,next) =>  {
    res.render('artists/artist-search-results')
    
}


module.exports.doSearch = (req,res,next) =>  {

  SpotifyApi
        .searchArtists(req.query.artist)
        .then((data) => {
          //res.send(data)
           res.render('artists/artist-search-results', {
            artists: data.body.artists.items
          }) 
        })
     
             .catch(err => console.log('The error while searching artists occurred: ', 
             err));
  }
