import React from 'react'
import Home from '../pages/Home'
import Contact from '../pages/Contact us';
const components = {
    page1: Home,
    page2: Contact,
    // Add more pages as needed
};

const Container = ({ tag }) => {
    const Component = components[tag] || null;

    return (
        <div>
            {Component && <Component />}
        </div>
    );
};

export default Container;