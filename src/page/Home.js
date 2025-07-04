import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    TextField,
    Button,
    Stack,
    Box,
    Link,
    Grid,
    IconButton

} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Logo } from '../svgFiles/Logo';
import { TypeAnimation } from 'react-type-animation';
import phoneImage1 from '../images/xl_media_image1.png'
import phoneImage2 from '../images/xl_media_image2.png'
import { useNavigate } from 'react-router-dom';
function Home() {
    const [messgae, setMessage] = useState("")
    const navigate = useNavigate()
    return (
        <>
            {/* Header */}
            <AppBar position="static" color="transparent" elevation={0} className='header_wrapper' sx={{ padding: 0 }}>
                <Container sx={{ p: 0 }}> <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Logo className="logoSvg" />
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <Link href="#" underline="none">
                            Financial Advisors
                        </Link>
                        <Link href="#" underline="none" >
                            Resources
                        </Link>
                    </Box>
                </Toolbar>
                </Container>

            </AppBar>

            {/* Main Content */}
            <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{
                    fontWeight: 500,
                    fontSize: {
                        xs: '1.6rem',   // 16px on extra small screens
                        sm: '2rem', // 20px on small screens
                        md: '2.5rem',  // 24px on medium screens
                        lg: '1.75rem'  // 28px on large screens
                    }
                }}>
                    Ask <strong>anything</strong> about <br />
                    <Box component="span" sx={{ px: 1 }}>
                        Retirement{' '}
                        <TypeAnimation
                            sequence={[
                                'Planning',
                                1000,
                                'Portfolios',
                                1000,
                                'Destinations',
                                1000,
                                'General Issues',
                                1000,
                                'Money Management',
                                1000,
                                'Investment Strategies',
                                1000,
                                'Estate Planning',
                                1000,
                                'Medicare and Medicaid',
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ color: '#FFde21', fontWeight: 'bold', display: 'inline-block' }}
                            repeat={Infinity}
                        />
                    </Box>
                </Typography>

                <Box sx={{ position: "relative", maxWidth: "550px", margin: "auto" }}>
                    <form onSubmit={(e) => {e.preventDefault()
                         navigate('/chat', { state: { title: messgae } }) }}>

                        <TextField
                            onChange={(e) => setMessage(e.target.value)}
                            variant="outlined"
                            fullWidth
                            placeholder="Type your retirement question…"
                            size="small"
                            sx={{
                                my: 2,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '14px',
                                    paddingRight: 5,
                                    '& fieldset': {
                                        borderColor: '#d1d5dc',
                                        borderWidth: 2,
                                        paddingRight: 30
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#4CAF50', // hover border color (optional)
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4CAF50', // ✅ green on focus
                                    },
                                },
                            }}
                        />
                        <IconButton
                            className="send_image"
                            type="submit"
                            color="primary"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <SendIcon sx={{
                                color: '#5cc37e'

                            }} />
                        </IconButton>

                    </form>

                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                    This is a free service. No fees or credit card required.
                </Typography>

                <Typography variant="body1" sx={{ color: 'red', mb: 4 }}>
                    Future of Free retirement advising is here
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#33691E', mb: 2 }}>
                    Start by clicking on below questions!
                </Typography>

                {/* Question Buttons */}
                <Stack spacing={2} alignItems="center">
                    {[
                        'How long will my money last?',
                        'Where is the best place for me to retire?',
                        'What age can I retire?',
                        'How much money do I need to retire?',
                        'How much money should I save per month?',
                    ].map((question, idx) => (
                        <Button
                            onClick={() => {
                                navigate('/chat', { state: { title: question } })
                            }}
                            key={idx}
                            variant="outlined"
                            sx={{
                                width: '100%',
                                maxWidth: '500px',
                                borderRadius: '12px',
                                fontWeight: 500,
                                fontSize: '1rem',
                                borderColor: "#0e6735",
                                color: "#0e6735",
                                fontSize: "14px"
                            }}
                        >
                            {question}
                        </Button>
                    ))}
                </Stack>
            </Container>
            <Box sx={{ backgroundColor: "#1A237E" }}>
                <Container className='save_text text-center'>
                    <Typography variant="h3" sx={{
                        color: '#fff',
                        fontWeight: 500,
                        marginBottom: "15px",
                        fontSize: {
                            xs: '1.8rem',   // 16px on extra small screens
                            md: '2rem',  // 24px on medium screens
                            lg: '3rem'  // 28px on large screens
                        }
                    }}>
                        A better way to plan <br />
                        & save for retirement
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#fff', mb: 4 }}>
                        Retiremate is you dedicated AI assisant to chat and discuss about your need
                    </Typography>
                </Container>
            </Box>
            <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
                <Container>
                    <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h6"
                                sx={{ color: 'rgb(47,85,9)', fontWeight: 500 }}
                            >
                                Get deep insight on what age can you retire
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box component="img" src={phoneImage1} alt="Retirement Age" sx={{ width: '100%', maxWidth: 300, display: 'block', mx: 'auto' }} />
                        </Grid>
                    </Grid>
                </Container>
                {/* Section 2 */}
                <Container>
                    <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h6"
                                sx={{ color: 'rgb(47,85,9)', fontWeight: 500 }}
                            >
                                Investigate how long will your savings last
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box component="img" src={phoneImage2} alt="Savings Insight" sx={{ width: '100%', maxWidth: 300, display: 'block', mx: 'auto' }} />
                        </Grid>
                    </Grid>

                </Container>
            </Box>
            <Box sx={{ textAlign: "center" }} className="footer">
                <Container>
                    <Typography
                        variant="body"

                    >
                        By messaging RetireMate, you agree to our Terms and have read our Privacy Policy

                    </Typography>
                    <Typography
                        variant="body"
                        sx={{ display: "block" }}

                    >
                        © 2025 CareVaps Group Inc. All rights reserved

                    </Typography>
                </Container>
            </Box>
        </>
    );
}

export default Home;
