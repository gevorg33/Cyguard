import { Auth } from '@aws-amplify/auth';
import moment from 'moment';

export const getErrorByKey = (key: string | number, errors?: any[]) => {
  if (!Array.isArray(errors)) {
    return null;
  }
  return errors.find((i: any) => i.key === key);
};

export const getAuthToken = async () => {
  try {
    const {
      signInUserSession: {
        idToken: { jwtToken },
      },
    } = await Auth.currentAuthenticatedUser();
    return jwtToken;
  } catch (e) {
    return null;
  }
};

export const moveCaretAtEnd = (e: any) => {
  const tempValue = e.target.value;
  e.target.value = '';
  e.target.value = tempValue;
};

export const isAdminUser = async () => {
  try {
    const {
      signInUserSession: {
        accessToken: { payload },
      },
    } = await Auth.currentAuthenticatedUser();
    return payload['cognito:groups'].includes('Admin');
  } catch (e) {
    return false;
  }
};

export const disableButton = (...args: Array<boolean>): boolean => {
  return args.filter(Boolean).length > 0;
};

export const isUserFederated = async () => {
  try {
    const { attributes } = await Auth.currentUserInfo();
    const parsedIdentities = JSON.parse(attributes.identities);
    return !!parsedIdentities?.find((i: any) => !!i.primary);
  } catch (e) {
    return false;
  }
};

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const validStatus = (extraError: any, scopeErrors: any) => {
  return !!extraError || !!scopeErrors ? 'error' : undefined;
};

export const helperMessage = (extraError: any, scopeErrors: any) => {
  return (extraError || scopeErrors) ? (extraError || scopeErrors) : false;
};

export const formatedDate = (date: string): string => {
  return moment(date).format('H:mm, Do MMM, YYYY');
};

export const hidePhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\d(?=(?:\D*\d){4})/g, '*');
};

export const hideEmail = (email: string): string => {
  return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')
};

export const today = (): string => {
  return moment().format('dddd, MMMM DD');
};

export const createDownloadLink = (fileUrl: string): void => {
  if (fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(fileUrl);
  }
};