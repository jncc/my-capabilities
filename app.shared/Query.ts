
export class Query {
  bbox:  [number, number, number, number]
  start: Date
  end:   Date
  type:  "raw" | "ndwi" | "ndvi"
}
