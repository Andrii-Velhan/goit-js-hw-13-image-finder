/**
* Typical Observer's registration
*/
const callback = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Here we can do something with each particular entry
            console.log(entry.isIntersecting);
        }
    });
};

const options = {
    rootMargin: '100px',
};
const observer = new IntersectionObserver(callback, options);

// Now we should tell our Observer what to observe
observer.observe(document.querySelector('#sentinel'));