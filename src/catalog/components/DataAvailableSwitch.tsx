import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";

import { ContentProps } from "../../i18n";
import { Filters } from "../../opensearch/useSearch";

export interface DataAvailableSwitchContent {
  label: string;
  status: string;
}

interface DataAvailableSwitchProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function DataAvailableSwitch({
  content,
  filters,
  setFilters,
  ...props
}: DataAvailableSwitchProps &
  ContentProps<DataAvailableSwitchContent> &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">) {
  const { isDataAvailable } = filters;
  return (
    <div {...props}>
      <label className="fr-label" htmlFor="data-available-switch">
        {content.status}
      </label>
      <ToggleSwitch
        inputTitle={content.label}
        label={content.label}
        checked={isDataAvailable}
        onChange={(checked) =>
          setFilters({ ...filters, isDataAvailable: checked })
        }
        showCheckedHint={false}
        id="data-available-switch"
      />
    </div>
  );
}
