import { useEffect, useState } from "react";

type Shoe = {
  id: string;
  name: string;
  brand: string;
  model: string;
  status: string;
  rating?: string;
  colorway?: string;
  price?: string;
  source?: string;
  photo?: string;
  notes?: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRG-XfiDHCt78oU3h1r-LJm0uQDxb8s6IqfTsf_-85QLl8GpGfKL2TpiLas7yYuv3O0-ursuWAjBDJu/pub?output=csv";

const statusColors: Record<string, string> = {
  Storage: "#52525b", // Gray
  Casual: "#2563eb",  // Blue
  Indoor: "#16a34a",  // Green
  Outdoor: "#ea580c", // Orange
  Yardwork: "#92400e", // Brown
  Retired: "#7c3aed", // Purple
};

export default function App() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const total = shoes.length;

  const storage = shoes.filter(
  (s) => s.status === "Storage"
).length;

const casual = shoes.filter(
  (s) => s.status === "Casual"
).length;

const indoor = shoes.filter(
  (s) => s.status === "Indoor"
).length;

const outdoor = shoes.filter(
  (s) => s.status === "Outdoor"
).length;

const yardwork = shoes.filter(
  (s) => s.status === "Yardwork"
).length;

const retired = shoes.filter(
  (s) => s.status === "Retired"
).length;

  useEffect(() => {
  async function loadData() {
    const res = await fetch(SHEET_URL);
    const text = await res.text();

    const rows = text.trim().split("\n").slice(1);

    const parsed = rows
      .map((row) => {
        const columns = row.split(",");

        if (columns.length < 5) return null;

     const [
  id,
  name,
  brand,
  source,
  price,
  status,
  rating,
  colorway,
  _onePlusPairs,
  photo,
  notes
] = columns;

   return {
  id: id?.trim(),
  name: name?.trim(),
  brand: brand?.trim(),
  source: source?.trim(),
  price: price?.trim(),
  status: status?.trim(),
  rating: rating?.trim(),
  colorway: colorway?.trim(),
  photo: photo?.trim(),
  notes: notes?.trim(),
};
      })
      .filter(Boolean);

    setShoes(parsed as Shoe[]);
  }

  loadData();
}, []);

const filteredShoes = shoes.filter((shoe) => {
  const query = search.toLowerCase();

  const matchesSearch =
    shoe.name?.toLowerCase().includes(query) ||
    shoe.brand?.toLowerCase().includes(query) ||
    shoe.status?.toLowerCase().includes(query);

  const matchesStatus =
    statusFilter === "All" || shoe.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
  <main
    style={{
      minHeight: "100vh",
      background: "#09090b",
      color: "white",
      padding: "2rem",
      fontFamily: "system-ui, sans-serif",
    }}
  >
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
        🏀 Meow Footwear
      </h1>

      <p style={{ color: "#a1a1aa", marginBottom: "2rem" }}>
        Tracking every pair. Every court. Every wear.
      </p>

     {/* STATS */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  }}
>
  <StatCard
    title="Total"
    value={String(total)}
    active={statusFilter === "All"}
    onClick={() => setStatusFilter("All")}
  />

  <StatCard
    title="Storage"
    value={String(storage)}
    active={statusFilter === "Storage"}
    onClick={() => setStatusFilter("Storage")}
  />

  <StatCard
    title="Casual"
    value={String(casual)}
    active={statusFilter === "Casual"}
    onClick={() => setStatusFilter("Casual")}
  />

  <StatCard
    title="Indoor"
    value={String(indoor)}
    active={statusFilter === "Indoor"}
    onClick={() => setStatusFilter("Indoor")}
  />

  <StatCard
    title="Outdoor"
    value={String(outdoor)}
    active={statusFilter === "Outdoor"}
    onClick={() => setStatusFilter("Outdoor")}
  />

  <StatCard
    title="Yardwork"
    value={String(yardwork)}
    active={statusFilter === "Yardwork"}
    onClick={() => setStatusFilter("Yardwork")}
  />

  <StatCard
    title="Retired"
    value={String(retired)}
    active={statusFilter === "Retired"}
    onClick={() => setStatusFilter("Retired")}
  />
</div>

      {/* SEARCH */}
      <input
        placeholder="Search shoes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "12px",
          border: "none",
          background: "#18181b",
          color: "white",
          marginBottom: "2rem",
        }}
      />

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {filteredShoes.map((shoe) => (
          <div
            key={shoe.id}
            onClick={() => setSelectedShoe(shoe)}
            style={{
              background: "#18181b",
              padding: "1rem",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              cursor: "pointer",
            }}
          >
            {shoe.photo && (
              <img
                src={shoe.photo}
                alt={shoe.name}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            )}

            {/* NAME (PRIMARY) */}
            <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>
              {shoe.name}
            </div>

            {/* BRAND */}
            <div style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>
              {shoe.brand}
            </div>

            {/* STATUS */}
           <div
  style={{
    display: "inline-block",
    padding: "0.35rem 0.75rem",
    borderRadius: "999px",
    background: statusColors[shoe.status] ?? "#27272a",
    fontSize: "0.85rem",
    fontWeight: 600,
    width: "fit-content",
  }}
>
  {shoe.status}
</div>

            {/* META */}
            <div style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>
              {shoe.colorway && <div>{shoe.colorway}</div>}
              {shoe.price && <div>{shoe.price}</div>}
            </div>

            {shoe.rating && (
              <div style={{ color: "#fbbf24" }}>★ {shoe.rating}</div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* MODAL */}
    {selectedShoe && (
      <div
        onClick={() => setSelectedShoe(null)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          zIndex: 1000,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#18181b",
            borderRadius: "16px",
            padding: "2rem",
            maxWidth: "500px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {selectedShoe.photo && (
            <img
              src={selectedShoe.photo}
              alt={selectedShoe.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          )}

          <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            {selectedShoe.name}
          </div>

          <div style={{ color: "#a1a1aa" }}>
            {selectedShoe.brand}
          </div>

<div
  style={{
    display: "inline-block",
    padding: "0.3rem 0.6rem",
    borderRadius: "999px",
    background:
      statusColors[selectedShoe.status] ?? "#27272a",
    width: "fit-content",
    fontSize: "0.8rem",
  }}
>
  {selectedShoe.status}
</div>

          {selectedShoe.colorway && <div>{selectedShoe.colorway}</div>}
          {selectedShoe.price && <div>{selectedShoe.price}</div>}
          {selectedShoe.rating && (
            <div style={{ color: "#fbbf24" }}>
              ★ {selectedShoe.rating}
            </div>
          )}
          {selectedShoe.notes && (
            <div style={{ color: "#a1a1aa" }}>
              {selectedShoe.notes}
            </div>
          )}

          <button
            onClick={() => setSelectedShoe(null)}
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              borderRadius: "10px",
              border: "none",
              background: "#27272a",
              color: "white",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </main>
);
}

/* STAT CARD */
function StatCard({
  title,
  value,
  onClick,
  active,
}: {
  title: string;
  value: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? "#27272a" : "#18181b",
        padding: "1.5rem",
        borderRadius: "16px",
        cursor: onClick ? "pointer" : "default",
        border: active ? "1px solid #3f3f46" : "1px solid transparent",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ color: "#a1a1aa", marginBottom: "0.5rem" }}>
        {title}
      </div>

      <div style={{ fontSize: "2rem", fontWeight: 700 }}>
        {value}
      </div>
    </div>
  );
}