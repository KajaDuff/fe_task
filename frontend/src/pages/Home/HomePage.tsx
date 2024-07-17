import { Box, Typography } from '@mui/material'



export const HomePage = () => {

    return (
        <Box sx={{
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100vw'
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