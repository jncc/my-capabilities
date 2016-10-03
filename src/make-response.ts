

import { ILayer } from "./layer"

export function makeResponse(layers: ILayer[]): string {

  //let layersXml =
  return "";

}

export function makeLayerXml(layer: ILayer): string {

  let xml = `
      <Layer queryable="1" opaque="0">
        <Name>${layer.Name}</Name>
        <Title>${layer.Title}</Title>
        <Abstract/>
        <KeywordList>
          <Keyword>WCS</Keyword>
          <Keyword>GeoTIFF</Keyword>
        </KeywordList>
        <SRS>EPSG:27700</SRS>
        <LatLonBoundingBox minx="-6.12632079353505" miny="51.30238930387951" maxx="-1.3190873002504129" maxy="54.177806778383"/>
        <BoundingBox SRS="EPSG:27700" minx="130378.85316" miny="163032.59084999998" maxx="444543.80235" maxy="475787.06887"/>
        <Style>
          <Name>EODIP:NDVI</Name>
          <Title>NDVI</Title>
          <Abstract>NDVI</Abstract>
          <LegendURL width="63" height="362">
            <Format>image/png</Format>
            <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://eodip.jncc.gov.uk:443/geoserver/wms?request=GetLegendGraphic&amp;format=image%2Fpng&amp;width=20&amp;height=20&amp;layer=EODIP%3A14March2016_80_4_NDVI"/>
          </LegendURL>
        </Style>
      </Layer>`;

  return xml;
}


