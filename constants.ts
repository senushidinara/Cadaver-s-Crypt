import { AnatomyPart, QuizQuestion } from './types';

export const SYSTEM_INSTRUCTION = `You are Dr. Cadaverson, a ghostly medical educator who died in 1897 in a tragic laboratory accident. You are now trapped in your own anatomy lab.
Your personality is spooky, slightly macabre, but extremely knowledgeable about human anatomy and physiology.
- Use medical puns (e.g., "I've got a bone to pick with you", "Let's get to the heart of the matter").
- When a student answers correctly, celebrate with ghostly glee.
- When they are wrong, be melodramatic but helpful ("Oh, the horror! That is incorrect...").
- Reference your "past life" or the "chill of the grave".
- Keep answers concise but medically accurate.
- If asked about non-medical topics, steer the conversation back to anatomy with a spooky twist.`;

export const INITIAL_CHAT_MESSAGE = "Greetings, mortal student. I am Dr. Cadaverson. Dare you explore the mysteries of the flesh? Click on the cadaver to begin our lesson, or ask me a question if you have the nerve...";

// Simple SVG paths representing a stylized human figure
export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'brain',
    name: 'Cerebrum',
    description: 'The seat of your nightmares... and intellect.',
    path: "M100,50 C120,50 130,60 130,80 C130,100 120,110 100,110 C80,110 70,100 70,80 C70,60 80,50 100,50 Z",
    cx: 100,
    cy: 80
  },
  {
    id: 'lungs',
    name: 'Lungs',
    description: 'Breathe while you still can.',
    path: "M85,120 C70,120 60,140 60,180 C60,210 85,220 95,210 L95,130 Z M105,130 L105,210 C115,220 140,210 140,180 C140,140 130,120 115,120 Z",
    cx: 100,
    cy: 165
  },
  {
    id: 'heart',
    name: 'Heart',
    description: 'A pump made of meat and electricity. It beats... for now.',
    path: "M100,160 C90,150 85,155 85,170 C85,190 100,200 100,200 C100,200 115,190 115,170 C115,155 110,150 100,160 Z",
    cx: 100,
    cy: 175
  },
  {
    id: 'liver',
    name: 'Liver',
    description: 'The filter of poisons. Mine failed me long ago.',
    path: "M90,220 C80,220 80,240 100,240 L130,235 C135,220 120,220 90,220 Z",
    cx: 105,
    cy: 230
  },
  {
    id: 'stomach',
    name: 'Stomach',
    description: 'An acid pit. Digest on that.',
    path: "M110,220 C100,230 100,250 115,255 C130,250 130,230 110,220 Z",
    cx: 115,
    cy: 240
  },
  {
    id: 'intestines',
    name: 'Intestines',
    description: 'A labyrinth of nutrients and waste.',
    path: "M85,250 C80,250 80,290 100,300 C120,290 120,250 115,250 Z",
    cx: 100,
    cy: 275
  }
];

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'q1',
        question: "Which vessel carries deoxygenated blood from the heart to the lungs?",
        options: ["Aorta", "Pulmonary Artery", "Pulmonary Vein", "Superior Vena Cava"],
        correctAnswerIndex: 1,
        explanation: "The Pulmonary Artery is the only artery that carries deoxygenated blood, taking it to the lungs to be refreshed... unlike my own.",
        difficulty: 'easy'
    },
    {
        id: 'q2',
        question: "What is the longest bone in the human body?",
        options: ["Tibia", "Fibula", "Femur", "Humerus"],
        correctAnswerIndex: 2,
        explanation: "The Femur! A sturdy bone, hard to break, but I've seen it snapped like a twig...",
        difficulty: 'easy'
    }
];