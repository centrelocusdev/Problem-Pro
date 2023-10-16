import React from 'react'
import { styled } from 'styled-components'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import driver from "./../../../../../assets/images/homepage/driver.png"
import phone from "./../../../../../assets/images/homepage/Icon (1).png"



export default function FAQ() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
    <Wrapper>
      <div>
        <div className="left">
          <div className='tool'>
          <div className="sub-haeding">
            <span></span>
             <p>FAQ</p>
            </div>
          </div>

          <div>
            <h1>Frequently Asked Questions</h1>
          </div>

          <div>
          <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
   
          <Typography sx={{ color: 'black' }}>How can I make an online truck booking?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='accordian-body'>
          Booking your truck with ReeRoute is very simple. Just add pickup and destination location. Then, select the weight of goods, type, and size of the truck.
Our network of truckers will provide you the best prices with highest reliability.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ color: 'black' }}>
          Can I place a booking with multi-point pick up and drop?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='accordian-body'>
          Booking your truck with ReeRoute is very simple. Just add pickup and destination location. Then, select the weight of goods, type, and size of the truck.
Our network of truckers will provide you the best prices with highest reliability.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
     
          <Typography sx={{ color: 'black' }}>
          Can I cancel my booking? Is there any cancellation fee?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='accordian-body'>
          Booking your truck with ReeRoute is very simple. Just add pickup and destination location. Then, select the weight of goods, type, and size of the truck.
Our network of truckers will provide you the best prices with highest reliability.
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
    </div>

        </div>
        <div className="right">
          <img className='main-img' src={driver}/>
          <div className='absolute'>
          <div className='tool'>
          <div className="sub-haeding">
            <span></span>
             <p>Let's Talk</p>
            </div>
          </div>
          <p className='heading'>You need any help? get free consultation</p>
          <div className='phone'>
            <img src={phone}/>
            <div>
              <p>Have Any Questions </p>
              <p>(00) 112 365 489 </p>
            </div>
          </div>
          <button>Conntact Us</button>

          </div>
        </div>
      </div>

    </Wrapper>
    </>
  )
}

const Wrapper=styled.div`
width: 100vw;
&>div{
  max-width: 1196px;
  margin: auto;
  position: relative;
  display: flex;
  gap: 4vw;
  .left{
    width: 50%;
    .tool{
      display: flex;
      margin-bottom: 20px;
      .sub-haeding{
            position: relative;
            display: flex;
            gap: 3px;
            background-color: #E8E8E8;
            width: max-content;
            padding-right: 10px;
            span{
                height: 100%;
                width: 5px;
                display: block;
                background: linear-gradient(94.06deg, #FFB629 -1.21%, #FFDA56 58.66%, #FFD7A6 116.84%);
            }
            p{
                font-size: 12px;
                padding: 5px 0;

            }
        }
    }
  }
  .right{
    width: 50%;
    position: relative;
    height: 100%;
    


    .main-img{
      max-width: 100%;
      float: right;
      padding: 30px 50px;
    }
    .absolute{
      display: flex;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
      padding: 20px ;
      background-color: #2A4F6D;
      max-width: 270px;
      gap: 20px;
      .heading{
        color: white;
      }
      .phone{
        display: flex;
        gap: 12px;
        align-items: center;
        div{
          color:white;
          p{
            font-size: 12px;
          }
        }
      }
      button{
        padding: 5px 0;
        border: none;
        outline: none;
        background: linear-gradient(94.06deg, #FFB629 -1.21%, #FFDA56 58.66%, #FFD7A6 116.84%);
      }
    }





    .tool{
      display: flex;
      color: white;
      .sub-haeding{
            position: relative;
            display: flex;
            gap: 3px;
            background-color: black;
            width: max-content;
            padding-right: 10px;
            span{
                height: 100%;
                width: 5px;
                display: block;
                background: linear-gradient(94.06deg, #FFB629 -1.21%, #FFDA56 58.66%, #FFD7A6 116.84%);
            }
            p{
                font-size: 12px;
                padding: 5px 0;

            }
        }
    }
  }
}



`
