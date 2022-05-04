import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from "./Navbar";
import axios from "axios";
import backendServer from '../../webConfig';

export default function HoteCards(searchText) {
    const [search, setSearch] = React.useState("");
    const [initialItems, setInitialItems] = React.useState([]);
    const [items, setItems] = React.useState(initialItems);

    React.useEffect(()=>{
        async function settingUpData(){
            await console.log("called here!");
            var items = await axios.get(`${backendServer}/api/hotels/getHotelDetails`);
            console.log("items:",items.data);
            await setInitialItems(items.data);
            await setItems(items.data);
        }
        settingUpData();
    },[]);
    
    async function onTextChange(text){
        console.log("calling text change");
        await setSearch(text);
        if(text!==""){
            setItems(initialItems.filter(word => word.includes(text)));
        }
        else{
            setItems(initialItems);
        }
    }

  return (
    <div>
        <Navbar onTextChange={onTextChange} search={search}/><br/>
        <Grid container spacing={2}
                    alignItems="center"
                    style={{ minHeight: '80vh' }}>
            {items.map((item, index) => {
                return <Grid item xs={4}>
                    <Card style = {{width:"100%", height:"100%"}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt={item.Hotel_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                        {item.Hotel_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {item.Description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Select</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                    </Card>
                </Grid>
            })}
        </Grid>
    </div>
  );
}