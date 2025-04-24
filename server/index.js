const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x9t7sgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1fell.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// Middleware
app.use(cors());
app.use(express.json());

async function Main(){
    try {
        

        const campaignCollection = client.db('campaignDB').collection('campaign'); // Correct collection reference

        const donationCollection = client.db('donationDB').collection('donation');


        app.get("/donation/:email", async (req, res) => {
          const email = req.params.email; 
          try {
           
            const donations = await donationCollection.find({ email: email }).toArray();
            res.send(donations); 
          } catch (error) {
            console.error("Error fetching donations:", error);
            res.status(500).send({ success: false, message: "Failed to fetch donations" });
          }
        });
        
        
  
  
  
  
        // POST endpoint to save donation data
        app.post("/donation", async (req, res) => {
          const newDonation = req.body;
    
          try {
            const result = await donationCollection.insertOne(newDonation);
            res.send({ success: true, message: "Donation saved successfully!", data: result });
          } catch (error) {
            console.error("Error saving donation:", error);
            res.send({ success: false, message: "Failed to save donation." });
          }
        });


        app.get('/campaign/:id', async (req, res) => {
          try {
              const { id } = req.params;
              const campaign = await campaignCollection.findOne({ _id: new ObjectId(id) });
              if (!campaign) {
                  return res.status(404).send({ error: "Campaign not found" });
              }
              res.status(200).send(campaign);
          } catch (error) {
              res.status(500).send({ error: "Error retrieving campaign" });
          }
      });


      app.put('/campaign/:id', async (req, res) => {
        const id = req.params.id;
        console.log("Request ID:", id); 
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const updateCampaign = req.body;
      
        const campaign = {
          $set: {
            title: updateCampaign.title,
            description: updateCampaign.description,
            minDonation: updateCampaign.minDonation,
            deadline: updateCampaign.deadline,
            type: updateCampaign.type,
          },
        };
      
        try {
          const result = await campaignCollection.updateOne(filter, campaign, option);
          if (result.matchedCount === 0) {
            return res.status(404).send({ message: "Campaign not found" });
          }
          res.send(result);
        } catch (error) {
          res.status(500).send({ error: "Failed to update campaign", details: error });
        }
      });


      app.get("/runningCampaigns", async (req, res) => {
        const today = new Date(); 
        const query = { deadline: { $gte: today.toISOString() } }; 
        const runningCampaigns = await campaignCollection.find(query).toArray();
        res.send(runningCampaigns);
      });
      
      
     

      
      app.delete('/campaign/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const result = await campaignCollection.deleteOne({ _id: new ObjectId(id) });
      
          if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Campaign not found" });
          }
      
          res.status(200).json({ message: "Campaign deleted successfully", deletedCount: result.deletedCount });
        } catch (error) {
          res.status(500).json({ error: "Error deleting campaign" });
        }
      });



       
        app.get('/myCampaigns', async (req, res) => {
          const { email } = req.query;  
        
          if (!email) {
            return res.status(400).json({ error: "Email is required" });
          }
        
          try {
            const userCampaigns = await campaignCollection.find({ email: email }).toArray();
            
            if (userCampaigns.length === 0) {
              return res.status(200).json({ message: "No campaigns found for this email." });
            }
        
            res.status(200).json(userCampaigns);
          } catch (error) {
            console.error("Error fetching campaigns:", error);
            res.status(500).json({ error: "Failed to fetch campaigns" });
          }
        });
        

        // Get all campaigns (public route)
        app.get('/campaign', async (req, res) => {
          const cursor = campaignCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        });

        // Add a new campaign (post route)
        app.post('/campaign', async (req, res) => {
            const newCampaign = req.body;
            console.log(newCampaign);
            const result = await campaignCollection.insertOne(newCampaign);
            res.send(result);
        });

        
        
        
    } catch (error) {
        console.log(error);
    }
}

Main();

app.get('/', (req, res) => {
    res.send('CrowdCube server is running...');
});

app.listen(port, () => {
  console.log(`CrowdCube server is running on port ${port}`);
});
