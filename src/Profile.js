import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Profile({setToken}) {

  const [form, setForm] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: ""
  });

  // 🔥 LOAD PROFILE
  const loadProfile = async () => {

    try {

      const res = await fetch(
        "http://localhost:8081/api/users/profile",
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token")
          }
        }
      );

      const data = await res.json();

      setForm({
        accountHolderName:
          data.accountHolderName || "",

        bankName:
          data.bankName || "",

        accountNumber:
          data.accountNumber || "",

        ifscCode:
          data.ifscCode || "",

        upiId:
          data.upiId || ""
      });

    } catch (e) {

      console.log("Profile load failed");

    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // 🔥 SAVE / UPDATE PROFILE
  const handleSave = async () => {

    try {

      const res = await fetch(
        "http://localhost:8081/api/users/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify(form)
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      alert("Profile Updated Successfully ✅");

      loadProfile();

    } catch (e) {

      alert("Update Failed ❌");

    }
  };

  return (
    <>
    <Navbar setToken={setToken} />

    <div className="container mt-4">
      

      <div className="card shadow p-4">

        <h3 className="mb-4">
          My Profile
        </h3>

        <input
          className="form-control mb-3"
          placeholder="Account Holder Name"
          name="accountHolderName"
          value={form.accountHolderName}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Bank Name"
          name="bankName"
          value={form.bankName}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Account Number"
          name="accountNumber"
          value={form.accountNumber}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="IFSC Code"
          name="ifscCode"
          value={form.ifscCode}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="UPI ID"
          name="upiId"
          value={form.upiId}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          onClick={handleSave}
        >
          Update Profile
        </button>

      </div>

    </div>
    </>
  );
}