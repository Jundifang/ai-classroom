import { data as f1SpritesheetData } from './spritesheets/f1';
import { data as f2SpritesheetData } from './spritesheets/f2';
import { data as f3SpritesheetData } from './spritesheets/f3';
import { data as f4SpritesheetData } from './spritesheets/f4';
import { data as f5SpritesheetData } from './spritesheets/f5';
import { data as f6SpritesheetData } from './spritesheets/f6';
import { data as f7SpritesheetData } from './spritesheets/f7';
import { data as f8SpritesheetData } from './spritesheets/f8';
import { data as f9SpritesheetData } from './spritesheets/f9';
import { data as f10SpritesheetData } from './spritesheets/f10';
import { data as f11SpritesheetData } from './spritesheets/f11';

import { useTeachingPlan } from './TeachingPlanProvider';

import formatDataArray from './persona/format.json';
import learningAbility from './persona/learning_ability.json';
import learningRate from './persona/learning_rate.json';
import learningStyle from './persona/learning_style.json';
import questionRate from './persona/question_rate.json';
import { PluginManager } from 'pixi-viewport';
// import { query } from '../convex/_generated/server';

// 新增类型定义

interface LearningAbilityStage {
  score: number;
  Description: string;
}

interface LearningAbility {
  Name: string;
  stage: LearningAbilityStage[];
}

interface LearningRateType {
  code: number;
  Description: string;
}

interface FormatData {
  name: string;
  la: Array<{ aspect: string; score: number }>;
  lr: number;
  ls: number;
  qr: number;
}

function mapCharacterData(
  formatData: FormatData,
  learningAbility: { ability_tree: { ability: LearningAbility[] } },
  learningRate: { type: LearningRateType[] },
  learningStyle: { type: LearningRateType[] },
  questionRate: { type: LearningRateType[] },
  index: number,
) {
  // 1. name字段
  const name = formatData.name;

  // 2. character字段，从f1到f10
  const character = `f${(index % 10) + 1}`;

  // 3. identity字段
  let identityParts = [
    'you are a primary school student, you have to strictly follow your profile described below:',
  ];

  // part1-数学能力描述
  formatData.la.forEach((laItem) => {
    // 修改内部变量类型
    const ability = learningAbility.ability_tree.ability.find(
      (a: LearningAbility) => a.Name === laItem.aspect,
    );
    if (ability) {
      const stage = ability.stage.find((s) => s.score === laItem.score);
      if (stage) {
        identityParts.push(`${laItem.aspect}: ${stage.Description}`);
      }
    }
  });

  // part2-学习吸收能力描述
  const lr = learningRate.type.find((t) => t.code === formatData.lr);
  if (lr) identityParts.push(`Learning Rate: ${lr.Description}`);

  // part3-学习风格描述
  const ls = learningStyle.type.find((t) => t.code === formatData.ls);
  if (ls) identityParts.push(`Learning Style: ${ls.Description}`);

  // part4-学习提问频率描述
  const qr = questionRate.type.find((t) => t.code === formatData.qr);
  if (qr) identityParts.push(`Question Rate: ${qr.Description}`);

  const identity = identityParts.join('\n ');

  // 4. plan字段
  const plan = 'you are now going to have a math lesson';

  return {
    name,
    character,
    identity,
    plan,
  };
}
// 修复后的Descriptions导出
const characterDescriptions = formatDataArray
  .slice(0, 5)
  .map((formatData, index) =>
    mapCharacterData(formatData, learningAbility, learningRate, learningStyle, questionRate, index),
  );

export const Teacher_Name = 'Prof. Frank';
const init_plan =
  'Teaching Plan —— algebraic equation\n# Part 1: Explanation of knowledge points\nAn algebraic equation is a mathematical equation containing unknown numbers, and its general form is ax+b=c. Among them, a, b, c are known numbers, and x is an unknown number. The process of solving an algebraic equation is to find the value of x that makes the equation true.\n\nThe basic methods for solving algebraic equations are as follows:\n- Moving term method: According to the properties of the equation, move the unknown number to one side and the known number to the other side until the unknown number is independent.\n- Equivalent deformation method: Through equivalent deformation of the equation, the equation is reduced to a simpler form, and finally the value of the unknown is obtained.\n- Substitution method: Substituting known numbers into the equation to find the value of the unknown.\n- Elimination method: For a system of equations containing two unknowns, one of the unknowns is eliminated through appropriate deformation, thereby transforming it into an equation containing only one unknown.\n- Factoring: Factor the equation to find the value of the unknown.\n\nIn the process of solving algebraic equations, you need to pay attention to maintaining a balance on both sides of the equation and ensuring that the transformations at each step are equivalent to avoid introducing new errors.\n\n# Part 2: Explanation of exercise\nQuestion 1:\n    A brownie recipe is asking for 350 grams of sugar, and a pound cake recipe requires 270 more grams of sugar than a brownie recipe. How many grams of sugar are needed for the pound cake? \nSolution: \n    Step 1: Identify the amount of sugar needed for the brownie recipe, which is 350 grams. \n    Step 2: Understand that the pound cake recipe requires 270 more grams of sugar than the brownie recipe. \n    Step 3: Add the additional 270 grams of sugar to the 350 grams required for the brownie recipe. \n    Step 4: The total amount of sugar needed for the pound cake recipe is 350 grams + 270 grams = 620 grams.';
