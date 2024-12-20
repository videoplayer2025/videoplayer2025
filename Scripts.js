    const video = document.getElementById('myVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const seekBar = document.getElementById('seekBar');
    const timeStamp = document.getElementById('timeStamp');
    const volumeBar = document.getElementById('volumeBar');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeContainer = document.querySelector('.volume-container');
    const pipBtn = document.getElementById('pipBtn');
    const playbackBtn = document.getElementById('playbackBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const videoContainer = document.getElementById('videoContainer');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.querySelector('.settings-menu');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const videoControls = document.getElementById('videoControls');
    const subtitlesBtn = document.getElementById('subtitlesBtn');
    const resetProgressBtn = document.getElementById('resetProgressBtn');
    // Unique identifier for the video
    const videoId = 'myUniqueVideoId'; // Change this for each video
    const localStorageKey = `videoProgress-${videoId}`; // Key for saving progress
    const leftTapArea = document.getElementById('left-tap-area');
    const rightTapArea = document.getElementById('right-tap-area');
    const youtubeInputContainer = document.getElementById('youtubeInputContainer');
    const loadYoutubeVideoBtn = document.getElementById('loadYoutubeVideo');
    const loadYoutubeButton = document.getElementById('loadYoutubeVideo');
    const youtubePlayer = document.getElementById('youtubePlayer');
// Duration to rewind/forward
const skipTime = 10; // 10 seconds

// Rewind on left tap
leftTapArea.addEventListener('click', () => {
  video.currentTime = Math.max(0, video.currentTime - skipTime); // Ensure it doesn't go below 0
  showFeedback('Rewind -10s');
});

// Fast-forward on right tap
rightTapArea.addEventListener('click', () => {
  video.currentTime = Math.min(video.duration, video.currentTime + skipTime); // Ensure it doesn't exceed video length
  showFeedback('Forward +10s');
});

// Optional: Show feedback (e.g., text) when skipping
function showFeedback(message) {
  const feedback = document.createElement('div');
  feedback.textContent = message;
  feedback.style.position = 'absolute';
  feedback.style.top = '50%';
  feedback.style.left = '50%';
  feedback.style.transform = 'translate(-50%, -50%)';
  feedback.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  feedback.style.color = 'white';
  feedback.style.padding = '10px 20px';
  feedback.style.borderRadius = '5px';
  feedback.style.fontSize = '16px';
  feedback.style.zIndex = '999';
  document.getElementById('video-container').appendChild(feedback);

  // Remove feedback after 1 second
  setTimeout(() => {
    feedback.remove();
  }, 1000);
}

// Resume from saved progress
window.addEventListener('load', () => {
    const savedTime = localStorage.getItem(localStorageKey);
    if (savedTime) {
        video.currentTime = parseFloat(savedTime);
        console.log(`Resumed playback at: ${savedTime} seconds`);
    }
});

// Save progress during playback
video.addEventListener('timeupdate', () => {
    localStorage.setItem(localStorageKey, video.currentTime);
});

// Clear progress when the video ends
video.addEventListener('ended', () => {
    localStorage.removeItem(localStorageKey);
});
    // Reset progress functionality
resetProgressBtn.addEventListener('click', () => {
    // Clear the saved progress from localStorage
    localStorage.removeItem(localStorageKey);

    // Reset the video to the beginning
    video.currentTime = 0;

    // Pause the video (optional)
    video.pause();

    // Notify the user
    alert('Progress has been reset. The video will start from the beginning.');
});
const track = document.querySelector('track');
subtitlesBtn.addEventListener('click', () => {
  const isTrackEnabled = track.mode === 'showing';
  track.mode = isTrackEnabled ? 'disabled' : 'showing';  // Toggle the subtitle track
  subtitlesBtn.textContent = isTrackEnabled ? 'Subtitles Off' : 'Subtitles On';
});
   

    // Play/Pause Toggle
    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = '❚❚';
      } else {
        video.pause();
        playPauseBtn.textContent = '▶';
      }
    });
    // Update the play/pause button when the video starts playing
  video.addEventListener('play', () => {
    playPauseBtn.textContent = '❚❚';  // Change to "pause" icon
  });

  // Update the play/pause button when the video is paused
  video.addEventListener('pause', () => {
    playPauseBtn.textContent = '▶';  // Change to "play" icon
  });

// Pause/Play Video on Screen Tap
video.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '❚❚';
  } else {
    video.pause();
    playPauseBtn.textContent = '▶';
  }
});

   
    
let controlsTimeout; // Timeout variable for auto-hiding controls

// Function to show controls
function showControls() {
  videoControls.style.opacity = '1';
  videoControls.style.pointerEvents = 'auto'; // Ensure controls are clickable
}

// Function to hide controls
function hideControls() {
  videoControls.style.opacity = '0';
  videoControls.style.pointerEvents = 'none'; // Prevent interactions when hidden
}

