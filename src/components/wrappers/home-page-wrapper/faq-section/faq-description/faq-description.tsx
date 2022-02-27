import { ChevronRightLarge } from '../../../../../assets/images';
import React, { FC, useState } from 'react';

const FaqDescription:FC<any> = ():JSX.Element =>{
  const [toggle, setToggle] = useState<boolean>(false);

  function clickHandler() {
    setToggle(!toggle);
  }

return(
  <>
    <div className='faq-description'>
      <div>
        <p>
          What color is the sky?
        </p>
      </div>

      <div className='canvas-icon-section'>
            <span onClick={(event) => {
              event.preventDefault()
              clickHandler();
            }
            }
            >
              <ChevronRightLarge
                className={`canvas-icon ${toggle ? 'rotate-icon' : ''}`}
              />
            </span>
      </div>
    </div>

    <div className='sub-items mt-50'>
      {toggle &&
      <div className='faq-content-section'>
        <p className='faq-content'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
          euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
          exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure
          dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te
          feugait nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
          dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
          suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores, assumenda autem blanditiis culpa
          doloremque doloribus enim esse est eveniet inventore, iure iusto molestias nam pariatur perspiciatis
          praesentium quasi repudiandae.</p>
      </div>
      }
    </div>
  </>
)
}
export default FaqDescription;