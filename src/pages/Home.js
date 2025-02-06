import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Blog from '../components/Blog';

const Home = () => {
    return (
        <div
        
            style={{
                backgroundImage: `url('/assets/Home.jpg')`,
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Header />
            <main>
                <h1>Welcome to the Self Improvement</h1>
                <p>Start your journey to a better you today!</p>
                <button>Get Started</button>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
