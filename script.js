const articles = [
    {
        id: 1,
        title: "Breaking News: Major Technology Breakthrough",
        category: "Technology",
        date: "2023-08-20",
        content: `<p>Scientists have announced a revolutionary advancement in quantum computing...</p>
                 <p>This breakthrough could change the future of computing as we know it...</p>`,
        image: "https://picsum.photos/800/450?tech"
    },
    {
        id: 2,
        title: "Global Climate Summit Concludes",
        category: "Environment",
        date: "2023-08-19",
        content: `<p>World leaders reach historic agreement on emissions reduction...</p>
                 <p>The new climate pact sets ambitious targets for the next decade...</p>`,
        image: "https://picsum.photos/800/450?nature"
    }
];

class NewsApp {
    constructor() {
        this.mainContent = document.getElementById('mainContent');
        this.popupAd = document.getElementById('popupAd');
        this.initialize();
    }

    initialize() {
        this.renderArticles();
        this.setupAds();
        this.setupEventListeners();
    }

    renderArticles() {
        this.mainContent.innerHTML = articles.map(article => `
            <article class="article-card">
                <img src="${article.image}" alt="${article.title}">
                <div class="article-content">
                    <h2>${article.title}</h2>
                    <div class="article-meta">
                        <span>${article.date}</span> • 
                        <span>${article.category}</span>
                    </div>
                    ${this.insertAds(article.content)}
                    <div class="social-share">
                        <a href="#" class="facebook" onclick="shareOnFacebook('${article.title}'); return false;">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="twitter" onclick="shareOnTwitter('${article.title}'); return false;">
                            <i class="fab fa-x-twitter"></i>
                        </a>
                        <a href="#" class="linkedin" onclick="shareOnLinkedIn('${article.title}'); return false;">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');

        // Refresh AdSense ads after rendering articles
        (adsbygoogle = window.adsbygoogle || []).push({});
    }

    insertAds(content) {
        return content.split('</p>').map((para, index) => 
            `${para}</p>${index % 2 === 0 ? `
            <div class="ad-container">
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-7001786702958070"
                     data-ad-slot="2466367924"
                     data-ad-format="fluid"
                     data-full-width-responsive="true"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>` : ''}`
        ).join('');
    }

    setupAds() {
        if (!localStorage.getItem('adShown')) {
            this.popupAd.style.display = 'block';
            localStorage.setItem('adShown', 'true');
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        console.log('Handling resize...');
    }
}

// Sharing functions
function shareOnFacebook(title) {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://facebook.com/sharer/sharer.php?u=${url}&t=${encodeURIComponent(title)}`, '_blank', 'width=626,height=436');
}

function shareOnTwitter(title) {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`, '_blank', 'width=626,height=436');
}

function shareOnLinkedIn(title) {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(title)}`, '_blank', 'width=626,height=436');
}

function closeAd() {
    document.getElementById('popupAd').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => new NewsApp());