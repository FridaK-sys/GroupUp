import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright'

export default function Footer(){
    return (
        <Box sx={{p: 6}} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                GroupUp
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Connecting students since 2022
            </Typography>
            {<Copyright />}
        </Box>
    );
}
