import Image from "next/image";

import cCByLogo from "../../public/images/cc-by-logo.svg";
import cCLogo from "../../public/images/cc-logo.svg";

export default function CCByLogos() {
  return (
    <>
      <Image
        src={cCLogo}
        style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }}
        alt="Creative Commons"
      />
      <Image
        src={cCByLogo}
        style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }}
        alt="By Attribution"
      />
    </>
  );
}
