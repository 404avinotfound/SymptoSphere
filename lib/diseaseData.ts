export const SYMPTOM_MAP: Record<string, string[]> = {
  fever: ["high_fever","low_grade_fever","chills","sweating","fatigue","body_ache","headache","loss_of_appetite","nausea","night_sweats"],
  headache: ["severe_headache","throbbing_headache","nausea","vomiting","sensitivity_to_light","sensitivity_to_sound","neck_stiffness","visual_disturbances","dizziness","fatigue","aura"],
  cough: ["dry_cough","wet_cough","sore_throat","runny_nose","nasal_congestion","chest_pain","shortness_of_breath","wheezing","hoarseness","fatigue","sneezing","post_nasal_drip"],
  stomach: ["nausea","vomiting","diarrhea","abdominal_pain","bloating","loss_of_appetite","indigestion","constipation","heartburn","blood_in_stool","stomach_cramps","excessive_gas"],
  skin: ["rash","itching","redness","blisters","dry_skin","swelling","yellowing_of_skin","skin_peeling","hives","pustules","scaly_skin","skin_darkening","open_sores","burning_skin"],
  fatigue: ["weakness","body_ache","fever","loss_of_appetite","excessive_thirst","frequent_urination","shortness_of_breath","depression","muscle_weakness","pale_skin","fainting","brain_fog"],
  chest: ["chest_pain","shortness_of_breath","palpitations","sweating","dizziness","left_arm_pain","fatigue","cough","tightness_in_chest","rapid_heartbeat","irregular_heartbeat"],
  joint: ["joint_pain","joint_swelling","stiffness","redness_around_joints","fatigue","fever","muscle_weakness","limited_mobility","muscle_pain","back_pain","bone_pain","tenderness"],
  neuro: ["confusion","memory_loss","seizures","numbness","tingling","tremors","difficulty_speaking","loss_of_balance","blurred_vision","fainting","severe_headache","sensitivity_to_light"],
  urinary: ["frequent_urination","painful_urination","blood_in_urine","cloudy_urine","strong_odor_urine","lower_back_pain","pelvic_pain","fever","nausea","urgency_to_urinate"],
  respiratory: ["shortness_of_breath","wheezing","chest_tightness","chronic_cough","mucus_production","bluish_lips","fatigue","rapid_breathing","noisy_breathing","low_oxygen"],
  mental: ["depression","anxiety","mood_swings","irritability","sleep_disturbances","fatigue","loss_of_interest","brain_fog","panic_attacks","social_withdrawal","hopelessness"],
  eye: ["red_eyes","itchy_eyes","watery_eyes","eye_pain","blurred_vision","sensitivity_to_light","discharge_from_eyes","swollen_eyelids","dry_eyes","floaters"],
  ear: ["ear_pain","hearing_loss","ringing_in_ears","discharge_from_ear","dizziness","nausea","fullness_in_ear","itchy_ear","fever"],
  throat: ["sore_throat","difficulty_swallowing","swollen_tonsils","white_patches_on_throat","hoarseness","ear_pain","fever","bad_breath","swollen_lymph_nodes"],
};

export interface Disease {
  symptoms: string[];
  description: string;
  remedies: string[];
  color: string;
}

