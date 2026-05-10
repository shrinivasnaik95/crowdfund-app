import { useEffect, useState } from "react";
import { getCampaigns, contribute,withdrawFunds } from "./api";
import CreateCampaign from "./CreateCampaign";
import Navbar from "./Navbar";

export default function Dashboard({ setToken }) {
  const [campaigns, setCampaigns] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [withdrawAmounts, setWithdrawAmounts] = useState({});
  const userId = localStorage.getItem("userId");

  // 🔥 LOAD CAMPAIGNS
  const loadCampaigns = async () => {
    if (window.location.hostname !== "localhost") {

  setCampaigns([
    {
  id: 1,
  title: "Medical Emergency Support",
  description:
    "Help raise funds for urgent surgery and hospital expenses.",
  targetAmount: 50000,
  collectedAmount: 32500,
  status: "ACTIVE",
  withdrawnAmount: 5000,

  owner: {
    id: 999
  },

  imageUrl:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
},
    {{
  id: 2,
  title: "Education For Children",
  description:
    "Support underprivileged students with school supplies.",
  targetAmount: 75000,
  collectedAmount: 61000,
  status: "ACTIVE",
  withdrawnAmount: 12000,

  owner: {
    id: 999
  },

  imageUrl:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7"
}
  ]);

  return;
}
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (e) {
      console.error("Error loading campaigns", e);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  // 🔥 RAZORPAY FLOW
  const handleContribute = async (campaignId) => {
    let amount = Number(amounts[campaignId]);

    if (!amount || amount <= 0) {
      return alert("Enter valid amount");
    }

    try {
      // 🔥 STEP 1: CREATE ORDER
      const res = await fetch(
        `http://localhost:8081/api/payment/create-order?amount=${amount}`,
        { method: "POST" }
      );

      const order = await res.json();

      // 🔥 STEP 2: OPEN RAZORPAY
      const options = {
  key: "rzp_test_SlNEDrOZznWCTK",  // correct key
  amount: order.amount,
  currency: "INR",
  name: "CrowdFund",
  description: "Contribution",

  order_id: order.id,  // 🔥 MUST BE PRESENT

  handler: async function (response) {

  console.log("FULL RESPONSE:", response);

  const verifyRes = await fetch("http://localhost:8081/api/payment/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(response)
  });

  if (verifyRes.ok) {

    // 🔥 ONLY SAVE AFTER VERIFY SUCCESS
    await contribute(
  campaignId,
  amount,
  response
);

    alert("Payment + Verification Successful 🎉");
    loadCampaigns();

  } else {
    alert("Verification failed ❌");
  }
}
};

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
    }
  };

  return (
    <>
      <Navbar setToken={setToken} />

      <div className="container mt-4">

        {/* CREATE CAMPAIGN */}
        {userId && (
          <div className="mb-4">
            <CreateCampaign refresh={loadCampaigns} />
          </div>
        )}

        <div className="row">
          {campaigns.map((c) => {

            const progress = Math.min(
              (c.collectedAmount / c.targetAmount) * 100,
              100
            );
            const availableBalance =
  c.collectedAmount - c.withdrawnAmount;

            return (
              <div className="col-md-4 mb-4" key={c.id}>
                <div className="card shadow-sm h-100">

                  <div className="card-body">

                    {/* 🔥 IMAGE */}
                    {c.imageUrl && (
                      <img
                        src={c.imageUrl}
                        alt="campaign"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "10px"
                        }}
                      />
                    )}

                    <h5 className="card-title">{c.title}</h5>

                    <p className="card-text text-muted">
                      {c.description}
                    </p>

                    {/* AMOUNT */}
                    <p className="fw-bold mb-1">
  Raised: ₹{c.collectedAmount} / ₹{c.targetAmount}
</p>

<p className="text-danger mb-1">
  Withdrawn: ₹{c.withdrawnAmount}
</p>

<p className="text-success">
  Available: ₹{availableBalance}
</p>

                    {/* 🔥 PROGRESS BAR */}
                    <div className="progress mb-3">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                      >
                        {Math.floor(progress)}%
                      </div>
                    </div>

                    {/* 🔥 BUTTON LOGIC */}
                    {c.status === "COMPLETED" ? (

                      <button className="btn btn-secondary w-100" disabled>
                        Completed ✅
                      </button>

                    ) : userId && Number(userId) !== c.owner.id ? (

                      <>
                        <input
                          className="form-control mb-2"
                          type="number"
                          placeholder="Enter amount"
                          value={amounts[c.id] || ""}
                          onChange={(e) =>
                            setAmounts({
                              ...amounts,
                              [c.id]: e.target.value
                            })
                          }
                        />

                        <button
                          className="btn btn-success w-100"
                          onClick={() => handleContribute(c.id)}
                        >
                          Contribute
                        </button>
                      </>

                    ) : (

                      <>
  <button className="btn btn-secondary w-100 mb-2" disabled>
    Your Campaign
  </button>

  {availableBalance > 0 && (

    <>
      <input
        className="form-control mb-2"
        type="number"
        placeholder="Withdraw amount"
        value={withdrawAmounts[c.id] || ""}
        onChange={(e) =>
          setWithdrawAmounts({
            ...withdrawAmounts,
            [c.id]: e.target.value
          })
        }
      />

      <button
        className="btn btn-warning w-100"
        onClick={async () => {

          try {

            await withdrawFunds(
              c.id,
              withdrawAmounts[c.id]
            );

            alert("Withdrawal Successful 💸");

            loadCampaigns();

          } catch (e) {

            alert("Withdraw Failed ❌");

          }
        }}
      >
        Withdraw Money
      </button>
    </>

  )}
</>

                    )}

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
