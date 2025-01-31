import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Blog from '../components/Blog';

const Home = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to the Self Improvement App</h1>
                <p>Start your journey to a better you today!</p>
                <div className="blog">
                    <Blog />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;