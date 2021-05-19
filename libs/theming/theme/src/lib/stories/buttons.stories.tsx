import { Box, Button, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { number } from '@storybook/addon-knobs';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
// Declare which Story you want. With the / syntax grouping is possible

// Generate the Template

let styles = ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'default'];
let greys = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 500_8, 500_12, 500_16, 500_24, 500_32, 500_48, 500_56, 500_80];
const Template = (args) => {
  const theme = useTheme();
  return (
    <Container>
      <Grid container spacing={4}>
        {styles.map((s) => (
          <Grid key={s} item xs={6}>
            <Grid container bgcolor={theme.palette.background.paper} padding={2} borderRadius={2}>
              <Grid item xs={3}>
                <Button color={s as any} variant="contained">Hallo Button</Button>
              </Grid>
              <Grid item xs={3}>
                <Button color={s as any} variant="text">Hallo Button</Button>
              </Grid>
              <Grid item xs={3}>
                <Button color={s as any} variant="outlined">Hallo Button</Button>
              </Grid>
              <Grid xs={3} item>
                <Typography>{s}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default {
  title: 'Buttons',
  component: Typography,
} as Meta;

// Fill the Template

export const Default = Template.bind({});
