const USERNAME = process.env.NEXT_PUBLIC_GEONAMES_USERNAME;

interface GeonamesResponse {
  totalResultsCount: number;
  geonames: GeonamesItem[];
}

export interface GeonamesItem {
  name: string;
  lng: string;
  lat: string;
  bbox?: {
    east: number;
    north: number;
    south: number;
    west: number;
  };
}

export async function searchGeonames(q: string, limit?: number) {
  try {
    const results: GeonamesItem[] = [];
    const response = await fetch(
      `https://secure.geonames.org/searchJSON?q=${q}&maxRows=${
        limit || 10
      }&username=${USERNAME}&inclBbox=true`,
    );
    const geonames = ((await response.json()) as GeonamesResponse).geonames;
    geonames.forEach((geoname) => {
      if (results.map((r) => r.name).includes(geoname.name)) return;
      results.push(geoname);
    });
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
