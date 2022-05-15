import * as React from 'react';

  // material-ui
  import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import ProductsChart from './Charts/ProductsChart';
import EarningCard from './Charts/EarningCard';
import VisitorsSources from './Charts/VisitorsSources';
import Profits from './Charts/Profits'
import UsersChart from './Charts/UsersChart'

export default function Dashboard() {

        return (
            <Grid className='main-admin-container' container spacing={2}>
                <Grid item xs={11}>
                    <Grid container spacing={2}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EarningCard/>
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                          <Profits/>
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <VisitorsSources/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={11}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                          <ProductsChart/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <UsersChart/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>    
  )
}