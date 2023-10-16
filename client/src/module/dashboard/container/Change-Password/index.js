import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import profile from "./../../../../assets/images/dashboard/Frame 3842.png";
import { auth } from "../../../../request/auth";
import { useNavigate } from "react-router-dom";
import { device } from "../../../../assets/css/mediaQueries";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const defaultImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC";
  const [fetchedImage, setFetchedImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await auth.changePassword(
      formData.currentPassword,
      formData.newPassword
    );
    if (res === true) {
      setLoading(false);
      toast.success("Password Updated Successfully!");
      navigate("/login");
    }
  };
  const onChangeHandler = async (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const getUserData = async () => {
    try {
      const userData = await auth.getUserData();
      if (userData && userData.data.data) {
        const data = userData.data.data[0];
        setFetchedImage(data.avatar);
      } else {
        setFetchedImage("");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    if (fetchedImage === "" || fetchedImage === undefined) {
      setProfileImage(defaultImage);
    } else {
      setProfileImage(fetchedImage);
    }
  }, [setFetchedImage, fetchedImage]);
  return (
    <Wrapper>
      <Link style={{ width: 500 }} className="page-heading" to="/">
        Change Password
      </Link>
      <div className="body">
        <div class="picture-update">
          <img className="profile" src={profileImage} alt="profile" />
        </div>
        <div className="wrapper">
          <form onSubmit={onSubmitHandler}>
            <div className="input-label-wrapper">
              <label>Current Password</label>
              <div className="input-wrapper">
                <input
                  onChange={onChangeHandler}
                  value={formData.currentPassword}
                  name="currentPassword"
                  type="text"
                  placeholder="Enter Current Password"
                />
              </div>
            </div>
            <div className="input-label-wrapper">
              <label>New Password</label>
              <div className="input-wrapper">
                <input
                  onChange={onChangeHandler}
                  value={formData.newPassword}
                  name="newPassword"
                  type="text"
                  placeholder="Enter New Password"
                />
              </div>
            </div>

            <button className="btn primary-btn">
              {loading ? (
                <div className="loader-box">
                  Updating..
                  <ClipLoader size={20} color="#03256C" />
                </div>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  height: 100%;

  .body {
    display: flex;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 4px 0px #03256c;
    min-height: 80vh;
    border-radius: 10px;
    padding: 30px 50px;
    gap: 20px;
    position: relative;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .picture-update {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      .profile {
        height: 200px;
        width: 200px;
        border-radius: 100%;
        /* margin-bottom:5px; */
      }
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;
      max-width: 500px;
      margin: auto;

      .input-label-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        label {
          color: #03256c;
          font-family: Inter;
          font-size: 20px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        .input-wrapper {
          display: flex;
          flex-direction: row;
          gap: 5px;
          padding: 8px;
          border-radius: 20px;
          border: 1px solid #03256c;
          position: relative;
          background: #fff;
          height: 56px;
          margin-bottom: 10px;

          input {
            border: none;
            outline: none;
            background-color: inherit;
            font-size: 18px;
            width: 100%;
          }
        }
      }
      .btn {
        margin-top: 10px;
        padding: 8px 16px;
        font-size: 16px;
      }
    }
  }
  @media ${device.laptop} {
    width: 100%;
  }

  @media ${device.mobileM} {
    .body {
      .wrapper {
        .input-label-wrapper {
          .input-wrapper {
            height: 45px;

            input {
              padding: 4px 12px;
              font-size: 12px;
            }
          }
        }
      }
    }

    .btn {
      padding: 8px 16px;
      font-size: 16px;
    }
  }
`;
