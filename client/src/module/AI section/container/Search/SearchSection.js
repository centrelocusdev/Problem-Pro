import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { utils } from "../../../../core/utils";
import back from "../../../../assets/images/common/back-arrow.svg";
import pdf from "../../../../assets/images/dashboard/pdf.png";
import { NavLink } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { toast } from "react-toastify";
import { device } from "../../../../assets/css/mediaQueries";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";

export default function SearchSection({
  isGeneratedResult,
  updateLoading,
  loading,
}) {
  const [formLoadingStatus, setFormLoadingStatus] = useState(false);
  const [pdfLoadingStatus, setPdfLoadingStatus] = useState(false);
  const [file, setFile] = useState();
  const [selectedPdf, setSelectedPdf] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const grade = useRef();
  const subject = useRef();
  const description = useRef();
  const answerKey = useRef();
  const responseTypeA = useRef();
  const responseTypeB = useRef();
  const responseTypeC = useRef();

  // Set the worker source for PDF.js
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`;
  const handleFormSubmit = async () => {
    if (
      !grade.current.value ||
      !subject.current.value ||
      !description.current.value
    ) {
      toast("Kindly provide the requierd information by filling the form..");
      return;
    }
    const payload =
      "Grade" +
      " " +
      grade.current.value +
      "," +
      "Subject" +
      " " +
      subject.current.value +
      "," +
      description.current.value +
      "," +
      (responseTypeA.current.checked ? "question of free response" : "") +
      (responseTypeB.current.checked ? "question of MCQ type" : "") +
      (responseTypeC.current.checked ? "question of true / false type" : "") +
      "," +
      (answerKey.current.checked
        ? "and give answer key too"
        : "and do not give answers");
    updateLoading(true);
    setFormLoadingStatus(true);
    generatePayload(payload, false);
  };
  const generateFromAI = async (payload, isPdfData) => {
    const response = await utils.generateAI(payload, isPdfData);
    if (response) {
      setFormLoadingStatus(false);
      setPdfLoadingStatus(false);
      const lines = response.split("\n");
      isGeneratedResult(lines);
    }
  };
  const generatePayload = async (p, isPdfData) => {
    generateFromAI(p, isPdfData);
  };

  const handleChangeFile = async (e) => {
    setSelectedPdf(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const onTextExtract = async () => {
    if (!file) {
      toast("Please select a PDF file.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const typedarray = new Uint8Array(fileReader.result);
        const pdf = await pdfjs.getDocument({ data: typedarray }).promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join(" ");
        updateLoading(true);
        setPdfLoadingStatus(true);
        generatePayload(text, true);
        // Send the text to the Node.js server
        // sendTextToServer(text);
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
      }
    };

    fileReader.readAsArrayBuffer(file);
  };
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <Wrapper>
        <NavLink to="/dashboard">
          <div className="btn-back">
            <img src={back} alt="back button" />
            <span className="backButton">Back</span>
          </div>
        </NavLink>
        <div className="top upload-pdf">
          <div className="upload-pdf-wrapper">
            <div className="left">
            <div className="header">
            <h3>Upload Pdf</h3>
            </div>
            <div className="pdf-icon-wrapper">
              <input
                ref={hiddenFileInput}
                type="file"
                accept=".pdf"
                name="file"
                onChange={handleChangeFile}
                style={{ display: "none" }}
                required
              />
              
              <img onClick={handleClick} src={pdf} alt="upload-pdf" />
              {/* <button onClick={handleClick} className="primary-btn">
                  Upload Pdf
                </button> */}
            </div>
            <p style={{color:"white", fontSize: 12+'px'}}>{selectedPdf}</p>
            </div>
           
            
            <button onClick={onTextExtract} className="btn primary-btn">
            {pdfLoadingStatus ?
            <div className="loader-box">
              Loading..
              <ClipLoader size={20} color="#03256C" />
            </div>
              : "Generate"}
            </button>
          </div>
        </div>
        <h2 style={{alignSelf: "center"}} className="header">OR</h2>
        <div className="bottom">
          
          <div className="wrapper">
          <div className="header">
            <h3>Enter Text</h3>
          </div>
            <div className="input-label-wrapper">
              <label>Grade</label>
              <div className="input-wrapper">
                <input type="text" placeholder="Enter Grade" ref={grade} />
              </div>
            </div>
            <div className="input-label-wrapper">
              <label>Subject</label>
              <div className="input-wrapper">
                <input type="text" placeholder="Enter Subject" ref={subject} />
              </div>
            </div>
            <div className="input-label-wrapper">
              <label>Lesson Description</label>
              <div style={{ height: 120 }} className="input-wrapper">
                <textarea
                  cols="70"
                  rows="10"
                  placeholder="Enter Description"
                  ref={description}
                ></textarea>
              </div>
            </div>
            <div className="input-label-wrapper">
              <label>Question Type</label>
              <div className="radio-label-wrapper">
                <div className="radio-wrapper">
                  <input
                    id="free"
                    name="responseType"
                    type="radio"
                    defaultChecked
                    value="free"
                    ref={responseTypeA}
                  />
                  <label htmlFor="free">Free Response</label>
                </div>
                <div className="radio-wrapper">
                  <input
                    id="mcq"
                    name="responseType"
                    type="radio"
                    value="mcq"
                    ref={responseTypeB}
                  />
                  <label htmlFor="mcq">Multiple Choice</label>
                </div>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    name="responseType"
                    id="true/false"
                    value="true/false"
                    ref={responseTypeC}
                  />
                  <label htmlFor="true/false">True/False</label>
                </div>
              </div>
              <div className="radio-wrapper ans-key">
                <input
                  type="checkbox"
                  value="isAnsKey"
                  name="isAnsKey"
                  id="isAnsKey"
                  ref={answerKey}
                />
                <label htmlFor="isAnsKey">Do you want an answer key</label>
              </div>
            </div>
            {/* <div className="input-label-wrapper">
              <label>Subject</label>
              <div style={{marginTop:-10}} className="input-wrapper">
                <input type="text" placeholder="Enter Additional Prompt (Optional)" ref={subject} />
              </div>
            </div> */}
          </div>
          <button
            style={{ marginTop: 10 }}
            onClick={handleFormSubmit}
            className="btn primary-btn"
          >
            {formLoadingStatus ?
             <div className="loader-box">
                Loading..
                <ClipLoader size={20} color="#03256C" />
              </div>
             : "Generate"}
          </button>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: #5a60f1;

  border: 3px solid #fff;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .top {
    box-shadow: #03256c 0px 5px 15px; /* box-shadow: 4px 4px 4px 0px #03256C;    display:flex; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 20px;
    .upload-pdf-wrapper {
      display:flex;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      .left{
        display:flex;
        align-items:center;
        justify-content:start;
        gap:5px;
      }

      .pdf-icon-wrapper {
        p {
          color: white;
          margin-bottom: 10px;
        }
      }
      img {
        height: 30px;
        width: 30px;
        cursor: pointer;
      }
      .btn {
        font-size: 20px;
      }
    }
  }

  .bottom {
    box-shadow: #03256c 0px 5px 15px;
    /* /* box-shadow: 4px 4px 4px 0px #03256C;   */
    padding: 10px;
    border-radius: 20px;
  }
  .header {
    color: #fff;
    display: flex;
    h3 {
      font-size: 18px;
      color: #fff;
    }
    .upload-pdf {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
    }
  }
  .btn-back {
    margin-bottom: 10px;
    color: #03256c;
  }
  .btn-back img {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
  .backButton {
    color: #03256c;
    font-family: Inter;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: capitalize;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 100%;
    position: relative;
    max-width: 500px;
    margin: auto;

    .input-label-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      label {
        color: white;
      }
      .input-wrapper {
        display: flex;
        width: 90%;
        height: 61px;
        flex-direction: row;
        gap: 10px;
        border: none;
        border-radius: 20px;
        position: relative;
        background: rgba(255, 255, 255, 0.2);
        input {
          border-radius: 20px;
          border: none;
          outline: none;
          font-size: 16px;
          width: 100%;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px;
          color: white;
        }
        textarea {
          border-radius: 20px;
          border: none;
          outline: none;
          font-size: 16px;
          width: 100%;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px;
          color: white;
        }
      }
    }
    .radio-label-wrapper {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      width: 40%;
    }
    .radio-wrapper {
      display: flex;
      gap: 10px;
      padding: 6px;
    }
    .ans-key {
      padding: 10px 5px 20px 5px;
    }
  }
  @media ${device.mobileL} {
    .wrapper {
      .input-label-wrapper {
        .input-wrapper {
          input {
            font-size: 12px;
          }
        }
      }
    }
    .top {
      .upload-pdf-wrapper {
        flex-direction: column;
        gap: 10px;
        .btn {
          width: 100px;
        }
      }
    }

    .header {
      .upload-pdf {
        flex-direction: column;
        gap: 10px;

        input {
          width: 200px;
        }
      }
    }
  }
  @media ${device.mobileM} {
    .wrapper {
      .radio-label-wrapper {
        width: 80%;
      }
    }

    .header {
      .upload-pdf {
        flex-direction: column;
        gap: 10px;
        button {
          padding: 8px 20px;
          font-size: 12px;
        }
        input {
          width: 200px;
          font-size: 12px;
        }
      }
    }
  }
`;
