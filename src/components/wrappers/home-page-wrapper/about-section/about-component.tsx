import { Typography } from 'antd';
import React from 'react';
import './about-section.scss';

const AboutComponent:React.FC<any> = ():JSX.Element => (
  <div className='about-section'>
    <Typography.Title className='features-title' level={1}>
      About Cyguard
    </Typography.Title>
    <Typography.Paragraph className='about-description mt-40'>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
      dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
      lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
      esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
      dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.<br />
      Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
      dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
      lobortis nisl ut aliquip ex ea commodo consequat.
    </Typography.Paragraph>
  </div>
)

export default AboutComponent;