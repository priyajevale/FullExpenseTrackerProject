import "./profile.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
const Profile = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");

  const nameRef = useRef();
  const photoRef = useRef();

  const idToken = useSelector((state) => state.auth.idToken);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredPhotoUrl = photoRef.current.value;

    const urlP =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyApHk-o7Pci_qpspQyUuyTvTcbU4OTSuIk";
    try {
      const res = await fetch(urlP, {
        method: "POST",
        body: JSON.stringify({
          idToken,
          displayName: enteredName,
          photoUrl: enteredPhotoUrl,
        }),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        console.log("User profile updated successfully", data);
      } else {
        console.error("Error updating user profile", data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyApHk-o7Pci_qpspQyUuyTvTcbU4OTSuIk`, // Updated URL
          {
            method: "POST",
            body: JSON.stringify({
              idToken,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error?.message || "Failed to fetch user data");
        }
  
        const data = await response.json();
        const userData = data.users[0];
  
        setName(userData.displayName || "");
        setPhoto(userData.photoUrl || "");
        setEmail(userData.email || "");
      } catch (err) {
        alert(err.message);
      }
    };
  
    fetchUserData();
  }, [idToken]);
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(
//           `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyApHk-o7Pci_qpspQyUuyTvTcbU4OTSuIk`,
//           {
//             method: "POST",
//             body: JSON.stringify({
//               idToken,
//             }),
//             headers: {
//               "Content-type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.error?.message || "Failed to fetch user data");
//         }

//         const data = await response.json();
//         const userData = data.users[0];

//         setName(userData.displayName || "");
//         setPhoto(userData.photoUrl || "");
//         setEmail(userData.email || "");
//       } catch (err) {
//         alert(err.message);
//       }
//     };

//     fetchUserData();
//   }, [idToken]);

  const verifyEmail = async () => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyApHk-o7Pci_qpspQyUuyTvTcbU4OTSuIk"
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken,
        }),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        console.log("Verification email sent successfully", data);
      } else {
        console.error("Error sendinf email", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>Contact Details</h2>
      <form onSubmit={submitHandler} className="form">
        <div className="label">
          <label htmlFor="name">Full Name</label>
          <input type="text" ref={nameRef} />
        </div>
        <div className="label">
          <label htmlFor="name">Profile Photo URL</label>
          <input type="text" ref={photoRef} />
        </div>

        <button type="submit" className="updateBtn">
          Update
        </button>
      </form>

      <section className="details">
        <ul>
          <li className="name">{name}</li>
          <li className="profImg">
            <img src={photo} alt="profile" />
          </li>
          <li>{email}</li>
          <Button onClick={verifyEmail} variant="link">
            {" "}
            Verify email
          </Button>
        </ul>
      </section>
    </>
  );
};

export default Profile;