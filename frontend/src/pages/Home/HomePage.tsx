import { Container, Typography } from '@mui/material';



export const HomePage = () => {

    return (
        <Container sx={{ justifyContent: "center", alignItems: "center", overflow: "hidden", display: "flex" }}>
            <div>
                <Typography variant='h4'>
                    Welcome to Simple React App
                </Typography>
                <Typography>Onboarding frontend task - 2024</Typography>
            </div>
        </Container>
    )
}