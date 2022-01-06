import express from 'express';
import { InventoryHandler } from './inventory';
import { InventoryItem } from './itemHandler';

const app = express();
app.use(express.json());
const port = 8080; // default port to listen

let inventory: InventoryHandler;
inventory = new InventoryHandler();

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send( "HI" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});


app.post('/createItem', (req, res) => {
    const title: string = req.body.title as string;
    const quantity: number = req.body.quantity as number;

    const ret: InventoryItem = inventory.createItem({ title, quantity });
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
    const result: boolean = inventory.editItem({ id: id, title: title, quantity: quantity });
    res.send(result);
}) 

app.get('/getItem/:id', (req, res) => {
    const id: string = req.params.id as string;
    const ret: InventoryItem | undefined = inventory.getItem(id);
    res.send(JSON.stringify(ret));

}) 
