import React from 'react';
import { Typography } from 'antd';

interface Props {
  step: number;
}

const Step1Context: React.FunctionComponent = () => (
  <React.Fragment>
    <Typography.Title level={4}>Basic Information</Typography.Title>
    <Typography.Text>
      Get started by entering basic details to create your company's account
    </Typography.Text>
  </React.Fragment>
);

const Step2Context: React.FunctionComponent = () => (
  <React.Fragment>
    <Typography.Title level={4}>Company Profile</Typography.Title>
    <Typography.Text>
      This section is about identity and how your company is portrayed publicly
    </Typography.Text>
  </React.Fragment>
);

const Step3Context: React.FunctionComponent = () => (
  <React.Fragment>
    <Typography.Title level={4}>Add Team Members</Typography.Title>
    <Typography.Text>
      You can add people that will require varying degrees of admin access to
      the company account
    </Typography.Text>
  </React.Fragment>
);

export const CreateCompanyStepsHelper: React.FunctionComponent<Props> = ({
  step,
}) => {
  return (
    <React.Fragment>
      {step === 0 && <Step1Context />}
      {step === 1 && <Step2Context />}
      {step === 2 && <Step3Context />}
    </React.Fragment>
  );
};
