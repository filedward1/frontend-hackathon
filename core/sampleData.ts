import { Question } from "./question";

export const quizData = {
  quiz: [
    {
      question_number: 1,
      question:
        "Question 1: What is one of the capabilities of Internet of Things (IoT)?",
      choices: {
        A: "It can be used for traffic management in smart cities.",
        B: "It can be used to improve business processes, such as manufacturing and production.",
        C: "It provides analytics to help organizations in their decision-making.",
        D: "It is capable of providing security services for IoT devices.",
      },
      correct_answer: "B",
      explanation:
        "IoT can be used to improve business processes, such as manufacturing and production, through the use of sensors.",
    },
    {
      question_number: 2,
      question:
        "Question 2: Which of the following is a challenge in creating IoT projects?",
      choices: {
        A: "System requirements",
        B: "Connectivity",
        C: "Power requirements",
        D: "Security E: Development",
      },
      correct_answer: "D",
      explanation:
        'One of the challenges in creating IoT projects is expanding the capabilities of developers to create more "smart things."',
    },
    {
      question_number: 3,
      question:
        "Question 3: Which of the following is an example of a voice recognition software used in Robotic Process Automation (RPA)?",
      choices: {
        A: "Apple's Siri",
        B: "Microsoft's Cortana",
        C: "Amazon's Alexa",
        D: "Google Assistant",
      },
      correct_answer: "A",
      explanation:
        "Apple's Siri is an example of a voice recognition software used in RPAs.",
    },
    {
      question_number: 4,
      question:
        "Question 4: Which sensor helps determine the level of liquids, fluids, grainy or granular materials?",
      choices: {
        A: "Temperature sensor",
        B: "Infrared (IR) sensor",
        C: "Ultrasonic sensor",
        D: "Level sensor",
      },
      correct_answer: "D",
      explanation:
        "The level sensor can detect the level of liquids, fluids, grainy or granular materials.",
    },
    {
      question_number: 5,
      question: "Question 5: What is one example of cyberbullying?",
      choices: {
        A: "Posting a mean comment on someone's social media profile.",
        B: "Creating multiple accounts to harass someone online.",
        C: "Sending threatening messages through instant messaging.",
        D: "Ignoring or excluding someone from an online conversation.",
      },
      correct_answer: "B",
      explanation:
        "Cyberbullying is unwanted, hostile behavior done by individuals to other people in the hope of gaining control over them. Creating multiple accounts to harass someone online is an example of cyberbullying.",
    },
  ],
};


const questionArray: Question[] = quizData.quiz.map((item) => {
  return new Question(
    item.question_number,
    item.question,
    Object.values(item.choices),
    item.correct_answer,
    item.explanation
  );
});

export default questionArray;