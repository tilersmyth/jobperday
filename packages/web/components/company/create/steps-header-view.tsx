import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

interface Props {
  step: number;
}

export const CreateCompanyStepsHeader: React.FunctionComponent<Props> = ({
  step,
}) => {
  return (
    <Steps size="small" current={step} style={{ marginBottom: 30 }}>
      <Step title="Setup" />
      <Step title="Profile" />
      <Step title="Members" />
    </Steps>
  );
};
