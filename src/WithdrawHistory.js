import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function WithdrawHistory({ setToken }) {

  const [withdraws, setWithdraws] = useState([]);

  // 🔥 LOAD HISTORY
  const loadHistory = async () => {

    try {

      const res = await fetch(
        "http://localhost:8081/api/withdraws/my",
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token")
          }
        }
      );

      const data = await res.json();

      setWithdraws(data);

    } catch (e) {

      console.log("Failed to load history");

    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (

    <>
      <Navbar setToken={setToken} />

      <div className="container mt-4">

        <div className="card shadow p-4">

          <h3 className="mb-4">
            Withdraw History
          </h3>

          {withdraws.length === 0 ? (

            <p>No withdrawals yet</p>

          ) : (

            <table className="table">

              <thead>

                <tr>
                  <th>Campaign</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {withdraws.map((w) => (

                  <tr key={w.id}>

                    <td>
                      {w.campaign.title}
                    </td>

                    <td>
                      ₹{w.amount}
                    </td>

                    <td>
                      {w.date.replace("T", " ")}
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