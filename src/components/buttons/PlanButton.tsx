import Button from './Button';
import { toast } from 'react-toastify';
import resetImg from '../../../assets/reset.png';
import setImg from '../../../assets/set.png';
import { useMutation, useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
// import { SignInButton } from '@clerk/clerk-react';
// import { ConvexError } from 'convex/values';
// import { Id } from '../../../convex/_generated/dataModel';
import { useCallback, useState } from 'react';
// import { waitForInput } from '../../hooks/sendInput';
// import { useServerGame } from '../../hooks/serverGame';
import ReactModal from 'react-modal';
// 替换原有导入
import { getPlan, setPlan } from '../../utils/show_plan';
import { plan_used } from '../../../data/characters';
const plan_now = getPlan();

// 在组件外部定义模态框样式
const warningModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#2d3748',
    border: 'none',
    borderRadius: '8px',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};
export function ResetButton() {
  const resetPlan = plan_used;

  const handleReset = async () => {
    try {
      setPlan(resetPlan);
      toast.success('reset done');
    } catch (error) {
      toast.error('reset failed');
    }
  };

  return (
    <Button imgUrl={resetImg} onClick={handleReset} title="reset and show the plan used now">
      Reset
    </Button>
  );
}

export function SetButton() {
  const [showWarning, setShowWarning] = useState(false);
  const freeze = useMutation(api.testing.stop);
  // TODO
  // const wipeData = useAction(api.testing.clearTable);
  const uploadPlan = useMutation(api.plans.addPlan);
  const unfreeze = useMutation(api.testing.resume);

  const handleConfirm = async () => {
    try {
      // 执行冻结操作
      await freeze();

      // 清空数据
      // await wipeData();

      // 上传新教案
      await uploadPlan({
        content: plan_now,
      });
      await unfreeze();
      toast.success('set success');
    } catch (error) {
      toast.error('set failed');
    }
    setShowWarning(false);
  };

  return (
    <>
      <Button imgUrl={setImg} onClick={() => setShowWarning(true)}>
        Set
      </Button>

      <ReactModal isOpen={showWarning} style={warningModalStyle} contentLabel="Warning">
        <div className="rpg-warning">
          <h2>WARNING</h2>
          <p>
            Export your data before setting a new plan. previous data will be permanently deleted!
            <br />
            {'(e.g. npx convex export --path <path>.zip)'}
          </p>
          <div className="button-group">
            <button className="rpg-cancel" onClick={() => setShowWarning(false)}>
              cancel
            </button>
            <button className="rpg-confirm" onClick={handleConfirm}>
              confirm
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}
