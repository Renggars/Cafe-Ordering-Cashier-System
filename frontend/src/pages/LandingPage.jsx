import Favorit from "@/components/landing/Favorit";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import LiveMusic from "@/components/landing/LiveMusic";
import Navbar from "@/components/Navbar";
import OurValues from "@/components/landing/OurValues";
import HangoutView from "@/components/landing/View";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Favorit />
      <OurValues />
      <LiveMusic />
      <HangoutView />
      <Footer />
    </div>
  );
};

export default LandingPage;
