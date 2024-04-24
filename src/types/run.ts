interface Detector {
  name: string;
  filters: readonly (string | null)[];
}
interface Method {
  name: string;
  detectors: readonly (Detector | null)[] | null;
}

export interface Run {
  beamline: string | null;
  energyInKev: number | null;
  label: string;
  particleType: "PROTON" | "ALPHA_PARTICLE" | "DEUTON" | null;
  startDate: string;
  methods: readonly (Method | null)[] | null;
}
