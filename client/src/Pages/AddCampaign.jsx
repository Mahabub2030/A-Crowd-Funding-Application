import React from "react";

import Footer from "../component/Footer";
import { Helmet } from "react-helmet-async";
import AddNewCampaign from "../component/AddNewCampaign";
import Navbar from "../component/Navbar";

const AddCampaign = () => {
  return (
    <div>
      <Helmet>
        <title>Add Campaign</title>
        <meta
          name="description"
          content="Join the community and create your account."
        />
        <meta
          name="keywords"
          content="registration, signup, community, IDEAIGNITE"
        />
      </Helmet>
      <Navbar />
      <div className="mt-4">
        <AddNewCampaign />
      </div>
      <Footer />
    </div>
  );
};

export default AddCampaign;
