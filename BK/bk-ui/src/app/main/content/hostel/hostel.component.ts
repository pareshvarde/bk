import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.scss']
})
export class HostelComponent implements OnInit {

  constructor() { }

  dataSource = new MatTableDataSource<HostelModel>(TEMPLE_DATA);

  ngOnInit() {
  }

}

export interface HostelModel {
  name: string;
  contactPerson: string,
  phoneNumber: string,
  emailAddress: string,
  address: string;
  city: string,
  state: string,
  country: string,
  estOn: string,
  courses: string,
  admissionStartsOn: string,
  lastDateOfApplication: string,
  sessionStartsOn: string
}

const TEMPLE_DATA: HostelModel[] = [
  {
    name: "Late Ramji Pragji Padia Brahmkshatriya Vidyarthi Bhawan",
    contactPerson:"<NOT AVAILABLE>",
    phoneNumber:"<NOT AVAILABLE>",
    emailAddress:"<NOT AVAILABLE>",
    address: "Monghibai Building, Station Road",
    city: "Amereli",
    state:"Gujarat",
    country: "India",
    estOn: "1938",
    courses: "8th Onwards",
    admissionStartsOn: "1st May",
    lastDateOfApplication: "25th May",
    sessionStartsOn: "June"
  },
  {
    name: "Shri Tejaji Pharasram Kharawala Brahmkshatriya Vidyarthi Bhawan",
    contactPerson:"<NOT AVAILABLE>",
    phoneNumber:"<NOT AVAILABLE>",
    emailAddress:"<NOT AVAILABLE>",
    address: "First Garnala",
    city: "Patan",
    state:"Gujarat",
    country: "India",
    estOn:"1941",
    courses:"8th Onwards",
    admissionStartsOn:"1st April",
    lastDateOfApplication:"31st May",
    sessionStartsOn:"June"
  },
  {
    name: "Shri Keshavji Morarji Liya (Mod Padia) Free Brahmkshatriya Vidyarthi Bhawan",
    contactPerson:"<NOT AVAILABLE>",
    phoneNumber:"<NOT AVAILABLE>",
    emailAddress:"<NOT AVAILABLE>",
    address: "Ranjeet Sagar Road",
    city: "Jamnagar",
    state:"Gujarat",
    country: "India",
    estOn:"1952",
    courses:"7th Onwards",
    admissionStartsOn:"1st May",
    lastDateOfApplication:"25th May",
    sessionStartsOn:"June"
  },
  {
    name: "Shri Karsanji Jhinabhai Bosmia Brahmkhatriya Vidyarthi Bhawan",
    contactPerson:"<NOT AVAILABLE>",
    phoneNumber:"<NOT AVAILABLE>",
    emailAddress:"<NOT AVAILABLE>",
    address: "Kalawad Road, Near Central School",
    city: "Rajkot",
    state:"Gujarat",
    country: "India",
    estOn:"1971",
    courses:"8th Onwards",
    admissionStartsOn:"1st May",
    lastDateOfApplication:"1st June",
    sessionStartsOn:"10th June"
  },
  {
    name: "Sethshi Moraraji Dhanji Padia Brahmkshatriya Boarding",
    contactPerson:"<NOT AVAILABLE>",
    phoneNumber:"<NOT AVAILABLE>",
    emailAddress:"<NOT AVAILABLE>",
    address: "Santokba Bhawan, Vadhavadi Road",
    city: "Bhavnagar",
    state:"Gujarat",
    country: "India",
    estOn:"1955",
    courses:"8th Onwards",
    admissionStartsOn:"1st May",
    lastDateOfApplication:"5th June",
    sessionStartsOn:"June"
  },
  {
    name: "Shrimati Godawariben Kanji Ashra Kanya Chhatralaya",
    contactPerson:"<NOT AVAILABLE>",
    phoneNumber:"<NOT AVAILABLE>",
    emailAddress:"<NOT AVAILABLE>",
    address: "Gokul Niwas, 2205-A, Krishna Nagar",
    city: "Bhavnagar",
    state:"Gujarat",
    country: "India",
    estOn:"1981",
    courses:"10th Onwards",
    admissionStartsOn:"<NOT AVAILBALE>",
    lastDateOfApplication:"<NOT AVAILABLE>",
    sessionStartsOn:"June"
  },
  {
    name: "Shri Chunilal Ukabhai Padia Kanya Chhatralaya ",
    contactPerson:"<NOT AVAILABLE>",
    phoneNumber:"<NOT AVAILABLE>",
    emailAddress:"<NOT AVAILABLE>",
    address: "6, Kalyan Nagar Society No. 2, Mental Hospital Road, Kareli Bag",
    city: "Vadodara",
    state:"Gujarat",
    country: "India",
    estOn:"1984",
    courses:"10th Onwards",
    admissionStartsOn:"<NOT AVAILABLE>",
    lastDateOfApplication:"<NOT AVAILABLE>",
    sessionStartsOn:"June"
  },
  {
    name: "Shri Hinglaj Chhatraavas",
    contactPerson:"<NOT AVAILABLE>",
    phoneNumber:"<NOT AVAILABLE>",
    emailAddress:"<NOT AVAILABLE>",
    address: "Shri Brhmkhatri Bhawan Trust, Near Geeta Bhawan, 3rd Road, Sardarpura",
    city: "Jodhpur",
    state:"Rajasthan",
    country: "India",
    estOn:"1937",
    courses:"All",
    admissionStartsOn:"Anytime",
    lastDateOfApplication:"Anytime",
    sessionStartsOn:"Anytime"
  }
];
