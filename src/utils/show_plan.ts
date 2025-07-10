import { useTeachingPlan } from '../../data/TeachingPlanProvider';
import { useState } from 'react';
// 使用自定义 Hook 管理教学计划状态
export function usePlanState() {
  const [teachingPlan, setTeachingPlan] = useState(useTeachingPlan());

  const getPlan = () => teachingPlan;
  const setPlan = (v: string) => setTeachingPlan(v);

  return { getPlan, setPlan };
}
