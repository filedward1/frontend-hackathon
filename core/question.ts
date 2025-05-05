class Question {
  private questionId: number = 0;
  private question: string = "";
  private choices: string[] = [];
  private correctAnswer: string = "";
  private explanation: string = "";

  public constructor(
    questionId: number,
    question: string,
    choices: string[],
    correctAnswer: string,
    explanation: string
  ) {
    this.questionId = questionId;
    this.question = question;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
    this.explanation = explanation;
  }

  public getQuestionId(): number {
    return this.questionId;
  }

  public setQuestionId(questionId: number): void {
    this.questionId = questionId;
  }

  public getQuestion(): string {
    return this.question;
  }

  public setQuestion(question: string): void {
    this.question = question;
  }

  public getChoices(): string[] { // questionArray[0].getChoices()[0]
    return this.choices;
  }

  public setChoices(choices: string[]): void {
    this.choices = choices;
  }

  public getCorrectAnswer(): string {
    return this.correctAnswer;
  }

  public setCorrectAnswer(correctAnswer: string): void {
    this.correctAnswer = correctAnswer;
  }

  public getExplanation(): string {
    return this.explanation;
  }

  public setExplanation(explanation: string): void {
    this.explanation = explanation;
  }
}

const questionArray: Question[] = [];
