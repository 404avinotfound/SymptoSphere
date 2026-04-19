export interface ChatResponse {
  text: string;
  showSymptoms: boolean;
  symptoms: string[];
}

const KEYWORD_RULES: { keywords: string[]; followUp: string; symptoms: string[] }[] = [

  // ── FEVER / GENERAL INFECTION ─────────────────────────────────────────
  {
    keywords: ["fever","temperature","high temp","burning up","feverish","chills","shivering","night sweat","sweating","hot body","body heat","flu like","flu-like","malaise"],
    followUp: "I see you have a fever. Are you also experiencing chills, sweating, body aches, loss of appetite, or nausea alongside it?",
    symptoms: ["high_fever","low_grade_fever","chills","sweating","fatigue","body_ache","headache","loss_of_appetite","nausea","night_sweats"],
  },

  // ── HEADACHE / NEUROLOGICAL ───────────────────────────────────────────
  {
    keywords: ["headache","head pain","head hurts","migraine","head is pounding","throbbing head","pressure in head","cluster headache","tension headache","head pressure","head spinning"],
    followUp: "Sorry to hear about your headache. Is it throbbing or constant? Do you have nausea, sensitivity to light, neck stiffness, or visual disturbances?",
    symptoms: ["severe_headache","throbbing_headache","nausea","vomiting","sensitivity_to_light","sensitivity_to_sound","neck_stiffness","visual_disturbances","dizziness","fatigue","aura"],
  },
  {
    keywords: ["dizzy","dizziness","vertigo","spinning","lightheaded","light headed","balance","unsteady","off balance","room spinning","woozy"],
    followUp: "Is the dizziness constant or does it come in episodes? Do you also have nausea, headache, ringing in the ears, or blurred vision?",
    symptoms: ["dizziness","nausea","vomiting","ringing_in_ears","hearing_loss","blurred_vision","fatigue","headache","loss_of_balance","fainting"],
  },
  {
    keywords: ["seizure","convulsion","fit","epilepsy","blackout","unconscious","loss of consciousness","faint","fainting","pass out","collapse"],
    followUp: "Did you lose consciousness during the episode? How long did it last, and did you feel confused or tired afterward?",
    symptoms: ["seizures","confusion","loss_of_balance","loss_of_consciousness","muscle_weakness","tingling","fatigue","anxiety","staring_spell","fainting"],
  },
  {
    keywords: ["numb","numbness","tingling","pins and needles","electric shock feeling","burning sensation in limbs","paralysis","weakness in limbs","tremor","shaking","trembling"],
    followUp: "Is the numbness or tingling on one side of the body or both? Did it come on suddenly or gradually?",
    symptoms: ["numbness","tingling","muscle_weakness","tremors","loss_of_balance","confusion","difficulty_speaking","blurred_vision","fatigue","severe_headache"],
  },
  {
    keywords: ["confusion","confused","memory","forgetful","forget","brain fog","can't think","slow thinking","disoriented","dementia","alzheimer","personality change"],
    followUp: "How long have you been experiencing confusion or memory issues? Is it getting worse over time, or did it come on suddenly?",
    symptoms: ["confusion","memory_loss","brain_fog","mood_swings","depression","fatigue","difficulty_speaking","loss_of_balance","sleep_disturbances","disorientation"],
  },
  {
    keywords: ["stroke","facial droop","arm weakness","speech problem","can't speak","slurred speech","sudden weakness","face drooping","face numb","sudden vision loss"],
    followUp: "These symptoms could be serious. Is the weakness or drooping on one side of the face or body? Did it come on very suddenly?",
    symptoms: ["confusion","difficulty_speaking","numbness","severe_headache","blurred_vision","loss_of_balance","facial_drooping","arm_weakness","dizziness","fainting"],
  },

  // ── COUGH / RESPIRATORY ───────────────────────────────────────────────
  {
    keywords: ["cough","coughing","dry cough","wet cough","persistent cough","chronic cough","barking cough","whooping","cough up blood","blood in sputum","phlegm","mucus","sputum"],
    followUp: "Is your cough dry or are you bringing up mucus? Do you also have a sore throat, runny nose, chest pain, or difficulty breathing?",
    symptoms: ["dry_cough","wet_cough","sore_throat","runny_nose","nasal_congestion","chest_pain","shortness_of_breath","wheezing","hoarseness","fatigue","sneezing","post_nasal_drip","mucus_production"],
  },
  {
    keywords: ["shortness of breath","breathless","breathing difficulty","can't breathe","difficulty breathing","out of breath","breathlessness","suffocating","tight breathing","labored breathing","gasping"],
    followUp: "Is the breathlessness constant or does it come with activity? Do you also have chest tightness, wheezing, or cough?",
    symptoms: ["shortness_of_breath","wheezing","chest_tightness","chronic_cough","mucus_production","fatigue","rapid_breathing","noisy_breathing","low_oxygen","chest_pain","cough"],
  },
  {
    keywords: ["wheeze","wheezing","asthma","inhaler","airway","bronchitis","bronchial","noisy breathing","tight chest breathing"],
    followUp: "Does the wheezing get worse at night or with exercise? Do you use an inhaler, or have you been diagnosed with asthma?",
    symptoms: ["wheezing","shortness_of_breath","chest_tightness","chronic_cough","fatigue","noisy_breathing","mucus_production","low_oxygen","rapid_breathing"],
  },
  {
    keywords: ["cold","runny nose","blocked nose","stuffy nose","nasal congestion","sneezing","sneeze","sinus","sinusitis","post nasal drip","nasal drip","rhinitis"],
    followUp: "Do you also have a sore throat, facial pressure, headache, or reduced sense of smell?",
    symptoms: ["runny_nose","nasal_congestion","sneezing","sore_throat","headache","post_nasal_drip","fatigue","low_grade_fever","facial_pain","reduced_smell"],
  },
  {
    keywords: ["tuberculosis","tb","night sweat","cough blood","hemoptysis","wasting","weight loss cough"],
    followUp: "Have you had prolonged cough for more than 3 weeks? Are you also losing weight, sweating at night, or feeling very fatigued?",
    symptoms: ["chronic_cough","blood_in_sputum","night_sweats","high_fever","fatigue","weight_loss","chest_pain","shortness_of_breath","loss_of_appetite","weakness"],
  },
  {
    keywords: ["pneumonia","lung infection","chest infection","lung inflammation"],
    followUp: "Do you have a high fever, chest pain when breathing, or coughing up thick mucus? Is breathing painful?",
    symptoms: ["wet_cough","high_fever","shortness_of_breath","chest_pain","fatigue","chills","body_ache","sweating","rapid_breathing","low_oxygen","nausea"],
  },

  // ── CHEST / HEART ─────────────────────────────────────────────────────
  {
    keywords: ["chest pain","chest hurts","chest pressure","heart pain","heart attack","angina","left arm pain","jaw pain","tightness in chest","chest tightness","heart burn","heart burn"],
    followUp: "Is the chest pain sharp or pressure-like? Does it spread to your arm, jaw, or back? Are you also sweating, nauseated, or short of breath?",
    symptoms: ["chest_pain","shortness_of_breath","palpitations","sweating","dizziness","left_arm_pain","fatigue","nausea","tightness_in_chest","rapid_heartbeat","jaw_pain"],
  },
  {
    keywords: ["palpitation","racing heart","fast heart","heart flutter","irregular heartbeat","skipped beat","heart beat","tachycardia","arrhythmia","heartbeat irregular"],
    followUp: "Does your heart race or flutter suddenly? Do you also feel dizzy, short of breath, or experience chest discomfort when it happens?",
    symptoms: ["palpitations","irregular_heartbeat","rapid_heartbeat","shortness_of_breath","dizziness","fainting","chest_pain","fatigue","sweating","anxiety"],
  },
  {
    keywords: ["hypertension","high blood pressure","bp high","blood pressure","elevated bp"],
    followUp: "Do you experience frequent headaches, dizziness, or nosebleeds? Have you been told your blood pressure is high before?",
    symptoms: ["headache","dizziness","shortness_of_breath","chest_pain","palpitations","fatigue","visual_disturbances","sweating","nosebleed","tinnitus"],
  },
  {
    keywords: ["swollen legs","swollen ankles","swollen feet","leg swelling","ankle swelling","edema","water retention","fluid retention","puffy legs"],
    followUp: "Is the swelling in both legs or just one? Do you also have shortness of breath, fatigue, or rapid weight gain?",
    symptoms: ["swelling","shortness_of_breath","fatigue","rapid_heartbeat","chest_pain","cough","loss_of_appetite","nausea","reduced_urine","high_blood_pressure"],
  },

  // ── STOMACH / GASTROINTESTINAL ────────────────────────────────────────
  {
    keywords: ["stomach","abdomen","abdominal pain","belly","tummy","stomach ache","stomach pain","stomach cramp","gut","bowel","intestine","colon","nausea","feel sick","queasy"],
    followUp: "I understand your stomach is bothering you. Are you also experiencing nausea, vomiting, diarrhea, bloating, or loss of appetite?",
    symptoms: ["nausea","vomiting","diarrhea","abdominal_pain","bloating","loss_of_appetite","indigestion","constipation","heartburn","blood_in_stool","stomach_cramps","excessive_gas"],
  },
  {
    keywords: ["vomit","vomiting","throwing up","throw up","puke","puking","retching"],
    followUp: "How many times have you vomited? Is there any blood in the vomit? Do you also have fever, diarrhea, or abdominal pain?",
    symptoms: ["vomiting","nausea","abdominal_pain","diarrhea","fatigue","fever","loss_of_appetite","dehydration","blood_in_stool","stomach_cramps"],
  },
  {
    keywords: ["diarrhea","loose stool","watery stool","loose motion","frequent stool","runny stool","bloody stool","blood in stool","mucus in stool"],
    followUp: "Is the diarrhea watery or does it contain blood or mucus? Do you also have stomach cramps, fever, or vomiting?",
    symptoms: ["diarrhea","abdominal_pain","nausea","vomiting","fever","fatigue","dehydration","blood_in_stool","stomach_cramps","loss_of_appetite","excessive_gas"],
  },
  {
    keywords: ["constipation","can't poop","no bowel movement","hard stool","straining","bloated","gas","flatulence","burping","bloating"],
    followUp: "How long have you been constipated? Do you also have abdominal pain, bloating, or a feeling of incomplete emptying?",
    symptoms: ["constipation","bloating","abdominal_pain","excessive_gas","indigestion","nausea","loss_of_appetite","heartburn","stomach_cramps","fatigue"],
  },
  {
    keywords: ["heartburn","acid reflux","gerd","acid","indigestion","burning throat","burning stomach","sour taste","regurgitation","burp","belch"],
    followUp: "Does the burning get worse after meals or when lying down? Do you also have a sour taste in your mouth, bloating, or chest discomfort?",
    symptoms: ["heartburn","indigestion","nausea","vomiting","chest_pain","hoarseness","chronic_cough","difficulty_swallowing","bloating","burping","sore_throat"],
  },
  {
    keywords: ["appendix","appendicitis","right side pain","lower right pain","lower right abdomen"],
    followUp: "Is the pain sharp and in the lower right abdomen? Did it start near the navel and move to the right side? Do you have fever or vomiting?",
    symptoms: ["abdominal_pain","nausea","vomiting","high_fever","loss_of_appetite","bloating","diarrhea","constipation","rebound_tenderness"],
  },

  // ── SKIN ──────────────────────────────────────────────────────────────
  {
    keywords: ["rash","skin rash","rash on skin","red rash","body rash","rash spreading"],
    followUp: "Where is the rash located? Is it spreading, itchy, or painful? Do you also have fever or recent insect bites?",
    symptoms: ["rash","itching","redness","blisters","dry_skin","swelling","skin_peeling","hives","scaly_skin","burning_skin","fatigue","fever"],
  },
  {
    keywords: ["itch","itching","itchy","itchy skin","scratching","hives","urticaria","insect bite","bug bite"],
    followUp: "Is the itching all over your body or in a specific area? Do you notice any rash, redness, or swelling?",
    symptoms: ["itching","rash","redness","hives","blisters","dry_skin","swelling","burning_skin","skin_peeling","fatigue"],
  },
  {
    keywords: ["blister","blisters","water blister","boil","pustule","pimple","acne","spots","blackhead","whitehead","pus"],
    followUp: "Are the blisters filled with clear fluid or pus? Are they painful, and do you have fever or spreading redness around them?",
    symptoms: ["blisters","pustules","rash","redness","itching","swelling","open_sores","fever","fatigue","skin_peeling"],
  },
  {
    keywords: ["yellow skin","yellowish","jaundice","yellow eyes","pale stool","dark urine","liver","hepatitis"],
    followUp: "Have you noticed yellowing of the whites of your eyes as well? Do you also have dark urine, pale stools, or abdominal pain on the right side?",
    symptoms: ["yellowing_of_skin","fatigue","abdominal_pain","nausea","loss_of_appetite","high_fever","itching","dark_urine","bloating"],
  },
  {
    keywords: ["dry skin","flaky skin","peeling skin","scaly skin","skin peeling","cracked skin","rough skin","eczema","psoriasis","dermatitis"],
    followUp: "Is the dryness accompanied by redness, itching, or cracking? Does it get worse in cold or dry weather?",
    symptoms: ["dry_skin","itching","redness","rash","scaly_skin","skin_peeling","blisters","swelling","burning_skin"],
  },
  {
    keywords: ["wound","cut","infection","cellulitis","red spreading","skin hot","skin warm","abscess","open sore","non healing wound","slow healing"],
    followUp: "Is the wound warm, swollen, and spreading in redness? Do you have fever or red streaks spreading from the wound?",
    symptoms: ["redness","swelling","open_sores","high_fever","chills","fatigue","skin_darkening","burning_skin","body_ache","pus"],
  },
  {
    keywords: ["dark circles","puffy eyes","dark skin around eyes","skin darkening","pigmentation","dark patches","melasma"],
    followUp: "Are the dark patches spreading? Do you also experience fatigue, poor sleep, allergies, or hormonal issues?",
    symptoms: ["skin_darkening","fatigue","sleep_disturbances","itchy_eyes","swollen_eyelids","depression","loss_of_appetite","anxiety"],
  },

  // ── EYES ──────────────────────────────────────────────────────────────
  {
    keywords: ["red eye","pink eye","conjunctivitis","eye discharge","eye infection","watery eye","itchy eye","eye pain","eye hurt","sore eye"],
    followUp: "Is your eye producing discharge? Is it in one or both eyes? Do you have sensitivity to light or blurred vision?",
    symptoms: ["red_eyes","itchy_eyes","watery_eyes","eye_pain","blurred_vision","sensitivity_to_light","discharge_from_eyes","swollen_eyelids","dry_eyes"],
  },
  {
    keywords: ["blurred vision","blurry vision","double vision","vision loss","can't see","seeing spots","floaters","halos","night blindness","vision problem","sight problem"],
    followUp: "Did the vision change come on suddenly or gradually? Is it in one eye or both? Do you also have eye pain or headache?",
    symptoms: ["blurred_vision","visual_disturbances","eye_pain","headache","sensitivity_to_light","floaters","dizziness","nausea"],
  },
  {
    keywords: ["glaucoma","eye pressure","peripheral vision loss","tunnel vision"],
    followUp: "Do you have eye pain, headache, or see halos around lights? Has your side (peripheral) vision decreased?",
    symptoms: ["eye_pain","blurred_vision","visual_disturbances","headache","nausea","vomiting","halos_around_lights","reduced_peripheral_vision"],
  },

  // ── EARS ──────────────────────────────────────────────────────────────
  {
    keywords: ["ear pain","earache","ear hurts","ear infection","ear discharge","blocked ear","ear blockage","fluid in ear","pressure in ear"],
    followUp: "Is there any discharge from your ear? Do you also have fever, hearing loss, or a feeling of fullness in the ear?",
    symptoms: ["ear_pain","hearing_loss","fever","discharge_from_ear","dizziness","nausea","fullness_in_ear","itchy_ear","fatigue"],
  },
  {
    keywords: ["ringing in ear","tinnitus","buzzing ear","humming ear","ear noise","hearing loss","hard of hearing","deaf","muffled hearing"],
    followUp: "Is the ringing constant or does it come and go? Do you also have hearing loss, dizziness, or ear pain?",
    symptoms: ["ringing_in_ears","hearing_loss","dizziness","fatigue","depression","anxiety","sleep_disturbances","ear_pain","fullness_in_ear"],
  },

  // ── THROAT ────────────────────────────────────────────────────────────
  {
    keywords: ["sore throat","throat pain","throat hurts","throat infection","strep","tonsil","tonsillitis","difficulty swallowing","swallowing pain","painful swallow","hoarse","hoarseness","voice change","lost voice"],
    followUp: "Is it painful to swallow? Do you see white patches or swollen tonsils? Do you also have fever or swollen glands in your neck?",
    symptoms: ["sore_throat","difficulty_swallowing","swollen_tonsils","white_patches_on_throat","hoarseness","ear_pain","high_fever","bad_breath","swollen_lymph_nodes","headache"],
  },

  // ── JOINTS / MUSCULOSKELETAL ──────────────────────────────────────────
  {
    keywords: ["joint pain","knee pain","hip pain","elbow pain","shoulder pain","ankle pain","wrist pain","knuckle pain","painful joint","swollen joint","arthritis","gout","rheumatoid"],
    followUp: "Are the joints swollen, red, or warm to the touch? Is the pain worse in the morning or after activity?",
    symptoms: ["joint_pain","joint_swelling","stiffness","redness_around_joints","fatigue","fever","muscle_weakness","limited_mobility","tenderness","bone_pain"],
  },
  {
    keywords: ["back pain","lower back","backache","spine","spinal","sciatica","lumbar","neck pain","cervical","stiff neck","herniated","disc"],
    followUp: "Is the pain sharp or dull? Does it radiate down your leg or arm? Is it worse when sitting, standing, or lying down?",
    symptoms: ["back_pain","muscle_pain","joint_pain","stiffness","limited_mobility","numbness","tingling","muscle_weakness","fatigue","shooting_pain"],
  },
  {
    keywords: ["muscle pain","muscle ache","myalgia","sore muscles","body ache","body pain","fibromyalgia","muscle cramp","muscle spasm","cramp","stiffness"],
    followUp: "Is the muscle pain widespread or in a specific area? Do you also have fatigue, sleep problems, or tenderness when touched?",
    symptoms: ["muscle_pain","fatigue","sleep_disturbances","headache","depression","anxiety","joint_pain","tingling","irritability","sensitivity_to_touch"],
  },
  {
    keywords: ["bone pain","bone ache","fracture","break","osteoporosis","brittle bones","stooped","height loss"],
    followUp: "Is the bone pain constant or worse with movement? Have you had any recent falls or fractures?",
    symptoms: ["bone_pain","back_pain","limited_mobility","fatigue","joint_pain","muscle_weakness","fracture_after_minor_fall","loss_of_height","stooped_posture"],
  },

  // ── URINARY ───────────────────────────────────────────────────────────
  {
    keywords: ["urine","urination","urinate","pee","burning pee","painful urination","frequent urination","cloudy urine","blood in urine","bladder","uti","urinary infection","urinary tract"],
    followUp: "Is there pain or burning when you urinate? Do you notice any blood, cloudiness, or strong smell? Do you also have lower back pain or fever?",
    symptoms: ["frequent_urination","painful_urination","blood_in_urine","cloudy_urine","strong_odor_urine","lower_back_pain","pelvic_pain","fever","nausea","urgency_to_urinate"],
  },
  {
    keywords: ["kidney","kidney stone","kidney pain","kidney infection","flank pain","side pain","loin pain","nephritis","renal"],
    followUp: "Is the pain severe and coming in waves? Do you also have blood in urine, nausea, vomiting, or fever?",
    symptoms: ["severe_abdominal_pain","back_pain","painful_urination","blood_in_urine","nausea","vomiting","frequent_urination","fever","chills","cloudy_urine"],
  },

  // ── FATIGUE / GENERAL WEAKNESS ────────────────────────────────────────
  {
    keywords: ["tired","fatigue","exhausted","exhaustion","weakness","weak","no energy","lethargy","lethargic","drained","sluggish","run down","always sleepy","can't get up","chronic fatigue"],
    followUp: "Is the fatigue constant or worse at certain times? Do you also have shortness of breath, pale skin, loss of appetite, or unusual thirst?",
    symptoms: ["weakness","body_ache","fever","loss_of_appetite","excessive_thirst","frequent_urination","shortness_of_breath","depression","muscle_weakness","pale_skin","fainting","brain_fog"],
  },
  {
    keywords: ["weight loss","losing weight","unintentional weight loss","weight drop","unexplained weight loss","wasting"],
    followUp: "Is the weight loss intentional or unexpected? Do you also have loss of appetite, night sweats, fever, or fatigue?",
    symptoms: ["weight_loss","loss_of_appetite","fatigue","night_sweats","high_fever","chronic_cough","nausea","depression","excessive_thirst","frequent_urination"],
  },
  {
    keywords: ["weight gain","gaining weight","obesity","overweight","can't lose weight","fat","bloated feeling","puffiness"],
    followUp: "Has the weight gain been recent or gradual? Do you also experience fatigue, joint pain, shortness of breath, or swelling?",
    symptoms: ["fatigue","shortness_of_breath","joint_pain","back_pain","depression","sleep_disturbances","excessive_sweating","skin_darkening","heartburn","frequent_infections"],
  },
  {
    keywords: ["anemia","pale","pale skin","pale face","pallor","iron deficiency","low blood","low hemoglobin","brittle nails","hair loss anemia"],
    followUp: "Do you also feel short of breath, dizzy, or have a rapid heartbeat even with mild activity? Have you noticed pale skin or cold hands?",
    symptoms: ["fatigue","weakness","shortness_of_breath","dizziness","headache","loss_of_appetite","pale_skin","rapid_heartbeat","cold_hands_feet","depression","brittle_nails"],
  },

  // ── ENDOCRINE / METABOLIC ─────────────────────────────────────────────
  {
    keywords: ["thirst","excessive thirst","always thirsty","drinking a lot","dehydrated","dry mouth","diabetes","sugar","blood sugar","glucose","diabetic"],
    followUp: "Are you also urinating more frequently, feeling fatigued, losing weight, or experiencing blurred vision or slow-healing cuts?",
    symptoms: ["excessive_thirst","frequent_urination","fatigue","blurred_vision","slow_healing","weight_loss","hunger","dizziness","numbness","frequent_infections"],
  },
  {
    keywords: ["thyroid","hypothyroid","hyperthyroid","thyroid problem","thyroid gland","goiter","tsh","slow metabolism","overactive thyroid","underactive thyroid"],
    followUp: "Are you experiencing unexplained weight changes, feeling unusually cold or hot, rapid heartbeat, fatigue, or hair loss?",
    symptoms: ["fatigue","weight_gain","cold_intolerance","depression","constipation","dry_skin","hair_loss","muscle_weakness","slow_heart_rate","memory_loss","anxiety","tremors","sweating","rapid_heartbeat"],
  },
  {
    keywords: ["gout","uric acid","big toe pain","toe swelling","gout attack","podagra"],
    followUp: "Is the pain and swelling sudden and intense, especially in your big toe or ankle? Do you also have fever or skin redness over the joint?",
    symptoms: ["joint_pain","joint_swelling","redness_around_joints","tenderness","high_fever","limited_mobility","burning_skin","chills"],
  },

  // ── MENTAL HEALTH ─────────────────────────────────────────────────────
  {
    keywords: ["sad","depression","depressed","hopeless","empty","worthless","no motivation","not interested","low mood","crying","grief","suicidal","self harm"],
    followUp: "I'm sorry you're feeling this way. Are you experiencing persistent sadness, loss of interest in things you used to enjoy, changes in sleep or appetite, or feelings of hopelessness?",
    symptoms: ["depression","fatigue","sleep_disturbances","loss_of_interest","social_withdrawal","hopelessness","brain_fog","irritability","loss_of_appetite","muscle_pain","anxiety","mood_swings"],
  },
  {
    keywords: ["anxious","anxiety","worry","panic","panic attack","nervous","stressed","stress","overthinking","fear","phobia","ocd","intrusive thoughts"],
    followUp: "Are you experiencing racing thoughts, a pounding heart, shortness of breath, or feeling like something terrible is about to happen?",
    symptoms: ["anxiety","panic_attacks","rapid_heartbeat","sweating","tremors","shortness_of_breath","sleep_disturbances","fatigue","irritability","brain_fog","muscle_tension","dizziness"],
  },
  {
    keywords: ["sleep","insomnia","can't sleep","sleepless","waking up","not sleeping","sleep problem","poor sleep","oversleeping","restless sleep","nightmares"],
    followUp: "Is it difficulty falling asleep, staying asleep, or waking too early? Do you also feel fatigued, irritable, or unable to concentrate during the day?",
    symptoms: ["sleep_disturbances","fatigue","irritability","brain_fog","depression","anxiety","headache","mood_swings","reduced_performance"],
  },
  {
    keywords: ["mood swing","mood swings","irritable","irritability","anger","angry","emotional","crying for no reason","bipolar","mania","manic","hyperactive mood"],
    followUp: "How frequently do the mood changes occur? Do you swing between very high energy and deep sadness, or is it mostly irritability?",
    symptoms: ["mood_swings","irritability","depression","anxiety","sleep_disturbances","fatigue","brain_fog","loss_of_interest","social_withdrawal","hopelessness"],
  },

  // ── REPRODUCTIVE / HORMONAL ───────────────────────────────────────────
  {
    keywords: ["period","menstrual","menstruation","irregular period","missed period","heavy period","painful period","cramps","pelvic pain","pcos","endometriosis","vaginal","reproductive"],
    followUp: "Are your periods irregular, very painful, or unusually heavy? Do you also have pelvic pain outside of your period, or other symptoms like acne or hair changes?",
    symptoms: ["pelvic_pain","abdominal_pain","fatigue","depression","anxiety","nausea","back_pain","constipation","diarrhea","bloating","irregular_periods","excessive_hair_growth"],
  },
  {
    keywords: ["fertility","conceiving","pregnant","pregnancy","infertility","trying to conceive","missed ovulation"],
    followUp: "Are you experiencing any other symptoms such as irregular periods, pelvic pain, hormonal changes, or unusual discharge?",
    symptoms: ["irregular_periods","pelvic_pain","fatigue","nausea","abdominal_pain","excessive_hair_growth","acne","weight_gain","depression","anxiety"],
  },

  // ── VECTOR-BORNE / TROPICAL ───────────────────────────────────────────
  {
    keywords: ["dengue","dengue fever","mosquito bite","mosquito","aedes","breakbone fever"],
    followUp: "Do you have a high fever with severe body aches and headache behind the eyes? Have you recently been in an area where dengue is common?",
    symptoms: ["high_fever","severe_headache","body_ache","rash","nausea","vomiting","fatigue","chills","joint_pain","eye_pain","loss_of_appetite"],
  },
  {
    keywords: ["malaria","malaria fever","cyclic fever","plasmodium","anopheles","chills and fever"],
    followUp: "Does your fever come in cycles — chills followed by intense heat then sweating? Have you recently travelled to a malaria-prone area?",
    symptoms: ["high_fever","chills","sweating","severe_headache","nausea","vomiting","fatigue","body_ache","shivering","diarrhea","muscle_pain"],
  },
  {
    keywords: ["typhoid","typhoid fever","enteric fever","contaminated water","contaminated food","salmonella"],
    followUp: "Have you had a sustained high fever for several days with stomach pain, constipation, or headache? Any recent travel or exposure to contaminated food/water?",
    symptoms: ["high_fever","abdominal_pain","headache","loss_of_appetite","constipation","fatigue","body_ache","nausea","rash","weakness","diarrhea"],
  },
  {
    keywords: ["chikungunya","chik","joint fever","mosquito joint pain"],
    followUp: "Do you have sudden fever with severe joint pain affecting multiple joints? Have you recently been in a region with mosquito-borne outbreaks?",
    symptoms: ["high_fever","joint_pain","joint_swelling","rash","muscle_pain","headache","fatigue","nausea","chills"],
  },
  {
    keywords: ["cholera","rice water stool","watery diarrhea","severe dehydration","vomiting diarrhea","epidemic diarrhea"],
    followUp: "Is the diarrhea very watery and profuse, without significant stomach cramps? Are you also vomiting and feeling extremely weak?",
    symptoms: ["severe_diarrhea","vomiting","dehydration","muscle_cramps","nausea","fatigue","low_grade_fever","rapid_heartbeat","dry_skin"],
  },
  {
    keywords: ["leptospirosis","weil disease","rat urine","flood water illness","jaundice fever","leptospira"],
    followUp: "Have you been exposed to floodwater, soil, or animals recently? Do you have fever with severe headache, red eyes, and muscle pain?",
    symptoms: ["high_fever","severe_headache","chills","muscle_pain","vomiting","diarrhea","rash","red_eyes","jaundice","abdominal_pain"],
  },

  // ── LIVER / HEPATITIS ─────────────────────────────────────────────────
  {
    keywords: ["hepatitis","liver","liver pain","liver disease","hepatitis a","hepatitis b","hepatitis c","liver infection","liver swelling","cirrhosis","fatty liver"],
    followUp: "Do you have yellowing of the skin or eyes, dark urine, pale stools, or right-sided abdominal pain? Have you been exposed to contaminated food or blood?",
    symptoms: ["fatigue","nausea","vomiting","abdominal_pain","yellowing_of_skin","loss_of_appetite","joint_pain","dark_urine","fever","weakness","itching"],
  },

  // ── IMMUNE / AUTOIMMUNE ───────────────────────────────────────────────
  {
    keywords: ["lupus","autoimmune","butterfly rash","sle","systemic lupus","immune system attacking","autoimmune disease","rheumatic"],
    followUp: "Do you have a rash across your cheeks, joint pain, fatigue, and sensitivity to sunlight? Do symptoms come and go?",
    symptoms: ["rash","joint_pain","fatigue","high_fever","hair_loss","chest_pain","sensitivity_to_light","swelling","mouth_sores","depression","kidney_problems"],
  },
  {
    keywords: ["hiv","aids","immune deficiency","immunocompromised","frequent infections","opportunistic infection","cd4","antiretroviral"],
    followUp: "Have you had recent unexplained weight loss, persistent fever, swollen lymph nodes, or frequent infections that don't resolve normally?",
    symptoms: ["high_fever","fatigue","rash","swollen_lymph_nodes","sore_throat","headache","muscle_pain","night_sweats","weight_loss","frequent_infections","diarrhea"],
  },

  // ── CANCER SIGNS ──────────────────────────────────────────────────────
  {
    keywords: ["cancer","tumor","lump","mass","growth","swollen lymph node","lymphoma","leukemia","oncology","chemotherapy","malignant","benign"],
    followUp: "Have you noticed an unexplained lump, persistent pain, unexplained weight loss, or blood where it shouldn't be? How long have you had this concern?",
    symptoms: ["fatigue","weight_loss","loss_of_appetite","night_sweats","high_fever","swollen_lymph_nodes","chronic_cough","blood_in_stool","bone_pain","pain"],
  },
  {
    keywords: ["blood in stool","rectal bleeding","black stool","tarry stool","dark stool","bright red blood stool","colorectal","colon cancer"],
    followUp: "Is the blood bright red or dark and tarry? Do you also have abdominal pain, changes in bowel habits, or unexplained weight loss?",
    symptoms: ["blood_in_stool","abdominal_pain","constipation","diarrhea","weight_loss","fatigue","bloating","nausea","anemia"],
  },
  {
    keywords: ["breast lump","breast pain","nipple discharge","breast change","breast cancer","mastitis"],
    followUp: "Is the lump painful or painless? Have you noticed any skin changes, nipple discharge, or changes in breast shape or size?",
    symptoms: ["breast_lump","breast_pain","nipple_discharge","skin_changes","swollen_lymph_nodes","fatigue","weight_loss","bone_pain"],
  },

  // ── PAEDIATRIC / CHILD-SPECIFIC ───────────────────────────────────────
  {
    keywords: ["child","baby","infant","toddler","kid","children","paediatric","pediatric","newborn","my son","my daughter","my child"],
    followUp: "Is the child running a fever, crying more than usual, refusing to eat, or showing a rash? How old is the child?",
    symptoms: ["high_fever","rash","loss_of_appetite","fatigue","vomiting","diarrhea","ear_pain","sore_throat","cough","runny_nose","irritability"],
  },

  // ── GERIATRIC / ELDERLY ───────────────────────────────────────────────
  {
    keywords: ["elderly","old age","senior","aged","geriatric","grandparent","pensioner","my father","my mother","my parents","aging"],
    followUp: "Is this for yourself or someone else? Are there symptoms like falls, confusion, joint pain, shortness of breath, or chest pain?",
    symptoms: ["confusion","memory_loss","fatigue","joint_pain","shortness_of_breath","dizziness","loss_of_balance","depression","frequent_urination","bone_pain"],
  },

  // ── GENERAL / MULTI-SYMPTOM ───────────────────────────────────────────
  {
    keywords: ["not feeling well","feeling unwell","feel sick","feeling sick","feel bad","feel awful","feel terrible","generally unwell","not right","something wrong","don't know what's wrong"],
    followUp: "I'm sorry to hear that. Can you tell me more — do you have any fever, pain, nausea, skin changes, or difficulty breathing?",
    symptoms: ["high_fever","fatigue","nausea","headache","body_ache","loss_of_appetite","dizziness","chills","vomiting","shortness_of_breath"],
  },
  {
    keywords: ["swelling","swollen","inflammation","inflamed","puffy","oedema","edema"],
    followUp: "Where is the swelling — face, limbs, abdomen, or joints? Is it painful, and do you have fever, shortness of breath, or skin changes alongside it?",
    symptoms: ["swelling","redness","joint_pain","shortness_of_breath","fatigue","fever","skin_darkening","itching","rapid_heartbeat","reduced_urine"],
  },
  {
    keywords: ["lymph node","swollen gland","neck lump","armpit lump","groin lump","lymphadenopathy"],
    followUp: "Are the swollen lymph nodes painful or painless? Do you also have fever, night sweats, fatigue, or unexplained weight loss?",
    symptoms: ["swollen_lymph_nodes","high_fever","night_sweats","fatigue","weight_loss","sore_throat","rash","body_ache","loss_of_appetite"],
  },
  {
    keywords: ["hair loss","losing hair","bald","baldness","alopecia","thinning hair","hair fall"],
    followUp: "Is the hair loss patchy or all over? Do you also have fatigue, dry skin, weight changes, or hormonal issues?",
    symptoms: ["hair_loss","fatigue","dry_skin","depression","weight_gain","cold_intolerance","itching","rash","anxiety","skin_darkening"],
  },
  {
    keywords: ["appetite","not eating","no appetite","loss of appetite","not hungry","anorexia","eating less","food aversion"],
    followUp: "How long have you had no appetite? Do you also have nausea, weight loss, fatigue, stomach pain, or mood changes?",
    symptoms: ["loss_of_appetite","nausea","fatigue","weight_loss","abdominal_pain","depression","bloating","vomiting","constipation","indigestion"],
  },
  {
    keywords: ["dehydration","dehydrated","not drinking","dry mouth","no saliva","sunken eyes","dark urine dehydration"],
    followUp: "Are you also experiencing dizziness, rapid heartbeat, very dark urine, or extreme fatigue? Have you been vomiting or having diarrhea?",
    symptoms: ["dehydration","fatigue","dizziness","rapid_heartbeat","nausea","vomiting","diarrhea","dry_skin","reduced_urine","confusion"],
  },
  {
    keywords: ["infection","infected","bacterial","viral","fungal","parasitic","sepsis","septic","blood infection"],
    followUp: "Do you have fever, chills, rapid heartbeat, or confusion? Is there a wound or specific area that looks infected?",
    symptoms: ["high_fever","chills","fatigue","body_ache","rapid_heartbeat","confusion","nausea","vomiting","redness","swelling","headache"],
  },
];

