import { Box, Typography } from '@mui/material';



export const ErrorPage = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: "fixed",
                left: 0,
                top: 0,
                height: "100vh",
                width: "100vw"
            }}
        >
            <div>
                <Typography variant='h4'>
                    Some ERROR occured...
                </Typography>
                <Typography>Please try again later.</Typography>
            </div>
        </Box>
    );

}