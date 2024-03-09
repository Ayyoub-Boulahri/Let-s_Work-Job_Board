import React, { useEffect } from 'react';

function InfiniteScrillingLast(props) {
    useEffect(() => {
        const observeDiv = document.getElementById('observeDiv');
        const observer = new IntersectionObserver(en => {
            if (en[0].isIntersecting) {
                props.setPage(prev => (prev + 1));
            }
        });
        observer.observe(observeDiv);

        // Cleanup function
        return () => {
            observer.disconnect(); // Disconnect the observer
        };
    }, []);

    return (
        <div id="observeDiv"></div>
    );
}

export default InfiniteScrillingLast;
