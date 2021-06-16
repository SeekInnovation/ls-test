import React from 'react';
import { Button, Card, CardContent, Checkbox, Paper, Stack, Typography } from '@material-ui/core';

export default function CardWrapper({ children }) {
  return (
    <>
      <Card variant="outlined" sx={{ bgcolor: 'grey.200', width: 400 }}>
        <CardContent>
          <Stack spacing={2}>{children}</Stack>
        </CardContent>
      </Card>
    </>
  );
}
