interface ErosImage {
  filmnbr: string;
  worknbr: string;
  czone: string;
  aimfilm: string;
  technique: string;
  dtfilm: string;
  caimfilm: string | undefined;
  plfilm: string;
  opfilm: string;
  owner: string;
  stock: string;
  filmtype: string;
  zone: string;
  Xsize: string;
  Ysize: string;
  bands: string;
}

interface ErosObject {
  title: string;
  local: string;
  owner: string;
  worknbr: string;
  collection: string;
  dtfrom: string;
  dtto: string;
  appel: string;
  support: string;
  technique: string;
  height: string;
  width: string;
  workgroup: string;
  srmf: string;
  categ: string;
  images: ErosImage[] | null;
}

export async function getImageURLForObject(c2rmfId: string, apiToken: string) {
  const objectDetailsURL = `http://eros.c2rmf.fr/rails/oeuvres/${c2rmfId}.json`;
  let fetchFailed = false,
    objectResponse: Response | undefined = undefined;
  try {
    objectResponse = await fetch(objectDetailsURL + `?token=${apiToken}`);
  } catch (error) {
    console.error(error);
    fetchFailed = true;
  }
  if (fetchFailed || (objectResponse && !objectResponse.ok)) {
    console.warn(
      `Failed to fetch object details with id ${c2rmfId}.\n
      URL: ${objectDetailsURL}?token=<truncated>\n`,
    );
    if (objectResponse && !objectResponse.ok) {
      console.warn(`
      Status: ${objectResponse.statusText}\n
      Content: ${await objectResponse.text()}`);
    }
    return null;
  }
  if (objectResponse) {
    const objectDetails = (await objectResponse.json()) as ErosObject;
    if (!objectDetails.images || objectDetails.images.length === 0) {
      console.warn(`No images found for object with id ${c2rmfId}`);
      return null;
    }
    return objectDetails.images.map((image) => {
      return `http://eros.c2rmf.fr/vignettes/${c2rmfId}/${image.filmnbr}.jpg`;
    });
  }
  return null;
}
