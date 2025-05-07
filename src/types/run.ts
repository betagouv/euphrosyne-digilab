export type ParticleType = "PROTON" | "ALPHA_PARTICLE" | "DEUTON";

interface Detector {
  name: string;
  filters: readonly (string | null)[];
}
interface Method {
  name: string;
  detectors: readonly (Detector | null)[] | null;
}

export interface Run {
  id: string;
  projectSlug: string;
  beamline: string | null;
  energyInKev: number | null;
  label: string;
  particleType: ParticleType | null;
  startDate: Date | null;
  methods: readonly (Method | null)[] | null;
  isDataEmbargoed: boolean;
}
