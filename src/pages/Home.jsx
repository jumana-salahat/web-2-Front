import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Stats from "../components/home/Stats";

import api from "../api";

export default function Home() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    api
      .get("/home")
      .then((res) => {

        setStats(res.data.stats);

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div className="app">

      <Navbar />

      <Hero />

      <Stats stats={stats} />

      <Features />

      <Footer />

    </div>
  );
}