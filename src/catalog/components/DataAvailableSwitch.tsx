import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";

import { FiltersProps } from "@/types/catalog";

import { ContentProps } from "../../i18n";

export interface DataAvailableSwitchContent {
  label: string;
  status: string;
}

export default function DataAvailableSwitch({
  content,
  filters,
  setFilters,
  ...props
}: FiltersProps &
  ContentProps<DataAvailableSwitchContent> &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">) {
  const { isDataEmbargoed } = filters;
  return (
    <div {...props}>
      <label className="fr-label" htmlFor="data-available-switch">
        {content.status}
      </label>
      <ToggleSwitch
        inputTitle={content.label}
        label={content.label}
        checked={isDataEmbargoed === false}
        onChange={(checked) =>
          setFilters({ ...filters, isDataEmbargoed: !checked })
        }
        showCheckedHint={false}
        id="data-available-switch"
      />
    </div>
  );
}
