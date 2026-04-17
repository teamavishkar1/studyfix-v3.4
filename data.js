/* StudyFix v4.0 — Mock Data */
const AppData = {
  user: null,
  registeredUsers: [
    { id:"u1",name:"Veer Pathak",initials:"VP",email:"veer@cumail.in",password:"veer123",role:"junior",university:"Chandigarh University",course:"B.Tech CSE",semester:3,cgpa:null,isVerified:false,sessionsBooked:5,notesDownloaded:12,hoursLearned:18,walletBalance:500,purchasedNotes:[101,105],recentNotes:["Complete DSA Notes"],paymentHistory:[
      {id:"tx1",type:"credit",amount:1000,desc:"Added to Wallet",method:"UPI",date:"Mar 13, 2026",time:"2:30 PM"},
      {id:"tx2",type:"debit",amount:156,desc:"Session: Trees & Graph Algorithms",method:"UPI",date:"Mar 12, 2026",time:"1:45 PM"},
      {id:"tx3",type:"debit",amount:51,desc:"Note: Complete DSA Notes",method:"Wallet",date:"Mar 10, 2026",time:"5:20 PM"},
      {id:"tx4",type:"debit",amount:124,desc:"Session: Process Scheduling",method:"Card",date:"Mar 8, 2026",time:"10:00 AM"},
      {id:"tx5",type:"credit",amount:500,desc:"Added to Wallet",method:"UPI",date:"Mar 1, 2026",time:"11:00 AM"},
    ],reviewsGiven:[4,5],bookmarks:{mentors:[1,6],notes:[111],examResources:["ex4"]}},
    { id:"u2",name:"Mani Sharma",initials:"MS",email:"mani@cumail.in",password:"mani123",role:"junior",university:"Chandigarh University",course:"B.Tech ECE",semester:3,cgpa:null,isVerified:false,sessionsBooked:3,notesDownloaded:8,hoursLearned:10,walletBalance:300,purchasedNotes:[201],recentNotes:[],paymentHistory:[],reviewsGiven:[],bookmarks:{mentors:[],notes:[],examResources:[]}},
    { id:"u3",name:"Rahul Sharma",initials:"RS",email:"rahul@cumail.in",password:"rahul123",role:"senior",university:"Chandigarh University",course:"B.Tech CSE",semester:7,cgpa:9.2,isVerified:true,sessionsBooked:0,notesDownloaded:5,hoursLearned:0,subjects:["Data Structures","Algorithms","C Programming","DBMS"],pricePerSession:149,totalEarnings:12814,sessionEarnings:10500,noteEarnings:2314,studentsHelped:142,notesUploaded:4,walletBalance:12814,purchasedNotes:[],paymentHistory:[
      {id:"tx9",type:"credit",amount:149,desc:"Session earning: DSA",method:"Platform",date:"Mar 12, 2026",time:"4:00 PM"},
      {id:"tx10",type:"credit",amount:49,desc:"Note sold: DSA Notes",method:"Platform",date:"Mar 10, 2026",time:"5:20 PM"},
      {id:"tx11",type:"debit",amount:5000,desc:"Withdrawal to Bank",method:"Bank Transfer",date:"Mar 8, 2026",time:"12:00 PM"},
    ],reviewsGiven:[],bookmarks:{mentors:[],notes:[],examResources:[]}},
    { id:"u4",name:"Ananya Reddy",initials:"AR",email:"ananya@cumail.in",password:"ananya123",role:"senior",university:"Chandigarh University",course:"B.Tech CSE (AI/ML)",semester:5,cgpa:9.4,isVerified:true,sessionsBooked:0,notesDownloaded:2,hoursLearned:0,subjects:["Machine Learning","Python","Linear Algebra","Probability"],pricePerSession:179,totalEarnings:12709,sessionEarnings:9800,noteEarnings:2909,studentsHelped:120,notesUploaded:2,walletBalance:12709,purchasedNotes:[],paymentHistory:[],reviewsGiven:[],bookmarks:{mentors:[],notes:[],examResources:[]}},
  ],
  mentors: [
    { id:1,name:"Rahul Sharma",initials:"RS",gradient:"linear-gradient(135deg,#2563eb,#1d4ed8)",university:"Chandigarh University",course:"B.Tech CSE",semester:7,cgpa:9.2,isVerified:true,rating:4.9,totalReviews:58,sessionsCompleted:86,studentsHelped:142,pricePerSession:149,badges:["verified","top-rated"],subjects:["Data Structures","Algorithms","C Programming","DBMS"],about:"4th year CSE student with a passion for teaching. I've been mentoring juniors for 2 years and specialize in making complex DSA concepts simple. Interned at Google.",availability:[{day:"Mon",slots:["10:00 AM","2:00 PM","5:00 PM"]},{day:"Tue",slots:["11:00 AM","3:00 PM"]},{day:"Wed",slots:["10:00 AM","4:00 PM","7:00 PM"]},{day:"Thu",slots:["2:00 PM","6:00 PM"]},{day:"Fri",slots:["10:00 AM","1:00 PM","4:00 PM"]}],reviews:[
      {id:"r1",name:"Aditya Verma",initials:"AV",rating:5,comment:"Rahul is amazing! He explained BST operations so clearly. My DSA grade jumped from C to A.",date:"Mar 8, 2026"},
      {id:"r2",name:"Pooja Singh",initials:"PS",rating:5,comment:"Best mentor for Data Structures. His approach to teaching recursion is brilliant.",date:"Mar 5, 2026"},
      {id:"r3",name:"Karan Mehta",initials:"KM",rating:4,comment:"Very helpful session on Graph algorithms. Would have liked more practice problems.",date:"Feb 28, 2026"},
    ],weeklyEarnings:[450,620,380,510,720,490,580]},
    { id:2,name:"Priya Gupta",initials:"PG",gradient:"linear-gradient(135deg,#8b5cf6,#6d28d9)",university:"Chandigarh University",course:"B.Tech ECE",semester:7,cgpa:9.0,isVerified:true,rating:4.8,totalReviews:42,sessionsCompleted:64,studentsHelped:98,pricePerSession:129,badges:["verified","trending"],subjects:["Digital Electronics","Signals & Systems","Network Analysis"],about:"ECE topper with 9.0 CGPA. I focus on building strong fundamentals and exam-oriented preparation.",availability:[{day:"Mon",slots:["9:00 AM","1:00 PM"]},{day:"Tue",slots:["10:00 AM","4:00 PM","6:00 PM"]},{day:"Wed",slots:["11:00 AM","3:00 PM"]},{day:"Fri",slots:["2:00 PM","5:00 PM"]}],reviews:[
      {id:"r5",name:"Rohit Jain",initials:"RJ",rating:5,comment:"Priya ma'am is excellent at Digital Electronics. Best shortcut methods for exams.",date:"Mar 6, 2026"},
      {id:"r6",name:"Sanya Gupta",initials:"SG",rating:5,comment:"Signals & Systems was my weakest subject but after 3 sessions I scored 40/50!",date:"Feb 25, 2026"},
    ],weeklyEarnings:[320,410,290,380,450,310,420]},
    { id:3,name:"Amit Kumar",initials:"AK",gradient:"linear-gradient(135deg,#10b981,#047857)",university:"Chandigarh University",course:"B.Tech ME",semester:5,cgpa:8.7,isVerified:true,rating:4.7,totalReviews:28,sessionsCompleted:42,studentsHelped:65,pricePerSession:99,badges:["verified"],subjects:["Engineering Mathematics","Thermodynamics","Mechanics"],about:"Passionate about Mathematics and Physics. I break down complex proofs into simple steps.",availability:[{day:"Tue",slots:["9:00 AM","12:00 PM","5:00 PM"]},{day:"Wed",slots:["10:00 AM","2:00 PM"]},{day:"Thu",slots:["11:00 AM","3:00 PM","6:00 PM"]},{day:"Sat",slots:["10:00 AM","1:00 PM"]}],reviews:[
      {id:"r8",name:"Deepak Yadav",initials:"DY",rating:5,comment:"Amit bhaiya made Laplace Transform so easy! Best math mentor.",date:"Mar 2, 2026"},
    ],weeklyEarnings:[210,290,180,250,310,200,270]},
    { id:4,name:"Sneha Patel",initials:"SP",gradient:"linear-gradient(135deg,#ec4899,#be185d)",university:"Chandigarh University",course:"B.Tech CSE",semester:5,cgpa:8.9,isVerified:true,rating:4.9,totalReviews:35,sessionsCompleted:53,studentsHelped:87,pricePerSession:119,badges:["verified","top-rated"],subjects:["Operating Systems","Computer Networks","Web Development"],about:"CSE student with 8.9 CGPA. I specialize in OS and Networking. I provide handwritten notes with every session.",availability:[{day:"Mon",slots:["11:00 AM","3:00 PM","6:00 PM"]},{day:"Wed",slots:["9:00 AM","1:00 PM"]},{day:"Thu",slots:["10:00 AM","4:00 PM"]},{day:"Fri",slots:["11:00 AM","2:00 PM","5:00 PM"]}],reviews:[
      {id:"r10",name:"Vikash Gupta",initials:"VG",rating:5,comment:"Sneha solved all my doubts on process scheduling. Her notes are gold!",date:"Mar 10, 2026"},
      {id:"r11",name:"Tanvi Shah",initials:"TS",rating:5,comment:"CN was impossible until I took sessions with Sneha. The layered approach was amazing.",date:"Mar 1, 2026"},
    ],weeklyEarnings:[310,400,260,350,480,300,390]},
    { id:5,name:"Vikram Singh",initials:"VS",gradient:"linear-gradient(135deg,#f59e0b,#d97706)",university:"Chandigarh University",course:"B.Tech EE",semester:7,cgpa:8.5,isVerified:true,rating:4.6,totalReviews:22,sessionsCompleted:38,studentsHelped:54,pricePerSession:89,badges:["verified"],subjects:["Circuit Theory","Power Systems","Control Systems"],about:"EE student with strong fundamentals. I focus on problem-solving techniques and shortcut methods.",availability:[{day:"Mon",slots:["2:00 PM","5:00 PM"]},{day:"Tue",slots:["10:00 AM","3:00 PM"]},{day:"Thu",slots:["9:00 AM","12:00 PM","4:00 PM"]},{day:"Sat",slots:["11:00 AM","2:00 PM"]}],reviews:[
      {id:"r13",name:"Aman Kumar",initials:"AK",rating:5,comment:"Vikram's formula sheets are incredibly helpful!",date:"Mar 4, 2026"},
    ],weeklyEarnings:[180,240,150,200,260,170,220]},
    { id:6,name:"Ananya Reddy",initials:"AR",gradient:"linear-gradient(135deg,#0ea5e9,#0369a1)",university:"Chandigarh University",course:"B.Tech CSE (AI/ML)",semester:5,cgpa:9.4,isVerified:true,rating:5.0,totalReviews:48,sessionsCompleted:71,studentsHelped:120,pricePerSession:179,badges:["verified","top-rated","trending"],subjects:["Machine Learning","Python","Linear Algebra","Probability"],about:"AI/ML enthusiast with highest CGPA in my batch. Published a research paper on NLP. I teach ML from scratch with practical coding examples.",availability:[{day:"Mon",slots:["10:00 AM","1:00 PM"]},{day:"Tue",slots:["11:00 AM","4:00 PM"]},{day:"Wed",slots:["9:00 AM","2:00 PM","6:00 PM"]},{day:"Fri",slots:["10:00 AM","3:00 PM"]}],reviews:[
      {id:"r15",name:"Shruti Sinha",initials:"SS",rating:5,comment:"Ananya taught me ML from scratch. Now I can build models confidently. Best mentor!",date:"Mar 12, 2026"},
      {id:"r16",name:"Raj Patel",initials:"RP",rating:5,comment:"Her Python teaching style is so clean and practical.",date:"Mar 7, 2026"},
      {id:"r17",name:"Meera Joshi",initials:"MJ",rating:5,comment:"Linear Algebra was crystal clear after just 2 sessions. Worth every rupee!",date:"Feb 26, 2026"},
    ],weeklyEarnings:[520,680,440,590,750,510,640]},
  ],
  notesCatalog: { courses: [
    { name:"B.Tech CSE",icon:"💻",semesters:[
      { num:3,subjects:[
        { name:"Data Structures",notes:[
          {id:101,title:"Complete DSA Notes",author:"Rahul Sharma",mentorId:1,type:"pdf",pages:120,downloads:342,rating:4.8,price:49,icon:"📄",bg:"#fef2f2"},
          {id:102,title:"Previous Year Questions (2023-24)",author:"Rahul Sharma",mentorId:1,type:"pdf",pages:28,downloads:567,rating:4.9,price:0,icon:"📋",bg:"#fffbeb"},
          {id:103,title:"Sorting Algorithms Explained",author:"Sneha Patel",mentorId:4,type:"pdf",pages:45,downloads:198,rating:4.6,price:29,icon:"📄",bg:"#fef2f2"},
          {id:104,title:"Tree & Graph Practice Problems",author:"Rahul Sharma",mentorId:1,type:"doc",pages:32,downloads:276,rating:4.7,price:0,icon:"📝",bg:"#eff6ff"},
        ]},
        { name:"DBMS",notes:[
          {id:105,title:"DBMS Complete Handwritten Notes",author:"Rahul Sharma",mentorId:1,type:"pdf",pages:95,downloads:289,rating:4.8,price:59,icon:"📄",bg:"#fef2f2"},
          {id:106,title:"SQL Practice Questions",author:"Sneha Patel",mentorId:4,type:"doc",pages:40,downloads:412,rating:4.5,price:0,icon:"📝",bg:"#eff6ff"},
        ]},
        { name:"Operating Systems",notes:[
          {id:107,title:"OS Concepts & Diagrams",author:"Sneha Patel",mentorId:4,type:"pdf",pages:78,downloads:234,rating:4.7,price:39,icon:"📄",bg:"#fef2f2"},
          {id:108,title:"Process Scheduling Solved Examples",author:"Sneha Patel",mentorId:4,type:"pdf",pages:22,downloads:189,rating:4.4,price:0,icon:"📋",bg:"#fffbeb"},
        ]},
      ]},
      { num:5,subjects:[
        { name:"Computer Networks",notes:[
          {id:109,title:"CN Complete Notes (Layer by Layer)",author:"Sneha Patel",mentorId:4,type:"pdf",pages:88,downloads:178,rating:4.6,price:49,icon:"📄",bg:"#fef2f2"},
          {id:110,title:"Important Topics for Mid-Sem",author:"Sneha Patel",mentorId:4,type:"doc",pages:15,downloads:320,rating:4.3,price:0,icon:"📝",bg:"#eff6ff"},
        ]},
        { name:"Machine Learning",notes:[
          {id:111,title:"ML Algorithms from Scratch",author:"Ananya Reddy",mentorId:6,type:"pdf",pages:112,downloads:456,rating:4.9,price:79,icon:"📄",bg:"#fef2f2"},
          {id:112,title:"Python ML Lab Solutions",author:"Ananya Reddy",mentorId:6,type:"doc",pages:55,downloads:312,rating:4.7,price:0,icon:"📝",bg:"#eff6ff"},
        ]},
      ]},
    ]},
    { name:"B.Tech ECE",icon:"⚡",semesters:[{num:3,subjects:[
      { name:"Digital Electronics",notes:[
        {id:201,title:"Digital Electronics Full Notes",author:"Priya Gupta",mentorId:2,type:"pdf",pages:105,downloads:267,rating:4.8,price:49,icon:"📄",bg:"#fef2f2"},
        {id:202,title:"K-Map & Boolean Algebra Shortcuts",author:"Priya Gupta",mentorId:2,type:"pdf",pages:18,downloads:389,rating:4.9,price:0,icon:"📋",bg:"#fffbeb"},
      ]},
      { name:"Signals & Systems",notes:[
        {id:204,title:"Signals & Systems Notes",author:"Priya Gupta",mentorId:2,type:"pdf",pages:90,downloads:198,rating:4.5,price:39,icon:"📄",bg:"#fef2f2"},
      ]},
    ]}]},
    { name:"B.Tech ME",icon:"⚙️",semesters:[{num:3,subjects:[
      { name:"Engineering Mathematics",notes:[
        {id:301,title:"Math III Complete Notes",author:"Amit Kumar",mentorId:3,type:"pdf",pages:130,downloads:378,rating:4.8,price:49,icon:"📄",bg:"#fef2f2"},
        {id:302,title:"Laplace & Fourier Shortcuts",author:"Amit Kumar",mentorId:3,type:"pdf",pages:25,downloads:290,rating:4.6,price:0,icon:"📋",bg:"#fffbeb"},
      ]},
    ]}]},
    { name:"B.Tech EE",icon:"🔌",semesters:[{num:3,subjects:[
      { name:"Circuit Theory",notes:[
        {id:401,title:"Circuit Theory Complete Notes",author:"Vikram Singh",mentorId:5,type:"pdf",pages:85,downloads:145,rating:4.5,price:39,icon:"📄",bg:"#fef2f2"},
        {id:402,title:"Thevenin & Norton Solved Examples",author:"Vikram Singh",mentorId:5,type:"doc",pages:30,downloads:201,rating:4.6,price:0,icon:"📝",bg:"#eff6ff"},
      ]},
    ]}]},
  ]},
  examResources: [
    {id:"ex1",icon:"🎯",title:"DSA Mid-Sem: Top 20 Expected Questions",author:"Rahul Sharma",mentorId:1,subject:"Data Structures",type:"expected-questions",pages:15,downloads:523,rating:4.9,price:29,bg:"#fef2f2"},
    {id:"ex2",icon:"📋",title:"DBMS End-Sem PYQ Solutions (2023-24)",author:"Rahul Sharma",mentorId:1,subject:"DBMS",type:"pyq-solutions",pages:38,downloads:612,rating:4.8,price:0,bg:"#eff6ff"},
    {id:"ex3",icon:"📝",title:"OS Important Topics & Definitions",author:"Sneha Patel",mentorId:4,subject:"Operating Systems",type:"important-topics",pages:10,downloads:445,rating:4.7,price:0,bg:"#ecfdf5"},
    {id:"ex4",icon:"🧪",title:"ML Exam Preparation Guide",author:"Ananya Reddy",mentorId:6,subject:"Machine Learning",type:"exam-guide",pages:22,downloads:389,rating:4.9,price:49,bg:"#f5f3ff"},
    {id:"ex5",icon:"🔢",title:"Math III Formula Sheet (All-in-One)",author:"Amit Kumar",mentorId:3,subject:"Engineering Mathematics",type:"important-topics",pages:8,downloads:678,rating:4.6,price:0,bg:"#fffbeb"},
    {id:"ex6",icon:"⚡",title:"Digital Electronics: Last Minute Revision",author:"Priya Gupta",mentorId:2,subject:"Digital Electronics",type:"exam-guide",pages:14,downloads:356,rating:4.8,price:19,bg:"#fef2f2"},
    {id:"ex7",icon:"🎯",title:"CN Mid-Sem Expected Questions",author:"Sneha Patel",mentorId:4,subject:"Computer Networks",type:"expected-questions",pages:12,downloads:289,rating:4.5,price:19,bg:"#eff6ff"},
    {id:"ex8",icon:"📋",title:"Circuit Theory PYQ Solutions",author:"Vikram Singh",mentorId:5,subject:"Circuit Theory",type:"pyq-solutions",pages:35,downloads:198,rating:4.4,price:0,bg:"#fffbeb"},
  ],
  sessions: [
    {id:1,mentorId:1,subject:"Data Structures",title:"Trees & Graph Algorithms",mentorName:"Rahul Sharma",mentorInitials:"RS",mentorGradient:"linear-gradient(135deg,#2563eb,#1d4ed8)",date:"Mar 15",calendarDate:"2026-03-15",time:"5:00 PM",duration:"1h 30m",price:149,status:"upcoming",paymentStatus:"paid",reviewed:false,meetingLink:"https://meet.google.com/abc-def-ghi",topics:["Binary Trees","BST Operations","Graph BFS/DFS"]},
    {id:2,mentorId:4,subject:"Operating Systems",title:"Process Scheduling & Deadlocks",mentorName:"Sneha Patel",mentorInitials:"SP",mentorGradient:"linear-gradient(135deg,#ec4899,#be185d)",date:"Mar 16",calendarDate:"2026-03-16",time:"3:00 PM",duration:"1h",price:119,status:"upcoming",paymentStatus:"paid",reviewed:false,meetingLink:"https://meet.google.com/xyz-uvw-rst",topics:["CPU Scheduling","Deadlock Prevention"]},
    {id:3,mentorId:6,subject:"Machine Learning",title:"Linear Regression & Gradient Descent",mentorName:"Ananya Reddy",mentorInitials:"AR",mentorGradient:"linear-gradient(135deg,#0ea5e9,#0369a1)",date:"Mar 17",calendarDate:"2026-03-17",time:"10:00 AM",duration:"1h 15m",price:179,status:"upcoming",paymentStatus:"paid",reviewed:false,meetingLink:"https://meet.google.com/lmn-opq-rst",topics:["Cost Function","Gradient Descent"]},
    {id:4,mentorId:1,subject:"Data Structures",title:"Linked List & Stack Problems",mentorName:"Rahul Sharma",mentorInitials:"RS",mentorGradient:"linear-gradient(135deg,#2563eb,#1d4ed8)",date:"Mar 12",calendarDate:"2026-03-12",time:"2:00 PM",duration:"1h 30m",price:149,status:"completed",paymentStatus:"paid",reviewed:false,meetingLink:"",topics:["Singly/Doubly LL","Stack Applications"]},
    {id:5,mentorId:2,subject:"Digital Electronics",title:"K-Maps & Combinational Circuits",mentorName:"Priya Gupta",mentorInitials:"PG",mentorGradient:"linear-gradient(135deg,#8b5cf6,#6d28d9)",date:"Mar 10",calendarDate:"2026-03-10",time:"4:00 PM",duration:"1h",price:129,status:"completed",paymentStatus:"paid",reviewed:true,meetingLink:"",topics:["K-Map Simplification","Multiplexer"]},
  ],
  mentorRequests: [
    {id:"req1",studentId:"u1",studentName:"Veer Pathak",studentInitials:"VP",subject:"Data Structures",topic:"Graph Algorithms — DFS/BFS & Shortest Paths",budget:120,status:"open",date:"Mar 14, 2026",acceptedBy:null},
    {id:"req2",studentId:"u2",studentName:"Mani Sharma",studentInitials:"MS",subject:"Digital Electronics",topic:"Sequential Circuits — Flip Flops & Counters",budget:100,status:"open",date:"Mar 13, 2026",acceptedBy:null},
  ],
  notifications: [
    {id:1,icon:"📅",bg:"#eff6ff",title:"Session in 2 hours",msg:"Trees & Graph Algorithms with Rahul Sharma at 5:00 PM",time:"Just now",read:false},
    {id:2,icon:"📄",bg:"#ecfdf5",title:"New notes uploaded",msg:"Ananya Reddy uploaded ML Algorithms from Scratch",time:"1h ago",read:false},
    {id:3,icon:"✅",bg:"#ecfdf5",title:"Session completed",msg:"Your session with Priya Gupta has been rated",time:"2d ago",read:false},
    {id:4,icon:"🎓",bg:"#f5f3ff",title:"New mentor available",msg:"Vikram Singh is now accepting bookings",time:"3d ago",read:true},
    {id:5,icon:"💰",bg:"#fffbeb",title:"Note purchased",msg:"Your DSA Notes earned ₹49 from a new buyer",time:"4d ago",read:true},
    {id:6,icon:"🎯",bg:"#fef2f2",title:"Exam prep uploaded",msg:"Rahul Sharma uploaded DSA Mid-Sem Expected Questions",time:"5d ago",read:true},
  ],
  paymentMethods: [
    {id:"upi",name:"UPI",icon:"📱",description:"Google Pay, PhonePe, Paytm"},
    {id:"card",name:"Debit / Credit Card",icon:"💳",description:"Visa, Mastercard, RuPay"},
    {id:"netbanking",name:"Net Banking",icon:"🏦",description:"All Major Banks"},
    {id:"wallet",name:"StudyFix Wallet",icon:"👛",description:"Pay from your balance"},
  ],
};