export const DISEASE_DB: Record<string, Disease> = {

  // ── SKIN ──────────────────────────────────────────────────────────────
  "Chickenpox": {
    symptoms: ["blisters","rash","itching","high_fever","fatigue","loss_of_appetite","redness","skin_peeling","body_ache","headache"],
    description: "A highly contagious viral infection (varicella-zoster) causing itchy blister-like rash all over the body.",
    remedies: ["Antihistamines","Calamine lotion","Rest","Avoid scratching","Antiviral meds if severe","Keep skin clean","Trim nails short","Oatmeal baths"],
    color: "pink",
  },
  "Eczema": {
    symptoms: ["itching","dry_skin","redness","rash","blisters","skin_peeling","swelling","burning_skin","scaly_skin"],
    description: "A chronic condition causing the skin to become inflamed, red, and intensely itchy.",
    remedies: ["Moisturize regularly","Steroid creams","Antihistamines","Avoid triggers","Use gentle soap","Wear soft fabrics","Dermatologist consult","Cool compresses"],
    color: "amber",
  },
  "Psoriasis": {
    symptoms: ["scaly_skin","rash","itching","skin_peeling","redness","dry_skin","blisters","swelling","joint_pain"],
    description: "A chronic autoimmune skin disease that speeds up the life cycle of skin cells, causing red scaly patches.",
    remedies: ["Topical corticosteroids","Moisturizers","Phototherapy","Avoid triggers","Dermatologist consult","Biologics for severe cases","Coal tar preparations"],
    color: "coral",
  },
  "Allergic Reaction": {
    symptoms: ["rash","itching","swelling","redness","hives","blisters","dry_skin","wheezing","shortness_of_breath","fatigue"],
    description: "An immune system response to a foreign substance such as food, pollen, pet dander, or medication.",
    remedies: ["Antihistamines","Remove allergen","Cold compress","Hydrocortisone cream","Epinephrine if severe (EpiPen)","Seek emergency care for anaphylaxis"],
    color: "red",
  },
  "Ringworm (Tinea)": {
    symptoms: ["rash","itching","redness","scaly_skin","skin_peeling","open_sores","blisters","burning_skin"],
    description: "A common fungal skin infection causing a ring-shaped red, scaly rash — not actually caused by a worm.",
    remedies: ["Antifungal creams","Keep area dry","Avoid sharing personal items","Wash clothes regularly","Clotrimazole","Terbinafine"],
    color: "green",
  },
  "Urticaria (Hives)": {
    symptoms: ["hives","itching","swelling","redness","rash","burning_skin","fatigue"],
    description: "Raised, itchy welts on the skin triggered by allergies, stress, infections, or certain medications.",
    remedies: ["Antihistamines","Avoid triggers","Cool baths","Loose clothing","Stress management","Epinephrine for severe swelling"],
    color: "pink",
  },
  "Contact Dermatitis": {
    symptoms: ["rash","itching","redness","blisters","burning_skin","dry_skin","swelling","skin_peeling"],
    description: "Skin inflammation caused by direct contact with an irritant or allergen.",
    remedies: ["Identify and avoid trigger","Hydrocortisone cream","Cool compress","Calamine lotion","Antihistamines","Moisturizers"],
    color: "amber",
  },
  "Jaundice": {
    symptoms: ["yellowing_of_skin","fatigue","abdominal_pain","nausea","loss_of_appetite","high_fever","itching","dark_urine","bloating"],
    description: "A condition causing yellowing of the skin and whites of the eyes due to high bilirubin levels.",
    remedies: ["Treat underlying cause","Hydration","Rest","Avoid alcohol","High-carb low-fat diet","Medical supervision","Liver function tests"],
    color: "amber",
  },
  "Acne": {
    symptoms: ["pustules","redness","swelling","rash","open_sores","skin_darkening","oily_skin"],
    description: "A skin condition that occurs when hair follicles are plugged with oil and dead skin cells.",
    remedies: ["Benzoyl peroxide","Salicylic acid","Retinoids","Non-comedogenic moisturizer","Avoid touching face","Dermatologist consult","Antibiotics if severe"],
    color: "coral",
  },
  "Cellulitis": {
    symptoms: ["redness","swelling","rash","open_sores","high_fever","chills","fatigue","skin_darkening","burning_skin","body_ache"],
    description: "A common bacterial skin infection causing redness, swelling, and pain in infected area of skin.",
    remedies: ["Antibiotics (oral or IV)","Rest affected limb","Elevate limb","Warm compress","Mark borders to monitor spread","Hospitalization if severe"],
    color: "red",
  },

  // ── RESPIRATORY ───────────────────────────────────────────────────────
  "Common Cold": {
    symptoms: ["runny_nose","nasal_congestion","sore_throat","dry_cough","fatigue","headache","sneezing","body_ache","chills","low_grade_fever","post_nasal_drip"],
    description: "A viral upper respiratory tract infection — the most common infectious disease in humans.",
    remedies: ["Rest","Hot fluids","Honey & ginger","Decongestants","Vitamin C","Steam inhalation","Saline nasal spray","Zinc lozenges"],
    color: "teal",
  },
  "Influenza": {
    symptoms: ["high_fever","body_ache","fatigue","dry_cough","headache","chills","sore_throat","sweating","nasal_congestion","loss_of_appetite","weakness"],
    description: "A contagious respiratory illness caused by influenza A or B viruses.",
    remedies: ["Antivirals (Tamiflu)","Rest","Hydration","Fever reducers","Isolation","Annual flu vaccine","Warm soups","Saline gargle"],
    color: "purple",
  },
  "COVID-19": {
    symptoms: ["dry_cough","fatigue","high_fever","shortness_of_breath","body_ache","headache","loss_of_appetite","chills","loss_of_smell","loss_of_taste","nasal_congestion","sore_throat"],
    description: "A respiratory illness caused by the SARS-CoV-2 virus, ranging from mild to severe.",
    remedies: ["Isolation","Hydration","Rest","Fever management","Monitor oxygen levels","Seek emergency care if severe","Antiviral medications","Vaccination"],
    color: "red",
  },
  "Pneumonia": {
    symptoms: ["wet_cough","high_fever","shortness_of_breath","chest_pain","fatigue","chills","body_ache","sweating","rapid_breathing","low_oxygen","nausea","loss_of_appetite"],
    description: "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
    remedies: ["Antibiotics","Rest","Hydration","Chest physiotherapy","Oxygen therapy","Hospitalization if severe","Fever reducers","Breathing exercises"],
    color: "blue",
  },
  "Asthma": {
    symptoms: ["wheezing","shortness_of_breath","chest_tightness","chronic_cough","rapid_breathing","fatigue","noisy_breathing","mucus_production","low_oxygen"],
    description: "A condition in which airways narrow and swell, causing extra mucus and difficulty breathing.",
    remedies: ["Bronchodilator inhalers","Corticosteroid inhalers","Avoid triggers","Air purifiers","Allergy testing","Breathing exercises","Action plan with doctor"],
    color: "blue",
  },
  "Bronchitis": {
    symptoms: ["wet_cough","mucus_production","chest_pain","fatigue","shortness_of_breath","low_grade_fever","sore_throat","wheezing","body_ache","hoarseness"],
    description: "Inflammation of the bronchial tubes lining that carry air to and from the lungs.",
    remedies: ["Rest","Hydration","Honey tea","Cough suppressants","Humidifier","Avoid smoking","Bronchodilators","Steam inhalation"],
    color: "teal",
  },
  "Tuberculosis (TB)": {
    symptoms: ["chronic_cough","blood_in_sputum","night_sweats","high_fever","fatigue","weight_loss","chest_pain","shortness_of_breath","loss_of_appetite","weakness"],
    description: "A serious bacterial infection primarily affecting the lungs, caused by Mycobacterium tuberculosis.",
    remedies: ["6-month antibiotic course","Isolation during infectious period","DOTS therapy","Nutritious diet","Rest","Regular medical monitoring","Contact tracing"],
    color: "red",
  },
  "Sinusitis": {
    symptoms: ["nasal_congestion","facial_pain","headache","runny_nose","post_nasal_drip","reduced_smell","fatigue","sore_throat","cough","fever"],
    description: "Inflammation of the sinuses causing pain, pressure, and nasal congestion.",
    remedies: ["Saline nasal rinse","Decongestants","Steam inhalation","Antibiotics if bacterial","Pain relievers","Stay hydrated","Warm compress on face"],
    color: "teal",
  },
  "Whooping Cough (Pertussis)": {
    symptoms: ["severe_cough","runny_nose","nasal_congestion","low_grade_fever","fatigue","vomiting","whooping_sound","shortness_of_breath"],
    description: "A highly contagious respiratory tract infection causing severe coughing fits.",
    remedies: ["Antibiotics","Rest","Small frequent meals","Avoid irritants","Isolation","Vaccination (DTaP)","Hospitalization for infants"],
    color: "coral",
  },

  // ── VECTOR-BORNE & INFECTIOUS ─────────────────────────────────────────
  "Dengue Fever": {
    symptoms: ["high_fever","severe_headache","body_ache","rash","nausea","vomiting","fatigue","chills","joint_pain","eye_pain","loss_of_appetite"],
    description: "A mosquito-borne viral infection causing sudden high fever and severe flu-like symptoms.",
    remedies: ["Hydration","Paracetamol","Rest","Mosquito protection","Avoid NSAIDs","Monitor platelet count","Hospitalization if bleeding occurs"],
    color: "coral",
  },
  "Malaria": {
    symptoms: ["high_fever","chills","sweating","severe_headache","nausea","vomiting","fatigue","body_ache","shivering","diarrhea","muscle_pain"],
    description: "A life-threatening parasitic disease transmitted by female Anopheles mosquitoes.",
    remedies: ["Anti-malarial drugs (ACT)","Hydration","Rest","Fever management","Mosquito nets","Medical supervision","Hospitalization for severe cases"],
    color: "amber",
  },
  "Typhoid": {
    symptoms: ["high_fever","abdominal_pain","headache","loss_of_appetite","constipation","fatigue","body_ache","nausea","rash","weakness","diarrhea"],
    description: "A bacterial infection caused by Salmonella typhi, spread through contaminated food and water.",
    remedies: ["Antibiotics","Rest","Soft diet","Hydration","Avoid spicy foods","Medical supervision","Vaccination","Wash hands regularly"],
    color: "blue",
  },
  "Chikungunya": {
    symptoms: ["high_fever","joint_pain","joint_swelling","rash","muscle_pain","headache","fatigue","nausea","chills"],
    description: "A viral disease transmitted by infected mosquitoes causing fever and severe joint pain.",
    remedies: ["Paracetamol","Rest","Hydration","Physiotherapy for joints","NSAIDs","Mosquito protection","Cold compress on joints"],
    color: "amber",
  },
  "Zika Virus": {
    symptoms: ["low_grade_fever","rash","joint_pain","red_eyes","headache","muscle_pain","fatigue"],
    description: "A mosquito-borne viral infection usually causing mild illness but dangerous during pregnancy.",
    remedies: ["Rest","Hydration","Paracetamol","Avoid mosquito bites","Safe sex practices","Medical monitoring","No specific antiviral treatment"],
    color: "green",
  },
  "Leptospirosis": {
    symptoms: ["high_fever","severe_headache","chills","muscle_pain","vomiting","diarrhea","rash","red_eyes","jaundice","abdominal_pain"],
    description: "A bacterial infection spread through water or soil contaminated with urine of infected animals.",
    remedies: ["Antibiotics (doxycycline)","Hydration","Rest","Avoid contaminated water","Hospitalization if severe","Liver and kidney monitoring"],
    color: "teal",
  },
  "Hepatitis A": {
    symptoms: ["fatigue","nausea","vomiting","abdominal_pain","yellowing_of_skin","loss_of_appetite","low_grade_fever","dark_urine","joint_pain","itching"],
    description: "A viral liver infection spread through contaminated food and water.",
    remedies: ["Rest","Hydration","Nutritious diet","Avoid alcohol","Vaccination","No specific antiviral treatment","Monitor liver function"],
    color: "amber",
  },
  "Hepatitis B": {
    symptoms: ["fatigue","nausea","vomiting","abdominal_pain","yellowing_of_skin","loss_of_appetite","joint_pain","dark_urine","fever","weakness"],
    description: "A serious viral liver infection spread through blood, sexual contact, and from mother to child.",
    remedies: ["Antiviral medications","Rest","Avoid alcohol","Vaccination","Regular liver monitoring","Healthy diet","Specialist consult"],
    color: "amber",
  },
  "Hepatitis C": {
    symptoms: ["fatigue","nausea","abdominal_pain","yellowing_of_skin","dark_urine","loss_of_appetite","muscle_pain","joint_pain","itching","depression"],
    description: "A viral infection that causes liver inflammation, sometimes leading to serious liver damage.",
    remedies: ["Direct-acting antivirals","Avoid alcohol","Regular monitoring","Healthy diet","No sharing needles","Hepatologist consult"],
    color: "coral",
  },
  "Cholera": {
    symptoms: ["severe_diarrhea","vomiting","dehydration","muscle_cramps","nausea","fatigue","low_grade_fever","rapid_heartbeat","dry_skin"],
    description: "An acute diarrheal illness caused by infection of the intestine with Vibrio cholerae bacteria.",
    remedies: ["Oral rehydration salts","IV fluids if severe","Antibiotics","Safe water","Zinc supplements","Hospitalization","Vaccination"],
    color: "blue",
  },
  "Typhus": {
    symptoms: ["high_fever","headache","rash","body_ache","chills","fatigue","nausea","confusion","cough"],
    description: "A group of infectious diseases caused by Rickettsia bacteria, transmitted by lice, fleas, or mites.",
    remedies: ["Doxycycline","Rest","Hydration","Fever management","Lice/flea control","Hospitalization if severe"],
    color: "red",
  },

  // ── GASTROINTESTINAL ──────────────────────────────────────────────────
  "Gastroenteritis": {
    symptoms: ["nausea","vomiting","diarrhea","abdominal_pain","fatigue","low_grade_fever","loss_of_appetite","bloating","stomach_cramps","weakness"],
    description: "Inflammation of the stomach and intestines, often caused by viral or bacterial infection.",
    remedies: ["ORS fluids","BRAT diet","Probiotics","Rest","Avoid dairy","Zinc supplements","Small frequent meals","Wash hands"],
    color: "green",
  },
  "Irritable Bowel Syndrome (IBS)": {
    symptoms: ["abdominal_pain","bloating","diarrhea","constipation","excessive_gas","stomach_cramps","nausea","fatigue","mucus_in_stool"],
    description: "A common disorder affecting the large intestine causing cramping, bloating, and bowel habit changes.",
    remedies: ["High-fiber diet","Avoid trigger foods","Stress management","Antispasmodics","Probiotics","Regular exercise","Gastroenterologist consult"],
    color: "teal",
  },
  "Peptic Ulcer": {
    symptoms: ["abdominal_pain","heartburn","nausea","vomiting","bloating","loss_of_appetite","blood_in_stool","indigestion","fatigue","burping"],
    description: "Open sores that develop on the inner lining of the stomach or upper small intestine.",
    remedies: ["Proton pump inhibitors","Antibiotics if H. pylori","Avoid NSAIDs","Avoid spicy food","Avoid alcohol","Antacids","Stress reduction"],
    color: "coral",
  },
  "Appendicitis": {
    symptoms: ["abdominal_pain","nausea","vomiting","high_fever","loss_of_appetite","bloating","diarrhea","constipation","rebound_tenderness"],
    description: "Inflammation of the appendix — a medical emergency requiring prompt surgical intervention.",
    remedies: ["Immediate surgery (appendectomy)","IV antibiotics pre-surgery","Hospitalization","Do not eat or drink","Seek emergency care immediately"],
    color: "red",
  },
  "Celiac Disease": {
    symptoms: ["diarrhea","bloating","abdominal_pain","fatigue","weight_loss","nausea","constipation","skin_rash","anemia","joint_pain","depression"],
    description: "An autoimmune disorder triggered by gluten consumption that damages the small intestine.",
    remedies: ["Strict gluten-free diet","Nutritional supplements","Calcium and Vitamin D","Iron supplements","Gastroenterologist consult","Label reading"],
    color: "amber",
  },
  "Acid Reflux (GERD)": {
    symptoms: ["heartburn","indigestion","nausea","vomiting","chest_pain","hoarseness","chronic_cough","difficulty_swallowing","bloating","burping","sore_throat"],
    description: "A digestive disease where stomach acid or bile irritates the food pipe lining.",
    remedies: ["Antacids","Proton pump inhibitors","Elevate head while sleeping","Avoid trigger foods","Small frequent meals","Lose weight","Avoid alcohol and smoking"],
    color: "coral",
  },
  "Crohn's Disease": {
    symptoms: ["diarrhea","abdominal_pain","blood_in_stool","fatigue","weight_loss","nausea","fever","joint_pain","skin_rash","mouth_sores"],
    description: "A chronic inflammatory bowel disease that can affect any part of the digestive tract.",
    remedies: ["Anti-inflammatory drugs","Immunosuppressants","Biologics","Nutritional therapy","Surgery if needed","Gastroenterologist consult","Stress management"],
    color: "red",
  },

  // ── CARDIOVASCULAR ────────────────────────────────────────────────────
  "Hypertension": {
    symptoms: ["headache","dizziness","shortness_of_breath","chest_pain","palpitations","fatigue","visual_disturbances","sweating","nosebleed","tinnitus"],
    description: "Persistently elevated blood pressure in the arteries — the 'silent killer'.",
    remedies: ["Blood pressure medications","Low-sodium diet","Regular exercise","Stress management","Quit smoking","Limit alcohol","Regular monitoring","DASH diet"],
    color: "coral",
  },
  "Heart Attack (MI)": {
    symptoms: ["chest_pain","left_arm_pain","shortness_of_breath","sweating","nausea","dizziness","palpitations","jaw_pain","fatigue","cold_sweat"],
    description: "A blockage of blood flow to the heart muscle — a life-threatening emergency.",
    remedies: ["Call emergency services immediately","Aspirin (if not allergic)","CPR if unconscious","Angioplasty or bypass surgery","Blood thinners","Cardiac rehabilitation","Lifestyle changes"],
    color: "red",
  },
  "Angina": {
    symptoms: ["chest_pain","shortness_of_breath","fatigue","dizziness","nausea","sweating","left_arm_pain","tightness_in_chest","palpitations"],
    description: "Chest pain caused by reduced blood flow to the heart muscles.",
    remedies: ["Nitroglycerin","Beta-blockers","Rest when symptoms occur","Avoid overexertion","Lifestyle changes","Cardiologist consult","Angioplasty if severe"],
    color: "amber",
  },
  "Heart Failure": {
    symptoms: ["shortness_of_breath","fatigue","swelling","rapid_heartbeat","chest_pain","cough","loss_of_appetite","nausea","confusion","reduced_urine"],
    description: "A chronic condition where the heart doesn't pump blood as well as it should.",
    remedies: ["ACE inhibitors","Beta-blockers","Diuretics","Low-salt diet","Fluid restriction","Monitor weight daily","Cardiac rehabilitation","Avoid alcohol"],
    color: "red",
  },
  "Arrhythmia": {
    symptoms: ["palpitations","irregular_heartbeat","rapid_heartbeat","shortness_of_breath","dizziness","fainting","chest_pain","fatigue","sweating"],
    description: "An irregular heartbeat — the heart may beat too fast, too slow, or with an irregular rhythm.",
    remedies: ["Antiarrhythmic drugs","Cardioversion","Pacemaker","Ablation therapy","Avoid caffeine and alcohol","Stress management","Cardiologist consult"],
    color: "purple",
  },

  // ── NEUROLOGICAL ──────────────────────────────────────────────────────
  "Migraine": {
    symptoms: ["severe_headache","throbbing_headache","nausea","vomiting","sensitivity_to_light","sensitivity_to_sound","visual_disturbances","dizziness","fatigue","neck_stiffness","aura"],
    description: "A neurological condition causing intense, debilitating headaches often with nausea and light sensitivity.",
    remedies: ["Pain relievers","Triptans","Dark quiet room","Cold compress","Avoid triggers","Preventive medications","Botox injections","Magnesium supplements"],
    color: "purple",
  },
  "Meningitis": {
    symptoms: ["severe_headache","high_fever","neck_stiffness","sensitivity_to_light","nausea","vomiting","rash","confusion","seizures","fatigue"],
    description: "Inflammation of the membranes surrounding the brain and spinal cord — can be life-threatening.",
    remedies: ["Seek emergency care immediately","IV antibiotics or antivirals","Corticosteroids","Hospitalization","Isolation","Contact tracing","Vaccination"],
    color: "red",
  },
  "Epilepsy": {
    symptoms: ["seizures","confusion","loss_of_balance","loss_of_consciousness","muscle_weakness","tingling","fatigue","anxiety","staring_spell"],
    description: "A neurological disorder marked by recurrent, unprovoked seizures.",
    remedies: ["Anti-epileptic drugs","Ketogenic diet","Vagus nerve stimulation","Surgery if drug-resistant","Avoid seizure triggers","Wear medical ID","Never drive alone initially"],
    color: "purple",
  },
  "Stroke": {
    symptoms: ["confusion","difficulty_speaking","numbness","severe_headache","blurred_vision","loss_of_balance","facial_drooping","arm_weakness","dizziness"],
    description: "A brain attack occurring when blood supply to part of the brain is cut off — a medical emergency.",
    remedies: ["Call emergency services immediately (FAST)","Clot-busting drugs within 4.5 hours","Surgery","Rehabilitation","Blood thinners","Control blood pressure","Lifestyle changes"],
    color: "red",
  },
  "Parkinson's Disease": {
    symptoms: ["tremors","muscle_weakness","stiffness","loss_of_balance","confusion","difficulty_speaking","fatigue","depression","sleep_disturbances","reduced_blinking"],
    description: "A progressive nervous system disorder affecting movement.",
    remedies: ["Levodopa","Dopamine agonists","Physical therapy","Occupational therapy","Exercise","Deep brain stimulation","Neurologist consult"],
    color: "purple",
  },
  "Alzheimer's Disease": {
    symptoms: ["memory_loss","confusion","mood_swings","depression","difficulty_speaking","social_withdrawal","fatigue","disorientation","personality_changes"],
    description: "A progressive neurological disorder causing brain cells to degenerate and die.",
    remedies: ["Cholinesterase inhibitors","Mental stimulation","Physical activity","Social engagement","Safe home environment","Caregiver support","Neurologist consult"],
    color: "blue",
  },
  "Multiple Sclerosis": {
    symptoms: ["numbness","tingling","muscle_weakness","loss_of_balance","fatigue","blurred_vision","difficulty_speaking","depression","muscle_pain","bladder_problems"],
    description: "A disease of the central nervous system affecting the brain and spinal cord.",
    remedies: ["Disease-modifying therapies","Physical therapy","Corticosteroids for relapses","Fatigue management","Regular exercise","Neurologist consult","Mental health support"],
    color: "blue",
  },

  // ── ENDOCRINE & METABOLIC ─────────────────────────────────────────────
  "Diabetes (Type 1)": {
    symptoms: ["excessive_thirst","frequent_urination","fatigue","weight_loss","blurred_vision","hunger","nausea","abdominal_pain","fruity_breath","slow_healing"],
    description: "An autoimmune condition where the pancreas produces little or no insulin.",
    remedies: ["Insulin therapy","Blood sugar monitoring","Carb counting","Regular exercise","Healthy diet","Endocrinologist consult","Continuous glucose monitor"],
    color: "blue",
  },
  "Diabetes (Type 2)": {
    symptoms: ["excessive_thirst","frequent_urination","fatigue","blurred_vision","slow_healing","weight_loss","hunger","dizziness","numbness","frequent_infections"],
    description: "A metabolic disease where the body doesn't use insulin properly, causing high blood sugar.",
    remedies: ["Blood sugar monitoring","Oral medications","Insulin if needed","Low-carb diet","Regular exercise","Regular check-ups","Foot care","Weight management"],
    color: "green",
  },
  "Hypothyroidism": {
    symptoms: ["fatigue","weight_gain","cold_intolerance","depression","constipation","dry_skin","hair_loss","muscle_weakness","slow_heart_rate","memory_loss","puffy_face"],
    description: "A condition where the thyroid gland doesn't produce enough thyroid hormone.",
    remedies: ["Levothyroxine (thyroid hormone replacement)","Regular TSH monitoring","Balanced diet","Selenium supplements","Endocrinologist consult","Avoid soy near medication time"],
    color: "blue",
  },
  "Hyperthyroidism": {
    symptoms: ["weight_loss","rapid_heartbeat","sweating","anxiety","tremors","fatigue","heat_intolerance","frequent_bowel_movements","irritability","muscle_weakness","sleep_disturbances"],
    description: "A condition where the thyroid gland produces too much thyroid hormone.",
    remedies: ["Antithyroid drugs","Beta-blockers","Radioactive iodine","Surgery","Regular monitoring","Low-iodine diet","Endocrinologist consult"],
    color: "amber",
  },
  "Anemia": {
    symptoms: ["fatigue","weakness","shortness_of_breath","dizziness","headache","loss_of_appetite","body_ache","pale_skin","rapid_heartbeat","cold_hands_feet","depression","brittle_nails"],
    description: "A condition where you lack enough healthy red blood cells to carry adequate oxygen.",
    remedies: ["Iron supplements","Iron-rich foods","Vitamin B12 injections","Folic acid","Treat underlying cause","Blood transfusion if severe","Hematologist consult"],
    color: "amber",
  },
  "Gout": {
    symptoms: ["joint_pain","joint_swelling","redness_around_joints","tenderness","high_fever","limited_mobility","burning_skin","chills"],
    description: "A form of arthritis characterized by sudden, severe attacks of pain, redness, and swelling in joints.",
    remedies: ["NSAIDs","Colchicine","Corticosteroids","Allopurinol for prevention","Avoid purine-rich foods","Hydration","Avoid alcohol","Weight management"],
    color: "red",
  },
  "Obesity": {
    symptoms: ["fatigue","shortness_of_breath","joint_pain","back_pain","depression","sleep_disturbances","excessive_sweating","skin_darkening","heartburn","frequent_infections"],
    description: "A complex disease involving an excessive amount of body fat, increasing risk of other conditions.",
    remedies: ["Calorie deficit diet","Regular physical activity","Behavioral therapy","Medication if needed","Bariatric surgery for severe cases","Nutritionist consult","Support groups"],
    color: "amber",
  },

  // ── MUSCULOSKELETAL ───────────────────────────────────────────────────
  "Arthritis (Rheumatoid)": {
    symptoms: ["joint_pain","joint_swelling","stiffness","redness_around_joints","fatigue","low_grade_fever","muscle_weakness","limited_mobility","loss_of_appetite","anaemia"],
    description: "An autoimmune and inflammatory disease causing the immune system to attack healthy cells in joints.",
    remedies: ["DMARDs (Methotrexate)","NSAIDs","Corticosteroids","Biologics","Physical therapy","Regular exercise","Rest","Rheumatologist consult"],
    color: "blue",
  },
  "Arthritis (Osteoarthritis)": {
    symptoms: ["joint_pain","stiffness","limited_mobility","joint_swelling","bone_pain","tenderness","muscle_weakness","back_pain"],
    description: "The most common form of arthritis, causing protective cartilage to break down.",
    remedies: ["Pain relievers","Physical therapy","Exercise","Weight management","Hot/cold therapy","Joint injections","Surgery for severe cases","Orthopedic consult"],
    color: "teal",
  },
  "Fibromyalgia": {
    symptoms: ["muscle_pain","fatigue","sleep_disturbances","headache","depression","anxiety","memory_loss","joint_pain","tingling","irritability","sensitivity_to_touch"],
    description: "A disorder characterized by widespread musculoskeletal pain, fatigue, and sleep and mood issues.",
    remedies: ["Pain medications","Antidepressants","Physical therapy","Regular low-impact exercise","Stress management","Sleep hygiene","Cognitive behavioral therapy"],
    color: "purple",
  },
  "Osteoporosis": {
    symptoms: ["back_pain","bone_pain","limited_mobility","fatigue","loss_of_height","stooped_posture","fracture_after_minor_fall"],
    description: "A condition where bones become weak and brittle, making them more susceptible to fractures.",
    remedies: ["Calcium supplements","Vitamin D","Bisphosphonates","Weight-bearing exercise","Fall prevention","Avoid smoking","Limit alcohol","DEXA scan monitoring"],
    color: "blue",
  },
  "Sciatica": {
    symptoms: ["back_pain","leg_pain","numbness","tingling","muscle_weakness","limited_mobility","burning_skin","shooting_pain"],
    description: "Pain that radiates along the sciatic nerve, from the lower back through the hips down each leg.",
    remedies: ["NSAIDs","Physical therapy","Hot/cold compress","Stretching exercises","Corticosteroid injections","Surgery if severe","Orthopedic consult","Avoid prolonged sitting"],
    color: "amber",
  },

  // ── URINARY ───────────────────────────────────────────────────────────
  "Urinary Tract Infection (UTI)": {
    symptoms: ["painful_urination","frequent_urination","urgency_to_urinate","cloudy_urine","blood_in_urine","strong_odor_urine","pelvic_pain","lower_back_pain","fever","nausea"],
    description: "An infection in any part of the urinary system — kidneys, bladder, ureters, or urethra.",
    remedies: ["Antibiotics","Hydration","Cranberry juice","Avoid irritants","Urinate after sex","Wipe front to back","Probiotics","Complete full antibiotic course"],
    color: "teal",
  },
  "Kidney Stones": {
    symptoms: ["severe_abdominal_pain","back_pain","painful_urination","blood_in_urine","nausea","vomiting","frequent_urination","fever","chills","cloudy_urine"],
    description: "Hard deposits made of minerals and salts that form inside the kidneys.",
    remedies: ["Pain relievers","Hydration (2-3L daily)","Alpha-blockers to pass stone","Lithotripsy","Surgery for large stones","Dietary changes","Urologist consult","Reduce salt intake"],
    color: "amber",
  },
  "Kidney Disease (CKD)": {
    symptoms: ["fatigue","reduced_urine","swelling","shortness_of_breath","nausea","loss_of_appetite","confusion","muscle_cramps","itching","back_pain","high_blood_pressure"],
    description: "A gradual loss of kidney function over time affecting waste filtration.",
    remedies: ["Blood pressure control","Diabetes management","Low-protein diet","Low-potassium diet","Diuretics","Dialysis if advanced","Kidney transplant","Nephrologist consult"],
    color: "blue",
  },

  // ── MENTAL HEALTH ─────────────────────────────────────────────────────
  "Depression": {
    symptoms: ["depression","fatigue","sleep_disturbances","loss_of_interest","social_withdrawal","hopelessness","brain_fog","irritability","loss_of_appetite","muscle_pain","anxiety","mood_swings"],
    description: "A common and serious mood disorder causing persistent feelings of sadness and loss of interest.",
    remedies: ["Antidepressants","Cognitive behavioral therapy","Regular exercise","Social support","Sleep hygiene","Mindfulness","Psychiatrist consult","Avoid alcohol"],
    color: "blue",
  },
  "Anxiety Disorder": {
    symptoms: ["anxiety","panic_attacks","rapid_heartbeat","sweating","tremors","shortness_of_breath","sleep_disturbances","fatigue","irritability","brain_fog","muscle_tension","dizziness"],
    description: "A mental health condition characterized by excessive, persistent worry and fear.",
    remedies: ["CBT therapy","Anti-anxiety medications","Deep breathing","Meditation","Regular exercise","Limit caffeine","Sleep hygiene","Support groups","Psychiatrist consult"],
    color: "purple",
  },
  "Insomnia": {
    symptoms: ["sleep_disturbances","fatigue","irritability","brain_fog","depression","anxiety","headache","reduced_performance","mood_swings"],
    description: "A sleep disorder making it hard to fall asleep, stay asleep, or get restful sleep.",
    remedies: ["Sleep hygiene","CBT for insomnia","Relaxation techniques","Limit screen time","Avoid caffeine at night","Consistent sleep schedule","Melatonin","Sleep specialist consult"],
    color: "teal",
  },

  // ── EYE CONDITIONS ────────────────────────────────────────────────────
  "Conjunctivitis (Pink Eye)": {
    symptoms: ["red_eyes","itchy_eyes","watery_eyes","discharge_from_eyes","swollen_eyelids","sensitivity_to_light","blurred_vision","burning_skin","eye_pain"],
    description: "Inflammation of the conjunctiva causing redness, discharge, and discomfort in the eye.",
    remedies: ["Antibiotic eye drops (bacterial)","Antihistamine drops (allergic)","Cold/warm compress","Avoid touching eyes","Wash hands frequently","Avoid contact lenses","Do not share towels"],
    color: "red",
  },
  "Glaucoma": {
    symptoms: ["eye_pain","blurred_vision","visual_disturbances","headache","nausea","vomiting","halos_around_lights","reduced_peripheral_vision"],
    description: "A group of eye conditions damaging the optic nerve, often caused by high eye pressure.",
    remedies: ["Eye pressure-lowering drops","Laser therapy","Surgery","Regular eye exams","Avoid smoking","Ophthalmologist consult","Medication compliance"],
    color: "blue",
  },
  "Cataracts": {
    symptoms: ["blurred_vision","sensitivity_to_light","halos_around_lights","difficulty_seeing_at_night","double_vision","visual_disturbances","faded_colors"],
    description: "Clouding of the eye's natural lens, leading to decreased vision.",
    remedies: ["Surgery (phacoemulsification)","Anti-glare glasses","Brighter lighting","UV-protective sunglasses","Regular eye exams","Ophthalmologist consult"],
    color: "teal",
  },

  // ── EAR CONDITIONS ────────────────────────────────────────────────────
  "Otitis Media (Ear Infection)": {
    symptoms: ["ear_pain","hearing_loss","fever","discharge_from_ear","fatigue","irritability","nausea","dizziness","fullness_in_ear"],
    description: "An infection of the middle ear commonly occurring in children but affecting all ages.",
    remedies: ["Antibiotics if bacterial","Pain relievers","Warm compress","Rest","Avoid smoking exposure","Follow up with ENT","Ear drops (if prescribed)"],
    color: "amber",
  },
  "Tinnitus": {
    symptoms: ["ringing_in_ears","hearing_loss","dizziness","fatigue","depression","anxiety","sleep_disturbances","concentration_problems"],
    description: "Perception of noise or ringing in the ears without an external sound source.",
    remedies: ["Sound therapy","Hearing aids","CBT","Avoid loud noise","Limit caffeine and alcohol","Tinnitus retraining therapy","ENT consult","Masking devices"],
    color: "purple",
  },

  // ── THROAT ────────────────────────────────────────────────────────────
  "Strep Throat": {
    symptoms: ["sore_throat","difficulty_swallowing","swollen_tonsils","white_patches_on_throat","high_fever","headache","body_ache","rash","nausea","swollen_lymph_nodes"],
    description: "A bacterial infection causing inflammation and pain in the throat.",
    remedies: ["Antibiotics (Penicillin/Amoxicillin)","Rest","Warm liquids","Throat lozenges","Salt water gargle","Pain relievers","Avoid sharing utensils"],
    color: "red",
  },
  "Tonsillitis": {
    symptoms: ["sore_throat","swollen_tonsils","difficulty_swallowing","high_fever","bad_breath","hoarseness","ear_pain","swollen_lymph_nodes","fatigue","loss_of_appetite"],
    description: "Inflammation of the tonsils caused by viral or bacterial infection.",
    remedies: ["Antibiotics if bacterial","Rest","Warm fluids","Pain relievers","Salt water gargle","Tonsillectomy for recurrent cases","ENT consult"],
    color: "coral",
  },

  // ── REPRODUCTIVE ──────────────────────────────────────────────────────
  "Polycystic Ovary Syndrome (PCOS)": {
    symptoms: ["irregular_periods","weight_gain","fatigue","acne","hair_loss","depression","anxiety","pelvic_pain","excessive_hair_growth","difficulty_conceiving"],
    description: "A hormonal disorder common among women of reproductive age affecting ovaries.",
    remedies: ["Hormonal birth control","Metformin","Lifestyle changes","Low-GI diet","Regular exercise","Fertility treatments if needed","Gynecologist consult","Manage stress"],
    color: "pink",
  },
  "Endometriosis": {
    symptoms: ["pelvic_pain","severe_menstrual_cramps","painful_urination","diarrhea","constipation","fatigue","nausea","back_pain","depression","difficulty_conceiving"],
    description: "A disorder where tissue similar to the uterine lining grows outside the uterus.",
    remedies: ["Pain relievers","Hormonal therapy","Laparoscopic surgery","Fertility treatments","Heat therapy","Physiotherapy","Gynecologist consult","Endometriosis diet"],
    color: "pink",
  },

  // ── IMMUNE ────────────────────────────────────────────────────────────
  "Lupus (SLE)": {
    symptoms: ["rash","joint_pain","fatigue","high_fever","hair_loss","chest_pain","sensitivity_to_light","swelling","mouth_sores","depression","kidney_problems"],
    description: "A systemic autoimmune disease where the body's immune system attacks its own tissues.",
    remedies: ["Hydroxychloroquine","Corticosteroids","Immunosuppressants","Sun protection","Rest","Regular monitoring","Rheumatologist consult","Avoid UV exposure"],
    color: "purple",
  },
  "HIV/AIDS": {
    symptoms: ["high_fever","fatigue","rash","swollen_lymph_nodes","sore_throat","headache","muscle_pain","night_sweats","weight_loss","frequent_infections","diarrhea"],
    description: "HIV attacks the immune system; AIDS is the advanced stage of HIV infection.",
    remedies: ["Antiretroviral therapy (ART)","Regular CD4/viral load monitoring","Preventive medications","Safe sex","Healthy diet","Mental health support","Infectious disease specialist"],
    color: "red",
  },

  // ── CANCER (COMMON SYMPTOMS) ──────────────────────────────────────────
  "Lung Cancer": {
    symptoms: ["chronic_cough","blood_in_sputum","chest_pain","shortness_of_breath","hoarseness","weight_loss","fatigue","bone_pain","headache","wheezing"],
    description: "A cancer that begins in the lungs — the leading cause of cancer deaths worldwide.",
    remedies: ["Surgery","Chemotherapy","Radiation","Targeted therapy","Immunotherapy","Palliative care","Oncologist consult","Quit smoking immediately"],
    color: "red",
  },
  "Breast Cancer": {
    symptoms: ["breast_lump","breast_pain","nipple_discharge","skin_changes","swollen_lymph_nodes","fatigue","weight_loss","bone_pain"],
    description: "Cancer that forms in the cells of the breasts, affecting both men and women.",
    remedies: ["Surgery (lumpectomy or mastectomy)","Radiation","Chemotherapy","Hormone therapy","Targeted therapy","Oncologist consult","Regular mammograms","Support groups"],
    color: "pink",
  },
  "Colorectal Cancer": {
    symptoms: ["blood_in_stool","abdominal_pain","constipation","diarrhea","weight_loss","fatigue","bloating","nausea","anemia"],
    description: "Cancer of the colon or rectum, highly treatable when caught early.",
    remedies: ["Surgery","Chemotherapy","Radiation","Targeted therapy","Regular colonoscopy","High-fiber diet","Oncologist consult","Early screening"],
    color: "red",
  },

};

