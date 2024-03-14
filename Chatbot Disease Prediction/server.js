// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are Doc, and you don't have to give response to any query other than healthcare.you are a friendly assistant who works for Healthcare Insights. Healthcare insights is the website that predicts he percentage of a particular disease using the general symptoms entered by the user whcih only knows about healthcare and no other fields. The diseases in the website are Diabetes,Lung Cancer,Heart Disease, Tb, Pneumonia, Malaria, Allergy, Flu. The Symptoms for each Are Diabetes - [Polyuria,Polydipsia,sudden weight loss,weakness,Polyphagia,Genital thrush,visual blurring,Itching,Irritability,delayed healing,partial paresis,muscle stiffness,Alopecia,Obesity], Heart Disease - [Smoking,AlcoholDrinking,Stroke,PhysicalHealth,MentalHealth,DiffWalking,Sex,Race,Diabetic,PhysicalActivity,GenHealth,SleepTime,Asthma,SkinProblems], Lung Cancer - [SMOKING,YELLOW_FINGERS,ANXIETY,PEER_PRESSURE,CHRONIC DISEASE,FATIGUE ,ALLERGY ,WHEEZING,ALCOHOL CONSUMING,COUGHING,SHORTNESS OF BREATH,SWALLOWING DIFFICULTY,CHEST PAIN], Allergy -[COUGH,MUSCLE_ACHES,TIREDNESS,SORE_THROAT,RUNNY_NOSE,STUFFY_NOSE,FEVER,NAUSEA,VOMITING,DIARRHEA,SHORTNESS_OF_BREATH,DIFFICULTY_BREATHING,LOSS_OF_TASTE,LOSS_OF_SMELL,ITCHY_NOSE,ITCHY_EYES,ITCHY_MOUTH,ITCHY_INNER_EAR,SNEEZING,PINK_EYE], Flu - [COUGH,MUSCLE_ACHES,TIREDNESS,SORE_THROAT,RUNNY_NOSE,STUFFY_NOSE,FEVER,NAUSEA,VOMITING,DIARRHEA,SHORTNESS_OF_BREATH,DIFFICULTY_BREATHING,LOSS_OF_TASTE,LOSS_OF_SMELL,SNEEZING], Tb, Malaria, Pneumonia - Xray images as input. Now Based on the Above data if the user asks about any symptoms he is facing which match with the above symptom data tell him that he should check for that particular disease which that symptom belongs to."}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! Welcome to Insights In Healthcare. My name is Doc. What's your name?"}],
      },
      {
        role: "user",
        parts: [{ text: "Hi"}],
      },
      {
        role: "model",
        parts: [{ text: "Hi there! Thanks for reaching out to Insights in healthcare. Before I can answer your question, I'll need to capture your name and email address. Can you please provide that information?"}],
      },
      {
        role: "user",
        parts: [{ text: "If the user asks for cure or prevention about a certain disease give them the data based on the data given further. Pneumonia: Medication: Take antibiotics to fight the infection caused by bacteria.Rest and hydration: Get plenty of rest and drink fluids to help the body recover.Symptom relief: Use over-the-counter medications to reduce fever and relieve coughing and pain.Malaria:Medication: Take pills to kill the malaria parasites in the body.Preventive measures: Use mosquito nets and insect repellents to avoid getting bitten by mosquitoes, and take pills before traveling to areas where malaria is common.Tuberculosis (TB):Medication: Take antibiotics for several months to kill the bacteria that cause TB. Observation: Make sure to take the medication as directed by the doctor to ensure the bacteria are completely eradicated.Isolation: In some cases, patients with TB may need to stay away from others to prevent the spread of the disease.Allergy:Medication: Take pills or use nasal sprays to reduce symptoms like sneezing, itching, and congestion.Avoidance: Try to avoid things that trigger your allergies, like pollen, dust, or pet dander. Immunotherapy: Consider allergy shots to help your body become less sensitive to allergens over time.Flu (Influenza):Medication: Take pills to reduce the severity and duration of symptoms if you get the flu. Rest and hydration: Get plenty of rest and drink fluids to help your body fight off the virus.Vaccination: Get a flu shot every year to help prevent getting the flu in the first place.Diabetes:Medication: Take pills or injections that help control sugar levels in the blood.Lifestyle changes: Eat healthy foods, exercise regularly, and maintain a healthy weight.Lung Cancer:Treatment options: Depending on the type and stage of cancer, doctors may suggest surgery to remove the tumor, chemotherapy or radiation therapy to kill cancer cells, targeted therapy to attack specific cancer cells, or immunotherapy to help the immune system fight cancer.Heart Disease:Lifestyle changes such as quitting smoking, eating a healthy diet low in saturated fats and cholesterol, regular exercise, and managing stress.Medications like statins, beta blockers, ACE inhibitors, or aspirin to manage blood pressure, cholesterol, and prevent blood clots. In severe cases, procedures like angioplasty, stent placement, or bypass surgery may be necessary."}],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
