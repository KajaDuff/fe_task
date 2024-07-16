import { Box, Typography } from '@mui/material';



export const HomePage = () => {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            width: "100vw"
        }}>
            <div>
                <Typography variant='h4'>
                    Welcome to Simple React App
                </Typography>
                <Typography>Onboarding frontend task - 2024</Typography>
            </div>
        </Box>
    )
}