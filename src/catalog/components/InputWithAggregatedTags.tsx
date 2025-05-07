import { Input } from "@codegouvfr/react-dsfr/Input";
import { Tag, TagProps } from "@codegouvfr/react-dsfr/Tag";
import React, { useEffect, useState } from "react";

import { AggregatedField, fetchAggregatedTags } from "../../clients/search";
import { useDebounce } from "../../hooks/useDebounce";

interface InputWithAggregatedTagsProps {
  field: AggregatedField;
  inputLabel: string;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function InputWithAggregatedTags({
  field,
  inputLabel,
  onTagsChange,
  selectedTags,
  ...props
}: InputWithAggregatedTagsProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const [inputValue, setInputValue] = useState<string>("");
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [tags, setTags] = useState<string[]>([]);
  const onTagPressed = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    onTagsChange([...selectedTags, tag]);
  };
  const onTagUnpressed = (tag: string) => {
    setTags([...tags, tag]);
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  const debouncedFetch = useDebounce(() => {
    fetchAggregatedTags(field, inputValue, selectedTags).then((response) => {
      const results = response
        .map((bucket) => bucket.key.toString())
        .slice(0, 5);
      setTags(results);
    });
  }, 300);

  useEffect(() => {
    debouncedFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div {...props}>
      <Input
        label={inputLabel}
        className="fr-mb-2v"
        nativeInputProps={{
          onChange: onInputChange,
          value: inputValue,
        }}
        iconId="fr-icon-search-line"
      />
      <div>
        {selectedTags.map((tag) => (
          <AggregatedTag
            className="fr-mb-1v"
            key={`selected-aggregated-tag-${tag}`}
            pressed
            nativeButtonProps={{
              onClick: () => onTagUnpressed(tag),
            }}
            label={tag}
          />
        ))}
        {tags.map((tag) => (
          <AggregatedTag
            key={`aggregated-tag-${tag}`}
            nativeButtonProps={{
              onClick: () => {
                onTagPressed(tag);
              },
            }}
            label={tag}
          />
        ))}
      </div>
    </div>
  );
}

function AggregatedTag(props: { label: string } & Omit<TagProps, "children">) {
  const { label, nativeButtonProps, pressed } = props;
  return (
    <React.Fragment>
      {label.length > 15 && (
        <span
          className="fr-tooltip fr-placement"
          id={`${label}-tooltip`}
          role="tooltip"
          aria-hidden="true"
        >
          {label}
        </span>
      )}
      <Tag
        className="fr-mb-1v"
        pressed={pressed}
        nativeButtonProps={nativeButtonProps}
        aria-describedby={`${label}-tooltip`}
      >
        {label.length > 15 ? label.slice(0, 15) + "..." : label}
      </Tag>
    </React.Fragment>
  );
}
