import { Box, Container, Grid, Typography } from '@material-ui/core';
import { number } from '@storybook/addon-knobs';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
// Declare which Story you want. With the / syntax grouping is possible

// Generate the Template

let styles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline', 'caption', 'button'];

const Template = (args) => (
  <Container>
    <Grid container spacing={number('spacing', 0) as any}>
      {styles.map((s) => (
        <Grid key={s} container item>
          <Grid xs={4} md={2} item>
            <Typography>{s}</Typography>
          </Grid>
          <Grid xs={8} md={10} item>
            <Typography variant={s as any}>Almost before</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default {
  title: 'Typography',
  component: Typography,
} as Meta;

// Fill the Template

export const Default = Template.bind({});
