import express from 'express';
import cors from 'cors';
import clientRoute from './routes/clientRoute.js'
import catRoute from './routes/catFactsRoute.js'
import chatSummaryRoute from './routes/chatSummaryRoute.js'

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use("/api", clientRoute);
app.use("/api", catRoute);
app.use("/api", chatSummaryRoute);

app.listen(port, () => {
    console.log('Listening on port 3000')
})