export const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
export const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL;
export const AUTH_TOKEN_KEY = "token";
export const USER_DETAILS_KEY = "user";

export const STATE_LIST = [
  {
    "name": "Andaman and Nicobar Islands",
    "code": "AN",
    "slug": "andaman-and-nicobar-islands",
    "capital": "Port Blair",
    "type": "Union Territory",
    "TIN": "35",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/AN/E042/organizations"
    },
    "cities": ["Nicobars", "North And Middle Andaman", "South Andamans"]
  },
  {
    "name": "Andhra Pradesh",
    "code": "AD",
    "slug": "andhra-pradesh",
    "capital": "Amaravati",
    "type": "State",
    "TIN": "37",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/AP/E042/organizations"
    },
    "cities": ["Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", "Kakinada", "Krishna", "Kurnool", "Nandyal", "Ntr", "Palnadu", "Parvathipuram Manyam", "Prakasam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai", "Srikakulam", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari"]
  },
  {
    "name": "Arunachal Pradesh",
    "code": "AR",
    "slug": "arunachal-pradesh",
    "capital": "Itanagar",
    "type": "State",
    "TIN": "12",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/AR/E042/organizations"
    },
    "cities": ["Anjaw", "Bichom", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Keyi Panyor", "Kra Daadi", "Kurung Kumey", "Leparada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri"]
  },
  {
    "name": "Assam",
    "code": "AS",
    "slug": "assam",
    "capital": "Dispur",
    "type": "State",
    "TIN": "18",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/AS/E042/organizations"
    },
    "cities": ["Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metro", "Karbi Anglong", "Kokrajhar", "Lakhimpur", "Majuli", "Marigaon"]
  },
  {
    "name": "Bihar",
    "code": "BH",
    "slug": "bihar",
    "capital": "Patna",
    "type": "State",
    "TIN": "10",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/BR/E042/organizations"
    },
    "cities": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Pashchim Champaran"]
  },
  {
    "name": "Chandigarh",
    "code": "CH",
    "slug": "chandigarh",
    "capital": "Chandigarh",
    "type": "Union Territory",
    "TIN": "04",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/CH/E042/organizations"
    },
    "cities": ["Chandigarh"]
  },
  {
    "name": "Chhattisgarh",
    "code": "CT",
    "slug": "chhattisgarh",
    "capital": "Raipur",
    "type": "State",
    "TIN": "22",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/CG/E042/organizations"
    },
    "cities": ["Balod", "Balodabazar-Bhatapara", "Balrampur-Ramanujganj", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dakshin Bastar Dantewada", "Dhamtari", "Durg", "Gariyaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabeerdham", "Khairagarh-Chhuikhadan-Gandai", "Kondagaon", "Korba", "Korea", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur(M C B)", "Mohla-Manpur-Ambagarh Chouki", "Mungeli", "Narayanpur", "Raigarh"]
  },
  {
    "name": "Dadra and Nagar Haveli and Daman and Diu",
    "code": "DN",
    "slug": "dadra-and-nagar-haveli-and-daman-and-diu",
    "capital": "Daman",
    "type": "Union Territory",
    "TIN": "26",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/ND/E042/organizations"
    },
    "cities": ["Dadra And Nagar Haveli", "Daman", "Diu"]
  },
  {
    "name": "Delhi",
    "code": "DL",
    "slug": "delhi",
    "capital": "New Delhi",
    "type": "Union Territory",
    "TIN": "07",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/DL/E042/organizations"
    },
    "cities": ["Central", "East", "New Delhi", "North", "North East", "North West", "Shahdara", "South", "South East", "South West", "West"]
  },
  {
    "name": "Goa",
    "code": "GA",
    "slug": "goa",
    "capital": "Panaji",
    "type": "State",
    "TIN": "30",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/GA/E042/organizations"
    },
    "cities": ["North Goa", "South Goa"]
  },
  {
    "name": "Gujarat",
    "code": "GJ",
    "slug": "gujarat",
    "capital": "Gandhinagar",
    "type": "State",
    "TIN": "24",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/GJ/E042/organizations"
    },
    "cities": ["Ahmedabad", "Amreli", "Anand", "Arvalli", "Banas Kantha", "Bharuch", "Bhavnagar", "Botad", "Chhotaudepur", "Dahod", "Dangs", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahesana", "Mahisagar", "Morbi", "Narmada", "Navsari", "Panch Mahals", "Patan"]
  },
  {
    "name": "Haryana",
    "code": "HR",
    "slug": "haryana",
    "capital": "Chandigarh",
    "type": "State",
    "TIN": "06",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/HR/E042/organizations"
    },
    "cities": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"]
  },
  {
    "name": "Himachal Pradesh",
    "code": "HP",
    "slug": "himachal-pradesh",
    "capital": "Shimla",
    "type": "State",
    "TIN": "02",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/HP/E042/organizations"
    },
    "cities": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul And Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"]
  },
  {
    "name": "Jammu and Kashmir",
    "code": "JK",
    "slug": "jammu-and-kashmir",
    "capital": "Srinagar (Summer), Jammu (Winter)",
    "type": "Union Territory",
    "TIN": "01",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/JK/E042/organizations"
    },
    "cities": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"]
  },
  {
    "name": "Jharkhand",
    "code": "JH",
    "slug": "jharkhand",
    "capital": "Ranchi",
    "type": "State",
    "TIN": "20",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/JH/E042/organizations"
    },
    "cities": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Saraikela Kharsawan", "Simdega", "West Singhbhum"]
  },
  {
    "name": "Karnataka",
    "code": "KA",
    "slug": "karnataka",
    "capital": "Bangalore",
    "type": "State",
    "TIN": "29",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/KA/E042/organizations"
    },
    "cities": ["Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru South", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Shivamogga"]
  },
  {
    "name": "Kerala",
    "code": "KL",
    "slug": "kerala",
    "capital": "Thiruvananthapuram",
    "type": "State",
    "TIN": "32",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/KL/E042/organizations"
    },
    "cities": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"]
  },
  {
    "name": "Ladakh",
    "code": "LA",
    "slug": "ladakh",
    "capital": "Leh",
    "type": "Union Territory",
    "TIN": "38",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/LA/E042/organizations"
    },
    "cities": ["Kargil", "Leh Ladakh"]
  },
  {
    "name": "Lakshadweep",
    "code": "LD",
    "slug": "lakshadweep",
    "capital": "Kavaratti",
    "type": "Union Territory",
    "TIN": "31",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/LD/E042/organizations"
    },
    "cities": ["Lakshadweep District"]
  },
  {
    "name": "Madhya Pradesh",
    "code": "MP",
    "slug": "madhya-pradesh",
    "capital": "Bhopal",
    "type": "State",
    "TIN": "23",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/MP/E042/organizations"
    },
    "cities": ["Agar-Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa (East Nimar)"]
  },
  {
    "name": "Maharashtra",
    "code": "MH",
    "slug": "maharashtra",
    "capital": "Mumbai",
    "type": "State",
    "TIN": "27",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/MH/E042/organizations"
    },
    "cities": ["Ahilyanagar", "Akola", "Amravati", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Chhatrapati Sambhajinagar", "Dharashiv", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Palghar", "Parbhani"]
  },
  {
    "name": "Manipur",
    "code": "MN",
    "slug": "manipur",
    "capital": "Imphal",
    "type": "State",
    "TIN": "14",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/MN/E042/organizations"
    },
    "cities": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"]
  },
  {
    "name": "Meghalaya",
    "code": "ME",
    "slug": "meghalaya",
    "capital": "Shillong",
    "type": "State",
    "TIN": "17",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/ML/E042/organizations"
    },
    "cities": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Eastern West Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"]
  },
  {
    "name": "Mizoram",
    "code": "MI",
    "slug": "mizoram",
    "capital": "Aizawl",
    "type": "State",
    "TIN": "15",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/MZ/E042/organizations"
    },
    "cities": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saitual", "Serchhip", "Siaha"]
  },
  {
    "name": "Nagaland",
    "code": "NL",
    "slug": "nagaland",
    "capital": "Kohima",
    "type": "State",
    "TIN": "13",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/NL/E042/organizations"
    },
    "cities": ["Chumoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Meluri", "Mokokchung", "Mon", "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyu", "Tuensang", "Wokha", "Zunheboto"]
  },
  {
    "name": "Odisha",
    "code": "OR",
    "slug": "odisha",
    "capital": "Bhubaneshwar",
    "type": "State",
    "TIN": "21",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/OD/E042/organizations"
    },
    "cities": ["Anugul", "Balangir", "Baleshwar", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajapur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada"]
  },
  {
    "name": "Puducherry",
    "code": "PY",
    "slug": "puducherry",
    "capital": "Puducherry",
    "type": "Union Territory",
    "TIN": "34",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/PY/E042/organizations"
    },
    "cities": ["Karaikal", "Puducherry"]
  },
  {
    "name": "Punjab",
    "code": "PB",
    "slug": "punjab",
    "capital": "Chandigarh",
    "type": "State",
    "TIN": "03",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/PB/E042/organizations"
    },
    "cities": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "S.A.S Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"]
  },
  {
    "name": "Rajasthan",
    "code": "RJ",
    "slug": "rajasthan",
    "capital": "Jaipur",
    "type": "State",
    "TIN": "08",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/RJ/E042/organizations"
    },
    "cities": ["Ajmer", "Alwar", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Deeg", "Dholpur", "Didwana-Kuchaman", "Dungarpur", "Ganganagar", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu"]
  },
  {
    "name": "Sikkim",
    "code": "SK",
    "slug": "sikkim",
    "capital": "Gangtok",
    "type": "State",
    "TIN": "11",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/SK/E042/organizations"
    },
    "cities": ["Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"]
  },
  {
    "name": "Tamil Nadu",
    "code": "TN",
    "slug": "tamil-nadu",
    "capital": "Chennai",
    "type": "State",
    "TIN": "33",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/TN/E042/organizations"
    },
    "cities": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur"]
  },
  {
    "name": "Telangana",
    "code": "TS",
    "slug": "telangana",
    "capital": "Hyderabad",
    "type": "State",
    "TIN": "36",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/TS/E042/organizations"
    },
    "cities": ["Adilabad", "Bhadradri Kothagudem", "Hanumakonda", "Hyderabad", "Jagitial", "Jangoan", "Jayashankar Bhupalapally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla"]
  },
  {
    "name": "Tripura",
    "code": "TR",
    "slug": "tripura",
    "capital": "Agartala",
    "type": "State",
    "TIN": "16",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/TR/E042/organizations"
    },
    "cities": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"]
  },
  {
    "name": "Uttar Pradesh",
    "code": "UP",
    "slug": "uttar-pradesh",
    "capital": "Lucknow",
    "type": "State",
    "TIN": "09",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/UP/E042/organizations"
    },
    "cities": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Bara Banki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah"]
  },
  {
    "name": "Uttarakhand",
    "code": "UT",
    "slug": "uttarakhand",
    "capital": "Dehradun",
    "type": "State",
    "TIN": "05",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/UK/E042/organizations"
    },
    "cities": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"]
  },
  {
    "name": "West Bengal",
    "code": "WB",
    "slug": "west-bengal",
    "capital": "Kolkata",
    "type": "State",
    "TIN": "19",
    "source": {
      "state": "https://igod.gov.in/sg/states",
      "city": "https://igod.gov.in/sg/WB/E042/organizations"
    },
    "cities": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
  }
]

