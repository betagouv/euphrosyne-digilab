import { css } from "@emotion/react";

import ObjectGroupMaterialTags from "../../../components/object-group/ObjectGroupMaterialTags";
import { SearchItem } from "../../../types/catalog";

export default function CardStart({ searchItem }: { searchItem: SearchItem }) {
  const { materials } = searchItem;
  return (
    <div>
      {materials && materials.length > 0 ? (
        <ObjectGroupMaterialTags
          materials={
            materials.slice(0, 3).map((material) => material) as string[]
          }
        />
      ) : (
        <div
          css={css`
            height: 2.5em;
          `}
        ></div>
      )}
    </div>
  );
}
