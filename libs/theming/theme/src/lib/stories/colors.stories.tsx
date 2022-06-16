import { Box, Container, Grid, Typography, useTheme } from '@material-ui/core';
import { number } from '@storybook/addon-knobs';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
// Declare which Story you want. With the / syntax grouping is possible

// Generate the Template

const styles = ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'default'];
const greys = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 500_8, 500_12, 500_16, 500_24, 500_32, 500_48, 500_56, 500_80];
const Template = (args) => {
  const theme = useTheme();
  return (
    <Container>
      <Grid container spacing={4}>
        {styles.map((s) => (
          <Grid key={s} item xs={6}>
            <Grid container bgcolor={theme.palette.background.paper} padding={2} borderRadius={2}>
              <Grid item xs={4} bgcolor={theme.palette[s].main} height={100} borderRadius={1} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h1" style={{ color: theme.palette[s].contrastText }}>
                  LS
                </Typography>
              </Grid>
              <Grid item xs={1} flexWrap="no-wrap" flexDirection="column" display="flex">
                <Box bgcolor={theme.palette[s].lighter} height={10} margin={0.5} borderRadius={1} flex={1}></Box>
                <Box bgcolor={theme.palette[s].light} height={10} margin={0.5} borderRadius={1} flex={1}></Box>
                <Box bgcolor={theme.palette[s].dark} height={10} margin={0.5} borderRadius={1} flex={1}></Box>
                <Box bgcolor={theme.palette[s].darker} height={10} margin={0.5} borderRadius={1} flex={1}></Box>
              </Grid>
              <Grid xs={1} item></Grid>
              <Grid xs={6} item>
                <Typography>{s}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Grid container bgcolor={theme.palette.grey[200]} padding={2} borderRadius={2}>
            {greys.map((s) => (
              <Grid key={s} item xs={1} bgcolor={theme.palette.grey[s]} margin={1} height={100} borderRadius={1} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h4" style={{ color: theme.palette.getContrastText(theme.palette.grey[s]) }}>
                  {s}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default {
  title: 'Colors',
  component: Typography,
} as Meta;

// Fill the Template

export const Default = Template.bind({});