// Toggle Fullscreen Mode
fullscreenBtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    showControls(); // Always show controls when exiting fullscreen
  } else {
    videoContainer.requestFullscreen();
  }
});

// Detect Fullscreen Mode and Update Behavior
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    // Fullscreen mode: Enable auto-hide behavior
    videoContainer.addEventListener('mousemove', handleFullscreenControls);
    hideControls(); // Start in hidden state
  } else {
    // Normal mode: Disable fullscreen-specific behavior
    videoContainer.removeEventListener('mousemove', handleFullscreenControls);
    showControls(); // Always show controls when exiting fullscreen
  }
});

// Handle Mouse Movement in Fullscreen Mode
function handleFullscreenControls() {
  showControls(); // Show controls on mouse movement
  clearTimeout(controlsTimeout); // Clear any previous timeout
  controlsTimeout = setTimeout(hideControls, 2000); // Auto-hide after 2 seconds
}

// Show Controls on Hover (Non-Fullscreen Mode)
videoContainer.addEventListener('mouseenter', showControls); // Show when hovering over the container
videoContainer.addEventListener('mouseleave', () => {
  if (!document.fullscreenElement) hideControls(); // Hide only in non-fullscreen mode
});

// Prevent Auto-Hide While Hovering Over Controls
videoControls.addEventListener('mouseenter', () => {
  clearTimeout(controlsTimeout); // Keep controls visible while hovered
});
videoControls.addEventListener('mouseleave', () => {
  if (document.fullscreenElement) {
    controlsTimeout = setTimeout(hideControls, 2000); // Resume auto-hide if in fullscreen
  }
});


    // Rewind Button (10 seconds)
    rewindBtn.addEventListener('click', () => {
      video.currentTime -= 10;
      if (video.currentTime < 0) {
        video.currentTime = 0;  // Prevent going below 0
      }
    });

    // Forward Button (10 seconds)
    forwardBtn.addEventListener('click', () => {
      video.currentTime += 10;
      if (video.currentTime > video.duration) {
        video.currentTime = video.duration;  // Prevent going beyond the video duration
      }
    });

    // Update SeekBar and Timestamp
    video.addEventListener('timeupdate', () => {
      const progress = (video.currentTime / video.duration) * 100;
      seekBar.value = progress;

// Update the seek bar color dynamically
    updateSeekBarColor(progress);

      const currentHours = Math.floor(video.currentTime / 3600);
      const currentMinutes = Math.floor((video.currentTime % 3600) / 60);
      const currentSeconds = Math.floor(video.currentTime % 60);

      const totalHours = Math.floor(video.duration / 3600);
      const totalMinutes = Math.floor((video.duration % 3600) / 60);
      const totalSeconds = Math.floor(video.duration % 60);

      timeStamp.textContent = `${currentHours > 0 ? currentHours + ':' : ''}${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds} / ${totalHours > 0 ? totalHours + ':' : ''}${totalMinutes < 10 ? '0' + totalMinutes : totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
    });

    // Seek Bar input
    seekBar.addEventListener('input', () => {
      video.currentTime = (seekBar.value / 100) * video.duration;
      
 // Update the seek bar color dynamically during seek
    updateSeekBarColor(progress);

      

    });

// Function to dynamically update the SeekBar color
function updateSeekBarColor(progress) {
  seekBar.style.background = `linear-gradient(to right, #4caf50 ${progress}%, var(--secondary-color) ${progress}%)`;
}

   let volumeBarTimeout; // Variable to store the timeout for hiding the volume bar

    // Show the volume bar when hovering over the volume button or the container
    volumeContainer.addEventListener('mouseenter', () => {
      clearTimeout(volumeBarTimeout); // Clear any previous timeout
      volumeBar.style.opacity = 1; // Make the volume bar visible immediately
    });

    // Hide the volume bar after a delay when the mouse leaves the volume container
    volumeContainer.addEventListener('mouseleave', () => {
      volumeBarTimeout = setTimeout(() => {
        volumeBar.style.opacity = 0; // Fade out the volume bar
      }, 1000); // Set the delay (in milliseconds) before hiding the volume bar
    });
    // Volume Toggle
    volumeBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      volumeBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    volumeBar.addEventListener('input', () => {
      video.volume = volumeBar.value;
      video.muted = video.volume === 0;
      volumeBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    // Picture-in-Picture
    pipBtn.addEventListener('click', () => {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        video.requestPictureInPicture();
      }
    });

    // Playback Speed
    let playbackRates = [1, 1.5, 2, 0.5];
    let currentRateIndex = 0;

    playbackBtn.addEventListener('click', () => {
      currentRateIndex = (currentRateIndex + 1) % playbackRates.length;
      video.playbackRate = playbackRates[currentRateIndex];
      playbackBtn.textContent = playbackRates[currentRateIndex] + 'x';
    });

    // Fullscreen Toggle
    fullscreenBtn.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainer.requestFullscreen();
      }
    });

    // Settings Menu Toggle with Delay
    let settingsTimeout;
    settingsBtn.addEventListener('click', () => {
      settingsBtn.classList.toggle('active');
      clearTimeout(settingsTimeout);
      if (settingsBtn.classList.contains('active')) {
        settingsMenu.style.display = 'block';
      } else {
        settingsTimeout = setTimeout(() => {
          settingsMenu.style.display = 'none';
        }, 300); // Delay for 300ms before hiding
      }
    });

    // Close Settings Menu when clicked outside
    document.addEventListener('click', (event) => {
      if (!settingsBtn.contains(event.target) && !settingsMenu.contains(event.target)) {
        settingsMenu.style.display = 'none';
        settingsBtn.classList.remove('active');
      }
    });
    
    const uploadBtn = document.getElementById('uploadBtn');
