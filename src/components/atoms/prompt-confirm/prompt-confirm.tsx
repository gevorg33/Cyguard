import React, { useCallback, useEffect } from 'react';

export interface PromptConfirmProps {
  isChanged?: boolean;
}

const PromptConfirm: React.FC<PromptConfirmProps> = ({ isChanged }):JSX.Element | null => {

  const onUnload = useCallback(
    (e) => {
      if (isChanged) {
        e.preventDefault();
        e.returnValue = '';
        delete e['returnValue'];
      }
    },
    [isChanged],
  );

  const onPopstateListener = useCallback(
    (e) => {
      if (isChanged) {
        if (
          !window.confirm('You have unsaved fields, you want to reload page?')
        ) {
          e.preventDefault();
        }
      }
    },
    [isChanged],
  );

  useEffect(() => {
    window.addEventListener('popstate', onPopstateListener);
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
      window.removeEventListener('popstate', onPopstateListener);
    };
  }, [onUnload, onPopstateListener]);

  return null;
};

export default PromptConfirm;
