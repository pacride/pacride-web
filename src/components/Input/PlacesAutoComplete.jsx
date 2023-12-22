import "./PlacesAutoComplete.css";
import "./Input.css";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutoComplete = ({ placeholder }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
  };

  return (
    <div className="custom__input__wrapper places__auto__complete">
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          className="custom__input"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={placeholder}
        />
        <ComboboxPopover style={{ borderRadius: "0.5rem", marginTop: 5 }}>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default PlacesAutoComplete;
