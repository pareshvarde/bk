import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  constructor() { }

  dataSource = new MatTableDataSource<OrgModel>(ORG_DATA);

  ngOnInit() {
  }

}

export interface OrgModel {
  name: string;
  contactPerson: string,
  phoneNumber: string,
  emailAddress: string,
  address: string;
  city: string,
  state: string,
  country: string,
  estOn: string
}

const ORG_DATA: OrgModel[] = [
  {
    name: "Marwari Brahmkshatriya Samaj, Daheli",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Samaj Bhavan",
    city: "Daheli (Ankleshwar)",
    state: "Gujarat",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Marwadi Khatri Samaj",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "New Mumbai",
    city: "New Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Co-Operative Credit Society",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "30 Panjrapole Lane",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Divecha Panch ",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Harichand Roopchand Wadi, 68, Kika Street, Gulal Wadi",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Sampark Samaj",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Messrs. Nyloan Bangles, Ramchandra Lane, Kachpada, Malad West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Vidhyotejak Mandal",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Messrs. B. Kantilal & Co. 70/101, Krishna Galli, Swadeshi Market, Kalbadevi",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Ghatkopar Sneh Sanghathan Samiti ",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "9, Dilkush, Vallabhbaug Lane, Ghatkopar East",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Halai Brahmkshatriya Mahila Mandal",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Shri Halai Brahmkshatriya Panch Wadi, 151, Panjrapole Road",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Halai Brahmkshatriya Panch",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Shri Halai Brahmkshatriya Panch Wadi, 151, Panjrapole Road",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Kutchhi Brahmkshatriya Panchayat",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "31, 3rd Panjra Pole Lane",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Kutchhi Brahmkshatriya Yuvak Sangh",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Shri Kutchhi Brahmkshatriya Wadi, 31, 3rd Panjrapole Lane",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Mulund Brahmkshatriya Samaj",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "17, Majethiya Bhuvan, Opp. Gyansarita School, Netaji Subhash Road, Mulund West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Samast Brahmkshatriya Sanghathan",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "103, Shantiniketan, Modi Patel Road, Bhayander West",
    city: "Thane, Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Samast Brahmkshatriya Yuva Pragati",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "27, Pokar Niwas,Gandhi Nagar,L.B.S.Marg, Ghatkopar West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Sorthiya Brahmkshatriya Panch",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Shri Sorathiya Brahmkshatriya Panch Wadi, 3rd Panjrapole Lane",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Uttar Gujarat Brahmkshatriya Hitwardhak Mandal",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "B-21, Mallinath Co-Op. Society, Amrutnagar, Mahatama Gandhi Road, Kandivli West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Uttar Gujarat Brahmkshatriya Mahila Mandal",
    contactPerson: "Nirmlaben Bhaghubhai Madhu",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "53A/10, Shishumahal Co-Operative Society, Jawahar Road No. 6, Goregaon West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Nyati",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Khatrion Ka Nichala Bas",
    city: "Barmer",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Hitkarini Sabha",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Bikaner",
    city: "Bikaner",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatri Samaj",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Jaisalmer",
    city: "Jaisalmer",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Akhil Bhartiya Marwari Brahmkshatriya Mahasabha",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "7, Khejerla House, Paota",
    city: "Jodhpur",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya (Marwari) Yuvak Parishad",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Behind Vishwakarma Temple, Jalori Bari",
    city: "Jodhpur",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Bhawan Trust",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Near Geeta Bhawan, Sardarpura",
    city: "Jodhpur",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Navyuvak Mandal",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "3, Heavy Industrial Area, JODHPUR",
    city: "Jodhpur",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Jodhpur Brahmkshatriya Samaj Sanstha",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "45, Shanti Priya Nagar, Near Chopasni Housing Board",
    city: "Jodhpur",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Navyuvak Mandal",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Sanchore",
    city: "Sanchore",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  },
  {
    name: "Shri Brahmkshatriya Samaj",
    contactPerson: "<NOT AVAILALBE>",
    phoneNumber: "<NOT AVAILALBE>",
    emailAddress: "<NOT AVAILALBE>",
    address: "Sanchore",
    city: "Sanchore",
    state: "Rajasthan",
    country: "India",
    estOn: "<NOT AVAILABLE>"
  }
];
