import { Box, Typography } from '@mui/material'



export const ErrorPage = () => {

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100vw'
            }}
        >
            <div>
                <Typography variant='h4'>
                    Some ERROR occured...
                </Typography>
                <Typography>Please try again later.</Typography>
            </div>
        </Box>
    )

}