import React, { useEffect, useRef, useState } from 'react'
import './labReportPage.scss'

const LabReportPage = () => {
  const [pages, setPages] = useState([
    {
      header: 'Page 1',
      content: (
        <div className='downloadReportPageContainer' id='report'>
          <div className='doctorPage'>
            <div className='topLogo'></div>
            <div className='doctorPageTopDetails'>
              <div className='doctorPageTopDate'> December-02-2022</div>
              <div className='doctorPageTopName doctorPageTopKey'>
                NAME: <span>John Doe</span>
              </div>
              <div className='doctorPageTopAge doctorPageTopKey'>
                AGE: <span>23</span>
              </div>
              <div className='doctorPageTopSex doctorPageTopKey'>
                SEX: <span>Male</span>
              </div>
              <p>
                I wish to inform you that we have examined the above referenced
                individual referred from your office. We have made the following
                observations as documented below (done following a general
                physical examination and a mandatory laboratory investigation)
              </p>
            </div>
            <div className='parametersInvestigated'>
              <div className='parametersInvestigatedTitle'>
                PARAMETERS INVESTIGATED
              </div>
              <div className='param'>
                Body mass index is over-weight at 26.8Kg/m2
              </div>
              <div className='param'>Temperature =36.0º Celsius,</div>
              <div className='param'>
                Blood pressure is <span>HIGH</span> at 148/98mmHg.
              </div>
              <div className='param'>
                Heart Rate -90 beats per minute regular with a good volume
              </div>
              <div className='param'>
                Visual Acuity: Right Eye: 20/20 Left Eye: 20/20
              </div>
            </div>
            <div className='recommendation'>
              <div className='recommendationTitle'>RECOMMENDATION</div>
              <div className='recommendationBody'>
                <p>
                  In the light of all the results obtained, the above-named
                  person is hereby certified as medically fit.
                </p>
                <p>
                  Kindly, find attached the result of Laboratory investigations.
                </p>
                <p>Thank you for choosing BioPath Laboratory </p>
                <div className='nameOfDoc'></div>
                <div className='positionOfDoc'></div>
              </div>
            </div>
            <div className='docPageFooter'></div>
          </div>
          <div className='doctorPage'>
            <div className='topLogo'></div>
            <div className='doctorPageTopDetails'>
              <div className='doctorPageTopDate'> December-02-2022</div>
              <div className='doctorPageTopName doctorPageTopKey'>
                NAME: <span>John Doe</span>
              </div>
              <div className='doctorPageTopAge doctorPageTopKey'>
                AGE: <span>23</span>
              </div>
              <div className='doctorPageTopSex doctorPageTopKey'>
                SEX: <span>Male</span>
              </div>
              <p>
                I wish to inform you that we have examined the above referenced
                individual referred from your office. We have made the following
                observations as documented below (done following a general
                physical examination and a mandatory laboratory investigation)
              </p>
            </div>
            <div className='parametersInvestigated'>
              <div className='parametersInvestigatedTitle'>
                PARAMETERS INVESTIGATED
              </div>
              <div className='param'>
                Body mass index is over-weight at 26.8Kg/m2
              </div>
              <div className='param'>Temperature =36.0º Celsius,</div>
              <div className='param'>
                Blood pressure is <span>HIGH</span> at 148/98mmHg.
              </div>
              <div className='param'>
                Heart Rate -90 beats per minute regular with a good volume
              </div>
              <div className='param'>
                Visual Acuity: Right Eye: 20/20 Left Eye: 20/20
              </div>
            </div>
            <div className='recommendation'>
              <div className='recommendationTitle'>RECOMMENDATION</div>
              <div className='recommendationBody'>
                <p>
                  In the light of all the results obtained, the above-named
                  person is hereby certified as medically fit.
                </p>
                <p>
                  Kindly, find attached the result of Laboratory investigations.
                </p>
                <p>Thank you for choosing BioPath Laboratory </p>
                <div className='nameOfDoc'></div>
                <div className='positionOfDoc'></div>
              </div>
            </div>
            <div className='docPageFooter'></div>
          </div>
          <div className='doctorPage'>
            <div className='topLogo'></div>
            <div className='doctorPageTopDetails'>
              <div className='doctorPageTopDate'> December-02-2022</div>
              <div className='doctorPageTopName doctorPageTopKey'>
                NAME: <span>John Doe</span>
              </div>
              <div className='doctorPageTopAge doctorPageTopKey'>
                AGE: <span>23</span>
              </div>
              <div className='doctorPageTopSex doctorPageTopKey'>
                SEX: <span>Male</span>
              </div>
              <p>
                I wish to inform you that we have examined the above referenced
                individual referred from your office. We have made the following
                observations as documented below (done following a general
                physical examination and a mandatory laboratory investigation)
              </p>
            </div>
            <div className='parametersInvestigated'>
              <div className='parametersInvestigatedTitle'>
                PARAMETERS INVESTIGATED
              </div>
              <div className='param'>
                Body mass index is over-weight at 26.8Kg/m2
              </div>
              <div className='param'>Temperature =36.0º Celsius,</div>
              <div className='param'>
                Blood pressure is <span>HIGH</span> at 148/98mmHg.
              </div>
              <div className='param'>
                Heart Rate -90 beats per minute regular with a good volume
              </div>
              <div className='param'>
                Visual Acuity: Right Eye: 20/20 Left Eye: 20/20
              </div>
            </div>
            <div className='recommendation'>
              <div className='recommendationTitle'>RECOMMENDATION</div>
              <div className='recommendationBody'>
                <p>
                  In the light of all the results obtained, the above-named
                  person is hereby certified as medically fit.
                </p>
                <p>
                  Kindly, find attached the result of Laboratory investigations.
                </p>
                <p>Thank you for choosing BioPath Laboratory </p>
                <div className='nameOfDoc'></div>
                <div className='positionOfDoc'></div>
              </div>
            </div>
            <div className='docPageFooter'></div>
          </div>
          <div className='labPage'></div>
        </div>
      ),
    },
  ])
  const contentRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      const { scrollHeight, clientHeight } = contentRef.current
      if (scrollHeight > clientHeight) {
        setPages((prevPages) => [
          ...prevPages,
          {
            header: `Page ${prevPages.length + 1}`,
            content: `Page ${prevPages.length + 1} content`,
          },
        ])
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDownload = () => {
    const pageHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight

    if (pageHeight > windowHeight) {
      // Set fixed height for printing
      document.body.style.height = `${pageHeight}px`
      window.print()
      // Reset height to auto after printing
      document.body.style.height = 'auto'
    } else {
      window.print()
    }
  }

  return (
    <div className='lab-report'>
      {pages.map((page, index) => (
        <div className='page' key={index}>
          <h1 className='header'>{page.header}</h1>
          <div
            className='content'
            ref={index === pages.length - 1 ? contentRef : null}
          >
            {page.content}
          </div>
          {index === pages.length - 1 && (
            <div className='footer'>Footer content</div>
          )}
        </div>
      ))}
      <button onClick={handleDownload}>Download/Print</button>
    </div>
  )
}

export default LabReportPage
