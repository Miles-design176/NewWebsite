import React, { useEffect, useState } from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import './chess.css';

// Types and Interfaces
export interface RevolutionaryFigure {
  id: string;
  name: string;
  role: string;
  description: string;
  side: 'revolutionary' | 'royalist';
}

export interface ChessPiece {
  id: string;
  type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
  color: 'white' | 'black';
  figure: RevolutionaryFigure;
  initialPosition: [number, number];
  image?: string;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'long-answer' | 'short-answer';
  choices?: Choice[];
  correctAnswer?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type GamePhase = "ready" | "playing" | "ended";

interface Position {
  x: number;
  y: number;
}

// Revolutionary figures (White pieces)
const revolutionaryFigures: RevolutionaryFigure[] = [
  {
    id: 'robespierre',
    name: 'Maximilien Robespierre',
    role: 'Leader of the Jacobins',
    description: 'A key figure in the Reign of Terror, Robespierre was a radical revolutionary who promoted the virtues of incorruptibility and democratic government before falling victim to the guillotine himself.',
    side: 'revolutionary'
  },
  {
    id: 'danton',
    name: 'Georges Danton',
    role: 'Founder of the Cordeliers Club',
    description: 'A leading figure in the early stages of the Revolution, Danton was known for his powerful public speaking skills and played a vital role in the overthrow of the monarchy.',
    side: 'revolutionary'
  },
  {
    id: 'marat',
    name: 'Jean-Paul Marat',
    role: 'Radical Journalist',
    description: 'Marat published L\'Ami du peuple (Friend of the People), an influential radical newspaper that called for violence against counter-revolutionaries. He was assassinated in his bathtub by Charlotte Corday.',
    side: 'revolutionary'
  },
  {
    id: 'saint-just',
    name: 'Louis Antoine de Saint-Just',
    role: 'Committee of Public Safety Member',
    description: 'Known as the "Angel of Death," Saint-Just was one of Robespierre\'s closest allies and a determined supporter of the Terror, eventually sharing Robespierre\'s fate at the guillotine.',
    side: 'revolutionary'
  },
  {
    id: 'lafayette',
    name: 'Marquis de Lafayette',
    role: 'Military Commander',
    description: 'An aristocrat who embraced liberal ideas, Lafayette fought in the American Revolution before returning to play a key role in the early French Revolution, attempting to steer a moderate course.',
    side: 'revolutionary'
  },
  {
    id: 'brissot',
    name: 'Jacques Pierre Brissot',
    role: 'Girondist Leader',
    description: 'Founder of the more moderate Girondist faction, Brissot advocated for a constitutional monarchy before becoming more radical. He was eventually guillotined during the Terror.',
    side: 'revolutionary'
  },
  {
    id: 'sieyes',
    name: 'Emmanuel Joseph Sieyès',
    role: 'Political Theorist',
    description: 'Author of What is the Third Estate?, a pamphlet that stated the complaints of the common people against the privileged orders, laying the groundwork for the Revolution.',
    side: 'revolutionary'
  },
  {
    id: 'mirabeau',
    name: 'Count Mirabeau',
    role: 'Early Revolutionary Leader',
    description: 'Despite being an aristocrat, Mirabeau became a popular leader in the early Revolution. He advocated for a constitutional monarchy modeled after Britain\'s system.',
    side: 'revolutionary'
  },
  // Pawns
  {
    id: 'sans-culotte-1',
    name: 'Sans-culotte',
    role: 'Common Revolutionary',
    description: 'The sans-culottes were urban laborers, shopkeepers, and artisans who formed the backbone of the revolutionary movement, known for wearing long trousers instead of the knee breeches of the aristocracy.',
    side: 'revolutionary'
  },
  {
    id: 'sans-culotte-2',
    name: 'Sans-culotte',
    role: 'Common Revolutionary',
    description: 'These working-class revolutionaries were known for their radical political stance and participated in many pivotal events, including the storming of the Bastille.',
    side: 'revolutionary'
  },
  {
    id: 'sans-culotte-3',
    name: 'Sans-culotte',
    role: 'Common Revolutionary',
    description: 'Named for their long trousers (as opposed to the knee breeches of the aristocracy), the sans-culottes became the driving force behind the Reign of Terror.',
    side: 'revolutionary'
  },
  {
    id: 'sans-culotte-4',
    name: 'Sans-culotte',
    role: 'Common Revolutionary',
    description: 'These common people demanded radical social and political reforms and were essential to the success of the Revolution in its early stages.',
    side: 'revolutionary'
  },
  {
    id: 'sans-culotte-5',
    name: 'Sans-culotte',
    role: 'Common Revolutionary',
    description: 'Urban workers who participated in revolutionary crowds and demonstrations, the sans-culottes helped push the Revolution in more radical directions.',
    side: 'revolutionary'
  },
  {
    id: 'sans-culotte-6',
    name: 'Sans-culotte',
    role: 'Common Revolutionary',
    description: 'The sans-culottes were staunch supporters of the Revolution, often taking direct action when they felt the Revolution was being compromised by moderates.',
    side: 'revolutionary'
  },
  {
    id: 'sans-culotte-7',
    name: 'Sans-culotte',
    role: 'Common Revolutionary',
    description: 'Working-class radicals who pushed for economic controls, price regulations, and harsh measures against counter-revolutionaries.',
    side: 'revolutionary'
  },
  {
    id: 'sans-culotte-8',
    name: 'Sans-culotte',
    role: 'Common Revolutionary',
    description: 'These ordinary citizens were the most militant supporters of the Revolution, often organizing in sections and participating in revolutionary tribunals.',
    side: 'revolutionary'
  }
];

// Royalist figures (Black pieces)
const royalistFigures: RevolutionaryFigure[] = [
  {
    id: 'louis-xvi',
    name: 'King Louis XVI',
    role: 'Last King of France before the Revolution',
    description: 'Well-intentioned but indecisive, Louis XVI was unable to resolve France\'s financial crisis and adapt to the changing political climate, ultimately being executed by guillotine in 1793.',
    side: 'royalist'
  },
  {
    id: 'marie-antoinette',
    name: 'Marie Antoinette',
    role: 'Queen of France',
    description: 'The Austrian-born Queen of France who became a symbol of the perceived excesses of the monarchy. Despite her famous statement "Let them eat cake" being questionable, she was deeply unpopular and was guillotined in 1793.',
    side: 'royalist'
  },
  {
    id: 'artois',
    name: 'Count of Artois',
    role: 'King\'s Brother',
    description: 'The youngest brother of Louis XVI who opposed change and was one of the first to emigrate during the Revolution. He later became King Charles X during the Bourbon Restoration.',
    side: 'royalist'
  },
  {
    id: 'provence',
    name: 'Count of Provence',
    role: 'King\'s Brother',
    description: 'The older brother of Louis XVI who initially supported some reforms but later fled and became a leader of the counter-revolutionary movement. He eventually became King Louis XVIII after Napoleon\'s defeat.',
    side: 'royalist'
  },
  {
    id: 'conde',
    name: 'Prince of Condé',
    role: 'Counter-Revolutionary Military Leader',
    description: 'A member of the royal family who formed the Army of Condé, a counter-revolutionary force of immigrants that fought against the revolutionary armies.',
    side: 'royalist'
  },
  {
    id: 'axel-fersen',
    name: 'Count Axel von Fersen',
    role: 'Marie Antoinette\'s Close Friend',
    description: 'A Swedish diplomat and close friend (possibly lover) of Marie Antoinette who tried to arrange the royal family\'s escape from France during the Flight to Varennes.',
    side: 'royalist'
  },
  {
    id: 'breteuil',
    name: 'Baron de Breteuil',
    role: 'Royal Minister',
    description: 'A staunch royalist who served Louis XVI as a minister and later represented him in exile, working to coordinate counter-revolutionary efforts.',
    side: 'royalist'
  },
  {
    id: 'calonne',
    name: 'Charles Alexandre de Calonne',
    role: 'Controller-General of Finances',
    description: 'A pre-revolutionary minister who tried to reform France\'s finances but was dismissed when his proposals to tax the privileged classes met with resistance.',
    side: 'royalist'
  },
  // Pawns
  {
    id: 'noble-1',
    name: 'Aristocrat',
    role: 'Member of the Nobility',
    description: 'A member of the First Estate who enjoyed special privileges and exemptions from many taxes before the Revolution stripped them of their status.',
    side: 'royalist'
  },
  {
    id: 'noble-2',
    name: 'Aristocrat',
    role: 'Member of the Nobility',
    description: 'Many nobles fled France during the Revolution, becoming émigrés who lobbied foreign powers to intervene against the revolutionary government.',
    side: 'royalist'
  },
  {
    id: 'noble-3',
    name: 'Aristocrat',
    role: 'Member of the Nobility',
    description: 'The French nobility\'s resistance to reform contributed to the financial crisis that helped trigger the Revolution.',
    side: 'royalist'
  },
  {
    id: 'noble-4',
    name: 'Aristocrat',
    role: 'Member of the Nobility',
    description: 'Some nobles initially supported the Revolution but became let down as it grew more radical and threatened their status and property.',
    side: 'royalist'
  },
  {
    id: 'noble-5',
    name: 'Aristocrat',
    role: 'Member of the Nobility',
    description: 'Many aristocrats lost not only their privileges but also their lives during the Terror, when noble birth alone could be grounds for execution.',
    side: 'royalist'
  },
  {
    id: 'noble-6',
    name: 'Aristocrat',
    role: 'Member of the Nobility',
    description: 'Before the Revolution, the aristocracy held much of France\'s wealth and enjoyed tax exemptions that contributed to the nation\'s financial problems.',
    side: 'royalist'
  },
  {
    id: 'noble-7',
    name: 'Aristocrat',
    role: 'Member of the Nobility',
    description: 'Some nobles joined counter-revolutionary armies hoping to restore the monarchy and their privileges.',
    side: 'royalist'
  },
  {
    id: 'noble-8',
    name: 'Aristocrat',
    role: 'Member of the Nobility',
    description: 'The Revolution titles of nobility and feudal privileges, fundamentally challenging the social order that had defined France for centuries.',
    side: 'royalist'
  }
];

// Assign figures to chess pieces
const pieces: ChessPiece[] = [
  // White pieces (Revolutionaries)
  // Main pieces
  { id: 'wr1', type: 'rook', color: 'white', figure: revolutionaryFigures[5], initialPosition: [0, 0], image: '/images/pieces/white-rook.svg' },
  { id: 'wn1', type: 'knight', color: 'white', figure: revolutionaryFigures[4], initialPosition: [1, 0], image: '/images/pieces/white-knight.svg' },
  { id: 'wb1', type: 'bishop', color: 'white', figure: revolutionaryFigures[6], initialPosition: [2, 0], image: '/images/pieces/white-bishop.svg' },
  { id: 'wq', type: 'queen', color: 'white', figure: revolutionaryFigures[1], initialPosition: [3, 0], image: '/images/pieces/white-queen.svg' },
  { id: 'wk', type: 'king', color: 'white', figure: revolutionaryFigures[0], initialPosition: [4, 0], image: '/images/pieces/white-king.svg' },
  { id: 'wb2', type: 'bishop', color: 'white', figure: revolutionaryFigures[2], initialPosition: [5, 0], image: '/images/pieces/white-bishop.svg' },
  { id: 'wn2', type: 'knight', color: 'white', figure: revolutionaryFigures[3], initialPosition: [6, 0], image: '/images/pieces/white-knight.svg' },
  { id: 'wr2', type: 'rook', color: 'white', figure: revolutionaryFigures[7], initialPosition: [7, 0], image: '/images/pieces/white-rook.svg' },
  
  // Pawns
  { id: 'wp1', type: 'pawn', color: 'white', figure: revolutionaryFigures[8], initialPosition: [0, 1], image: '/images/pieces/white-pawn.svg' },
  { id: 'wp2', type: 'pawn', color: 'white', figure: revolutionaryFigures[9], initialPosition: [1, 1], image: '/images/pieces/white-pawn.svg' },
  { id: 'wp3', type: 'pawn', color: 'white', figure: revolutionaryFigures[10], initialPosition: [2, 1], image: '/images/pieces/white-pawn.svg' },
  { id: 'wp4', type: 'pawn', color: 'white', figure: revolutionaryFigures[11], initialPosition: [3, 1], image: '/images/pieces/white-pawn.svg' },
  { id: 'wp5', type: 'pawn', color: 'white', figure: revolutionaryFigures[12], initialPosition: [4, 1], image: '/images/pieces/white-pawn.svg' },
  { id: 'wp6', type: 'pawn', color: 'white', figure: revolutionaryFigures[13], initialPosition: [5, 1], image: '/images/pieces/white-pawn.svg' },
  { id: 'wp7', type: 'pawn', color: 'white', figure: revolutionaryFigures[14], initialPosition: [6, 1], image: '/images/pieces/white-pawn.svg' },
  { id: 'wp8', type: 'pawn', color: 'white', figure: revolutionaryFigures[15], initialPosition: [7, 1], image: '/images/pieces/white-pawn.svg' },
  
  // Black pieces (Royalists)
  // Main pieces
  { id: 'br1', type: 'rook', color: 'black', figure: royalistFigures[5], initialPosition: [0, 7], image: '/images/pieces/black-rook.svg' },
  { id: 'bn1', type: 'knight', color: 'black', figure: royalistFigures[4], initialPosition: [1, 7], image: '/images/pieces/black-knight.svg' },
  { id: 'bb1', type: 'bishop', color: 'black', figure: royalistFigures[6], initialPosition: [2, 7], image: '/images/pieces/black-bishop.svg' },
  { id: 'bq', type: 'queen', color: 'black', figure: royalistFigures[1], initialPosition: [3, 7], image: '/images/pieces/black-queen.svg' },
  { id: 'bk', type: 'king', color: 'black', figure: royalistFigures[0], initialPosition: [4, 7], image: '/images/pieces/black-king.svg' },
  { id: 'bb2', type: 'bishop', color: 'black', figure: royalistFigures[2], initialPosition: [5, 7], image: '/images/pieces/black-bishop.svg' },
  { id: 'bn2', type: 'knight', color: 'black', figure: royalistFigures[3], initialPosition: [6, 7], image: '/images/pieces/black-knight.svg' },
  { id: 'br2', type: 'rook', color: 'black', figure: royalistFigures[7], initialPosition: [7, 7], image: '/images/pieces/black-rook.svg' },
  
  // Pawns
  { id: 'bp1', type: 'pawn', color: 'black', figure: royalistFigures[8], initialPosition: [0, 6], image: '/images/pieces/black-pawn.svg' },
  { id: 'bp2', type: 'pawn', color: 'black', figure: royalistFigures[9], initialPosition: [1, 6], image: '/images/pieces/black-pawn.svg' },
  { id: 'bp3', type: 'pawn', color: 'black', figure: royalistFigures[10], initialPosition: [2, 6], image: '/images/pieces/black-pawn.svg' },
  { id: 'bp4', type: 'pawn', color: 'black', figure: royalistFigures[11], initialPosition: [3, 6], image: '/images/pieces/black-pawn.svg' },
  { id: 'bp5', type: 'pawn', color: 'black', figure: royalistFigures[12], initialPosition: [4, 6], image: '/images/pieces/black-pawn.svg' },
  { id: 'bp6', type: 'pawn', color: 'black', figure: royalistFigures[13], initialPosition: [5, 6], image: '/images/pieces/black-pawn.svg' },
  { id: 'bp7', type: 'pawn', color: 'black', figure: royalistFigures[14], initialPosition: [6, 6], image: '/images/pieces/black-pawn.svg' },
  { id: 'bp8', type: 'pawn', color: 'black', figure: royalistFigures[15], initialPosition: [7, 6], image: '/images/pieces/black-pawn.svg' }
];

// Questions data
const questions: Question[] = [
  // Multiple choice questions
  {
    id: 'q1',
    text: 'What was Marie Antoinette\'s role in the French Revolution?',
    type: 'multiple-choice',
    choices: [
      { id: 'q1-a', text: 'She ordered for the people to be killed.', isCorrect: false },
      { id: 'q1-b', text: 'She was a symbol of the monarchy\'s excesses and was a figure of popular hatred.', isCorrect: true },
      { id: 'q1-c', text: 'She was a symbol of power and the people rejected her.', isCorrect: false },
      { id: 'q1-d', text: 'She was rejected by the people resulting in her spending all of their money.', isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    id: 'q2',
    text: 'What year did the French Revolution begin?',
    type: 'multiple-choice',
    choices: [
      { id: 'q2-a', text: '1786', isCorrect: false },
      { id: 'q2-b', text: '1787', isCorrect: false },
      { id: 'q2-c', text: '1789', isCorrect: true },
      { id: 'q2-d', text: '1783', isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    id: 'q3',
    text: 'What year did the French Revolution end?',
    type: 'multiple-choice',
    choices: [
      { id: 'q3-a', text: '1797', isCorrect: false },
      { id: 'q3-b', text: '1799', isCorrect: true },
      { id: 'q3-c', text: '1800', isCorrect: false },
      { id: 'q3-d', text: '1802', isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    id: 'q4',
    text: 'Who ruled France during the French Revolution?',
    type: 'multiple-choice',
    choices: [
      { id: 'q4-a', text: 'King Louis XIV', isCorrect: false },
      { id: 'q4-b', text: 'King Louis XV', isCorrect: false },
      { id: 'q4-c', text: 'King Louis XVI', isCorrect: true },
      { id: 'q4-d', text: 'King Louis XVII', isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    id: 'q5',
    text: 'What caused the French Revolution?',
    type: 'multiple-choice',
    choices: [
      { id: 'q5-a', text: 'Industrial Revolution', isCorrect: false },
      { id: 'q5-b', text: 'Rise of Napoleon', isCorrect: false },
      { id: 'q5-c', text: 'Not enough food', isCorrect: false },
      { id: 'q5-d', text: 'Economic crisis and inequality', isCorrect: true }
    ],
    difficulty: 'medium'
  },
  {
    id: 'q6',
    text: 'What type of government was established after the monarchy?',
    type: 'multiple-choice',
    choices: [
      { id: 'q6-a', text: 'Monarchy', isCorrect: false },
      { id: 'q6-b', text: 'Dictatorship', isCorrect: false },
      { id: 'q6-c', text: 'A Colony', isCorrect: false },
      { id: 'q6-d', text: 'Republic', isCorrect: true }
    ],
    difficulty: 'easy'
  },
  {
    id: 'q7',
    text: 'Who eventually took power in France after the French Revolution?',
    type: 'multiple-choice',
    choices: [
      { id: 'q7-a', text: 'Maximilien Robespierre', isCorrect: false },
      { id: 'q7-b', text: 'Louis XVIII', isCorrect: false },
      { id: 'q7-c', text: 'Charles X', isCorrect: false },
      { id: 'q7-d', text: 'Napoleon Bonaparte', isCorrect: true }
    ],
    difficulty: 'medium'
  },
  {
    id: 'q8',
    text: 'Which king was removed from power during the French Revolution?',
    type: 'multiple-choice',
    choices: [
      { id: 'q8-a', text: 'Louis XIV', isCorrect: false },
      { id: 'q8-b', text: 'Louis XV', isCorrect: false },
      { id: 'q8-c', text: 'Napoleon', isCorrect: false },
      { id: 'q8-d', text: 'Louis XVI', isCorrect: true }
    ],
    difficulty: 'easy'
  },
  {
    id: 'q9',
    text: 'What was the name of the prison stormed on July 14, 1789?',
    type: 'multiple-choice',
    choices: [
      { id: 'q9-a', text: 'Louvre', isCorrect: false },
      { id: 'q9-b', text: 'Versailles', isCorrect: false },
      { id: 'q9-c', text: 'Notre-Dame', isCorrect: false },
      { id: 'q9-d', text: 'Bastille', isCorrect: true }
    ],
    difficulty: 'easy'
  },
  {
    id: 'q10',
    text: 'Who was the queen of France before the Revolution?',
    type: 'multiple-choice',
    choices: [
      { id: 'q10-a', text: 'Joan of Arc', isCorrect: false },
      { id: 'q10-b', text: 'Catherine the Great', isCorrect: false },
      { id: 'q10-c', text: 'Elizabeth I', isCorrect: false },
      { id: 'q10-d', text: 'Marie Antoinette', isCorrect: true }
    ],
    difficulty: 'easy'
  },
  {
    id: 'q11',
    text: 'What did people demand during the Revolution?',
    type: 'multiple-choice',
    choices: [
      { id: 'q11-a', text: 'More power for the king', isCorrect: false },
      { id: 'q11-b', text: 'A bigger army', isCorrect: false },
      { id: 'q11-c', text: 'More taxes', isCorrect: false },
      { id: 'q11-d', text: 'Freedom and equality', isCorrect: true }
    ],
    difficulty: 'easy'
  },
  {
    id: 'q12',
    text: 'Which of the following events marked the start of the French Revolution?',
    type: 'multiple-choice',
    choices: [
      { id: 'q12-a', text: 'The execution of Louis XVI', isCorrect: false },
      { id: 'q12-b', text: 'The Women\'s March on Versailles', isCorrect: false },
      { id: 'q12-c', text: 'The Tennis Court Oath', isCorrect: false },
      { id: 'q12-d', text: 'The Storming of the Bastille', isCorrect: true }
    ],
    difficulty: 'medium'
  },
  {
    id: 'q13',
    text: 'What was the Reign of Terror?',
    type: 'multiple-choice',
    choices: [
      { id: 'q13-a', text: 'A period of economic depression in France', isCorrect: false },
      { id: 'q13-b', text: 'A civil war between revolutionary factions', isCorrect: false },
      { id: 'q13-c', text: 'The rule of Napoleon Bonaparte', isCorrect: false },
      { id: 'q13-d', text: 'A period of mass executions and repression', isCorrect: true }
    ],
    difficulty: 'medium'
  },
  {
    id: 'q14',
    text: 'What was the Committee of Public Safety?',
    type: 'multiple-choice',
    choices: [
      { id: 'q14-a', text: 'A fire brigade to combat arson in Paris', isCorrect: false },
      { id: 'q14-b', text: 'A medical committee addressing the plague', isCorrect: false },
      { id: 'q14-c', text: 'A group that ensured food safety in markets', isCorrect: false },
      { id: 'q14-d', text: 'The de facto executive government during the Reign of Terror', isCorrect: true }
    ],
    difficulty: 'hard'
  },
  {
    id: 'q15',
    text: 'What was the main purpose of the National Assembly formed in 1789?',
    type: 'multiple-choice',
    choices: [
      { id: 'q15-a', text: 'To execute the king and queen', isCorrect: false },
      { id: 'q15-b', text: 'To establish trade with America', isCorrect: false },
      { id: 'q15-c', text: 'To organize military defense against other European powers', isCorrect: false },
      { id: 'q15-d', text: 'To write a constitution for France', isCorrect: true }
    ],
    difficulty: 'medium'
  },
  
  // Written answer questions
  {
    id: 'q16',
    text: 'What was king Louis XIV\'s full name?',
    type: 'short-answer',
    correctAnswer: 'Louis Dieudonne',
    difficulty: 'medium'
  },
  {
    id: 'q17',
    text: 'What was the main cause that started the Revolution?',
    type: 'short-answer',
    correctAnswer: 'The main cause of the French Revolution was the financial crisis due to government debt, unfair taxation, and economic inequality between the estates',
    difficulty: 'medium'
  },
  {
    id: 'q18',
    text: 'How did the execution of Louis XVI impact France?',
    type: 'short-answer',
    correctAnswer: 'The execution of Louis XVI on January 21, 1793, marked a pivotal moment in the French Revolution, symbolizing the end of the monarchy and ushering in a period of radical change and instability, including the Reign of Terror.',
    difficulty: 'medium'
  },
  {
    id: 'q19',
    text: 'During the French Revolution, how many people were Beheaded?',
    type: 'short-answer',
    correctAnswer: '17,000 people',
    difficulty: 'medium'
  },
  {
    id: 'q20',
    text: 'How did the execution of Louis XVI impact France?',
    type: 'short-answer',
    correctAnswer: 'The execution of Louis XVI on January 21, 1793, marked a turning point in the French Revolution, solidifying the radical phase and intensifying internal and external conflicts. Within France, it eliminated any hope of restoring the monarchy and deepened divisions between revolutionaries and royalist supporters. The event also fueled the Reign of Terror, as the revolutionary government, led by the Jacobins, sought to eliminate perceived enemies of the Republic. Internationally, the execution shocked European monarchies, leading to the formation of the First Coalition, a military alliance against France that plunged the nation into further war. Ultimately, the king\'s execution symbolized the triumph of the Republic but also contributed to the instability that eventually led to Napoleon\'s rise to power.',
    difficulty: 'hard'
  },
  {
    id: 'q21',
    text: 'What prison was stormed on July 14, 1789?',
    type: 'short-answer',
    correctAnswer: 'Bastille',
    difficulty: 'easy'
  },
  {
    id: 'q22',
    text: 'What device was used for executions during the Reign of Terror?',
    type: 'short-answer',
    correctAnswer: 'Guillotine',
    difficulty: 'easy'
  },
  {
    id: 'q23',
    text: 'What queen was executed during the Revolution?',
    type: 'short-answer',
    correctAnswer: 'Marie Antoinette',
    difficulty: 'easy'
  },
  {
    id: 'q24',
    text: 'What military leader took power after the revolution?',
    type: 'short-answer',
    correctAnswer: 'Napoleon Bonaparte',
    difficulty: 'easy'
  },
  {
    id: 'q25',
    text: 'Who was most affected during the French revolution?',
    type: 'short-answer',
    correctAnswer: 'Peasants and Urban workers',
    difficulty: 'medium'
  },
  {
    id: 'q26',
    text: 'What was Louis XVI\'s fate?',
    type: 'short-answer',
    correctAnswer: 'Execution by guillotine',
    difficulty: 'easy'
  },
  {
    id: 'q27',
    text: 'What European country declared war on France during the revolution?',
    type: 'short-answer',
    correctAnswer: 'Austria',
    difficulty: 'medium'
  },
  {
    id: 'q28',
    text: 'When was Marie Antoinette executed?',
    type: 'short-answer',
    correctAnswer: 'October 16, 1793',
    difficulty: 'medium'
  },
  {
    id: 'q29',
    text: 'What type of government replaced the monarchy?',
    type: 'short-answer',
    correctAnswer: 'Republic',
    difficulty: 'easy'
  },
  
  // Long answer questions
  {
    id: 'q30',
    text: 'Explain the political, economic, and social causes of the French Revolution. What conditions in pre-revolutionary France led to this major historical event?',
    type: 'long-answer',
    correctAnswer: 'The French Revolution was caused by a combination of political, economic, and social factors. Politically, France had an absolute monarchy with no checks on royal power. Economically, the country faced severe financial difficulties due to involvement in expensive wars and a regressive tax system where the poorest paid the most. Socially, the rigid class system with privileged nobility and clergy created resentment among the bourgeoisie and peasantry. The influence of Enlightenment ideas about liberty and equality, combined with food shortages and high bread prices, created the perfect conditions for revolution.',
    difficulty: 'hard'
  },
  {
    id: 'q31',
    text: 'Compare and contrast the different phases of the French Revolution from 1789 to Napoleon\'s rise to power. How did the goals and character of the Revolution change over time?',
    type: 'long-answer',
    correctAnswer: 'The French Revolution progressed through several distinct phases. It began in 1789 with a liberal, reform-oriented phase focused on constitutional monarchy and enlightenment principles, exemplified by the Declaration of Rights of Man. By 1792-93, it entered a more radical phase with the execution of the king, establishment of the Republic, and increased popular participation. The radical phase peaked during the Terror (1793-94) when Robespierre and the Jacobins imposed revolutionary virtue through violence. After Thermidor (1794), a more conservative reaction set in with the Directory government, weakening revolutionary zeal while preserving some reforms. Finally, Napoleon\'s 1799 coup ended the Revolution proper but consolidated many of its reforms while abandoning its democratic aspects. The Revolution thus transformed from seeking liberal constitutional reform to radical democracy, then to pragmatic authoritarianism that preserved social reforms while abandoning political liberty.',
    difficulty: 'hard'
  },
  {
    id: 'q32',
    text: 'Evaluate the legacy of the French Revolution. How did it transform France and what lasting impact did it have on modern political thought and institutions?',
    type: 'long-answer',
    correctAnswer: 'The French Revolution permanently transformed France by abolishing feudalism, weakening aristocratic power, and establishing the principle of equality before the law. It introduced modern secular civic institutions and established the metric system. More broadly, it fundamentally altered political thinking by demonstrating that established monarchies could be overthrown by popular movements. It popularized concepts of citizenship, civil liberties, and sovereignty of the people that remain foundational to modern democracies. The revolutionary division between left and right political orientations continues to structure political discourse. However, the Revolution\'s legacy remains complex and contested, with debates continuing about whether its contribution to modern politics should emphasize its democratic aspirations, its violent excesses, or its nation-building aspects. Despite these debates, the Revolution unquestionably marks the birth of modern political culture.',
    difficulty: 'hard'
  }
];

// Function to get a random question based on difficulty
const getRandomQuestion = (difficulty: 'easy' | 'medium' | 'hard', type: 'multiple-choice' | 'long-answer' | 'short-answer'): Question => {
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty && q.type === type);
  
  if (filteredQuestions.length === 0) {
    // Fallback to any question of the requested type if specific difficulty not available
    const typeQuestions = questions.filter(q => q.type === type);
    return typeQuestions[Math.floor(Math.random() * typeQuestions.length)];
  }
  
  return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
};

// Function to get a question based on piece type
const getQuestionForPiece = (pieceType: string): Question => {
  let questionType: 'multiple-choice' | 'long-answer' | 'short-answer' = 'multiple-choice';
  let difficulty: 'easy' | 'medium' | 'hard' = 'easy';
  
  // Determine question type and difficulty based on piece type
  if (pieceType === 'pawn') { 
    // For pawns, randomly select between short-answer and multiple-choice
    questionType = Math.random() > 0.5 ? 'multiple-choice' : 'short-answer';
    difficulty = 'easy';
  } else if (pieceType === 'knight' || pieceType === 'bishop') {
    // For knights and bishops, randomly select between all three question types
    const rand = Math.random();
    questionType = rand < 0.33 ? 'multiple-choice' : (rand < 0.66 ? 'short-answer' : 'long-answer');
    difficulty = 'medium';
  } else if (pieceType === 'rook') {
    // For rooks, randomly select between all three question types
    const rand = Math.random();
    questionType = rand < 0.33 ? 'multiple-choice' : (rand < 0.66 ? 'short-answer' : 'long-answer');
    difficulty = 'medium';
  } else if (pieceType === 'queen') {
    // For queens, randomly select between short-answer and long-answer
    questionType = Math.random() > 0.5 ? 'long-answer' : 'short-answer';
    difficulty = 'medium';
  } else if (pieceType === 'king') {
    // For kings, primarily long-answer with a small chance of short-answer
    questionType = Math.random() > 0.25 ? 'long-answer' : 'short-answer';
    difficulty = 'hard';
  }
  
  return getRandomQuestion(difficulty, questionType);
};

// Chess piece symbols for fallback rendering
const pieceSymbols: Record<string, string> = {
  'white-pawn': '♙',
  'white-rook': '♖',
  'white-knight': '♘',
  'white-bishop': '♗',
  'white-queen': '♕',
  'white-king': '♔',
  'black-pawn': '♟',
  'black-rook': '♜',
  'black-knight': '♞',
  'black-bishop': '♝',
  'black-queen': '♛',
  'black-king': '♚',
};

// Chess Logic
type Board = (ChessPiece | null)[][];

// Check if a move is valid for a specific piece
function isValidMove(board: Board, fromX: number, fromY: number, toX: number, toY: number): boolean {
  // Check if coordinates are within bounds
  if (fromX < 0 || fromX > 7 || fromY < 0 || fromY > 7 || toX < 0 || toX > 7 || toY < 0 || toY > 7) {
    return false;
  }

  // Get the piece at the starting position
  const piece = board[fromY][fromX];
  if (!piece) return false;

  // Check if destination contains a piece of the same color
  const destPiece = board[toY][toX];
  if (destPiece && destPiece.color === piece.color) {
    return false;
  }

  // Piece-specific movement rules
  let validBasicMove = false;
  switch (piece.type) {
    case 'pawn':
      validBasicMove = isValidPawnMove(board, fromX, fromY, toX, toY, piece.color);
      break;
    case 'rook':
      validBasicMove = isValidRookMove(board, fromX, fromY, toX, toY);
      break;
    case 'knight':
      validBasicMove = isValidKnightMove(fromX, fromY, toX, toY);
      break;
    case 'bishop':
      validBasicMove = isValidBishopMove(board, fromX, fromY, toX, toY);
      break;
    case 'queen':
      validBasicMove = isValidQueenMove(board, fromX, fromY, toX, toY);
      break;
    case 'king':
      validBasicMove = isValidKingMove(board, fromX, fromY, toX, toY);
      break;
    default:
      return false;
  }

  if (!validBasicMove) return false;

  // Check if the move would leave or put the king in check
  const tempBoard = JSON.parse(JSON.stringify(board));
  tempBoard[toY][toX] = piece;
  tempBoard[fromY][fromX] = null;
  
  // Special handling for castling: the rook must be moved too
  if (piece.type === 'king' && Math.abs(fromX - toX) === 2) {
    // This is a castling move
    const isKingSide = toX > fromX;
    const rookX = isKingSide ? 7 : 0;
    const rookToX = isKingSide ? fromX + 1 : fromX - 1;
    
    // Move the rook as part of castling
    const rook = tempBoard[fromY][rookX];
    if (rook) {
      tempBoard[fromY][rookToX] = rook;
      tempBoard[fromY][rookX] = null;
    }
  }
  
  // Verify the move doesn't leave the king in check
  if (isCheck(tempBoard, piece.color)) {
    return false;
  }
  
  return true;
}

// Check if a pawn move is valid
function isValidPawnMove(board: Board, fromX: number, fromY: number, toX: number, toY: number, color: 'white' | 'black'): boolean {
  const direction = color === 'white' ? 1 : -1;
  const startRow = color === 'white' ? 1 : 6;

  // Moving forward
  if (fromX === toX && toY === fromY + direction && !board[toY][toX]) {
    return true;
  }

  // Moving two squares from starting position
  if (fromX === toX && fromY === startRow && toY === fromY + 2 * direction && 
      !board[fromY + direction][fromX] && !board[toY][toX]) {
    return true;
  }

  // Capturing diagonally
  if (Math.abs(fromX - toX) === 1 && toY === fromY + direction && board[toY][toX] && 
      board[toY][toX]?.color !== color) {
    return true;
  }
  
  // En passant capture
  // If pawn is on 5th rank (for white) or 4th rank (for black)
  if (fromY === (color === 'white' ? 4 : 3)) {
    // Check for adjacent enemy pawn that just moved 2 squares
    if (Math.abs(fromX - toX) === 1 && toY === fromY + direction && !board[toY][toX]) {
      const targetPiece = board[fromY][toX];
      if (targetPiece && targetPiece.type === 'pawn' && targetPiece.color !== color) {
        // In a real implementation, we'd track the previous move to confirm this is an en passant
        // For now, we'll assume any adjacent pawn can be captured en passant
        return true;
      }
    }
  }

  return false;
}

// Check if a rook move is valid
function isValidRookMove(board: Board, fromX: number, fromY: number, toX: number, toY: number): boolean {
  // Rooks move horizontally or vertically
  if (fromX !== toX && fromY !== toY) {
    return false;
  }

  const dx = Math.sign(toX - fromX);
  const dy = Math.sign(toY - fromY);
  let x = fromX + dx;
  let y = fromY + dy;

  // Check if there are any pieces in the way
  while (x !== toX || y !== toY) {
    if (board[y][x]) {
      return false;
    }
    x += dx;
    y += dy;
  }

  return true;
}

// Check if a knight move is valid
function isValidKnightMove(fromX: number, fromY: number, toX: number, toY: number): boolean {
  const dx = Math.abs(fromX - toX);
  const dy = Math.abs(fromY - toY);

  // Knights move in an L-shape (2 squares in one direction, 1 square in the perpendicular direction)
  return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
}

// Check if a bishop move is valid
function isValidBishopMove(board: Board, fromX: number, fromY: number, toX: number, toY: number): boolean {
  const dx = Math.abs(fromX - toX);
  const dy = Math.abs(fromY - toY);

  // Bishops move diagonally
  if (dx !== dy) {
    return false;
  }

  const xDirection = Math.sign(toX - fromX);
  const yDirection = Math.sign(toY - fromY);
  let x = fromX + xDirection;
  let y = fromY + yDirection;

  // Check if there are any pieces in the way
  while (x !== toX && y !== toY) {
    if (board[y][x]) {
      return false;
    }
    x += xDirection;
    y += yDirection;
  }

  return true;
}

// Check if a queen move is valid
function isValidQueenMove(board: Board, fromX: number, fromY: number, toX: number, toY: number): boolean {
  // Queens can move like a rook or a bishop
  return isValidRookMove(board, fromX, fromY, toX, toY) || isValidBishopMove(board, fromX, fromY, toX, toY);
}

// Check if a king move is valid (including castling)
function isValidKingMove(board: Board, fromX: number, fromY: number, toX: number, toY: number): boolean {
  const dx = Math.abs(fromX - toX);
  const dy = Math.abs(fromY - toY);
  
  // Regular king move - one square in any direction
  if (dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0)) {
    return true;
  }
  
  // Check for castling (king moves two squares horizontally)
  if (dy === 0 && dx === 2) {
    const piece = board[fromY][fromX];
    if (!piece || piece.type !== 'king') return false;
    
    // Determine if it's kingside or queenside castling
    const isKingside = toX > fromX;
    const rookX = isKingside ? 7 : 0;
    const rookPiece = board[fromY][rookX];
    
    // Check if rook exists and has the same color as the king
    if (!rookPiece || rookPiece.type !== 'rook' || rookPiece.color !== piece.color) {
      return false;
    }
    
    // Check if there are any pieces between king and rook
    const direction = isKingside ? 1 : -1;
    let x = fromX + direction;
    while (x !== rookX) {
      if (board[fromY][x]) {
        return false;
      }
      x += direction;
    }
    
    // Check if king is in check or passes through check
    const kingColor = piece.color;
    // Check if king is in check
    if (isCheck(board, kingColor)) {
      return false;
    }
    
    // Check if king passes through check
    const tempBoard = JSON.parse(JSON.stringify(board));
    tempBoard[fromY][fromX + direction] = piece;
    tempBoard[fromY][fromX] = null;
    if (isCheck(tempBoard, kingColor)) {
      return false;
    }
    
    return true;
  }
  
  return false;
}

// Check if a king is in check
function isCheck(board: Board, color: 'white' | 'black'): boolean {
  // Find the king position
  let kingX = -1, kingY = -1;
  
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = board[y][x];
      if (piece && piece.type === 'king' && piece.color === color) {
        kingX = x;
        kingY = y;
        break;
      }
    }
    if (kingX !== -1) break;
  }
  
  // Check if any opponent's piece can attack the king
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = board[y][x];
      if (piece && piece.color !== color) {
        if (isValidMove(board, x, y, kingX, kingY)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Check if a player is in checkmate
function isCheckmate(board: Board, color: 'white' | 'black'): boolean {
  // First, check if the king is in check
  if (!isCheck(board, color)) {
    return false;
  }
  
  // Try every possible move for every piece of the current player
  for (let fromY = 0; fromY < 8; fromY++) {
    for (let fromX = 0; fromX < 8; fromX++) {
      const piece = board[fromY][fromX];
      if (piece && piece.color === color) {
        for (let toY = 0; toY < 8; toY++) {
          for (let toX = 0; toX < 8; toX++) {
            if (isValidMove(board, fromX, fromY, toX, toY)) {
              // Make the move temporarily
              const tempBoard = JSON.parse(JSON.stringify(board));
              const capturedPiece = tempBoard[toY][toX];
              tempBoard[toY][toX] = tempBoard[fromY][fromX];
              tempBoard[fromY][fromX] = null;
              
              // Check if the king is still in check after the move
              if (!isCheck(tempBoard, color)) {
                return false; // Found a move that gets out of check
              }
            }
          }
        }
      }
    }
  }
  
  // No move can get the king out of check, so it's checkmate
  return true;
}

// Game State Store
interface GameState {
  phase: GamePhase;
  start: () => void;
  restart: () => void;
  end: () => void;
}

const useGame = create<GameState>()(
  subscribeWithSelector((set) => ({
    phase: "ready",
    
    start: () => {
      set((state) => {
        // Only transition from ready to playing
        if (state.phase === "ready") {
          return { phase: "playing" };
        }
        return {};
      });
    },
    
    restart: () => {
      set(() => ({ phase: "ready" }));
    },
    
    end: () => {
      set((state) => {
        // Only transition from playing to ended
        if (state.phase === "playing") {
          return { phase: "ended" };
        }
        return {};
      });
    }
  }))
);

// Audio State Store
interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  isMuted: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  playHit: () => void;
  playSuccess: () => void;
}

const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  isMuted: false, // Play sounds by default
  
  setBackgroundMusic: (music) => set({ backgroundMusic: music }),
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  
  toggleMute: () => {
    const { isMuted } = get();
    const newMutedState = !isMuted;
    
    // Just update the muted state
    set({ isMuted: newMutedState });
    
    // Log the change
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Hit sound skipped (muted)");
        return;
      }
      
      // Clone the sound to allow overlapping playback
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Success sound skipped (muted)");
        return;
      }
      
      successSound.currentTime = 0;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  }
}));

// Chess Store
interface ChessState {
  board: (ChessPiece | null)[][];
  pieces: ChessPiece[];
  currentPlayer: 'white' | 'black';
  selectedPiece: ChessPiece | null;
  validMoves: Position[];
  capturedPieces: ChessPiece[];
  captureAttempt: {
    attacker: ChessPiece;
    target: ChessPiece;
  } | null;
  gameOver: boolean;
  winner: 'white' | 'black' | null;
  whiteScore: number;
  blackScore: number;
  lastMove: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    piece: ChessPiece;
  } | null;
  moveHistory: string[]; // For detecting threefold repetition
  
  // Actions
  initializeGame: () => void;
  selectPiece: (piece: ChessPiece) => void;
  movePiece: (fromX: number, fromY: number, toX: number, toY: number) => void;
  tryCapture: (attacker: ChessPiece, target: ChessPiece) => void;
  resolveCapture: (success: boolean) => void;
  switchPlayer: () => void;
  resetGame: () => void;
  checkGameOver: () => void;
  updateScore: (player: 'white' | 'black', points: number) => void;
  isStalemate: () => boolean;
  checkThreefoldRepetition: () => boolean;
}

const useChessStore = create<ChessState>()(
  subscribeWithSelector((set, get) => ({
    board: Array(8).fill(null).map(() => Array(8).fill(null)),
    pieces: [...pieces],
    currentPlayer: 'white',
    selectedPiece: null,
    validMoves: [],
    capturedPieces: [],
    captureAttempt: null,
    gameOver: false,
    winner: null,
    whiteScore: 0,
    blackScore: 0,
    lastMove: null,
    moveHistory: [],
    
    initializeGame: () => {
      const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
      
      // Place pieces on the board based on their initial positions
      pieces.forEach(piece => {
        const [x, y] = piece.initialPosition;
        newBoard[y][x] = piece;
      });
      
      set({
        board: newBoard,
        pieces: [...pieces],
        currentPlayer: 'white',
        selectedPiece: null,
        validMoves: [],
        capturedPieces: [],
        captureAttempt: null,
        gameOver: false,
        winner: null,
        whiteScore: 0,
        blackScore: 0,
        lastMove: null,
        moveHistory: []
      });
    },
    
    selectPiece: (piece: ChessPiece) => {
      const { board, currentPlayer } = get();
      
      // Can only select pieces of the current player's color
      if (piece.color !== currentPlayer) return;
      
      // Find current position of the piece
      let pieceX = -1, pieceY = -1;
      
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (board[y][x]?.id === piece.id) {
            pieceX = x;
            pieceY = y;
            break;
          }
        }
        if (pieceX !== -1) break;
      }
      
      if (pieceX === -1 || pieceY === -1) return; // Piece not found on board
      
      // Calculate valid moves
      const moves: Position[] = [];
      
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (isValidMove(board, pieceX, pieceY, x, y)) {
            moves.push({ x, y });
          }
        }
      }
      
      set({ selectedPiece: piece, validMoves: moves });
    },
    
