import React from 'react';
import { matchPath } from 'react-router-dom';
import routes from 'routes/routes';
import { notification, Modal, message } from 'antd';
import { AxiosError } from 'axios';
import { FETCH_FAILURE_MESSAGE } from '../constants';

const routesForHideSider = [routes.certificatesValidate];

class UIHelper {
  static showSider = (pathname: string, extra: boolean): boolean => {
    const match = routesForHideSider.find((i: any) => matchPath(pathname, i));
    return match === null && extra;
  }

  static error = (params: any) => {
    const { message } = params;
    if (Array.isArray(message)) {
      message.forEach((i: any) => {
        notification.error({
          ...params,
          message: i.msg,
        });
        return i;
      });
    } else {
      notification.error({
        ...params,
      });
    }

  }

  static warning = (params: any) => {
    notification.warning(params);
  }

  static success = (params: any) => {
    notification.success(params);
  }

  static showModalNotification = (params: { title: string, message: string, onOk?: () => void }, variant: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const content = (
      <div>
        { params.message }
      </div>
    );
    switch (variant) {
      case 'success':
        return Modal.success({
          content,
          title: params.title,
          onOk: params.onOk,
        });
      case 'error':
        return Modal.error({
          content,
          title: params.title,
          onOk: params.onOk,
        });
      case 'warning':
        return Modal.warning({
          content,
          title: params.title,
          onOk: params.onOk,
        });
      case 'info':
        return Modal.info({
          content,
          title: params.title,
          onOk: params.onOk,
        });
      default:
        return Modal.info({
          title: params.title,
          content,
          onOk: params.onOk,
        });
    }
  };

  static listenApiErrors = (e: AxiosError) => {
    const { response } = e;
    const defaultStyles = {
      whiteSpace: 'pre-wrap',
    };
    if (response) {
      const { status, data } = response;
      switch (status) {
        case 409:
        case 422:
        case 500:
        case 503:
          return UIHelper.warning({
            description: data?.message || FETCH_FAILURE_MESSAGE,
            duration: 5,
            message: data?.error,
            style: defaultStyles
          });
        case 402:
          return UIHelper.warning({
            description: data?.message || FETCH_FAILURE_MESSAGE,
            duration: 5,
            message: data?.error || 'Payment error.',
            style: defaultStyles
          });
        default:
          message.error(FETCH_FAILURE_MESSAGE);
          return;
      }
    }
  }
}

export default UIHelper;