export const MSD_STATE_COUNCILS = [
  { value: 0, label: "Select State Council" },
  { value: 1, label: "Andhra Pradesh Medical Council" },
  { value: 2, label: "Arunachal Pradesh Medical Council" },
  { value: 3, label: "Assam Medical Council" },
  { value: 4, label: "Bihar Medical Council" },
  { value: 28, label: "Bhopal Medical Council" },
  { value: 29, label: "Bombay Medical Council" },
  { value: 30, label: "Chandigarh Medical Council" },
  { value: 5, label: "Chhattisgarh Medical Council" },
  { value: 6, label: "Delhi Medical Council" },
  { value: 7, label: "Goa Medical Council" },
  { value: 8, label: "Gujarat Medical Council" },
  { value: 9, label: "Haryana Medical Council" },
  { value: 10, label: "Himachal Medical Council" },
  { value: 45, label: "Hyderabad Medical Council" },
  { value: 11, label: "Jammu & Kashmir Medical Council" },
  { value: 12, label: "Jharkhand Medical Council" },
  { value: 13, label: "Karnataka Medical Council" },
  { value: 15, label: "Madhya Pradesh Medical Council" },
  { value: 36, label: "Madras Medical Council" },
  { value: 35, label: "Mahakoshal Medical Council" },
  { value: 26, label: "Manipur Medical Council" },
  { value: 16, label: "Maharashtra Medical Council" },
  { value: 46, label: "Medical Council of India" },
  { value: 47, label: "Medical Council of Tanganyika" },
  { value: 42, label: "Mizoram Medical Council" },
  { value: 37, label: "Mysore Medical Council" },
  { value: 41, label: "Nagaland Medical Council" },
  { value: 17, label: "Orissa Council of Medical Registration" },
  { value: 38, label: "Pondicherry Medical Council" },
  { value: 18, label: "Punjab Medical Council" },
  { value: 19, label: "Rajasthan Medical Council" },
  { value: 20, label: "Sikkim Medical Council" },
  { value: 21, label: "Tamil Nadu Medical Council" },
  { value: 43, label: "Telnagan State Medical Council" },
  { value: 50, label: "Travancore Cochin Medical Council" },
  { value: 22, label: "Tripura State Medical Council" },
  { value: 23, label: "Uttar Pradesh Medical Council" },
  { value: 40, label: "Vidharba Medical Council" },
  { value: 24, label: "Uttarakhand Medical Council" },
  { value: 25, label: "West Bengal Medical Council" },
];

