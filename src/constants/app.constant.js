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