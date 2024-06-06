import Tag from "@codegouvfr/react-dsfr/Tag";

import { ObjectGroup } from "../../types/project";
import { ellipse } from "../../utils";

export default function ObjectGroupMaterialTags({
  materials,
}: {
  materials: ObjectGroup["materials"];
}) {
  return (
    <ul className="fr-tags-group">
      {(materials || []).map((material) => (
        <li key={`objectgroup-material-${material}-tag`}>
          <Tag>{ellipse(material, 15)}</Tag>
        </li>
      ))}
    </ul>
  );
}
