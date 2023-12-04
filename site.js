let objectIDs = [];
let currentArtworkIndex = 0;
const maxArtworksToShow = 10;
let currentSearchQuery = ''; // To store the current search query for YouTube videos

document.addEventListener('DOMContentLoaded', () => {
    loadArtworkWithImage();
});

function loadArtworkWithImage() {
    if (currentArtworkIndex >= maxArtworksToShow) {
        displayEndMessage();
        return;
    }

    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
    .then(response => response.json())
    .then(data => {
        objectIDs = data.objectIDs;
        tryLoadArtwork();
    });
}

function tryLoadArtwork() {
    if (currentArtworkIndex >= maxArtworksToShow) {
        displayEndMessage();
        return;
    }

    const randomIndex = Math.floor(Math.random() * objectIDs.length);
    const artId = objectIDs[randomIndex];

    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
    .then(response => response.json())
    .then(artData => {
        if (artData.primaryImage) {
            document.getElementById('artImage').src = artData.primaryImage;
            let artInfoText = `${artData.title}\n${artData.artistDisplayName}\n${artData.objectDate}`;
            artInfoText += artData.isHighlight ? `\nHighlight` : '';
            artInfoText += artData.department ? `\nDepartment: ${artData.department}` : '';
            artInfoText += artData.culture ? `\nCulture: ${artData.culture}` : '';
            artInfoText += artData.period ? `\nPeriod: ${artData.period}` : '';
            artInfoText += artData.artistWikidata_URL ? `\nArtist Wiki: ${artData.artistWikidata_URL}` : '';
            artInfoText += artData.medium ? `\nMedium: ${artData.medium}` : '';
            artInfoText += artData.country ? `\nCountry: ${artData.country}` : '';

            document.getElementById('artInfo').innerText = artInfoText;
            currentArtworkIndex++;

            // Update the search query for YouTube videos
            currentSearchQuery = `${artData.department} ${artData.period}`;
        } else {
            tryLoadArtwork();
        }
    });
}

function displayEndMessage() {
    const artContainer = document.getElementById('artContainer');
    artContainer.innerHTML = '<p class="end-message-1">END</p> <br> <p class="end-message-2">No more options for today!</p>';
}

document.getElementById('dislikeButton').addEventListener('click', () => {
    loadArtworkWithImage();
    document.getElementById('artInfo').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('youtubeVideosContainer').style.display = 'none'; // Hide YouTube videos
});

document.getElementById('likeButton').addEventListener('click', () => {
    document.getElementById('artInfo').style.display = 'block';
    document.getElementById('nextButton').style.display = 'block';
    // Fetch related YouTube videos
    fetchRelatedVideos(currentSearchQuery);
    document.getElementById('youtubeVideosContainer').style.display = 'block'; // Show YouTube videos
});

document.getElementById('nextButton').addEventListener('click', () => {
    loadArtworkWithImage();
    document.getElementById('artInfo').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('youtubeVideosContainer').style.display = 'none'; // Hide YouTube videos
});




function fetchRelatedVideos(query) {
    const apiKey = 'AIzaSyDlZyERDV3N5ZlK1Cvy5LxvjZSxT2ESZIc'; // Replace with your actual API key
    const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&maxResults=2&q=${encodeURIComponent(query)}&key=${apiKey}&type=video`;

    fetch(youtubeSearchUrl)
        .then(response => response.json())
        .then(data => {
            displayYoutubeVideos(data.items);
        })
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function displayYoutubeVideos(videos) {
    const videosContainer = document.getElementById('youtubeVideosContainer');
    videosContainer.innerHTML = ''; // Clear previous videos

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">Watch on YouTube</a>
        `;
        videosContainer.appendChild(videoElement);
    });
}
