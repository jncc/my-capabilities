

export class Query {
  bbox:  [number, number, number, number]
  start: string
  end:   string
  type:  "raw" | "ndwi" | "ndvi"
}

export function defaultQuery(): Query {
  return {
    bbox:  [-5, 53, 2, 57],
    start: "2016-04-01",
    end:   "2016-04-10",
    type:  "raw"
  }
}
