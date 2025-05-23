const BASE_URL = `https://opentheso.huma-num.fr/openapi/v1`;

interface OpenThesoSearchResult {
  id: string;
  arkId: string;
  label: string;
}

export interface OpenThesoSearchItem {
  id: string;
  label: string;
}

export async function searchTheso(
  thesoId: string,
  q: string,
): Promise<OpenThesoSearchItem[]> {
  const url = `${BASE_URL}/concept/${thesoId}/search/fullpath?q=${q}&lang=fr&exactMatch=false`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (response.status === 404) {
      return [];
    }
    if (!response.ok) {
      throw new Error(
        `Failed to fetch results from ${url}. Response status: ${
          response.status
        }. Reason: ${await response.text()}`,
      );
    }
    const responseJson = (await response.json()) as OpenThesoSearchResult[][];
    if (Object.keys(responseJson).length === 0) {
      // Check if response is empty
      return [];
    }
    const data = responseJson.filter(
      (results) => results.length > 1, // Exclude top level concepts
    );
    return data.map((items) => ({
      id: items.slice(-1)[0].id,
      label: items.map((item) => item.label).join(" > "),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
