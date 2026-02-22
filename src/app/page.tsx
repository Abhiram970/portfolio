// Remove 'use client' if this gets rendered as a server component initially, 
// but since we are importing App which contains GSAP and Hooks, we should make this a client boundary
'use client';

import App from '../components/App';

export default function Home() {
    return <App />;
}