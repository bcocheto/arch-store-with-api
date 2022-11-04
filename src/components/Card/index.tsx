import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export const CardComponent = ({ image, title, description, price }: CardProps) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component='img'
          sx={{
            pt: '56.25%',
          }}
          image={image}
          alt='random'
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography>{description}</Typography>
          <Typography>R${price}</Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>View</Button>
          <Button size='small'>Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
