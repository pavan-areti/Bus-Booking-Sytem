import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { styled } from "styled-components";

const SuggestionItem = styled.div`
  padding: 0.5rem 1rem;
  width: 100%;
  color: white;
  border: 1px solid var(--color-grey-light);
  cursor: pointer;
  list-style: none;
  background-color: ${(props) =>
    props.isHighlighted ? "var(--color-primary)" : "black"};

  &:hover {
    background-color: var(--color-primary);
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;

  ul {
    list-style-type: none; // Remove list-style dots
    padding: 0; // Remove default padding
    margin: 0; // Remove default margin
  }
`;

function SearchAutosuggest({
  suggestions,
  onSuggestionSelected,
  placeholder,
  setValue,
  value,
}) {
  const [suggestionsList, setSuggestionsList] = useState([]);

  const renderSuggestion = (suggestion, { isHighlighted }) => (
    <SuggestionItem isHighlighted={isHighlighted}>{suggestion}</SuggestionItem>
  );

  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.toLowerCase();
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValueLower)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const filtered = getSuggestions(value);
    setSuggestionsList(filtered);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const onInputChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder,
    value,
    onChange: onInputChange,
    className: "search-input",
  };

  return (
    <Autosuggest
      suggestions={suggestionsList}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <SuggestionsContainer {...containerProps}>
          {children}
        </SuggestionsContainer>
      )}
    />
  );
}

export default SearchAutosuggest;
