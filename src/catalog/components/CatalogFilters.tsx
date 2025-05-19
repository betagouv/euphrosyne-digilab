"use client";

import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import Input from "@codegouvfr/react-dsfr/Input";
import { useContext } from "react";

import { ContentProps } from "../../i18n";
import { CatalogContext } from "../CatalogContext";
import CreatedRange, { CreatedRangeContent } from "./CreatedRange";
import DataAvailableSwitch, {
  DataAvailableSwitchContent,
} from "./DataAvailableSwitch";
import {
  DiscoveryPlaceFilter,
  DiscoveryPlaceFilterContent,
} from "./DiscoveryPlaceFilter";
import EraFilter, { EraFilterContent } from "./EraFilter";
import InputWithAggregatedTags from "./InputWithAggregatedTags";
import PeriodFilter, { PeriodFilterContent } from "./PeriodFilter";

export interface CatalogFiltersContent {
  project: string;
  objectGroup: string;
  itemType: string;
  materials: string;
  inventory: string;
  collection: string;
  discoveryPlaceFilter: DiscoveryPlaceFilterContent;
  periodFilter: PeriodFilterContent;
  createdRange: CreatedRangeContent;
  dataAvailableSwitch: DataAvailableSwitchContent;
  datingFilters: PeriodFilterContent & EraFilterContent;
}

export default function CatalogFilters({
  content,
}: ContentProps<CatalogFiltersContent>) {
  const { filters, setFilters } = useContext(CatalogContext);

  const itemTypeOptions: [
    string,
    "objectGroupsSelected" | "projectsSelected",
  ][] = [
    [content.project, "projectsSelected"],
    [content.objectGroup, "objectGroupsSelected"],
  ];

  return (
    <div>
      <DataAvailableSwitch
        content={content.dataAvailableSwitch}
        filters={filters}
        setFilters={setFilters}
        className="fr-mb-1w"
      />
      <Checkbox
        legend={content.itemType}
        options={itemTypeOptions.map(([label, propertyName]) => ({
          label,
          nativeInputProps: {
            name: "object-types",
            value: label,
            onChange: (e) => {
              setFilters({
                ...filters,
                [propertyName]: e.target.checked,
              });
            },
            checked: filters[propertyName],
          },
        }))}
        orientation="horizontal"
      />
      <InputWithAggregatedTags
        inputLabel={content.materials}
        field="materials"
        selectedTags={filters.materials || []}
        onTagsChange={(materials) =>
          setFilters({
            ...filters,
            materials,
          })
        }
      />
      <DiscoveryPlaceFilter
        className="fr-mt-2w"
        filters={filters}
        setFilters={setFilters}
        content={content.discoveryPlaceFilter}
      />
      <PeriodFilter
        className="fr-mt-2w"
        filters={filters}
        setFilters={setFilters}
        content={content.datingFilters}
      />
      <EraFilter
        className="fr-mt-2w"
        filters={filters}
        setFilters={setFilters}
        content={content.datingFilters}
      />
      <Input
        className="fr-mt-2w"
        label={content.collection}
        nativeInputProps={{
          onChange: (e) =>
            setFilters({
              ...filters,
              collection: e.target.value,
            }),
          value: filters.collection,
        }}
      />
      <Input
        className="fr-mt-2w"
        label={content.inventory}
        nativeInputProps={{
          onChange: (e) =>
            setFilters({
              ...filters,
              inventory: e.target.value,
            }),
          value: filters.inventory,
        }}
      />
      <CreatedRange
        content={content.createdRange}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
