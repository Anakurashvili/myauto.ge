import logo from './logo.svg';
import './App.css';
import FilterComponent from './FilterComponent';
import {useState, useEffect} from 'react';
function App() {
  const [count, setCount] = useState (0);
  const [brand, setBrand] = useState ("");
  const [products, setProducts] = useState ([]);
  const [year_from, setYear_from] = useState ("");
  const [year_to, setYear_to] = useState ("");
  const [location, setLocation] = useState ("");
  const Brands_to_id ={
    Toyota: 41,
    Mercedes: 25,
    Ford: 12,
    BMW: 3,
  } 
 
  useEffect (()=>{
    let id = ""
    if (brand !== undefined ) {
      console.log ("my listener is running" )
      id=Brands_to_id [brand.value]
      // Brands_to_id.Ford === Brands_to_id["Ford"] 
      }
      APIRequestCount (id || "", year_from.value || "", year_to.value || "", location.value || "")

    }, [brand, year_from, year_to, location ])

    async function APIRequestCount (id, year_from, year_to, location) {
      console.log (id, year_from, year_to, location)
      // const response= await fetch (`https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=${id}&CurrencyID=3&MileageType=1&Page=1&undefined=1`,
      const response = await fetch (`https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=${id}&ProdYearFrom=${year_from}&ProdYearTo=${year_to}&CurrencyID=3&MileageType=1&Page=1&Locs=${location}
      =1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      );
      const data= await response.json ()
      console.log ("here is the count response", data)
      setCount (data.data[0].count) 
    }

    async function APIRequestSearch (id, year_from, year_to, location) {
      console.log (id, year_from, year_to, location)
      // const response= await fetch (`https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=${id}&CurrencyID=3&MileageType=1&Page=1&undefined=1`,
      const response = await fetch (`https://api2.myauto.ge/ka/products?TypeID=0&ForRent=0&Mans=${id}&ProdYearFrom=${year_from}&ProdYearTo=${year_to}&CurrencyID=3&MileageType=1&Page=1&Locs=${location}
      =1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      );
      const data= await response.json ()
      console.log ("here is the search response", data)
      setProducts (data.data.items)
    }


  return (
    <div className="App">
      <div className= "Header"> 
        <div className= "Left"> 
        Ana's Auto
        </div>  
        <div className= "Right">
        Links
        </div>
      </div>
      <div className= "Content">
     <FilterComponent Name={"Brand"} value={brand} setValue={setBrand} options={
      [
        { value: 'Toyota', label: 'Toyota'},
        { value: 'Mercedes', label: 'Mercedes' },
        { value: 'Ford', label: 'Ford' },
        { value: 'BMW', label: 'BMW' },

      ]
     } /> 
<div className = "date-wrapper">
     <FilterComponent Name={"Year_from"} value={year_from} setValue={setYear_from} options={
       [
        { value: '2023', label: '2023'},
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' },
        { value: '2020', label: '2020' },
     ]
      
     } />

<FilterComponent Name={"Year_to"} value={year_to} setValue={setYear_to} options={
       [
        { value: '2023', label: '2023'},
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' },
        { value: '2020', label: '2020' },
     ]
      
     } />
</div>
<FilterComponent Name={"location"} value={location} setValue={setLocation} options={
       [
          { value: '2', label: 'Tbilisi'},
          { value: '3', label: 'Kutaisi' },
          { value: '4', label: 'Batumi' },
          { value: '7', label: 'Poti' },
     ]
      
     } />
      <p>
       Number of results: 
        {
          count
        }
      </p>

        <div className="Search_Button" onClick={()=>{

          let id = ""
          if (brand !== undefined ) {
            console.log ("my listener is running" )
            id=Brands_to_id [brand.value]
            // Brands_to_id.Ford === Brands_to_id["Ford"] 
            }
            APIRequestSearch (id || "", year_from.value || "", year_to.value || "", location.value || "")

          }}>
          Search {count} results
          </div>
          <h2>
           Results
          </h2>
          {products.map(function(product, index){
            return <CarItem 
                product ={product}  
                index={index}
                />; })}
        </div>
    </div>
  );
}

const CarItem = ({
  product, index
}) => {
const [images, setImages] = useState ([]);

useEffect (()=> {
  constructPhotoURL ()
}, [])
    function constructPhotoURL () {
            const _images= []
      for (var i=0; i< product.pic_number; i++) {
        let PhotoURL = `https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.car_id}_${i+1}.jpg?v=0`
        _images.push (PhotoURL)
      }
      setImages ([..._images])
  }
  console.log ("images", images)
  console.log ("product", product.pic_number)
  return (
    <div className='Car_Item'>
      {images.map (function(imageURL, i){
        return <img src={imageURL} width={"150px"} height={"100"} />
      }) 

      }
      <p>
      Price {product.price} 
      </p>
    </div>
  )
}
export default App;