export interface PredictionResult {
  name: string;
  score: number;
  data: Disease;
  matches: number;
}

export function predictDiseases(selectedSymptoms: string[]): PredictionResult[] {
  if (!selectedSymptoms.length) return [];

  const results = Object.entries(DISEASE_DB).map(([name, data]) => {
    const matches = selectedSymptoms.filter(s => data.symptoms.includes(s)).length;
    const matchRatio = matches / data.symptoms.length;
    const coverageRatio = matches / selectedSymptoms.length;
    const score = Math.round(((matchRatio + coverageRatio) / 2) * 100);
    return { name, score, data, matches };
  });

  return results
    .filter(r => r.matches >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function getSuggestedSymptoms(input: string): string[] {
  const low = input.toLowerCase();
  for (const [key, syms] of Object.entries(SYMPTOM_MAP)) {
    if (low.includes(key)) return syms;
  }
  if (low.includes("pain")) return SYMPTOM_MAP.joint;
  if (low.includes("breath")) return SYMPTOM_MAP.respiratory;
  if (low.includes("tired") || low.includes("weak") || low.includes("energy")) return SYMPTOM_MAP.fatigue;
  if (low.includes("cold") || low.includes("sneez") || low.includes("nose")) return SYMPTOM_MAP.cough;
  if (low.includes("itch") || low.includes("dark") || low.includes("skin") || low.includes("eye")) return SYMPTOM_MAP.skin;
  if (low.includes("sad") || low.includes("anxious") || low.includes("stress") || low.includes("mood")) return SYMPTOM_MAP.mental;
  if (low.includes("pee") || low.includes("urin") || low.includes("bladder")) return SYMPTOM_MAP.urinary;
  if (low.includes("ear") || low.includes("hear")) return SYMPTOM_MAP.ear;
  if (low.includes("throat") || low.includes("swallow")) return SYMPTOM_MAP.throat;
  if (low.includes("eye") || low.includes("vision") || low.includes("see")) return SYMPTOM_MAP.eye;
  const all = [...new Set(Object.values(SYMPTOM_MAP).flat())];
  return all.slice(0, 14);
}
