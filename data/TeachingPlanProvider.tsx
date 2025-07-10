import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
const init_plan =
  'Teaching Plan —— algebraic equation\n# Part 1: Explanation of knowledge points\nAn algebraic equation is a mathematical equation containing unknown numbers, and its general form is ax+b=c. Among them, a, b, c are known numbers, and x is an unknown number. The process of solving an algebraic equation is to find the value of x that makes the equation true.\n\nThe basic methods for solving algebraic equations are as follows:\n- Moving term method: According to the properties of the equation, move the unknown number to one side and the known number to the other side until the unknown number is independent.\n- Equivalent deformation method: Through equivalent deformation of the equation, the equation is reduced to a simpler form, and finally the value of the unknown is obtained.\n- Substitution method: Substituting known numbers into the equation to find the value of the unknown.\n- Elimination method: For a system of equations containing two unknowns, one of the unknowns is eliminated through appropriate deformation, thereby transforming it into an equation containing only one unknown.\n- Factoring: Factor the equation to find the value of the unknown.\n\nIn the process of solving algebraic equations, you need to pay attention to maintaining a balance on both sides of the equation and ensuring that the transformations at each step are equivalent to avoid introducing new errors.\n\n# Part 2: Explanation of exercise\nQuestion 1:\n    A brownie recipe is asking for 350 grams of sugar, and a pound cake recipe requires 270 more grams of sugar than a brownie recipe. How many grams of sugar are needed for the pound cake? \nSolution: \n    Step 1: Identify the amount of sugar needed for the brownie recipe, which is 350 grams. \n    Step 2: Understand that the pound cake recipe requires 270 more grams of sugar than the brownie recipe. \n    Step 3: Add the additional 270 grams of sugar to the 350 grams required for the brownie recipe. \n    Step 4: The total amount of sugar needed for the pound cake recipe is 350 grams + 270 grams = 620 grams.';

let teachingPlan = init_plan;
export function getTeachingPlan() {
  const [teachingPlan, setTeachingPlan] = useState(init_plan);
  const addPlan = useMutation(api.plans.addPlan);
  const plansQuery = useQuery(api.plans.findFirst);

  useEffect(() => {
    if (!plansQuery) {
      addPlan({ content: teachingPlan });
    } else {
      setTeachingPlan(plansQuery.content);
    }
  }, [plansQuery]);
  return null;
  // if (!plansQuery) {
  //   addPlan({ content: teachingPlan });
  // } else {
  //   setTeachingPlan(plansQuery.content);
  // }
}
export const useTeachingPlan = () => teachingPlan;
