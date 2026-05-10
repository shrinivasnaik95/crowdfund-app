import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function MyContributions({
  setToken
}) {

  const [contributions, setContributions] =
    useState([]);

  // 🔥 LOAD CONTRIBUTIONS
  const loadContributions = async () => {

    try {

      const res = await fetch(
        "http://localhost:8081/api/contributions/my",
        {
          headers: {
            Authorization:
              "Bearer " +
              localStorage.getItem("token")
          }
        }
      );

      const data = await res.json();

      setContributions(data);

    } catch (e) {

      console.log(
        "Failed to load contributions"
      );

    }
  };

  useEffect(() => {
    loadContributions();
  }, []);

  return (

    <>
      <Navbar setToken={setToken} />

      <div className="container mt-4">

        <h2 className="fw-bold mb-4">
          My Contributions
        </h2>

        <div className="row">

          {contributions.length === 0 ? (

            <p>No contributions yet</p>

          ) : (

            contributions.map((c) => (

              <div
                className="col-md-6 mb-4"
                key={c.id}
              >

                <div
                  className="
                    card
                    shadow-sm
                    border-0
                    h-100
                  "
                  style={{
                    borderRadius: "16px"
                  }}
                >

                  {/* 🔥 IMAGE */}
                  <img
                    src={c.campaign.imageUrl}
                    alt="campaign"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px"
                    }}
                  />

                  <div className="card-body">

                    {/* TITLE */}
                    <h4 className="fw-bold">
                      {c.campaign.title}
                    </h4>

                    {/* DESCRIPTION */}
                    <p
                      className="text-muted"
                    >
                      {c.campaign.description}
                    </p>

                    {/* AMOUNT */}
                    <h5 className="fw-bold text-success">

                      ₹{c.amount}
                      {" "}
                      Contributed

                    </h5>

                    {/* STATUS */}
                    <div className="mb-2">

                      <span
                        className="
                          badge
                          bg-success
                          px-3
                          py-2
                        "
                      >
                        {c.paymentStatus}
                      </span>

                    </div>

                    {/* METHOD */}
                    <p className="mb-1">

                      <strong>
                        Method:
                      </strong>

                      {" "}
                      {c.paymentMethod}

                    </p>

                    {/* PAYMENT ID */}
                    <p className="mb-1">

                      <strong>
                        Payment ID:
                      </strong>

                      {" "}
                      {c.razorpayPaymentId}

                    </p>

                    {/* DATE */}
                    <p
                      className="
                        text-muted
                        small
                      "
                    >

                      {c.transactionTime}

                    </p>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </>
  );
}