import { Card } from "react-bootstrap";
import { Navigation } from "../../components/Navigation";
import { Aside } from "../../components/Aside";
import { Hero } from "../../components/Hero";

export const Dashboard = () => {
  return (
    <Card style={{ width: "100vw", height: "100vh" }}>
      <Navigation />
      <div style={{ display: "flex" }}>
        <Aside />
        <Hero />
      </div>
    </Card>
  );
};
