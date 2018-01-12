import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.scss']
})
export class TempleComponent implements OnInit {

  constructor() { }

  displayedColumns = ['mainNukh', 'subNukh1', 'subNukh2', 'subNukh3', 'subNukh4',
  'subNukh5', 'subNukh6', 'subNukh7', 'subNukh8',
  'subNukh9', 'subNukh10', 'subNukh11', 'subNukh12'];

  dataSource = new MatTableDataSource<TempleModel>(TEMPLE_DATA);

  ngOnInit() {
  }

}

export interface TempleModel {
  name: string;
  image: string,
  latitude: string;
  longitude: string;
  address: string;
  city: string,  
  state: string,
  country: string
  contactName: string;
  phoneNumber: string;  
}

const TEMPLE_DATA: TempleModel[] = [
  {    
    name: "Shakti Peeth Shri Hinglaj Mata",
    image: "baluchistan.jpg",
    latitude: "25.509673",
    longitude: "65.5118986",
    address: "Hingol Park Road, Pakistan",
    city: "Lyari Tehsil",
    state: "Balochistan",
    country: "Pakistan",
    contactName: "<NOT AVAILABLE>",
    phoneNumber: "<NOT AVAILABLE>"
  },
  {    
    name: "Hinglaj Mata Temple",
    image: "barmer.jpg",
    latitude: "25.7579066",
    longitude: "71.3833546",
    address: "Indra Nagar",
    city: "Barmer",
    state: "Rajasthan",
    country: "India",
    contactName: "<NOT AVAILABLE>",
    phoneNumber: "<NOT AVAILABLE>"
  },
  {    
    name: "Hinglaj Mata Mandir",
    image: "bhagli.jpg",
    latitude: "25.1260852",
    longitude: "73.2166689",
    address: "Bhagli",
    city: "Bhagli",
    state: "Rajasthan",
    country: "India",
    contactName: "<NOT AVAILABLE>",
    phoneNumber: "<NOT AVAILABLE>"    
  },
  {    
    name: "Hinglaj Mandir",
    image: "jodhpur.jpg",
    latitude: "26.270186",
    longitude: "72.9128087",
    address: "Chopasani Rd, Shanti Priya Nagar, Shyam Nagar",
    city: "Jodhpur",
    state: "Rajastha",
    country: "India",
    contactName: "<NOT AVAILABLE>",
    phoneNumber: "<NOT AVAILABLE>"
  },
  {    
    name: "Hinglaj Mandir",
    image: "daheli.jpg",
    latitude: "21.5612752",
    longitude: "73.2183229",
    address: "Samaj Bhavan, Daheli",
    city: "Daheli",
    state: "Gujarat",
    country: "India",
    contactName: "<NOT AVAILABLE>",
    phoneNumber: "<NOT AVAILABLE>"
  },
  {    
    name: "Hinglaj Mandir, Daheli",
    image: "noImage.jpg",
    latitude: "121.445454",
    longitude: "-80.454541",
    address: "Samaj Bhavan",
    city: "Daheli",
    state: "Gujarat",
    country: "India",
    contactName: "Paresh Varde",
    phoneNumber: "9970339703"    
  },
  {    
    name: "Hinglaj Mandir, Daheli",
    image: "noImage.jpg",
    latitude: "121.445454",
    longitude: "-80.454541",
    address: "Samaj Bhavan",
    city: "Daheli",
    state: "Gujarat",
    country: "India",
    contactName: "Paresh Varde",
    phoneNumber: "9970339703"    
  },
  {    
    name: "Hinglaj Mandir, Daheli",
    image: "noImage.jpg",
    latitude: "121.445454",
    longitude: "-80.454541",
    address: "Samaj Bhavan",
    city: "Daheli",
    state: "Gujarat",
    country: "India",
    contactName: "Paresh Varde",
    phoneNumber: "9970339703"    
  },
  {    
    name: "Hinglaj Mandir, Daheli",
    image: "noImage.jpg",
    latitude: "121.445454",
    longitude: "-80.454541",
    address: "Samaj Bhavan",
    city: "Daheli",
    state: "Gujarat",
    country: "India",
    contactName: "Paresh Varde",
    phoneNumber: "9970339703"    
  },
  {    
    name: "Hinglaj Mandir, Daheli",
    image: "noImage.jpg",
    latitude: "121.445454",
    longitude: "-80.454541",
    address: "Samaj Bhavan",
    city: "Daheli",
    state: "Gujarat",
    country: "India",
    contactName: "Paresh Varde",
    phoneNumber: "9970339703"    
  },
  {    
    name: "Hinglaj Mandir, Daheli",
    image: "noImage.jpg",
    latitude: "121.445454",
    longitude: "-80.454541",
    address: "Samaj Bhavan",
    city: "Daheli",
    state: "Gujarat",
    country: "India",
    contactName: "Paresh Varde",
    phoneNumber: "9970339703"    
  },
  {    
    name: "Hinglaj Mandir, Daheli",
    image: "noImage.jpg",
    latitude: "121.445454",
    longitude: "-80.454541",
    address: "Samaj Bhavan",
    city: "Daheli",
    state: "Gujarat",
    country: "India",
    contactName: "Paresh Varde",
    phoneNumber: "9970339703"    
  }
];