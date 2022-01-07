import cors from 'cors';
import express from 'express';
import { InventoryHandler } from './inventory';
import { InventoryItem, Item } from './itemHandler';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
const port = 8080; // default port to listen

let inventory: InventoryHandler;
inventory = new InventoryHandler();


// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});




// HANDLING ITEMS


app.post('/createItem', (req, res) => {
    const title: string = req.body.title as string;
    const quantity: number = req.body.quantity as number;
    const description: string = req.body.description as string;
    const ret: InventoryItem = inventory.createItem({ title, quantity, description });
    res.send(JSON.stringify(ret));
})


app.get('/deleteItem/:id', (req, res) => {
    const id: string = req.params.id as string;
    const ret: boolean = inventory.deleteItem(id);
    res.send(ret);
})

app.get('/items', (req, res) => {
    const ret: InventoryItem[] = inventory.getItems();
    res.send(JSON.stringify(ret));
})

app.post('/editItem/:id', (req, res) => {
    const id: string = req.params.id as string;
    const ret: InventoryItem | undefined = inventory.getItem(id);
    const title: string = req.body.title as string;
    const quantity: number = req.body.quantity as number;
    const description: string = req.body.description as string;
    const result: boolean = inventory.editItem({ id: id, title: title, quantity: quantity, description: description });
    res.send(result);
}) 

app.get('/getItem/:id', (req, res) => {
    const id: string = req.params.id as string;
    const ret: InventoryItem | undefined = inventory.getItem(id);
    res.send(JSON.stringify(ret));

}) 



// HANDLING SHIPMENTS

app.post('/createShipment', (req, res) => {
    const items: Item[] = req.body as Item[];
    const ret: boolean = inventory.hanldeShipmentRequest(items);
    res.send(JSON.stringify(ret));
});


app.get('/shipments/get', (req, res) => {
    const ret: string[] = inventory.getShipments();
    res.send(JSON.stringify(ret));
});

app.get('/shipments/process', (req, res) => {
    inventory.processShipments();
    res.redirect('/shipments/get')

})




app.get('/*', (req, res) => {
    const validURLs: string[] = ['/createItem', '/deleteItem/:id', '/items', '/editItem/:id', '/getItem/:id', '/createShipment', '/shipments/get', '/shipments/process'];
    res.send(validURLs);
});


