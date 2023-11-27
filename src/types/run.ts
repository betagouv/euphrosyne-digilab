interface Detector {
  name: string;
  filters: readonly (string | null)[];
}
interface Method {
  name: string;
  detectors: readonly Detector[];
}

export interface Run {
  beamline: string;
  energyInKev: number;
  label: string;
  particleType: "PROTON" | "ALPHA_PARTICLE" | "DEUTON" | null;
  startDate: string;
  methods: readonly Method[] | null;
}