    movePiece: (fromX: number, fromY: number, toX: number, toY: number) => {
      const { board, currentPlayer } = get();
      const piece = board[fromY][fromX];
      
      if (!piece || piece.color !== currentPlayer) return;
      
      // Check if the move is valid
      if (!isValidMove(board, fromX, fromY, toX, toY)) return;
      
      // Check if there's a capture attempt
      const targetPiece = board[toY][toX];
      if (targetPiece && targetPiece.color !== currentPlayer) {
        // This is a capture attempt - don't move yet, set up the capture attempt
        set({ captureAttempt: { attacker: piece, target: targetPiece } });
        return;
      }
      
      // Regular move (no capture)
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[toY][toX] = piece;
      newBoard[fromY][fromX] = null;
      
      // Special handling for castling
      if (piece.type === 'king' && Math.abs(fromX - toX) === 2) {
        // This is a castling move
        const isKingSide = toX > fromX;
        const rookX = isKingSide ? 7 : 0;
        const rookToX = isKingSide ? toX - 1 : toX + 1;
        const rook = newBoard[fromY][rookX];
        
        if (rook && rook.type === 'rook') {
          // Move the rook to its new position
          newBoard[fromY][rookToX] = rook;
          newBoard[fromY][rookX] = null;
        }
      }
      
      // Save the current board state to history for threefold repetition detection
      const boardState = JSON.stringify(newBoard);
      const moveHistory = [...get().moveHistory, boardState];
      
      // Record this move
      const lastMove = {
        fromX,
        fromY,
        toX,
        toY,
        piece
      };
      
      set({
        board: newBoard,
        selectedPiece: null,
        validMoves: [],
        lastMove,
        moveHistory
      });
      
      // Check if the opponent is in check after this move
      const opponentColor = currentPlayer === 'white' ? 'black' : 'white';
      if (isCheck(newBoard, opponentColor)) {
        // Create a check notification div
        const notification = document.createElement('div');
        notification.className = 'check-notification';
        notification.textContent = `${opponentColor === 'white' ? 'Revolutionaries' : 'Royalists'} are in check!`;
        document.body.appendChild(notification);
        
        // Remove the notification after 2 seconds
        setTimeout(() => {
          notification.remove();
        }, 2000);
        
        // Check if it's also checkmate
        if (isCheckmate(newBoard, opponentColor)) {
          // Create a checkmate notification div
          const checkmateNotification = document.createElement('div');
          checkmateNotification.className = 'checkmate-notification';
          checkmateNotification.textContent = `Checkmate! ${currentPlayer === 'white' ? 'Revolutionaries' : 'Royalists'} win!`;
          document.body.appendChild(checkmateNotification);
          
          // Remove the checkmate notification after 3 seconds
          setTimeout(() => {
            checkmateNotification.remove();
          }, 3000);
          
          set({
            gameOver: true,
            winner: currentPlayer
          });
        }
      }
      
      // Switch to the other player (only if not game over)
      if (!get().gameOver) {
        get().switchPlayer();
      }
    },
    
