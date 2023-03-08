// import React from 'react';
import React, {Component, useState} from 'react';
import {
  MDBCardImage,
} from 'mdb-react-ui-kit';
import house1 from "../imgs/house1.jpg";
import house2 from "../imgs/nuevo-east.jpg";
import CardItem from './card';
import LaJollaMap from './map'; 
import axios from 'axios';
import PropertyPopup from './propertyPopup'


const default_flat_list = [{"property": {
                                        "_id": "1", 
                                        "name": "Mirada at La Jolla Colony Apartments[test]", 
                                        "cost": "2600", 
                                        "address": null, 
                                        "latitude": 32.866220000000000, 
                                        "longitude": -117.226360000000000, 
                                        "num_bedrooms": 1, 
                                        "num_bathrooms": 1, 
                                        "street_address": "7568 Charmant Dr", 
                                        "secondary_street_address": "", 
                                        "city": "San Diego", 
                                        "state": "CA", 
                                        "zipcode": 92092, 
                                        "img_id": "7568CharmantDr.jpg", 
                                        "desc": "Mirada at La Jolla Colony Apartments is located at 7568 Charmant Drive San Diego, CA and is managed by TIAA-CREF - Pinnacle Family of Companies, a reputable property management company with verified listings on RENTCafe. Mirada at La Jolla Colony Apartments offers 1 to 2 bedroom apartments ranging in size from 535 to 925 sq.ft. Amenities include BBQ/Picnic Area, Bike Racks, Business Center, Cable Ready, Ceiling Fan and more. This rental community is pet friendly, welcoming both cats and dogs. Property is located in the 92122 ZIP code.", 
                                        "contact_info": null}, 
                                        "miles": 0.8003237575172774},
                                        
                                        {"property": {"_id": "64082c73617ed7ce58fb89d7", "name": "La Jolla Palms Apartment Homes[test]", "cost": "3435", "address": null, "latitude": "32.869710000000000", "longitude": "-117.223450000000000", "num_bedrooms": 2, "num_bathrooms": 2, "street_address": "3535 Lebon Dr", "secondary_street_address": "", "city": "San Diego", "state": "CA", "zipcode": 92122, "img_id": "3535LebonDr.jpg", "desc": "In one of San Diego's most sought-after locations, this tech-connected community is near neighborhood eateries, UCSD Health and iconic white sand beaches. Modern homes designed for wellness offer dramatic picture windows and private outdoor space.", "contact_info": null}, "miles": 0.8047387367532339}, 
                                        {"property": {"_id": "64082d9b617ed7ce58fb89d8", "name": "La Jolla International Gardens[test]", "cost": "2,545+", "address": null, "latitude": "32.866711000000000", "longitude": "-117.223991000000000", "num_bedrooms": 1, "num_bathrooms": 1, "street_address": "3417 Lebon Dr", "secondary_street_address": "", "city": "San Diego", "state": "CA", "zipcode": 92122, "img_id": "3417LebonDr.jpg", "desc": "Our apartments are newly renovated with all new cabinetry, countertops, appliances, fixtures and flooring. The units have fully equipped kitchens, ceiling fans, wood burning fireplaces and spacious walk in closets. Dramatic vaulted ceilings are in all top floor homes. Reserved underground parking spaces are assigned to all units. All applicants are required to submit a rental application, authorize a credit and background check, and pay a $45 application fee. We are just minutes from La Jolla Cove, UCSD, major freeways, shopping centers, theaters, restaurants and beautiful beaches. You can have it all at La Jolla International Gardens!", 
                                        "contact_info": null
                                      }, "miles": 0.8825049502283719}]

export default class Cards extends Component {

  constructor(props) {
    super(props);
    this.state ={
      flats: [],
      coords: []
      //componentDidMount_run: false

    }
  }
  // runs one time when rendered
  componentDidMount(){
    console.log("Cards- didMount")
    // console.log("search_query: "+ this.props.search_query.replace(/ /g,"_"))
    // Get request to backend: It hits Django backedn and the text after search/ is the search query with _ instead of spaces
    const search_url_part = this.props.search_query ? this.props.search_query.replace(/ /g,"_") : "UC_San_Diego"
    const url_ = "http://127.0.0.1:8000/api/property/search/" + search_url_part
    console.log("url_: "+ url_)
    axios.get(url_)
    .then( (response) => {
      console.log("DidMount: ", response)
      // Get array of coordinates
      var data = response.data.list
      var coordinates = []
      var i ;
      for(i=0; i < data.length; i++){
        var lat = data[i].property.latitude
        var long = data[i].property.longitude
        var property_name = data[i].property.name
        coordinates.push(
          {
            latitude: lat,
            longitude: long,
            name:property_name            
          }
        )
      }
      // console.log("DidMount-coord: ", coordinates)

      this.setState({
        flats: response.data.list,
        coords: coordinates,
        search_query: this.props.search_query, // to keep track of updated search
        componentDidMount_run: true // to keep track of firs time the page is loaded, otherwise shouldUpdate thinks it's the same query and does not update

      });
    })
    .catch( (error) => {
        console.log(error);
        this.setState({
          flats: default_flat_list,
          // coords:  []
          coords: [{
            latitude: 32.866220000000000,
            longitude: -117.226360000000000,
            name:"test"
          }]
        });
    });

  }

  // runs every time before rendering
  // static getDerivedStateFromProps(props, state) {

