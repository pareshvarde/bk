import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-nukh',
  templateUrl: './nukh.component.html',
  styleUrls: ['./nukh.component.scss']
})

export class NukhComponent implements OnInit {

  constructor() { }

  displayedColumns = ['mainNukh', 'subNukh1', 'subNukh2', 'subNukh3', 'subNukh4',
  'subNukh5', 'subNukh6', 'subNukh7', 'subNukh8',
  'subNukh9', 'subNukh10', 'subNukh11', 'subNukh12'];

  dataSource = new MatTableDataSource<NukhModel>(NUKH_DATA);
  
  ngOnInit() {
  }
}

export interface NukhModel {
  mainNukh: string;
  subNukh1: string;
  subNukh2: string;
  subNukh3: string;
  subNukh4: string;
  subNukh5: string;
  subNukh6: string;
  subNukh7: string;
  subNukh8: string;
  subNukh9: string;
  subNukh10: string;
  subNukh11: string;
  subNukh12: string;
}

const NUKH_DATA: NukhModel[] = [
  {    
    mainNukh: "1. Mehra",
    subNukh1: "Kiri",
    subNukh2: "Mer",
    subNukh3: "Kandhrawara",
    subNukh4: "Rupania",
    subNukh5: "Thathagarh",
    subNukh6: "Maniyar",
    subNukh7: "Darmawadha",
    subNukh8: "Mamtora",
    subNukh9: "Mahawaria",
    subNukh10: "Kharde",
    subNukh11: "Nachaya",
    subNukh12: "Vadhar",
  },
  {
    mainNukh: "2. Tandon",
    subNukh1: "Jogi",
    subNukh2: "Kahirach",
    subNukh3: "Tatariya",
    subNukh4: "Liya",
    subNukh5: "Jada",
    subNukh6: "Tokla",
    subNukh7: "Rasputra",
    subNukh8: "Barva",
    subNukh9: "Kedia",
    subNukh10: "Sandhaiya",
    subNukh11: "Lula",
    subNukh12: "Jesbahar",
  },
  {    
    mainNukh: "3. Kapoor",
    subNukh1: "Rabara",
    subNukh2: "Gaila",
    subNukh3: "Davriya",
    subNukh4: "Medhiya",
    subNukh5: "Sanischara",
    subNukh6: "Goratela",
    subNukh7: "Karatela",
    subNukh8: "Khachiya",
    subNukh9: "Nabhan",
    subNukh10: "Katbamna",
    subNukh11: "Hargan",
    subNukh12: "",
  },
  {
    mainNukh: "4. Sonig",
    subNukh1: "Khakhar",
    subNukh2: "Dagiya",
    subNukh3: "Jarecha",
    subNukh4: "Dedani",
    subNukh5: "Hasarwadha",
    subNukh6: "Dubal",
    subNukh7: "Bagriya",
    subNukh8: "Khakhupotra",
    subNukh9: "Sandhani",
    subNukh10: "Soneji",
    subNukh11: "",
    subNukh12: "",
  },
  {    
    mainNukh: "5. Talwal",
    subNukh1: "Dhandha",
    subNukh2: "Gajkand",
    subNukh3: "Patar",
    subNukh4: "Dor",
    subNukh5: "Taniodha",
    subNukh6: "Tutiya",
    subNukh7: "Arora",
    subNukh8: "Dandara",
    subNukh9: "Amariya",
    subNukh10: "Chundag",
    subNukh11: "Karsal",
    subNukh12: "",
  },
  {
    mainNukh: "6. Chopra",
    subNukh1: "Valera",
    subNukh2: "Chacha",
    subNukh3: "Dhande",
    subNukh4: "Khoha",
    subNukh5: "Chamriya",
    subNukh6: "Kediya",
    subNukh7: "Karchal",
    subNukh8: "Sindhwar",
    subNukh9: "Barbhaiya",
    subNukh10: "Gaviya",
    subNukh11: "Bibori",
    subNukh12: "",
  },
  {    
    mainNukh: "7. Bohra",
    subNukh1: "Dara",
    subNukh2: "Bheda",
    subNukh3: "Khakhuriya",
    subNukh4: "Gumra",
    subNukh5: "Tagrwadha",
    subNukh6: "Babalnidhu",
    subNukh7: "Kesar",
    subNukh8: "Dodiya",
    subNukh9: "Rawat",
    subNukh10: "Tejani",
    subNukh11: "Bhojani",
    subNukh12: "",
  },
  {
    mainNukh: "8. Kakkar",
    subNukh1: "Dalora",
    subNukh2: "Vinchhi",
    subNukh3: "Bichhra",
    subNukh4: "Dhankan",
    subNukh5: "Bhagar",
    subNukh6: "Katkiya",
    subNukh7: "Kakaiya",
    subNukh8: "Machhar",
    subNukh9: "Vahen",
    subNukh10: "Tetar",
    subNukh11: "",
    subNukh12: "",
  },
  {    
    mainNukh: "9. Sethiya",
    subNukh1: "Makdiya",
    subNukh2: "Bosamiya",
    subNukh3: "Warde (Varde)",
    subNukh4: "Nansi",
    subNukh5: "Sunthiya",
    subNukh6: "Someshwar",
    subNukh7: "Varma",
    subNukh8: "Seta",
    subNukh9: "Leha",
    subNukh10: "",
    subNukh11: "",
    subNukh12: "",
  },
  {
    mainNukh: "10. Uppal",
    subNukh1: "Ashra",
    subNukh2: "Jajal",
    subNukh3: "Rajwadha",
    subNukh4: "Vijaniwadha",
    subNukh5: "Mohanwadha",
    subNukh6: "Wamawadha",
    subNukh7: "Nahsarwadha",
    subNukh8: "Padiya",
    subNukh9: "Sodha",
    subNukh10: "Navlakha",
    subNukh11: "Chhanang",
    subNukh12: "",
  },
  {    
    mainNukh: "11. Gangwal",
    subNukh1: "Girachh",
    subNukh2: "Chhunchha",
    subNukh3: "Nirmal",
    subNukh4: "Jagar",
    subNukh5: "Khudkhudiya",
    subNukh6: "Godhiya",
    subNukh7: "Bhoot",
    subNukh8: "Titotandan",
    subNukh9: "",
    subNukh10: "",
    subNukh11: "",
    subNukh12: "",
  },
  {
    mainNukh: "12. Mahendru",
    subNukh1: "Dak",
    subNukh2: "Hanja",
    subNukh3: "Madhu",
    subNukh4: "Dhiniya",
    subNukh5: "Marthak",
    subNukh6: "Jalbhuwadhun",
    subNukh7: "Chhatbar",
    subNukh8: "Kunkna",
    subNukh9: "Vijniya",
    subNukh10: "Soor",
    subNukh11: "",
    subNukh12: "",
  }
];