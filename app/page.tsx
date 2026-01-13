import { Snowflake } from "lucide-react";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h1>Smørski</h1>
      <Snowflake size={48} />
    </main>
  );
}
