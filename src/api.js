const BASE = "http://localhost:8081";

// 🔐 COMMON AUTH HEADERS
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token")
});


// =======================
// 🔥 USER APIs
// =======================

// REGISTER
export const registerUser = async (user) => {
  const res = await fetch(`${BASE}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    throw new Error("Register failed");
  }

  return res.text();
};


// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  // ✅ expected: { token, userId }
  return res.json();
};


// =======================
// 🔥 CAMPAIGN APIs
// =======================

// GET ALL CAMPAIGNS
export const getCampaigns = async () => {
  const res = await fetch(`${BASE}/api/campaigns`);

  if (!res.ok) {
    throw new Error("Failed to load campaigns");
  }

  return res.json();
};


// CREATE CAMPAIGN (JWT)
export const createCampaign = async (data) => {
  const res = await fetch(`${BASE}/api/campaigns`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Create campaign failed");
  }

  return res.json();
};


// =======================
// 🔥 CONTRIBUTION APIs
// =======================

// CONTRIBUTE (JWT BASED)
export const contribute = async (
  campaignId,
  amount,
  paymentData
) => {

  const res = await fetch(
    `http://localhost:8081/api/contributions/${campaignId}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization:
          "Bearer " +
          localStorage.getItem("token")
      },

      body: JSON.stringify({

        amount: amount,

        razorpayPaymentId:
          paymentData.razorpay_payment_id,

        razorpayOrderId:
          paymentData.razorpay_order_id,

        paymentStatus: "SUCCESS",

        paymentMethod: "RAZORPAY",

        transactionTime:
          new Date().toLocaleString()

      })
    }
  );

  return res.json();
};


// GET MY CONTRIBUTIONS (JWT BASED)
export const getMyContributions = async () => {
  const res = await fetch(`${BASE}/api/contributions/my`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  if (!res.ok) throw new Error("Failed to load contributions");

  return res.json();
};

export const withdrawFunds = async (campaignId, amount) => {

  const res = await fetch(
    `http://localhost:8081/api/campaigns/withdraw/${campaignId}?amount=${amount}`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("token")
      }
    }
  );

  if (!res.ok) {
    throw new Error("Withdraw failed");
  }

  return res.json();
};