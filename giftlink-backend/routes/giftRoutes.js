router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Récupérer la collection "gifts"
        const collection = db.collection("gifts");

        // Task 3: Récupérer tous les cadeaux et convertir en tableau JSON
        const gifts = await collection.find({}).toArray();

        // Task 4: Retourner les cadeaux
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Récupérer la collection "gifts"
        const collection = db.collection("gifts");

        const id = parseInt(req.params.id); // Assurez-vous que l'ID est bien un nombre

        // Task 3: Trouver le cadeau correspondant à l'ID
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
