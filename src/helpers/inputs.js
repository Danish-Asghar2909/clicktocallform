import React from 'react';

export const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }
} 

export const renderInput = ({ input, label, meta, type }) => {
  return (
    <div className="field">
      <label htmlFor={input.name}>{label}</label>
      <input {...input} type={type} autoComplete="off" id={input.name} />
      {renderError(meta)}
    </div>
  );
}

export const renderInputRadio = ({ input, label, meta, type }) => {
  return (
    <div className="radio">
      <input {...input} type={type} id={input.value} />
      <label htmlFor={input.value}>{label}</label>
      {label === 'Female'
        ? renderError(meta)
        : null
      }
    </div>
  );
}

export const renderInputSelect = ({ input, label, meta, country }) => {
  return (
    <div className="select">
      <label htmlFor={input.name}>{label}</label>
      <select {...input} id={input.name}>
        <option disabled value="">{`Select ${label}`}</option>
        {input.name === 'country'
          ? countries.map(country =>
            <option key={country} value={country}>{country}</option>
          )
          : states[country].map(state =>
            <option key={state} value={state}>{state}</option>
          )
        }
      </select>
      {renderError(meta)}
    </div>
  );
}

const countries = [
  'United States',
  'El Salvador'
];

const states = {
  UnitedStates: [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ],
  ElSalvador: [
    'Ahuachapán',
    'Cabañas',
    'Chalatenango',
    'Cuscatlán',
    'La Libertad',
    'La Paz',
    'La Unión',
    'Morazán',
    'San Miguel',
    'San Salvador',
    'San Vicente',
    'Santa Ana',
    'Sonsonate',
    'Usulután'
  ]
}