const FALLBACK_FOLLOWUP =
  "I see. Could you share a bit more — do you have any fever, pain, nausea, skin changes, or difficulty breathing? The more detail, the better I can help.";

const FALLBACK_SYMPTOMS = [
  "high_fever","low_grade_fever","chills","fatigue","headache","body_ache",
  "nausea","vomiting","dry_cough","sore_throat","shortness_of_breath",
  "abdominal_pain","diarrhea","rash","joint_pain","dizziness","loss_of_appetite",
];

const GREETINGS = ["hi","hello","hey","good morning","good evening","good afternoon","howdy","sup","hiya","what's up","greetings","yo"];
const NOT_SICK = ["fine","good","great","ok","okay","well","normal","nothing","never mind","all good","healthy","i am fine","i feel fine","i am ok","feeling good"];

export function getRuleChatResponse(userText: string, turnCount: number): ChatResponse {
  const lower = userText.toLowerCase().trim();

  if (GREETINGS.some(g => lower === g || lower.startsWith(g + " ") || lower.startsWith(g + "!"))) {
    return {
      text: "Hello! I'm here to help you understand your symptoms. Could you describe what you're feeling?\n\nFor example: \"I have a fever and headache\", \"my stomach hurts\", or \"I have itchy skin\".",
      showSymptoms: false,
      symptoms: [],
    };
  }

  if (NOT_SICK.some(w => lower === w || lower.includes("i feel " + w) || lower.includes("i am " + w) || lower.includes("i'm " + w))) {
    return {
      text: "That's great to hear! If you ever experience any symptoms you'd like to check, just describe them and I'll help you out.",
      showSymptoms: false,
      symptoms: [],
    };
  }

  // After 2+ user turns always show chips
  if (turnCount >= 2) {
    const matched = KEYWORD_RULES.find(r => r.keywords.some(k => lower.includes(k)));
    return {
      text: "Thanks for sharing that. Here are the most relevant symptoms — please select all that apply to you:",
      showSymptoms: true,
      symptoms: matched ? matched.symptoms : FALLBACK_SYMPTOMS,
    };
  }

  const matched = KEYWORD_RULES.find(r => r.keywords.some(k => lower.includes(k)));

  // First turn with a keyword match — ask a targeted follow-up
  if (matched && turnCount === 0) {
    return {
      text: matched.followUp,
      showSymptoms: false,
      symptoms: [],
    };
  }

  // Second turn or unmatched first turn — show symptom chips
  return {
    text: "Got it. Here are the most relevant symptoms based on what you've described — select all that apply:",
    showSymptoms: true,
    symptoms: matched ? matched.symptoms : FALLBACK_SYMPTOMS,
  };
}
