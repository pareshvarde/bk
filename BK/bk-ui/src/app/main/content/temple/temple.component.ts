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
];