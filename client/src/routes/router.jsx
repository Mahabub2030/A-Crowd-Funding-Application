import { createBrowserRouter } from "react-router-dom";
import Login from "../component/Login";
import Register from "../component/Register";
import AddCampaign from "../Pages/AddCampaign";
import AllCampaigns from "../Pages/AllCampaigns";
import Auth from "../Pages/Auth";
import DetailsPage from "../Pages/DetailsPage";
import Home from "../Pages/Home";
import MyCampaign from "../Pages/MyCampaign";
import MyDonation from "../Pages/MyDonation";
import NotFoundPage from "../Pages/NotFoundPage";
import Update from "../Pages/Update";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'campaigns',
        element: <AllCampaigns />,
        loader: () => fetch('https://server-pied-omega.vercel.app/campaign')
    },
    {
        path: 'auth',
        element: <Auth />, // Parent route for auth
        children: [
            {
                path: 'login', 
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path:'add-campaign',
        element:<AddCampaign/>
    },
    {
        path:'my-campaigns',
        element:<MyCampaign/>,
        loader: () => fetch('https://server-pied-omega.vercel.app/campaign')
    },
    {
        path:'my-donations',
        element:<MyDonation/>
    },
    {
        path: 'campaign/:id',
        element: <DetailsPage />,
        loader: ({ params }) => fetch(`https://server-pied-omega.vercel.app/campaign/${params.id}`)
    },
    {
        path:'my-campaigns/updateCampaign/:id',
        element:<Update/>,
        loader: (params) => fetch(`https://server-pied-omega.vercel.app/campaign/${params.id}`)
    },
    {
        path:'*',
        element:<NotFoundPage/>
    }
    
]);

export default router;
