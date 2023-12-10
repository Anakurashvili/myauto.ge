import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export default function FilterComponent ({Name, value, setValue, options}){

  // const options = Name === "Brand" ? Brands : Name === "Year" ? Year : Location;
    return <div>
{Name}
{value !== undefined ? <p> Selected: {value.label} </p>: ""}
<div>
<Select
        value={value}
        onChange={setValue}
        options={options}
      />
</div>

        </div>
}


// https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=&ProdYearFrom=2023&CurrencyID=3&MileageType=1&Page=1&undefined=1
// 1. If year is updated --> call above URL/API
// 2. Man's field--> leave empty ((Mans=&)) 
// 3. ProdYearFrom = set it to the year that was selected 