    tryCapture: (attacker: ChessPiece, target: ChessPiece) => {
      set({ captureAttempt: { attacker, target } });
    },
    
    resolveCapture: (success: boolean) => {
      const { captureAttempt, board, capturedPieces } = get();
      
      if (!captureAttempt) return;
      
      const { attacker, target } = captureAttempt;
      
      // Find positions of the attacker and target
      let attackerX = -1, attackerY = -1, targetX = -1, targetY = -1;
      
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (board[y][x]?.id === attacker.id) {
            attackerX = x;
            attackerY = y;
          }
          if (board[y][x]?.id === target.id) {
            targetX = x;
            targetY = y;
          }
        }
      }
      
      const newBoard = JSON.parse(JSON.stringify(board));
      
      if (success) {
        // Successful capture
        newBoard[targetY][targetX] = attacker;
        newBoard[attackerY][attackerX] = null;
        
        // Handle en passant capture - the captured pawn isn't directly at the target position
        if (attacker.type === 'pawn' && Math.abs(attackerX - targetX) === 1 && !board[targetY][targetX]) {
          // This is an en passant capture - the enemy pawn is actually on the same row as the attacker
          newBoard[attackerY][targetX] = null;
        }
        
        const newCapturedPieces = [...capturedPieces, target];
        
        // Award points based on the type of piece captured
        let points = 0;
        switch (target.type) {
          case 'pawn':
            points = 1;
            break;
          case 'knight':
          case 'bishop':
            points = 3;
            break;
          case 'rook':
            points = 5;
            break;
          case 'queen':
            points = 9;
            break;
          case 'king':
            points = 100; // High value for king
            break;
        }
        
        // Update score for the current player
        get().updateScore(attacker.color, points);
        
        // Save the current board state to history for threefold repetition detection
        const boardState = JSON.stringify(newBoard);
        const moveHistory = [...get().moveHistory, boardState];
        
        // Record this move
        const lastMove = {
          fromX: attackerX,
          fromY: attackerY,
          toX: targetX,
          toY: targetY,
          piece: attacker
        };
        
        set({
          board: newBoard,
          capturedPieces: newCapturedPieces,
          captureAttempt: null,
          selectedPiece: null,
          validMoves: [],
          lastMove,
          moveHistory
        });
        
        // Check for game over conditions
        get().checkGameOver();
        
        // Switch to the other player
        get().switchPlayer();
      } else {
        // Failed capture - reset capture attempt and switch player
        set({
          captureAttempt: null,
          selectedPiece: null,
          validMoves: []
        });
        
        // Skip turn for failed capture
        get().switchPlayer();
      }
    },
    
    switchPlayer: () => {
      const { currentPlayer } = get();
      set({ currentPlayer: currentPlayer === 'white' ? 'black' : 'white' });
    },
    
    checkGameOver: () => {
      const { board, currentPlayer } = get();
      
      // Check if the current player is in checkmate
      const opponentColor = currentPlayer === 'white' ? 'black' : 'white';
      
      // First check if the king is in check
      const isInCheck = isCheck(board, currentPlayer);
      
      // If in check, see if it's checkmate
      if (isInCheck && isCheckmate(board, currentPlayer)) {
        // Show alert before setting game over
        setTimeout(() => {
          alert(`Checkmate! ${opponentColor === 'white' ? 'Revolutionaries' : 'Royalists'} win!`);
          
          set({
            gameOver: true,
            winner: opponentColor
          });
        }, 500);
      } else if (isInCheck) {
        // Just alert about check if not checkmate
        setTimeout(() => {
          alert(`${currentPlayer === 'white' ? 'Revolutionaries' : 'Royalists'} are in check!`);
        }, 500);
      } else if (get().isStalemate()) {
        // Check for stalemate
        setTimeout(() => {
          alert("Stalemate! The game is a draw.");
          set({
            gameOver: true,
            winner: null
          });
        }, 500);
      } else if (get().checkThreefoldRepetition()) {
        // Check for threefold repetition
        setTimeout(() => {
          alert("Threefold repetition! The game is a draw.");
          set({
            gameOver: true,
            winner: null
          });
        }, 500);
      }
    },
    
    resetGame: () => {
      get().initializeGame();
    },
    
    updateScore: (player: 'white' | 'black', points: number) => {
      if (player === 'white') {
        set(state => ({ whiteScore: state.whiteScore + points }));
      } else {
        set(state => ({ blackScore: state.blackScore + points }));
      }
    },
    
    isStalemate: () => {
      const { board, currentPlayer, gameOver } = get();
      
      // If the game is already over, it's not a stalemate
      if (gameOver) return false;
      
      // Check if the player has any valid moves
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const piece = board[y][x];
          if (piece && piece.color === currentPlayer) {
            // For each piece, check if it has valid moves
            for (let toY = 0; toY < 8; toY++) {
              for (let toX = 0; toX < 8; toX++) {
                if (isValidMove(board, x, y, toX, toY)) {
                  // Found a valid move, not a stalemate
                  return false;
                }
              }
            }
          }
        }
      }
      
      // No valid moves and not in check - it's a stalemate
      return !isCheck(board, currentPlayer);
    },
    
    checkThreefoldRepetition: () => {
      const { moveHistory } = get();
      
      // Need at least 9 moves (8 moves + the current position) for 3 repetitions
      if (moveHistory.length < 9) return false;
      
      // Get current board state
      const currentBoardState = JSON.stringify(get().board);
      
      // Count occurrences of this board state
      let count = 1; // Start with 1 for the current state
      
      for (const state of moveHistory) {
        if (state === currentBoardState) {
          count++;
          if (count >= 3) {
            return true;
          }
        }
      }
      
      return false;
    }
  }))
);

