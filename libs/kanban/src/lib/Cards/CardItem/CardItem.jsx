import React from 'react'
import { Button, Card, CardContent, Checkbox, Paper, Stack, Typography } from '@material-ui/core';

export default function CardItem() {
    return (
        <Card>
        <CardContent>
          <Stack spacing={2} direction="row" alignItems="center">
            <Checkbox />
            <Typography variant="h6">Some item</Typography>
          </Stack>
        </CardContent>
      </Card>
    )
}
