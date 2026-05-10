import { useState } from "react";
import { createCampaign } from "./api";

export default function CreateCampaign({ refresh }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  

  const handleCreate = async () => {
    // 🔥 validation
    if (!title.trim() || !desc.trim() || !target) {
      return alert("All fields required");
    }

    const targetAmount = Number(target);

    if (!targetAmount || targetAmount <= 0) {
      return alert("Enter valid target amount");
    }

    try {
      setLoading(true);

      await createCampaign({
        title,
        description: desc,
        targetAmount:target,
        imageUrl: image
      });

      alert("Campaign Created! 🎉");

      // 🔥 clear form
      setTitle("");
      setDesc("");
      setTarget("");

      // 🔥 refresh dashboard
      refresh();

    } catch (e) {
      console.error(e);
      alert("Failed to create campaign ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow p-3">
      <h5>Create Campaign</h5>

      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
  className="form-control mb-2"
  placeholder="Image URL"
  onChange={(e) => setImage(e.target.value)}
/>

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Target Amount"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />

      <button
        className="btn btn-primary w-100"
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}