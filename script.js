document.addEventListener('DOMContentLoaded', () => {
    const trigger1 = document.getElementById('prank-trigger');
    const trigger2 = document.getElementById('prank-trigger-2');
    const checkoutView = document.getElementById('checkout-view');
    const continueShoppingBtn = document.getElementById('btn-continue-shopping');
    const payBtn = document.getElementById('final-pay-btn');
    
    const prankContainer = document.getElementById('prank-container');
    const prankVideo = document.getElementById('prank-video');

    const hackScreen = document.getElementById('hack-screen');
    const videoWrapper = document.getElementById('video-wrapper');
    const hackText = document.getElementById('hack-text');

    function showCheckout(e) {
        e.preventDefault();
        // Hide scrollbar on body
        document.body.style.overflow = 'hidden';
        checkoutView.style.display = 'flex';
        // Scroll to top of checkout view just in case
        checkoutView.scrollTop = 0;
    }

    function hideCheckout(e) {
        e.preventDefault();
        // Restore scrollbar
        document.body.style.overflow = '';
        checkoutView.style.display = 'none';
        
    // Restore values if hiding (removed $999 logic)
    }

    let prankHasExecuted = false;

    function executePrank(e) {
        e.preventDefault();
        
        if (prankHasExecuted) return;
        prankHasExecuted = true;
        
        // Show the prank container full screen
        prankContainer.style.display = 'flex';
        
        // Try to request full screen
        if (prankContainer.requestFullscreen) {
            prankContainer.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        }
        
        // Start phase 1: The Hack
        hackScreen.style.display = 'flex';
        videoWrapper.style.display = 'none';
        hackText.innerHTML = '';
        
        const lines = [
            "INITIALIZING SECURITY BYPASS PROTOCOL...",
            "ACCESSING ROOT DIRECTORY... [SUCCESS]",
            "DOWNLOADING BROWSER HISTORY... [IN PROGRESS]",
            "EXTRACTING SAVED PASSWORDS... [SUCCESS]",
            "ACCESSING WEBCAM... [GRANTED]",
            "UPLOADING DATA TO REMOTE SERVER...",
            "ENCRYPTING LOCAL FILES... [SYSTEM32 TARGETED]",
            "CRITICAL WARNING: THREAT DETECTED!!!",
            "COMMENCING PAYLOAD..."
        ];

        let lineIndex = 0;
        
        // Rapidly scroll green text
        const hackInterval = setInterval(() => {
            if (lineIndex < lines.length) {
                const p = document.createElement('div');
                p.className = 'hack-line';
                p.innerText = "> " + lines[lineIndex];
                hackText.appendChild(p);
                lineIndex++;
            } else {
                clearInterval(hackInterval);
                
                // Pause for dramatic effect, then hit the video
                setTimeout(() => {
                    hackScreen.style.display = 'none';
                    videoWrapper.style.display = 'block';
                    
                    // Play the video
                    prankVideo.play().catch(err => {
                        console.log(`Error attempting to play video: ${err.message}`);
                    });
                }, 800);
            }
        }, 350);
    }

    // Go to checkout from main page
    if (trigger1) trigger1.addEventListener('click', showCheckout);
    if (trigger2) trigger2.addEventListener('click', showCheckout);

    // Close checkout
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', hideCheckout);

    // Final trigger
    if (payBtn) payBtn.addEventListener('click', executePrank);
});
