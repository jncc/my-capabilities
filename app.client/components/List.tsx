
import * as React from "react";

export function List(props: ListProps) {

  let rows = scenes.map(scene => {
    return (
      <tr key={scene.name}><th scope="row">1</th><td>{scene.name}</td><td>{scene.date}</td><td>Download</td></tr>
    );
  });

  return (
    <div className="list">
      <table className="table">
        <caption>Optional table caption.</caption>
        <thead>
          <tr><th>#</th><th>First Name</th><th>Last Name</th><th>Username</th></tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

interface ListProps {
  blah: string;
}


let scenes = [
  {
    "name": "S1A_IW_GRDH_1SDV_20160401T063019_20160401T063044_010624_00FD0A_B9E6",
    "date": "2016-04-01T06:30:44.224Z",
    "polygon": {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -2.085821,
              53.140678
            ],
            [
              -5.883492,
              53.543766
            ],
            [
              -5.497084,
              55.03817
            ],
            [
              -1.5617,
              54.631847
            ],
            [
              -2.085821,
              53.140678
            ]
          ]
        ]
      }
    }
  },
  {
    "name": "S1A_IW_SLC__1SDV_20160401T062952_20160401T063020_010624_00FD0A_84D3",
    "date": "2016-04-01T06:30:20.659Z",
    "polygon": {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -1.588959,
              54.545807
            ],
            [
              -5.496208,
              54.950325
            ],
            [
              -5.045351,
              56.617447
            ],
            [
              -0.966769,
              56.207821
            ],
            [
              -1.588959,
              54.545807
            ]
          ]
        ]
      }
    }
  },
  {
    "name": "S1A_IW_RAW__0SDV_20160403T061334_20160403T061406_010653_00FDE6_6312",
    "date": "2016-04-03T06:14:06.889Z",
    "polygon": {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -0.9424,
              55.8629
            ],
            [
              -1.4527,
              53.9159
            ],
            [
              2.2679,
              53.6104
            ],
            [
              2.9609,
              55.5484
            ],
            [
              -0.9424,
              55.8629
            ],
            [
              -0.9424,
              55.8629
            ]
          ]
        ]
      }
    }
  }];