  //   if(props.search_query !== state.search_query){
  //       //Change in props
  //       console.log("[getDerivedStateFromProps]")
  //       console.log("[state.search_query]"+ state.search_query)
  //       console.log("[props.search_query]"+ props.search_query)

  //       // ---------- GET NEW LIST OF FLATS ---------------
  //       const search_url_part = props.search_query ? props.search_query.replace(/ /g,"_") : "UC_San_Diego"
  //       const url_ = "http://127.0.0.1:8000/api/property/search/" + search_url_part

  //       axios.get(url_)
  //       .then( (response) => {
  //         console.log("DidMount: ", response)
  //         // Get array of coordinates
  //         var data = response.data.list
  //         var coordinates = []
  //         var i ;
  //         for(i=0; i < data.length; i++){
  //           var lat = data[i].property.latitude
  //           var long = data[i].property.longitude
  //           var property_name = data[i].property.name
  //           coordinates.push(
  //             {
  //               latitude: lat,
  //               longitude: long,
  //               name:property_name
    
  //             }
  //           )
  //         }
  //         // console.log("DidMount-coord: ", coordinates)
    
  //         return {
  //           flats: response.data.list,
  //           coords: coordinates,
  //           search_query: props.search_query // to keep track of updated search
  //         };
  //       })
  //       .catch( (error) => {
  //           console.log(error);
  //           return{
  //             flats: default_flat_list,
  //             // coords:  []
  //             coords: [{
  //               latitude: 32.866220000000000,
  //               longitude: -117.226360000000000,
  //               name:"test"
  //             }]
  //           };
  //       });
  //       // ------------------------------------------------
  //       return{          
  //         search_query: props.search_query
  //       };
  //   }
  //   return null; // No change to state
  // }

  // compares current state and next, if query is changed, then it updates state (this) and then returns true meaning that it should re render
  shouldComponentUpdate(nextProps, nextState) {
    // Rendering the component only if 
    // passed props value is changed
    console.log("[shouldUpdate]")
    console.log("nextProps.search_query: ", nextProps.search_query )
    console.log("this.props.search_queryy: ", this.props.search_query )
    console.log("nextState: ", nextState )

    if (nextState.componentDidMount_run) {
      console.log("[nextState.componentDidMount_run] " + nextState.componentDidMount_run)
      this.setState({componentDidMount_run: false});
      return true
    }

    if (nextProps.search_query !== this.props.search_query) {

      // reset flag? 
      // this.setState({componentDidMount_run: false});

      // ---------- GET NEW LIST OF FLATS ---------------
      const search_url_part = nextProps.search_query ? nextProps.search_query.replace(/ /g,"_") : "UC_San_Diego"
      const url_ = "http://127.0.0.1:8000/api/property/search/" + search_url_part
      console.log("url_: "+ url_)
      axios.get(url_)
      .then( (response) => {
        console.log("Updating!", response)
        // Get array of coordinates
        var data = response.data.list
        var coordinates = []
        var i ;
        for(i=0; i < data.length; i++){
          var lat = data[i].property.latitude
          var long = data[i].property.longitude
          var property_name = data[i].property.name
          coordinates.push(
            {
              latitude: lat,
              longitude: long,
              name:property_name
  
            }
          )
        }
        // console.log("DidMount-coord: ", coordinates)
  
        this.setState({
          flats: response.data.list,
          coords: coordinates,
          search_query: nextProps.search_query, // to keep track of updated search
          componentDidMount_run: false 
        });
      })
      .catch( (error) => {
          console.log(error);
          this.setState({
            flats: default_flat_list,
            // coords:  []
            coords: [{
              latitude: 32.866220000000000,
              longitude: -117.226360000000000,
              name:"test"
            }],
            componentDidMount_run: false
          });
      });
      // ------------------------------------------------

      return true;
    } 
    // else if (nextState.componentDidMount_run){
    //   return true;
    // }
    else {
      return false;
    }
  }


      
  

  render()  {
        // console.log("this.state.flats" + this.state.flats)
        return (
          <>
          <div className="row">
            {console.log("Cards rendred")}
          <div className="left-pane-search">
            {
              this.state.flats.map(
                (flat, index) => (
                // <CardItem title={"Aparment X"} short_desc=
                //                               {
                //                                 "Distance: " + flat.miles + " miles\n" +
                //                                "Latitude: " + flat.property.latitude + "\n" +
                //                                "longitude: " + flat.property.longitude + "\n" 
                //                               } 
                //                               btn_txt={"Show"} img={house1}/> 
                // )
                <CardItem title={flat.property.name} 
                          // short_desc={flat.property.desc} 
                          details={"Price: $"+flat.property.cost+
                                   " Distance: "+flat.miles.toFixed(2)+" miles."+
                                   " Beds: "+flat.property.num_bedrooms+
                                   " Bathrooms: "+ flat.property.num_bathrooms
                                  }
                          btn_txt={"Show"} 
                          img={flat.property.img_id ? require("../imgs/"+flat.property.img_id): require("../imgs/house1.jpg") }

                          btn_comp= {<PropertyPopup miles={flat.miles} data={flat.property} />} //This is the popup component that shows the "SHOW MORE" button
                        
                        /> 
                )
              )
            }                        
          </div>
          {/* <div className="right-pane-search">     */}
          <div>
            <LaJollaMap marks={this.state.coords}/>
          </div>

          </div> {/*  end of row */}
          
          </>
        );
 }
}

