import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import MyCampaignCard from '../component/MyCampaignCard';
import { Helmet } from "react-helmet-async";

const MyCampaign = () => {
    return (
        <div>
            <Helmet>
        <title>My Campaign</title>
        <meta
          name="description"
          content="Join the community and create your account."
        />
        <meta
          name="keywords"
          content="registration, signup, community, IDEAIGNITE"
        />
      </Helmet>
            <Navbar/>
            <MyCampaignCard></MyCampaignCard>
            <Footer/>
        </div>
    );
};

export default MyCampaign;