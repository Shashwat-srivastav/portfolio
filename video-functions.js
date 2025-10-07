// Video component functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all video components
    const videoContainers = document.querySelectorAll('.terminal-video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playButton = container.querySelector('.terminal-video-play-button');
        
        // Play/pause functionality
        if (playButton && video) {
            playButton.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playButton.style.display = 'none';
                } else {
                    video.pause();
                    playButton.style.display = 'flex';
                }
            });
            
            // Show play button when video ends
            video.addEventListener('ended', () => {
                playButton.style.display = 'flex';
            });
            
            // Show play button when video is paused
            video.addEventListener('pause', () => {
                playButton.style.display = 'flex';
            });
            
            // Hide play button when video is playing
            video.addEventListener('play', () => {
                playButton.style.display = 'none';
            });
        }
        
        // Terminal-style video controls
        const controlBtns = container.querySelectorAll('.video-control-btn');
        
        // First button: toggle fullscreen
        if (controlBtns[0] && video) {
            controlBtns[0].addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    if (container.requestFullscreen) {
                        container.requestFullscreen();
                    } else if (container.webkitRequestFullscreen) {
                        container.webkitRequestFullscreen();
                    } else if (container.msRequestFullscreen) {
                        container.msRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            });
        }
        
        // Second button: mute/unmute
        if (controlBtns[1] && video) {
            controlBtns[1].addEventListener('click', () => {
                video.muted = !video.muted;
            });
        }
        
        // Third button: toggle play/pause
        if (controlBtns[2] && video) {
            controlBtns[2].addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });
});