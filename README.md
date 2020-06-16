# MapWays

## Inputs

### Destinations
A list objects containing the keys `name`, `latitude`, `longitude` and `place_id` that represent the start and end of the desired journeys.

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
      [{"longitude":-121.20514,"latitude":47.60175}...],
      [{"longitude":-121.20514,"latitude":47.60175}...]
    ]

### Matrix
A 2D representation of the map in the form of a two dimensional binary grid.

### Size
The width of grid used for pathfinding. If no size is specified it will default to 800.

## Outputs

### Matrix
The path finding is done on a representation of the map in the form of a two dimensional binary grid. Creating the grid is time intensive so to improve performance save the output of the method `saveMatrix` save a copy of the matrix to pass into the method `findRoutes`

    [
      [1,1,0,0,0,0,0,1,1,1],
      [1,0,0,0,0,0,0,1,1,1],
      [1,0,0,0,1,1,0,0,1,1],
      [1,1,0,0,0,1,1,1,0,1],
      [1,1,1,0,0,0,1,1,0,1],
      [1,1,1,1,0,1,1,1,0,1],
      [1,1,1,0,0,1,1,0,1,1],
      [1,1,1,0,0,0,0,0,1,1],
      [1,1,1,1,0,0,0,0,1,1],
      [1,1,1,1,1,1,1,1,1,1]
    ]

### Routes
