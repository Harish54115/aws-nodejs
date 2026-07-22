require("dotenv").config();
const express = require('express');
const imageRoutes = require('./routes/image.routes.js')

const s3Service = require('./services/s3.service.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.use("/api/images", imageRoutes);

const PORT = process.env.PORT;
app.get('/', async (req, res) => {
    try {
        const contents = await s3Service.listImages() || [];
        const images = contents.map(item => ({
            key: item.Key,
            url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`
        }));
        res.render('index', { images });
    } catch (err) {
        res.status(500).send("Error fetching images: " + err.message);
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});