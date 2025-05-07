interface StatsContainerGeneric<T> {
  [key: string]: T | null;
  all: T | null;
  year: T | null;
}

export interface Stats {
  totalProjects: number;
  totalObjectGroups: number;
  totalHours: number;
}

export type StatsContainer = StatsContainerGeneric<Stats>;

interface StatsResponse {
  total_projects: number | null;
  total_object_groups: number | null;
  total_hours: number | null;
}

export async function fetchStats(): Promise<StatsContainer> {
  const url = `${process.env.NEXT_PUBLIC_EUPHROSYNE_HOST}/api/lab/stats/`;
  let response;

  const stats = {
    all: {
      totalProjects: 0,
      totalObjectGroups: 0,
      totalHours: 0,
    },
    year: {
      totalProjects: 0,
      totalObjectGroups: 0,
      totalHours: 0,
    },
  };

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return stats;
  }
  const statsResponse =
    (await response.json()) as StatsContainerGeneric<StatsResponse>;
  stats.all["totalProjects"] =
    statsResponse.all?.total_projects || stats.all["totalProjects"];
  stats.all["totalObjectGroups"] =
    statsResponse.all?.total_object_groups || stats.all["totalObjectGroups"];
  stats.all["totalHours"] =
    statsResponse.all?.total_hours || stats.all["totalHours"];
  stats.year["totalProjects"] =
    statsResponse.year?.total_projects || stats.year["totalProjects"];
  stats.year["totalObjectGroups"] =
    statsResponse.year?.total_object_groups || stats.year["totalObjectGroups"];
  return stats;
}