const uploadInput = document.getElementById('uploadInput');
const videoElement = document.getElementById('myVideo');

// Trigger file input when clicking the upload button
uploadBtn.addEventListener('click', () => {
  uploadInput.click();
});

// Load and play the selected video
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (!file) {
        alert('No file selected. Please upload a video file.');
        return;
    }

    // Validate the file type
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!validVideoTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a valid video file (e.g., .mp4, .webm, or .ogg).');
        return;
    }

    // Create a URL for the video file and set it as the video source
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;

    // Play the video and resume from saved progress (if any)
    video.play();

    // Attempt to resume playback from saved progress
    const savedTime = localStorage.getItem(localStorageKey);
    if (savedTime) {
        video.currentTime = parseFloat(savedTime);
        console.log(`Resumed playback at: ${savedTime} seconds`);
    } else {
        console.log('No saved progress found. Starting from the beginning.');
    }
});

   

   
// Subtitle Handling Improvements
let currentTrack = null;

// Convert SRT to VTT function
function convertSRTtoVTT(srtContent) {
  let vttContent = "WEBVTT\n\n";
  const lines = srtContent.split("\n");
  let block = "";

  lines.forEach((line) => {
    if (line.trim() === "") {
      if (block) {
        // Replace commas in timestamps with periods
        block = block.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2");
        vttContent += block + "\n\n";
        block = "";
      }
    } else {
      block += line + "\n";
    }
  });

  if (block) {
    block = block.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2");
    vttContent += block;
  }

  return vttContent;
}

// Handle subtitle file upload
uploadSubtitleBtn.addEventListener("click", () => {
  subtitleInput.click();
});

subtitleInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file && file.name.endsWith(".srt")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const srtContent = e.target.result;
      const vttContent = convertSRTtoVTT(srtContent);

      // Create a Blob for the VTT file
      const blob = new Blob([vttContent], { type: "text/vtt" });
      const url = URL.createObjectURL(blob);

      // Remove existing tracks
      while (video.querySelector("track")) {
        video.querySelector("track").remove();
      }

      // Create a new track element
      const track = document.createElement("track");
      track.src = url;
      track.kind = "subtitles";
      track.srclang = "en";
      track.label = "English";
      track.default = true;
      video.appendChild(track);

      // Activate the newly added track
      track.addEventListener("load", () => {
        currentTrack = video.textTracks[0];
        currentTrack.mode = "showing";

        subtitleStatus.textContent = "Subtitles Loaded Successfully";
        subtitlesBtn.textContent = "Subtitles On";

        // Hide status after 3 seconds
        setTimeout(() => {
          subtitleStatus.textContent = "";
        }, 3000);
      });
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a valid .srt file.");
    subtitleStatus.textContent = "Invalid subtitle file!";
    setTimeout(() => {
      subtitleStatus.textContent = "";
    }, 3000);
  }
});

// Toggle Subtitles/CC On/Off
subtitlesBtn.addEventListener("click", () => {
  if (!currentTrack) {
    subtitleStatus.textContent = "No subtitles loaded!";
    setTimeout(() => {
      subtitleStatus.textContent = "";
    }, 3000);
    return;
  }

  if (currentTrack.mode === "showing") {
    currentTrack.mode = "hidden";
    subtitlesBtn.textContent = "Subtitles Off";
  } else {
    currentTrack.mode = "showing";
    subtitlesBtn.textContent = "Subtitles On";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (!themeToggle) {
    console.error('Theme toggle button not found.');
    return;
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  // Set initial button text based on the saved theme
  themeToggle.textContent = savedTheme === 'dark' 
    ? '🌙 Switch to Light Mode' 
    : '☀️ Switch to Dark Mode';

  // Add click event listener for the theme toggle
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Update the theme and save to local storage
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update button text based on the new theme
    themeToggle.textContent = newTheme === 'dark' 
      ? '🌙 Switch to Light Mode' 
      : '☀️ Switch to Dark Mode';
  });
});