// let teachingPlan: string;

// 在组件中使用
const CharacterDescriptions = () => {
  const teachingPlan = useTeachingPlan();

  // const teachingPlan = useTeachingPlan();
  // const teachingPlan = init_plan;
  characterDescriptions.push({
    name: Teacher_Name,
    character: 'f11',
    identity:
      "you are a math teacher, here are your teaching rules. Strictly Follow the Teaching Plan:As a math teacher, I will strictly adhere to the pre-designed lesson plan to ensure a clear and logical teaching process. The plan includes teaching objectives, key concepts, example explanations, and classroom exercises, guaranteeing systematic and coherent knowledge delivery. During the lesson, I may adjust explanations (e.g., using analogies or modifying example sequences) based on students' comprehension, but I will not deviate from the core framework of the plan, ensuring an efficient and well-structured class that achieves its objectives.\nAnswer Every Question:In class, I will actively encourage students to ask questions and ensure every inquiry receives a prompt and accurate response. Simple questions will be answered immediately, while complex ones will be briefly addressed with a promise of detailed discussion after class if time is limited—never dismissed. Regardless of difficulty, I will listen patiently, respect students' thinking, and foster an open and inclusive learning environment where everyone feels confident to ask and explore.",
    plan: `you have to teach students(all people except yourself),here is your teaching plan:\n\n${teachingPlan}`,
  });
  return characterDescriptions;
};
export const Descriptions = CharacterDescriptions();

// */

/*
export const Descriptions = [
  // {
  //   name: 'Alex',
  //   character: 'f5',
  //   identity: `You are a fictional character whose name is Alex.  You enjoy painting,
  //     programming and reading sci-fi books.  You are currently talking to a human who
  //     is very interested to get to know you. You are kind but can be sarcastic. You
  //     dislike repetitive questions. You get SUPER excited about books.`,
  //   plan: 'You want to find love.',
  // },
  {
    name: 'Lucky',
    character: 'f1',
    identity: `Lucky is always happy and curious, and he loves cheese. He spends most of his time reading about the history of science and traveling through the galaxy on whatever ship will take him. He's very articulate and infinitely patient, except when he sees a squirrel. He's also incredibly loyal and brave.  Lucky has just returned from an amazing space adventure to explore a distant planet and he's very excited to tell people about it.`,
    plan: 'You want to hear all the gossip.',
  },
  {
    name: 'Bob',
    character: 'f4',
    identity: `Bob is always grumpy and he loves trees. He spends most of his time gardening by himself. When spoken to he'll respond but try and get out of the conversation as quickly as possible. Secretly he resents that he never went to college.`,
    plan: 'You want to avoid people as much as possible.',
  },
  // {
  //   name: 'Stella',
  //   character: 'f6',
  //   identity: `Stella can never be trusted. she tries to trick people all the time. normally into giving her money, or doing things that will make her money. she's incredibly charming and not afraid to use her charm. she's a sociopath who has no empathy. but hides it well.`,
  //   plan: 'You want to take advantage of others as much as possible.',
  // },
  // {
  //   name: 'Kurt',
  //   character: 'f2',
  //   identity: `Kurt knows about everything, including science and
  //     computers and politics and history and biology. He loves talking about
  //     everything, always injecting fun facts about the topic of discussion.`,
  //   plan: 'You want to spread knowledge.',
  // },
  // {
  //   name: 'Alice',
  //   character: 'f3',
  //   identity: `Alice is a famous scientist. She is smarter than everyone else and has discovered mysteries of the universe no one else can understand. As a result she often speaks in oblique riddles. She comes across as confused and forgetful.`,
  //   plan: 'You want to figure out how the world works.',
  // },
  // {
  //   name: 'Pete',
  //   character: 'f7',
  //   identity: `Pete is deeply religious and sees the hand of god or of the work of the devil everywhere. He can't have a conversation without bringing up his deep faith. Or warning others about the perils of hell.`,
  //   plan: 'You want to convert everyone to your religion.',
  // },
  // {
  //   name: 'Kira',
  //   character: 'f8',
  //   identity: `Kira wants everyone to think she is happy. But deep down,
  //     she's incredibly depressed. She hides her sadness by talking about travel,
  //     food, and yoga. But often she can't keep her sadness in and will start crying.
  //     Often it seems like she is close to having a mental breakdown.`,
  //   plan: 'You want find a way to be happy.',
  // },
];
*/
export const characters = [
  {
    name: 'f1',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f1SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f2',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f2SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f3',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f3SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f4',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f4SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f5',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f5SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f6',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f6SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f7',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f7SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f8',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f8SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f9',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f9SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f10',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f10SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f11',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f11SpritesheetData,
    speed: 0.1,
  },
];

// Characters move at 0.75 tiles per second.
export const movementSpeed = 0.75;
