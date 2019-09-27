### Add sample data

The KeplerGL component accepts an optional parameter `dataSamples`, which looks like the following:

<<<<<<< HEAD
```js
=======
```json
>>>>>>> 4370e25b74a92993924318101ef9fe89b99a95cc
const dataSamples = [
  {
    id: 'nyctrips', // needs to match the id in the fullUrl json object
    label: 'NYC taxi trips',
    queryType: 'sample',
    imageUrl: '/images/nyctrips.png', // can be an internal or external reference
    description:
      'A small sample of yellow and green taxi trip records in New York City.',
    size: 97986, // number of rows in the data, will be displayed in the UI
    visible: true,
    fullUrl: '/static/sample_data/nyctrips.json' // json in the format provided by in the kepler.gl UI going to Share >> Export Map >> as json
  },
];
...
  <KeplerGl
    id="foo"
    mapboxApiAccessToken={this.token}
    mapboxApiUrl={}
    mapStyles={this.mapStyles}
    width={width}
    height={height}
    dataSamples={dataSamples}
  />
```
