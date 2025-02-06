import { IThumbnail } from "../../../../types/ICatalog";

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

export async function getImagesForObject(
  c2rmfId: string,
  apiToken: string,
): Promise<IThumbnail[] | null> {
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
      return {
        url: constructEroImageUrl(c2rmfId, image.filmnbr),
        copyright: `${image.opfilm} ${image.owner}`,
      };
    });
  }
  return null;
}

function constructEroImageUrl(
  c2rmfId: string,
  imageId: string,
  imageSize: number = 600,
) {
  let imageCategory: string;
  if (c2rmfId.startsWith("C2RMF")) {
    imageCategory = `pyr-${c2rmfId.substring(0, 6)}`;
  } else if (c2rmfId.startsWith("F")) {
    imageCategory = `pyr-${c2rmfId.substring(0, 2)}`;
  } else {
    imageCategory = `pyr-FZ`;
  }
  return `https://www.c2rmf.cnrs.fr/iiif/${imageCategory}/${c2rmfId}/${imageId}.tif/full/${imageSize},/0/default.jpg`;
}
