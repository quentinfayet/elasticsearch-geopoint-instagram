var Elasticsearch = require('elasticsearch');
var client = new Elasticsearch.Client({
    host: 'elasticsearch:9200',
    log: 'trace'
});
var data = require('./data.json');

data.data.forEach(function(media) {
    if (null === media || null === media.location) {
        return;
    }

    client.index({
        index: 'instagram',
        type: 'media',
        body: {
            location: {
                lat: media.location.latitude,
                lon: media.location.longitude
            }
        }
    }, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    })
});