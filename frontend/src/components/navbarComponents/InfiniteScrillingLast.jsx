import React, { useEffect } from 'react'

function InfiniteScrillingLast(props) {
    useEffect(() => {
        const test = document.getElementById('hi')
        const observer = new IntersectionObserver(en => {
            if(en[0].isIntersecting) {
                    props.setPage(prev => (prev + 1))
            }
        })
        observer.observe(test)
    }, [])
    return (
        <div id="hi">InfiniteScrillingLast</div>
    )
}

export default InfiniteScrillingLast