export const YEARS = [
  1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956,
  1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966,
  1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976,
  1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986,
  1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996,
  1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006,
  2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
  2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026
];

export const SPECIALTIES = [
  "UG Medical Student",
  "PG Medical Student",
  "Other Health care professionals",
  "Pharmacist",
  "Nurses",
  "Industry Professionals",
  "Surgery",
  "Pediatrics",
  "Ophthalmology",
  "Oncology",
  "Obstetrics and Gynecology",
  "General Physician/Practitioner",
  "Internal Medicine/Consultant Physician",
  "Endocrinology",
  "Dietician / Nutritionist",
  "Other Specialties",
  "Diabetology",
  "Critical Care/Anesthesiology",
  "Cardiology",
  "Gastroenterology",
];

export const COUNTRIES = [
  [
    'Afghanistan',
    ['asia'],
    'af',
    '93'
  ],
  [
    'Albania',
    ['europe'],
    'al',
    '355'
  ],
  [
    'Algeria',
    ['africa', 'north-africa'],
    'dz',
    '213'
  ],
  [
    'Andorra',
    ['europe'],
    'ad',
    '376'
  ],
  [
    'Angola',
    ['africa'],
    'ao',
    '244'
  ],
  [
    'Antigua and Barbuda',
    ['america', 'carribean'],
    'ag',
    '1268'
  ],
  [
    'Argentina',
    ['america', 'south-america'],
    'ar',
    '54',
    '(..) ........',
    0,
    ['11', '221', '223', '261', '264', '2652', '280', '2905', '291', '2920', '2966', '299', '341', '342', '343', '351', '376', '379', '381', '3833', '385', '387', '388' ]
  ],
  [
    'Armenia',
    ['asia', 'ex-ussr'],
    'am',
    '374',
    '.. ......'
  ],
  [
    'Aruba',
    ['america', 'carribean'],
    'aw',
    '297'
  ],
  [
    'Australia',
    ['oceania'],
    'au',
    '61',
    '(..) .... ....',
    0, ['2', '3', '4', '7', '8', '02', '03', '04', '07', '08']
  ],
  [
    'Austria',
    ['europe', 'eu-union'],
    'at',
    '43'
  ],
  [
    'Azerbaijan',
    ['asia', 'ex-ussr'],
    'az',
    '994',
    '(..) ... .. ..'
  ],
  [
    'Bahamas',
    ['america', 'carribean'],
    'bs',
    '1242'
  ],
  [
    'Bahrain',
    ['middle-east'],
    'bh',
    '973'
  ],
  [
    'Bangladesh',
    ['asia'],
    'bd',
    '880'
  ],
  [
    'Barbados',
    ['america', 'carribean'],
    'bb',
    '1246'
  ],
  [
    'Belarus',
    ['europe', 'ex-ussr'],
    'by',
    '375',
    '(..) ... .. ..'
  ],
  [
    'Belgium',
    ['europe', 'eu-union'],
    'be',
    '32',
    '... .. .. ..'
  ],
  [
    'Belize',
    ['america', 'central-america'],
    'bz',
    '501'
  ],
  [
    'Benin',
    ['africa'],
    'bj',
    '229'
  ],
  [
    'Bhutan',
    ['asia'],
    'bt',
    '975'
  ],
  [
    'Bolivia',
    ['america', 'south-america'],
    'bo',
    '591'
  ],
  [
    'Bosnia and Herzegovina',
    ['europe', 'ex-yugos'],
    'ba',
    '387'
  ],
  [
    'Botswana',
    ['africa'],
    'bw',
    '267'
  ],
  [
    'Brazil',
    ['america', 'south-america'],
    'br',
    '55',
    '(..) .........',
  ],
  [
    'British Indian Ocean Territory',
    ['asia'],
    'io',
    '246'
  ],
  [
    'Brunei',
    ['asia'],
    'bn',
    '673'
  ],
  [
    'Bulgaria',
    ['europe', 'eu-union'],
    'bg',
    '359'
  ],
  [
    'Burkina Faso',
    ['africa'],
    'bf',
    '226'
  ],
  [
    'Burundi',
    ['africa'],
    'bi',
    '257'
  ],
  [
    'Cambodia',
    ['asia'],
    'kh',
    '855'
  ],
  [
    'Cameroon',
    ['africa'],
    'cm',
    '237'
  ],
  [
    'Canada',
    ['america', 'north-america'],
    'ca',
    '1',
    '(...) ...-....',
    1, ['204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416', '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587', '604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807', '819', '825', '867', '873', '902', '905']
  ],
  [
    'Cape Verde',
    ['africa'],
    'cv',
    '238'
  ],
  [
    'Caribbean Netherlands',
    ['america', 'carribean'],
    'bq',
    '599',
    '',
    1
  ],
  [
    'Central African Republic',
    ['africa'],
    'cf',
    '236'
  ],
  [
    'Chad',
    ['africa'],
    'td',
    '235'
  ],
  [
    'Chile',
    ['america', 'south-america'],
    'cl',
    '56'
  ],
  [
    'China',
    ['asia'],
    'cn',
    '86',
    '..-.........'
  ],
  [
    'Colombia',
    ['america', 'south-america'],
    'co',
    '57',
    '... ... ....'
  ],
  [
    'Comoros',
    ['africa'],
    'km',
    '269'
  ],
  [
    'Congo',
    ['africa'],
    'cd',
    '243'
  ],
  [
    'Congo',
    ['africa'],
    'cg',
    '242'
  ],
  [
    'Costa Rica',
    ['america', 'central-america'],
    'cr',
    '506',
    '....-....'
  ],
  [
    'Côte d’Ivoire',
    ['africa'],
    'ci',
    '225',
    '.. .. .. ..'
  ],
  [
    'Croatia',
    ['europe', 'eu-union', 'ex-yugos'],
    'hr',
    '385'
  ],
  [
    'Cuba',
    ['america', 'carribean'],
    'cu',
    '53'
  ],
  [
    'Curaçao',
    ['america', 'carribean'],
    'cw',
    '599',
    '',
    0
  ],
  [
    'Cyprus',
    ['europe', 'eu-union'],
    'cy',
    '357',
    '.. ......'
  ],
  [
    'Czech Republic',
    ['europe', 'eu-union'],
    'cz',
    '420',
    '... ... ...'
  ],
  [
    'Denmark',
    ['europe', 'eu-union', 'baltic'],
    'dk',
    '45',
    '.. .. .. ..'
  ],
  [
    'Djibouti',
    ['africa'],
    'dj',
    '253'
  ],
  [
    'Dominica',
    ['america', 'carribean'],
    'dm',
    '1767'
  ],
  [
    'Dominican Republic',
    ['america', 'carribean'],
    'do',
    '1',
    '',
    2, ['809', '829', '849']
  ],
  [
    'Ecuador',
    ['america', 'south-america'],
    'ec',
    '593'
  ],
  [
    'Egypt',
    ['africa', 'north-africa'],
    'eg',
    '20'
  ],
  [
    'El Salvador',
    ['america', 'central-america'],
    'sv',
    '503',
    '....-....'
  ],
  [
    'Equatorial Guinea',
    ['africa'],
    'gq',
    '240'
  ],
  [
    'Eritrea',
    ['africa'],
    'er',
    '291'
  ],
  [
    'Estonia',
    ['europe', 'eu-union', 'ex-ussr', 'baltic'],
    'ee',
    '372',
    '.... ......'
  ],
  [
    'Ethiopia',
    ['africa'],
    'et',
    '251'
  ],
  [
    'Fiji',
    ['oceania'],
    'fj',
    '679'
  ],
  [
    'Finland',
    ['europe', 'eu-union', 'baltic'],
    'fi',
    '358',
    '.. ... .. ..'
  ],
  [
    'France',
    ['europe', 'eu-union'],
    'fr',
    '33',
    '. .. .. .. ..'
  ],
  [
    'French Guiana',
    ['america', 'south-america'],
    'gf',
    '594'
  ],
  [
    'French Polynesia',
    ['oceania'],
    'pf',
    '689'
  ],
  [
    'Gabon',
    ['africa'],
    'ga',
    '241'
  ],
  [
    'Gambia',
    ['africa'],
    'gm',
    '220'
  ],
  [
    'Georgia',
    ['asia', 'ex-ussr'],
    'ge',
    '995'
  ],
  [
    'Germany',
    ['europe', 'eu-union', 'baltic'],
    'de',
    '49',
    '.... ........'
  ],
  [
    'Ghana',
    ['africa'],
    'gh',
    '233'
  ],
  [
    'Greece',
    ['europe', 'eu-union'],
    'gr',
    '30'
  ],
  [
    'Grenada',
    ['america', 'carribean'],
    'gd',
    '1473'
  ],
  [
    'Guadeloupe',
    ['america', 'carribean'],
    'gp',
    '590',
    '',
    0
  ],
  [
    'Guam',
    ['oceania'],
    'gu',
    '1671'
  ],
  [
    'Guatemala',
    ['america', 'central-america'],
    'gt',
    '502',
    '....-....'
  ],
  [
    'Guinea',
    ['africa'],
    'gn',
    '224'
  ],
  [
    'Guinea-Bissau',
    ['africa'],
    'gw',
    '245'
  ],
  [
    'Guyana',
    ['america', 'south-america'],
    'gy',
    '592'
  ],
  [
    'Haiti',
    ['america', 'carribean'],
    'ht',
    '509',
    '....-....'
  ],
  [
    'Honduras',
    ['america', 'central-america'],
    'hn',
    '504'
  ],
  [
    'Hong Kong',
    ['asia'],
    'hk',
    '852',
    '.... ....'
  ],
  [
    'Hungary',
    ['europe', 'eu-union'],
    'hu',
    '36'
  ],
  [
    'Iceland',
    ['europe'],
    'is',
    '354',
    '... ....'
  ],
  [
    'India',
    ['asia'],
    'in',
    '91',
    '.....-.....'
  ],
  [
    'Indonesia',
    ['asia'],
    'id',
    '62'
  ],
  [
    'Iran',
    ['middle-east'],
    'ir',
    '98',
    '... ... ....'
  ],
  [
    'Iraq',
    ['middle-east'],
    'iq',
    '964'
  ],
  [
    'Ireland',
    ['europe', 'eu-union'],
    'ie',
    '353',
    '.. .......'
  ],
  [
    'Israel',
    ['middle-east'],
    'il',
    '972',
    '... ... ....'
  ],
  [
    'Italy',
    ['europe', 'eu-union'],
    'it',
    '39',
    '... .......',
    0
  ],
  [
    'Jamaica',
    ['america', 'carribean'],
    'jm',
    '1876'
  ],
  [
    'Japan',
    ['asia'],
    'jp',
    '81',
    '.. .... ....'
  ],
  [
    'Jordan',
    ['middle-east'],
    'jo',
    '962'
  ],
  [
    'Kazakhstan',
    ['asia', 'ex-ussr'],
    'kz',
    '7',
    '... ...-..-..',
    1, ['310', '311', '312', '313', '315', '318', '321', '324', '325', '326', '327', '336', '7172', '73622']
  ],
  [
    'Kenya',
    ['africa'],
    'ke',
    '254'
  ],
  [
    'Kiribati',
    ['oceania'],
    'ki',
    '686'
  ],
  [
    'Kosovo',
    ['europe', 'ex-yugos'],
    'xk',
    '383'
  ],
  [
    'Kuwait',
    ['middle-east'],
    'kw',
    '965'
  ],
  [
    'Kyrgyzstan',
    ['asia', 'ex-ussr'],
    'kg',
    '996',
    '... ... ...'
  ],
  [
    'Laos',
    ['asia'],
    'la',
    '856'
  ],
  [
    'Latvia',
    ['europe', 'eu-union', 'ex-ussr', 'baltic'],
    'lv',
    '371',
    '.. ... ...'
  ],
  [
    'Lebanon',
    ['middle-east'],
    'lb',
    '961'
  ],
  [
    'Lesotho',
    ['africa'],
    'ls',
    '266'
  ],
  [
    'Liberia',
    ['africa'],
    'lr',
    '231'
  ],
  [
    'Libya',
    ['africa', 'north-africa'],
    'ly',
    '218'
  ],
  [
    'Liechtenstein',
    ['europe'],
    'li',
    '423'
  ],
  [
    'Lithuania',
    ['europe', 'eu-union', 'ex-ussr', 'baltic'],
    'lt',
    '370'
  ],
  [
    'Luxembourg',
    ['europe', 'eu-union'],
    'lu',
    '352'
  ],
  [
    'Macau',
    ['asia'],
    'mo',
    '853'
  ],
  [
    'Macedonia',
    ['europe', 'ex-yugos'],
    'mk',
    '389'
  ],
  [
    'Madagascar',
    ['africa'],
    'mg',
    '261'
  ],
  [
    'Malawi',
    ['africa'],
    'mw',
    '265'
  ],
  [
    'Malaysia',
    ['asia'],
    'my',
    '60',
    '..-....-....'
  ],
  [
    'Maldives',
    ['asia'],
    'mv',
    '960'
  ],
  [
    'Mali',
    ['africa'],
    'ml',
    '223'
  ],
  [
    'Malta',
    ['europe', 'eu-union'],
    'mt',
    '356'
  ],
  [
    'Marshall Islands',
    ['oceania'],
    'mh',
    '692'
  ],
  [
    'Martinique',
    ['america', 'carribean'],
    'mq',
    '596'
  ],
  [
    'Mauritania',
    ['africa'],
    'mr',
    '222'
  ],
  [
    'Mauritius',
    ['africa'],
    'mu',
    '230'
  ],
  [
    'Mexico',
    ['america', 'central-america'],
    'mx',
    '52',
    '... ... ....',
    0, ['55', '81', '33', '656', '664', '998', '774', '229']
  ],
  [
    'Micronesia',
    ['oceania'],
    'fm',
    '691'
  ],
  [
    'Moldova',
    ['europe'],
    'md',
    '373',
    '(..) ..-..-..'
  ],
  [
    'Monaco',
    ['europe'],
    'mc',
    '377'
  ],
  [
    'Mongolia',
    ['asia'],
    'mn',
    '976'
  ],
  [
    'Montenegro',
    ['europe', 'ex-yugos'],
    'me',
    '382'
  ],
  [
    'Morocco',
    ['africa', 'north-africa'],
    'ma',
    '212'
  ],
  [
    'Mozambique',
    ['africa'],
    'mz',
    '258'
  ],
  [
    'Myanmar',
    ['asia'],
    'mm',
    '95'
  ],
  [
    'Namibia',
    ['africa'],
    'na',
    '264'
  ],
  [
    'Nauru',
    ['africa'],
    'nr',
    '674'
  ],
  [
    'Nepal',
    ['asia'],
    'np',
    '977'
  ],
  [
    'Netherlands',
    ['europe', 'eu-union'],
    'nl',
    '31',
    '.. ........'
  ],
  [
    'New Caledonia',
    ['oceania'],
    'nc',
    '687'
  ],
  [
    'New Zealand',
    ['oceania'],
    'nz',
    '64',
    '...-...-....'
  ],
  [
    'Nicaragua',
    ['america', 'central-america'],
    'ni',
    '505'
  ],
  [
    'Niger',
    ['africa'],
    'ne',
    '227'
  ],
  [
    'Nigeria',
    ['africa'],
    'ng',
    '234'
  ],
  [
    'North Korea',
    ['asia'],
    'kp',
    '850'
  ],
  [
    'Norway',
    ['europe', 'baltic'],
    'no',
    '47',
    '... .. ...'
  ],
  [
    'Oman',
    ['middle-east'],
    'om',
    '968'
  ],
  [
    'Pakistan',
    ['asia'],
    'pk',
    '92',
    '...-.......'
  ],
  [
    'Palau',
    ['oceania'],
    'pw',
    '680'
  ],
  [
    'Palestine',
    ['middle-east'],
    'ps',
    '970'
  ],
  [
    'Panama',
    ['america', 'central-america'],
    'pa',
    '507'
  ],
  [
    'Papua New Guinea',
    ['oceania'],
    'pg',
    '675'
  ],
  [
    'Paraguay',
    ['america', 'south-america'],
    'py',
    '595'
  ],
  [
    'Peru',
    ['america', 'south-america'],
    'pe',
    '51'
  ],
  [
    'Philippines',
    ['asia'],
    'ph',
    '63',
    '.... .......'
  ],
  [
    'Poland',
    ['europe', 'eu-union', 'baltic'],
    'pl',
    '48',
    '...-...-...'
  ],
  [
    'Portugal',
    ['europe', 'eu-union'],
    'pt',
    '351'
  ],
  [
    'Puerto Rico',
    ['america', 'carribean'],
    'pr',
    '1',
    '',
    3, ['787', '939']
  ],
  [
    'Qatar',
    ['middle-east'],
    'qa',
    '974'
  ],
  [
    'Réunion',
    ['africa'],
    're',
    '262'
  ],
  [
    'Romania',
    ['europe', 'eu-union'],
    'ro',
    '40'
  ],
  [
    'Russia',
    ['europe', 'asia', 'ex-ussr', 'baltic'],
    'ru',
    '7',
    '(...) ...-..-..',
    0
  ],
  [
    'Rwanda',
    ['africa'],
    'rw',
    '250'
  ],
  [
    'Saint Kitts and Nevis',
    ['america', 'carribean'],
    'kn',
    '1869'
  ],
  [
    'Saint Lucia',
    ['america', 'carribean'],
    'lc',
    '1758'
  ],
  [
    'Saint Vincent and the Grenadines',
    ['america', 'carribean'],
    'vc',
    '1784'
  ],
  [
    'Samoa',
    ['oceania'],
    'ws',
    '685'
  ],
  [
    'San Marino',
    ['europe'],
    'sm',
    '378'
  ],
  [
    'São Tomé and Príncipe',
    ['africa'],
    'st',
    '239'
  ],
  [
    'Saudi Arabia',
    ['middle-east'],
    'sa',
    '966'
  ],
  [
    'Senegal',
    ['africa'],
    'sn',
    '221'
  ],
  [
    'Serbia',
    ['europe', 'ex-yugos'],
    'rs',
    '381'
  ],
  [
    'Seychelles',
    ['africa'],
    'sc',
    '248'
  ],
  [
    'Sierra Leone',
    ['africa'],
    'sl',
    '232'
  ],
  [
    'Singapore',
    ['asia'],
    'sg',
    '65',
    '....-....'
  ],
  [
    'Slovakia',
    ['europe', 'eu-union'],
    'sk',
    '421'
  ],
  [
    'Slovenia',
    ['europe', 'eu-union', 'ex-yugos'],
    'si',
    '386'
  ],
  [
    'Solomon Islands',
    ['oceania'],
    'sb',
    '677'
  ],
  [
    'Somalia',
    ['africa'],
    'so',
    '252'
  ],
  [
    'South Africa',
    ['africa'],
    'za',
    '27'
  ],
  [
    'South Korea',
    ['asia'],
    'kr',
    '82',
    '... .... ....'
  ],
  [
    'South Sudan',
    ['africa', 'north-africa'],
    'ss',
    '211'
  ],
  [
    'Spain',
    ['europe', 'eu-union'],
    'es',
    '34',
    '... ... ...'
  ],
  [
    'Sri Lanka',
    ['asia'],
    'lk',
    '94'
  ],
  [
    'Sudan',
    ['africa'],
    'sd',
    '249'
  ],
  [
    'Suriname',
    ['america', 'south-america'],
    'sr',
    '597'
  ],
  [
    'Swaziland',
    ['africa'],
    'sz',
    '268'
  ],
  [
    'Sweden',
    ['europe', 'eu-union', 'baltic'],
    'se',
    '46',
    '(...) ...-...'
  ],
  [
    'Switzerland',
    ['europe'],
    'ch',
    '41',
    '.. ... .. ..'
  ],
  [
    'Syria',
    ['middle-east'],
    'sy',
    '963'
  ],
  [
    'Taiwan',
    ['asia'],
    'tw',
    '886'
  ],
  [
    'Tajikistan',
    ['asia', 'ex-ussr'],
    'tj',
    '992'
  ],
  [
    'Tanzania',
    ['africa'],
    'tz',
    '255'
  ],
  [
    'Thailand',
    ['asia'],
    'th',
    '66'
  ],
  [
    'Timor-Leste',
    ['asia'],
    'tl',
    '670'
  ],
  [
    'Togo',
    ['africa'],
    'tg',
    '228'
  ],
  [
    'Tonga',
    ['oceania'],
    'to',
    '676'
  ],
  [
    'Trinidad and Tobago',
    ['america', 'carribean'],
    'tt',
    '1868'
  ],
  [
    'Tunisia',
    ['africa', 'north-africa'],
    'tn',
    '216'
  ],
  [
    'Turkey',
    ['europe'],
    'tr',
    '90',
    '... ... .. ..'
  ],
  [
    'Turkmenistan',
    ['asia', 'ex-ussr'],
    'tm',
    '993'
  ],
  [
    'Tuvalu',
    ['asia'],
    'tv',
    '688'
  ],
  [
    'Uganda',
    ['africa'],
    'ug',
    '256'
  ],
  [
    'Ukraine',
    ['europe', 'ex-ussr'],
    'ua',
    '380',
    '(..) ... .. ..'
  ],
  [
    'United Arab Emirates',
    ['middle-east'],
    'ae',
    '971'
  ],
  [
    'United Kingdom',
    ['europe', 'eu-union'],
    'gb',
    '44',
    '.... ......'
  ],
  [
    'United States',
    ['america', 'north-america'],
    'us',
    '1',
    '(...) ...-....',
    0, ['907', '205', '251', '256', '334', '479', '501', '870', '480', '520', '602', '623', '928', '209', '213', '310', '323', '408', '415', '510', '530', '559', '562', '619', '626', '650', '661', '707', '714', '760', '805', '818', '831', '858', '909', '916', '925', '949', '951', '303', '719', '970', '203', '860', '202', '302', '239', '305', '321', '352', '386', '407', '561', '727', '772', '813', '850', '863', '904', '941', '954', '229', '404', '478', '706', '770', '912', '808', '319', '515', '563', '641', '712', '208', '217', '309', '312', '618', '630', '708', '773', '815', '847', '219', '260', '317', '574', '765', '812', '316', '620', '785', '913', '270', '502', '606', '859', '225', '318', '337', '504', '985', '413', '508', '617', '781', '978', '301', '410', '207', '231', '248', '269', '313', '517', '586', '616', '734', '810', '906', '989', '218', '320', '507', '612', '651', '763', '952', '314', '417', '573', '636', '660', '816', '228', '601', '662', '406', '252', '336', '704', '828', '910', '919', '701', '308', '402', '603', '201', '609', '732', '856', '908', '973', '505', '575', '702', '775', '212', '315', '516', '518', '585', '607', '631', '716', '718', '845', '914', '216', '330', '419', '440', '513', '614', '740', '937', '405', '580', '918', '503', '541', '215', '412', '570', '610', '717', '724', '814', '401', '803', '843', '864', '605', '423', '615', '731', '865', '901', '931', '210', '214', '254', '281', '325', '361', '409', '432', '512', '713', '806', '817', '830', '903', '915', '936', '940', '956', '972', '979', '435', '801', '276', '434', '540', '703', '757', '804', '802', '206', '253', '360', '425', '509', '262', '414', '608', '715', '920', '304', '307']
  ],
  [
    'Uruguay',
    ['america', 'south-america'],
    'uy',
    '598'
  ],
  [
    'Uzbekistan',
    ['asia', 'ex-ussr'],
    'uz',
    '998',
    '.. ... .. ..'
  ],
  [
    'Vanuatu',
    ['oceania'],
    'vu',
    '678'
  ],
  [
    'Vatican City',
    ['europe'],
    'va',
    '39',
    '.. .... ....',
    1
  ],
  [
    'Venezuela',
    ['america', 'south-america'],
    've',
    '58'
  ],
  [
    'Vietnam',
    ['asia'],
    'vn',
    '84'
  ],
  [
    'Yemen',
    ['middle-east'],
    'ye',
    '967'
  ],
  [
    'Zambia',
    ['africa'],
    'zm',
    '260'
  ],
  [
    'Zimbabwe',
    ['africa'],
    'zw',
    '263'
  ]
];
