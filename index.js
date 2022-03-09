


//Navber
let fixedNav = document.querySelector(".header");

let scrollBtn = document.querySelector(".scrollBtn");


window.addEventListener("scroll", ()=>{
    window.scrollY > 100 ? fixedNav.classList.add("active") : fixedNav.classList.remove("active");
    
    window.scrollY > 500 ? scrollBtn.classList.add("active") : scrollBtn.classList.remove("active");
})

scrollBtn.addEventListener("click", ()=>{
    scrollTo({
        top : 0,
        behavior : "smooth"
    })
})



//Home Button Action
let exploreBtn = document.querySelector(".title .btn"),

    hadithSection = document.querySelector(".hadith");
    

exploreBtn.addEventListener("click", ()=>{
    hadithSection.scrollIntoView({
        behavior : "smooth"
    })
})




//Hadith Section Actions

let hadithContainer = document.querySelector(".hadith-container"),
    prev = document.querySelector(".buttons .priv"),
    next = document.querySelector(".buttons .next"),
    number = document.querySelector(".buttons .number"),
    hadithIndex = 0;
    
    hadithChanger();
    
    function hadithChanger(){
        fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
        .then(response => response.json())
        .then(data =>{
            
            let hadiths = data.data.hadiths;
            changeHadith();
            
            next.addEventListener("click", ()=>{
                hadithIndex == 299 ? hadithIndex = 0 : hadithIndex ++;
                changeHadith();
            })
            
            prev.addEventListener("click", ()=>{
                hadithIndex == 0 ? hadithIndex = 299 : hadithIndex --;
                changeHadith();
            })
            
            
            
            function changeHadith(){
                hadithContainer.innerText = `قال رسول الله صلى الله عليه وسلم 
                                            ${hadiths[hadithIndex].arab}` ;
                number.innerText = `300 - ${hadithIndex + 1}`
            }
        }
        )
    }
    
//Link Sections
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll(".header ul li");
    
links.forEach(link =>{
    link.addEventListener("click", ()=>{
        document.querySelector(".header ul li.active").classList.remove("active");
        link.classList.add("active");
        
        let target = link.dataset.filter;
        sections.forEach(section =>{
            if(section.classList.contains(target)){
                section.scrollIntoView({
                    behavior : "smooth"
                })
            }
        })
    })
})

//Fetch Quran Api

let sourasContainer = document.querySelector(".sourasContainer");

getSouras();

function getSouras(){
    fetch("http://api.alquran.cloud/v1/meta")
    .then(res => res.json())
    .then(data =>{
        // console.log(data.data.surahs.references);
        
        let souras = data.data.surahs.references;
        
        // console.log(souras)
        
        let numberOfSouras = 114;
        
        // console.log(souras[0].name)
        
        for(let i = 0; i < numberOfSouras; i++){
            sourasContainer.innerHTML += 
            `<div class="soura">
                <p>${souras[i].name}</p>
                <p>${souras[i].englishName}</p>
            </div>`
        }
        
        let sourasTitles = document.querySelectorAll(".soura"),
            popup = document.querySelector(".soura-popup"),
            ayatContainer = document.querySelector(".ayat");
        
            sourasTitles.forEach((title, index) => {
                title.addEventListener("click", ()=>{
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                    .then(response => response.json())
                    .then(data =>{
                        ayatContainer.innerHTML = "";
                        let ayat = data.data.ayahs;
                        // console.log(ayat);
                        ayat.forEach(aya =>{
                            popup.classList.add("active");
                            ayatContainer.innerHTML += `
                            <p>(${aya.numberInSurah}) - ${aya.text}</p>
                            ` 
                        })
                })
                
                })
            })
            
            let closePopup = document.querySelector(".close-popup");
            
            closePopup.addEventListener("click", ()=>{
                popup.classList.remove("active")
            })
    })
}

//Pray Times Api

let cards = document.querySelector(".cards");

getPrayTimes();

function getPrayTimes(){
    fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
    .then(response => response.json())
    .then(data =>{
        let times = data.data.timings;
        console.log(times)
        cards.innerHTML = "";
        
        for(let time in times){
        
            console.log(time);
            
            console.log(times[time]);
            
            cards.innerHTML += `
            <div class="card">
                        <div class="circle">
                            <svg>
                                <circle cx="100" cy="100" r="100"></circle>
                            </svg>
                            <div class="praytime">${times[time]}</div>
                        </div>
                        <p>${time}</p>
                    </div>
            `
        }
    })
}


//Bars

let bars = document.querySelector(".bars"),
    sidebar = document.querySelector(".header ul");
    
bars.addEventListener("click", ()=>{
    sidebar.classList.toggle("active")
})

