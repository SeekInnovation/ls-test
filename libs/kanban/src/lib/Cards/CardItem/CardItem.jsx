import { Card, CardContent, Stack, Typography } from '@material-ui/core';
import React from 'react';

export default function CardItem({item}) {
    return (
        <Card>
       
        <CardContent>
          <Stack spacing={2} direction="row" alignItems="center">

            <Typography variant="h6">{item?.title}</Typography>
          </Stack>
        </CardContent>
      </Card>
    )
}
