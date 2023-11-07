type Detector = {
  name: readonly string;
  filters: readonly (string | null)[];
};
type Method = {
  name: readonly string;
  detectors: readonly (Detector | null)[];
};

type Run = {
  beamline: readonly string;
  energyInKev: readonly int;
  label: readonly string;
  particleType: readonly "PROTON" | "ALPHA_PARTICLE" | "DEUTON" | null;
  startDate: readonly string;
  methods: readonly (Method | null)[] | null;
};
