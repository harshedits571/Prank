document.addEventListener('DOMContentLoaded', () => {
    const trigger1 = document.getElementById('prank-trigger');
    const trigger2 = document.getElementById('prank-trigger-2');
    const checkoutView = document.getElementById('checkout-view');
    const continueShoppingBtn = document.getElementById('btn-continue-shopping');
    const payBtn = document.getElementById('final-pay-btn');
    
    const prankContainer = document.getElementById('prank-container');
    const prankVideo = document.getElementById('prank-video');

    const bsodScreen = document.getElementById('bsod-screen');
    const videoWrapper = document.getElementById('video-wrapper');
    const bsodProgress = document.getElementById('bsod-progress');

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
        
        // Start phase 1: The Fake BSOD
        bsodScreen.style.display = 'flex';
        videoWrapper.style.display = 'none';
        
        let progress = 0;
        bsodProgress.innerText = progress;
        
        const tick = setInterval(() => {
            // increment progress randomly
            progress += Math.floor(Math.random() * 18) + 4;
            if (progress >= 100) {
                progress = 100;
                bsodProgress.innerText = progress;
                clearInterval(tick);
                
                // Pause at 100% for a split second, then hit the video
                setTimeout(() => {
                    bsodScreen.style.display = 'none';
                    videoWrapper.style.display = 'block';
                    
                    // Play the video
                    prankVideo.play().catch(err => {
                        console.log(`Error attempting to play video: ${err.message}`);
                    });
                }, 600);
            } else {
                bsodProgress.innerText = progress;
            }
        }, 400);
    }

    // Go to checkout from main page
    if (trigger1) trigger1.addEventListener('click', showCheckout);
    if (trigger2) trigger2.addEventListener('click', showCheckout);

    // Close checkout
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', hideCheckout);

    // Final trigger
    if (payBtn) payBtn.addEventListener('click', executePrank);
});
