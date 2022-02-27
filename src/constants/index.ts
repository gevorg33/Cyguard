const awsErrorCodes = {
  notConfirmed: 'UserNotConfirmedException',
};

export {
  awsErrorCodes,
};

export const notification = [
  {
    key: '1',
    companyName: 'Notification title',
    freshness: `${(new Date()).getDate()}`,
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: '2',
    companyName: 'Notification title',
    freshness: `${(new Date()).getTime()}`,
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: '3',
    companyName: 'Notification title',
    freshness: `${(new Date()).getDate()}`,
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
];

export const columns = [
  {
    key: 'key',
    title: 'Name',
    dataIndex: 'companyName',
    width: '15%',
  },
  {
    key: 'key',
    title: 'Date',
    dataIndex: 'freshness',
  },
];

export const FETCH_FAILURE_MESSAGE = 'Something went wrong, please try again later.';

export const CURRENT_PAGE_LIMIT = 10;

const namingPattern = /^[a-zA-Z ]*$/;

const companyNamePattern = /\D/;

export const FIRST_NAME_PATTERN = {
  required: true,
  pattern: namingPattern,
  message: 'Please, enter your First Name.',
};

export const LAST_NAME_PATTERN = {
  required: true,
  pattern: namingPattern,
  message: 'Please, enter your Last Name.',
};

export const COMPANY_NAME_PATTERN = {
  required: true,
  pattern: companyNamePattern,
  message: 'Please, enter the Company Name.',
};

export const PHONE_NUMBER_PATTERN = {
  required: true,
  pattern: /^[+]?[(]?\d{3}[)]?[-\s.]?\d{2,3}[-\s.]?\d{4,6}$/,
  message: 'Please, enter your Phone Number.',
};

export const LOG_IN_PATTERN = {
  required: true,
  type: 'string',
  message: 'Please, enter your password.',
};

export const PASSWORD_PATTERN: any = {
  required: true,
  type: 'string',
  min: 8,
  /* With capital letter */
  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50}$/,
  message:
    'Use at least 8 characters including numbers, symbols, upper and lower case letters.',
};