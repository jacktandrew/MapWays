# MapWays

## Inputs

### Destinations
A list objects containing the keys `name`, `latitude`, `longitude` and `place_id` that represent the start and end of the desired journeys. The `place_id` can be found using Google's Places [Placeid Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)

    [
      {
        "name": "Matthews Beach Park",
        "latitude": 47.696294,
        "place_id": "ChIJn9QzzrgTkFQR_3_jS-a1i2Q",
        "longitude": -122.272223
      },
      {
        "latitude": 47.703776,
        "place_id": "ChIJiSZt12cSkFQRDAYwNVCsDNs",
        "longitude": -122.216993,
        "name": "Juanita Beach Park"
      }
    ]

### Polygons
A list of objects the contain the keys `latitude` & `longitude` that traces the outline of the navigable area

    [
      {"longitude":-121.20514,"latitude":47.60175},
      {"longitude":-122.20527,"latitude":47.65186},
      {"longitude":-120.20527,"latitude":47.60186},
    ]

### Holes
A list of lists of objects with latitude and longitude the trace the outline of areas within the navigable area that are impassable

    [
      [{"longitude":-121.20514,"latitude":47.60175}...],
      [{"longitude":-122.29062,"latitude":47.64669}...],
      [{"longitude":-122.29711,"latitude":47.64574}...]
    ]

### Png
The spacial data in image form, it is created by the method `saveMatrixAsPng`

### Size
The width of grid used for pathfinding. If no size is specified it will default to 800.

## Outputs

### Png
The path finding requires a two dimensional binary grid. Creating the grid is time intensive, for best results use `saveMatrixAsPng` to save a copy of the matrix ahead of time. This png can be to pass into the method `findRoutes`

### Routes
An array of objects with the keys `latitude` and `longitude` that describe the route from two desired points inside the polgon.
