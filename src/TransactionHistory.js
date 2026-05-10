import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function TransactionHistory({
  setToken
}) {

  const [transactions, setTransactions] =
    useState([]);

  // 🔥 LOAD TRANSACTIONS
  const loadTransactions = async () => {

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

      setTransactions(data);

    } catch (e) {

      console.log(
        "Failed to load transactions"
      );

    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (

    <>
      <Navbar setToken={setToken} />

      <div className="container mt-4">

        <div className="card shadow p-4">

          <h3 className="mb-4">
            Transaction History
          </h3>

          {transactions.length === 0 ? (

            <p>
              No transactions found
            </p>

          ) : (

            <table className="table table-bordered">

              <thead>

                <tr>

                  <th>Campaign</th>

                  <th>Amount</th>

                  <th>Payment ID</th>

                  <th>Status</th>

                  <th>Method</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {transactions.map((t) => (

                  <tr key={t.id}>

                    <td>
                      {t.campaign.title}
                    </td>

                    <td>
                      ₹{t.amount}
                    </td>

                    <td>
                      {t.razorpayPaymentId}
                    </td>

                    <td>

                      <span
                        className="
                          badge bg-success
                        "
                      >
                        {t.paymentStatus}
                      </span>

                    </td>

                    <td>
                      {t.paymentMethod}
                    </td>

                    <td>
                      {t.transactionTime}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>
    </>
  );
}