type Detector = {
  name: string;
  filters: string[];
};
type Method = {
  name: string;
  detectors: Detector[];
};

type Run = {
  beamline: string;
  energyInKev: int;
  label: string;
  particleType: "PROTON" | "ALPHA" | "DEUTON";
  startDate: string;
  methods: Method[];
};
