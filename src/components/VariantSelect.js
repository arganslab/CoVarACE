import React, { Component } from 'react';
import Select from 'react-select';
import chroma from 'chroma-js';

import './VariantSelect.css';


// check N501Y continent
// deal with multiple origins: L452M, N501Y, S494P, P330S, S477N, A520S, E484Q, A348S, N481K, V362F
// note acronyms or special: USA, England
let variantOptions = require('../data/variantList.json');
variantOptions = variantOptions.slice(0, 2).concat(variantOptions.slice(2).sort(
  (a, b) => parseInt(a.value.slice(1, 4), 10) - parseInt(b.value.slice(1, 4), 10)
));

const customStyles = {
  option: (provided, state) => {
    const themeColor = chroma('#ff4040'); //#65ccb8
    return {
      ...provided,
      backgroundColor: state.isSelected 
        ? themeColor.css() 
        : state.isFocused
        ? themeColor.alpha(0.2).css()
        : 'white',
      color: '#1e1e1e',
      ':active': {
        ...provided[':active'],
        backgroundColor: !state.isDisabled 
          && (state.isSelected ? themeColor.css() : themeColor.alpha(0.4).css()),
      },
    }
  },
}

const geoFilterOption = (option, inputValue) => {
  const { label, value } = option;
  const otherKey = variantOptions.filter(
    opt => opt.label === label 
      && (opt.continent.toUpperCase() === inputValue.toUpperCase()
        || opt.country.toUpperCase() === inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase())
  );
  return label.includes(inputValue) || value.includes(inputValue) || otherKey.length > 0;
};

export default class VariantSelect extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = selectedOption => {
    if (selectedOption != null) {
      this.props.handleVariantSelect(selectedOption.value);
    }
  }

  render() {
    return (
      <div className="variant-select">
        <p>Select a variant:</p>
        <div>
          <Select 
            options={variantOptions} 
            filterOption={geoFilterOption}
            defaultValue={variantOptions[0]}
            onChange={this.handleChange}
            isClearable
            styles={customStyles}
            theme={theme => ({
              ...theme,
              borderRadius: 2,
              colors: {
                ...theme.colors,
                primary: '#ff4040', //#65ccb8
              },
            })}
          />
        </div>
      </div>
    );
  }
}
