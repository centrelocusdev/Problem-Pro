import React from "react";
import { styled } from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { device } from "../../../../../assets/css/mediaQueries";

export default function AskedQuestions() {
  return (
    <Wrapper>
      <h5 className="sub-title">Frequently Asked Questions</h5>
      <div className="main" id="support">
        <div className="content">
          <div className="accordian">
            <Accordion
              sx={{ background: "#D9DAEC;", padding: "5px 15px 5px 31px" }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ height: "40px", width: "40px", color: "black" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "1.5em", color: "black", fontWeight: "500" }}
                >
                  What is ProblemPro?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1em" }}>
                  Problem Pro is an innovative web platform that uses artificial
                  intelligence to provide personalized practice materials for
                  students. You can upload your student's homework assignments,
                  and our platform generates similar problems with step-by-step
                  solutions.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="accordian">
            <Accordion
              sx={{ background: "#D9DAEC;", padding: "5px 15px 5px 31px" }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ height: "40px", width: "40px", color: "black" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "1.5em", color: "black", fontWeight: "500" }}
                >
                  How does ProblemPro work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1em" }}>
                  It's simple! Just upload your student's homework in PDF
                  format. Our AI algorithm analyzes the content and generates a
                  selection of similar problems. You can then access these
                  examples and their solutions to support your student's
                  learning.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="accordian">
            <Accordion
              sx={{ background: "#D9DAEC;", padding: "5px 15px 5px 31px" }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ height: "40px", width: "40px", color: "black" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "1.5em", color: "black", fontWeight: "500" }}
                >
                  Is my data safe and private?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1em" }}>
                  Yes, we take data security seriously. Your uploaded
                  assignments and personal information are kept confidential and
                  secure. We prioritize the privacy of our users.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="accordian">
            <Accordion
              sx={{ background: "#D9DAEC;", padding: "5px 15px 5px 31px" }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ height: "40px", width: "40px", color: "black" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{ fontSize: "1.5em", color: "black", fontWeight: "500" }}
                >
                  Who can use ProblemPro?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1em" }}>
                  ProblemPro is designed for tutors, parents, and educators who
                  want to provide targeted practice materials to students. It's
                  suitable for a wide range of grade levels and subjects.
                </Typography>
              </AccordionDetails>
              
            </Accordion>
          </div>
            <div className="accordian">
              <Accordion
                sx={{ background: "#D9DAEC;", padding: "5px 15px 5px 31px" }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ height: "40px", width: "40px", color: "black" }}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    sx={{
                      fontSize: "1.5em",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    What subjects and grade levels does ProblemPro support?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: "1em" }}>
                    Our platform is flexible and can support a variety of
                    subjects and grade levels. Whether you're teaching math,
                    science, language arts, or other subjects, ProblemPro can be
                    a valuable resource.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="accordian">
              <Accordion
                sx={{ background: "#D9DAEC;", padding: "5px 15px 5px 31px" }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ height: "40px", width: "40px", color: "black" }}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    sx={{
                      fontSize: "1.5em",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    How can I provide feedback or report issues?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: "1em" }}>
                    We welcome your feedback! You can easily provide feedback
                    within the platform. We appreciate your input as we
                    continuously work to improve our service.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="accordian">
              <Accordion
                sx={{ background: "#D9DAEC;", padding: "5px 15px 5px 31px" }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ height: "40px", width: "40px", color: "black" }}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    sx={{
                      fontSize: "1.5em",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    Can students use ProblemPro independently?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: "1em" }}>
                    Absolutely! Students can use ProblemPro independently by
                    uploading their own homework assignments and accessing
                    similar problems for additional practice.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  width: 100vw;
  position: relative;
  padding-bottom: 92px;
  padding: 92px 16px;

  .main {
    max-width: 1440px;
    margin: auto;
    .content {
      display: flex;
      flex-direction: column;
      gap: 25px;
      .accordian {
        max-width: 1024px;
        margin: auto;
      }
    }
  }

  .sub-title {
    max-width: fit-content;
    font-family: "Judson", serif;
    font-size: 48px;
    color: #03256c;
    text-align: center;
    margin: auto;
    padding-bottom: 0;
    margin-bottom: 92px;
    width: max-content;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: #03256c;
    }
  }
  .MuiPaper-elevation {
    border-radius: 24px !important;
  }
  @media ${device.mobileL} {
    padding: 49px 16px;
    .sub-title {
      font-size: 22px;
      padding-bottom: 2px;
      margin-bottom: 33px;
    }
    .main {
      font-size: 12px;
    }
  }
`;