// Initialize the game when the store is first used
useChessStore.getState().initializeGame();

// ChessBoard Component
interface ChessBoardProps {
  board: (ChessPiece | null)[][];
  currentPlayer: 'white' | 'black';
  selectedPiece: ChessPiece | null;
  validMoves: {x: number, y: number}[];
  onCellClick: (x: number, y: number) => void;
  onPieceHover: (piece: ChessPiece | null) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  board, 
  currentPlayer, 
  selectedPiece, 
  validMoves,
  onCellClick,
  onPieceHover
}) => {
  // Determine if a cell is a valid move
  const isValidMoveCell = (x: number, y: number) => {
    return validMoves.some(move => move.x === x && move.y === y);
  };

  return (
    <div className="chess-board">
      {Array.from({ length: 8 }, (_, row) => (
        <div key={row} className="chess-board-row">
          {Array.from({ length: 8 }, (_, col) => {
            const isWhite = (row + col) % 2 === 0;
            
            // Map UI coordinates to board coordinates based on current player
            // When black is playing, we rotate the entire board 180 degrees
            const boardY = currentPlayer === 'white' ? 7-row : row;
            const boardX = currentPlayer === 'white' ? col : 7-col;
            
            const piece = board[boardY][boardX];
            const isSelected = selectedPiece?.id === piece?.id;
            const isValidMove = isValidMoveCell(boardX, boardY);
            
            return (
              <div
                key={`${row}-${col}`}
                className={`chess-cell ${isWhite ? 'chess-cell-white' : 'chess-cell-black'} 
                    ${isSelected ? 'selected' : ''} 
                    ${isValidMove ? 'valid-move' : ''}`}
                onClick={() => onCellClick(boardX, boardY)}
                onMouseEnter={() => piece && onPieceHover(piece)}
                onMouseLeave={() => !selectedPiece && onPieceHover(null)}
              >
                {/* Chess piece */}
                {piece && (
                  <div className={`chess-piece ${isSelected ? 'selected' : ''}`}>
                    {piece.image ? (
                      <img 
                        src={piece.image} 
                        alt={piece.figure.name} 
                        title={piece.figure.name}
                      />
                    ) : (
                      <div className={`chess-piece-fallback ${piece.color}`}>
                        {pieceSymbols[`${piece.color}-${piece.type}`]}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Rank and file labels */}
                {col === 0 && (
                  <div className="chess-cell-coordinate chess-cell-rank">
                    {currentPlayer === 'white' ? 8 - row : row + 1}
                  </div>
                )}
                {row === 7 && (
                  <div className="chess-cell-coordinate chess-cell-file">
                    {String.fromCharCode(97 + col)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// QuestionPanel Component
interface QuestionPanelProps {
  question: Question | null;
  onAnswer: (isCorrect: boolean) => void;
  onClose: () => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ question, onAnswer, onClose }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [longAnswer, setLongAnswer] = useState('');
  const [shortAnswer, setShortAnswer] = useState('');
  
  if (!question) return null;
  
  const handleSubmit = () => {
    if (question.type === 'multiple-choice' && selectedChoice) {
      const choice = question.choices?.find(c => c.id === selectedChoice);
      onAnswer(choice?.isCorrect || false);
    } else if (question.type === 'long-answer' && longAnswer.trim()) {
      // For simplicity, we'll consider any non-empty long answer as correct
      // In a real app, this would use NLP or manual review
      const minWords = 10;
      const wordCount = longAnswer.trim().split(/\s+/).length;
      onAnswer(wordCount >= minWords);
    } else if (question.type === 'short-answer' && shortAnswer.trim()) {
      // For short answers, we'll use a smaller minimum word count
      const minWords = 1;
      const maxWords = 5;
      const wordCount = shortAnswer.trim().split(/\s+/).length;
      onAnswer(wordCount >= minWords && wordCount <= maxWords);
    }
  };
  
  const renderQuestionContent = () => {
    switch(question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3 mb-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🔄</span>
              <h3 className="font-semibold text-amber-800">Select the best answer:</h3>
            </div>
            {question.choices?.map(choice => (
              <div 
                key={choice.id}
                className={`p-3 border rounded cursor-pointer ${
                  selectedChoice === choice.id ? 'bg-amber-200 border-amber-500' : 'hover:bg-amber-100'
                }`}
                onClick={() => setSelectedChoice(choice.id)}
              >
                {choice.text}
              </div>
            ))}
          </div>
        );
        
      case 'short-answer':
        return (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">⚡</span>
              <h3 className="font-semibold text-blue-800">Quick Response:</h3>
            </div>
            <textarea
              className="w-full h-20 p-3 border rounded resize-none border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Write a brief answer (1-5 words)..."
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
            />
            <p className="text-sm text-blue-600 mt-1">Keep it concise - just a few words needed.</p>
          </div>
        );
        
      case 'long-answer':
        return (
          <div className="mb-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">📝</span>
              <h3 className="font-semibold text-green-800">Detailed Response:</h3>
            </div>
            <textarea
              className="w-full h-40 p-3 border rounded resize-none border-green-200 focus:border-green-500 focus:ring focus:ring-green-200"
              placeholder="Write your detailed answer here (minimum 10 words)..."
              value={longAnswer}
              onChange={(e) => setLongAnswer(e.target.value)}
            />
            <p className="text-sm text-green-600 mt-1">Provide a thorough explanation with at least 10 words.</p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const isSubmitDisabled = () => {
    switch(question.type) {
      case 'multiple-choice':
        return !selectedChoice;
      case 'short-answer':
        return shortAnswer.trim().length === 0;
      case 'long-answer':
        return longAnswer.trim().split(/\s+/).length < 10;
      default:
        return true;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-10 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Historical Challenge!</h2>
        <p className="text-lg mb-6">{question.text}</p>
        
        {renderQuestionContent()}
        
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={isSubmitDisabled()}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

// GameInfo Component
interface GameInfoProps {
  currentPlayer: 'white' | 'black';
  gameOver: boolean;
  winner: 'white' | 'black' | null;
  whiteScore: number;
  blackScore: number;
  phase: GamePhase;
  capturedPieces: ChessPiece[];
  hoveredPiece: ChessPiece | null;
  onEndGame: () => void;
  onRestart: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({
  currentPlayer,
  gameOver,
  winner,
  whiteScore,
  blackScore,
  phase,
  capturedPieces,
  hoveredPiece,
  onEndGame,
  onRestart
}) => {
  return (
    <div className="game-info">
      <div className="info-card">
        <h2 className="font-bold text-xl mb-2">
          {gameOver 
            ? `Game Over! ${winner === 'white' ? 'Revolutionaries' : 'Royalists'} Win!` 
            : `Current Player: ${currentPlayer === 'white' ? 'Revolutionaries' : 'Royalists'}`}
        </h2>
        
          {/* Score display */}
          <div className="score-display">
            <div className="score-box">
              <div className="score-label text-black font-bold">Revolutionaries</div>
              <div className="score-value text-black">{whiteScore}</div>
            </div>
            <div className="score-box bg-gray-800 px-2 rounded">
              <div className="score-label text-white font-bold">Royalists</div>
              <div className="score-value text-white">{blackScore}</div>
            </div>
          </div>
        
        {/* Controls */}
        <div className="mt-4 space-y-2">
          {phase === 'playing' && (
            <button
              className="game-button"
              onClick={onEndGame}
            >
              End Game
            </button>
          )}
          
          {phase === 'ended' && (
            <button
              className="game-button"
              onClick={onRestart}
            >
              Play Again
            </button>
          )}
        </div>
      </div>
      
      {/* Captured pieces - by both players */}
      {capturedPieces.length > 0 && (
        <div className="space-y-4">
          {/* Pieces captured by current player */}
          {capturedPieces.filter(p => p.color !== currentPlayer).length > 0 && (
            <div className="info-card">
              <h3 className="font-semibold">Your Captures:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {capturedPieces
                  .filter((piece: ChessPiece) => piece.color !== currentPlayer)
                  .map((piece: ChessPiece) => (
                    <div 
                      key={piece.id} 
                      className="captured-piece player"
                      title={piece.figure.name}
                    >
                      {piece.image ? (
                        <img 
                          src={piece.image} 
                          alt={piece.figure.name}
                        />
                      ) : (
                        <span>
                          {pieceSymbols[`${piece.color}-${piece.type}`]}
                        </span>
                      )}
                      {piece.figure.name.split(' ')[0]}
                    </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Pieces captured by opponent */}
          {capturedPieces.filter(p => p.color === currentPlayer).length > 0 && (
            <div className="info-card">
              <h3 className="font-semibold">Opponent's Captures:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {capturedPieces
                  .filter((piece: ChessPiece) => piece.color === currentPlayer)
                  .map((piece: ChessPiece) => (
                    <div 
                      key={piece.id} 
                      className="captured-piece opponent"
                      title={piece.figure.name}
                    >
                      {piece.image ? (
                        <img 
                          src={piece.image} 
                          alt={piece.figure.name}
                        />
                      ) : (
                        <span>
                          {pieceSymbols[`${piece.color}-${piece.type}`]}
                        </span>
                      )}
                      {piece.figure.name.split(' ')[0]}
                    </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Piece info (when hovering) */}
      {hoveredPiece && (
        <div className="info-card">
          <h3 className="font-semibold">{hoveredPiece.figure.name}</h3>
          <div className="text-sm text-gray-600 mt-1">{hoveredPiece.figure.role}</div>
          <p className="text-sm mt-2">{hoveredPiece.figure.description}</p>
        </div>
      )}
    </div>
  );
};

// Main Game Component
const RevolutionaryChessApp: React.FC = () => {
  const { phase, start, restart, end } = useGame();
  const { 
    board, 
    currentPlayer, 
    selectedPiece, 
    validMoves,
    selectPiece, 
    movePiece,
    captureAttempt,
    resolveCapture,
    gameOver,
    winner,
    capturedPieces,
    resetGame,
    whiteScore,
    blackScore
  } = useChessStore();
  const { 
    toggleMute, 
    isMuted, 
    playSuccess, 
    playHit,
    setBackgroundMusic, 
    setHitSound, 
    setSuccessSound,
  } = useAudio();
  
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [hoveredPiece, setHoveredPiece] = useState<ChessPiece | null>(null);
  
  // Handle question answer
  const handleQuestionAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      playSuccess();
    } else {
      playHit();
    }
    
    resolveCapture(isCorrect);
    setCurrentQuestion(null);
  };
  
  // Show question when there's a capture attempt
  useEffect(() => {
    if (captureAttempt) {
      const question = getQuestionForPiece(captureAttempt.target.type);
      setCurrentQuestion(question);
    }
  }, [captureAttempt]);
  
  // Load audio
  useEffect(() => {
    // Load all game sounds
    const hitSfx = new Audio('/sounds/hit.mp3');
    hitSfx.volume = 0.3;
    setHitSound(hitSfx);
    
    const successSfx = new Audio('/sounds/success.mp3');
    successSfx.volume = 0.5;
    setSuccessSound(successSfx);
  
    // No background music needed
  }, [setHitSound, setSuccessSound]);
  
  // Handle cell click
  const handleCellClick = (x: number, y: number) => {
    if (gameOver || phase !== 'playing') return;
    
    const piece = board[y][x];
    
    // If clicking on a piece
    if (piece) {
      if (piece.color === currentPlayer) {
        // Select the piece
        selectPiece(piece);
        setHoveredPiece(piece);
      } else if (selectedPiece) {
        // Find the position of the selected piece
        let fromX = -1, fromY = -1;
        for (let boardY = 0; boardY < 8; boardY++) {
          for (let boardX = 0; boardX < 8; boardX++) {
            if (board[boardY][boardX]?.id === selectedPiece.id) {
              fromX = boardX;
              fromY = boardY;
              break;
            }
          }
          if (fromX !== -1) break;
        }
        
        // Check if this is a valid capture
        if (validMoves.some(move => move.x === x && move.y === y)) {
          movePiece(fromX, fromY, x, y);
          playHit(); // Play sound when piece is moved
        }
      }
    } 
    // If clicking on an empty cell
    else if (selectedPiece) {
      // Find the position of the selected piece
      let fromX = -1, fromY = -1;
      for (let boardY = 0; boardY < 8; boardY++) {
        for (let boardX = 0; boardX < 8; boardX++) {
          if (board[boardY][boardX]?.id === selectedPiece.id) {
            fromX = boardX;
            fromY = boardY;
            break;
          }
        }
        if (fromX !== -1) break;
      }
      
      // Check if this is a valid move
      if (validMoves.some(move => move.x === x && move.y === y)) {
        movePiece(fromX, fromY, x, y);
        playHit(); // Play sound when piece is moved
      }
    }
  };

  // Determine if a cell is a valid move
  const isValidMoveCell = (x: number, y: number) => {
    // The valid moves are stored in board coordinates
    // boardX and boardY are already converted to board coordinates, so we can use them directly
    return validMoves.some(move => move.x === x && move.y === y);
  };
  
  // Render splash screen (rules/intro) if game not started
  if (phase === 'ready') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-amber-100 text-amber-900 p-4">
        <h1 className="text-5xl font-bold mb-6">Revolutionary Chess</h1>
        <p className="text-xl mb-6 max-w-md text-center">
          Learn about the French Revolution through chess with historical figures
        </p>
        <button
          className="px-10 py-4 bg-amber-800 text-white rounded-lg text-2xl hover:bg-amber-900 transition-colors"
          onClick={start}
        >
          Start Game
        </button>
      </div>
    );
  }
  
  // Main game screen
  return (
    <div className="min-h-screen bg-amber-50 pt-8 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Revolutionary Chess</h1>
        
        {/* Main game area */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Chess board */}
          <div className="flex-1 flex justify-center">
            <ChessBoard
              board={board}
              currentPlayer={currentPlayer}
              selectedPiece={selectedPiece}
              validMoves={validMoves}
              onCellClick={handleCellClick}
              onPieceHover={setHoveredPiece}
            />
          </div>
          
          {/* Game info sidebar */}
          <GameInfo
            currentPlayer={currentPlayer}
            gameOver={gameOver}
            winner={winner}
            whiteScore={whiteScore}
            blackScore={blackScore}
            phase={phase}
            capturedPieces={capturedPieces}
            hoveredPiece={hoveredPiece}
            onEndGame={end}
            onRestart={() => {
              resetGame();
              restart();
            }}
          />
        </div>
      </div>
      
      {/* Question popup */}
      {currentQuestion && (
        <QuestionPanel 
          question={currentQuestion} 
          onAnswer={handleQuestionAnswer} 
          onClose={() => {
            resolveCapture(false);
            setCurrentQuestion(null);
          }} 
        />
      )}
    </div>
  );
};

export default RevolutionaryChessApp;