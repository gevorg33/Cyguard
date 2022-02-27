import React, { FC, memo } from 'react';
import { Typography } from 'antd';
import { ChevronRight, CommentIcon } from '../../../assets/images';

import './help-styles.scss'

const HelpComponent:FC = ():JSX.Element =>
  <div className='comment-section'>
    <div
      className='comment-icon-circle'>
      <CommentIcon className='comment-icon' />
    </div>
    <div className='comment-section-description'>
      <Typography.Paragraph className='comment-section-description-main-txt'>
        How can we help you?
      </Typography.Paragraph>
      <Typography.Paragraph className='comment-section-description-link'>
        find out more here
        <ChevronRight className='ml-13 find-out-more-icon' />
      </Typography.Paragraph>
    </div>
  </div>

export default memo(HelpComponent);