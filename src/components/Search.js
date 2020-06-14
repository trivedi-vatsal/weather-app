import React, { useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const Search = (props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
  const ref = useRef();
  useOnclickOutside(ref, () => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
        let coord = [lat, lng];
        props.onCity(coord);
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="dropdown-item"
          key={id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  <img
                    className="img-fluid"
                    src="./img/location.svg"
                    alt=""
                    width="20px"
                  />
                </span>
              </div>
              <input
                type="search"
                className="form-control border-right-0 border-left-0"
                aria-label="city"
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Enter location to get weather forecast"
              />
              {status === "OK" && (
                <div className="dropdown-menu show">{renderSuggestions()}</div>
              )}
              <div className="input-group-append">
                <span className="input-group-text bg-white">
                  <img
                    className="img-fluid"
                    src="./img/search.svg"
                    alt=""
                    width="20px"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
