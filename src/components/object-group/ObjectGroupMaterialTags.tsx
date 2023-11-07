import Tag from "@codegouvfr/react-dsfr/Tag";
import { ellipse } from "../../utils";
import { ObjectGroup } from "../../types/project";

export default function ObjectGroupMaterialTags({
  materials,
}: {
  materials: ObjectGroup["materials"];
}) {
  return (
    <ul className="fr-tags-group">
      {materials.map((material) => (
        <li key={material}>
          <Tag>{ellipse(material, 15)}</Tag>
        </li>
      ))}
    </ul>
  );
}
