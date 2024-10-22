// Dynamically generate HTML for jobs and projects 
// so I dont have to hard-code them

fetch('./data.json')
.then( response => response.json() )
.then( data => {
  
  // Array for each category
  
  const projects = data.filter(item => item.category === 'project');
  const jobs = data.filter(item => item.category === 'job');


  // for each json object (job or project entry)
  // passing in either list of jobs or projects

   function displayData(categoryList, categoryName) { categoryList.forEach( item => {
     
     // select container based on name of category array, same as id of container div
     const container = document.getElementById(categoryName)

      // turn list of descriptions into <li> elements
      descriptionList = '';
        item.description.forEach ( desc => {
          descriptionList += `<li>${desc}</li>`;
        })

      

      // make div for each object and give them class = job or project
      const itemDiv = document.createElement('div')
      itemDiv.setAttribute('class', `${item.category} item`);
      

      // jobs 
      if( item.category === "job" ){
        // put it all into the job div
        itemDiv.innerHTML = `

        <span>
        <h2 class = 'jobTitle' >${item.jobTitle}</h2>
        <p class = 'dates'>${item.dates}</p>
        
        </span>
        
        
          <p class = 'company'>${item.company}</p>
          
        
        
        <ul class = 'description' >${descriptionList}</ul>
        `
      };
     
     // projects
      if ( item.category === 'project' ){
        // project div
        itemDiv.innerHTML = `
        <h2>${item.title}</h2>
        <div class = 'content-wrapper'>
          <img src=${item.image} href=${item.image}">
          <p>${item.desc}</p>
        </div>
        <ul>${descriptionList}</ul>
        
        `;
        if (item.github && item.github[0]){ 
          itemDiv.innerHTML +=
           `<a class = 'iconLink' href = ${item.github[1]} target=”_blank”>
              <i class="fa fa-github" style="font-size:30px;"></i>
              <span><strong>GitHub</strong></span>
            </a>`
        }

        if (item.live && item.live[0]){   
          itemDiv.innerHTML +=
          `<a class='iconLink'>
            <i class="fa fa-bolt" style="font-size:30px;"></i>
            <span><strong>Live</strong></span>
          </a>`
        }

      }

      // add child div (each job or project) to its appropriate container
      container.appendChild(itemDiv);
      
    })
    
  }
  
  // display projects first, then jobs

  displayData(projects, 'projects');
  displayData(jobs, 'jobs');
  
  }).catch( err => console.log("Error fetching fata: ", err))


// Header typeface animation

const fonts = [
  'VT323, san-serif',
  'DotGothic16, sans-serif',
  'Iceberg, serif',
  'Geo, sans-serif'
];

const colors = [
  '#176a7e',
  '#0b323c',
]

document.addEventListener('DOMContentLoaded', () =>
{
  
  const header = document.getElementById('name');
  
  if (!header){
    console.log("Header not found.");          
  }
  
  
const text = 'DREW GOLDSTEIN';
  
header.textContext = ''; // clear text to replace with spans


// Eact letter in span tag in order to give each letter its own typeface
text.split('').forEach( letter => {
  const span = document.createElement('span');
  span.textContent = letter;
  header.appendChild(span);
});
                                             
const spans = document.querySelectorAll('span');

function cycleFonts() {
  spans.forEach(span => {
    const color = colors[Math.floor(Math.random() * fonts.length)]
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    span.style.fontFamily = randomFont;
    
  });
  
  
}


const interval = setInterval(cycleFonts, 250); // Every 150ms, all the typefaces change


// setTimeout( () => {
//   clearInterval(interval);
//   interval = setInterval(cycleFonts, 300);
// }, 2000)

// After cycle, set typeface to Inter so it is easier to read

setTimeout( () => {
  clearInterval(interval);

  spans.forEach( span => {
    
    span.style.fontFamily = 'Geo';
    span.style.color = '#0b323c';
    // span.style.fontSize = ('6.7vw');
    span.style.transition = 'color 4000ms ease-out';
    
    // span.style.transition = 'font-size 1000ms ease-out';
    
    
  });
}, 1000) });

// Scroll arrow fade in

document.addEventListener('DOMContentLoaded', () => {
  const scrollHero = document.querySelectorAll('.scrollText')[0];
  const scrollProjects = document.querySelectorAll('.scrollText')[1];

  // I want it to fade in with some seconds delay

  const delay = 3000; // 3 second delay

  setTimeout( () => {
    scrollHero.style.opacity = 1;
  }, delay);

  // Projects page arrow

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if(scrollY >= windowHeight-25){
      setTimeout( () => {
  
        scrollProjects.style.opacity = 1;
  
      }, delay)
    }

  })
});


// Scrolling functions

const iconOne = document.getElementById('scrollIconOne');
const iconTwo = document.getElementById('scrollIconTwo');

// Click icons to automatically scroll to next page

iconOne.addEventListener('click', (event) => {
  event.preventDefault();
  const projectsContainer = document.getElementsByClassName('projectsContainer')[0];
  projectsContainer.scrollIntoView( {
    behavior: 'smooth', 
    block: 'start' 
  });
});

iconTwo.addEventListener('click', (event) => {
  event.preventDefault();
  const jobsContainer = document.getElementsByClassName('jobsContainer')[0];
  
  jobsContainer.scrollIntoView( {
    behavior: 'smooth', 
    block: 'start' 
  })
});

// Parallax effect for header

window.addEventListener('scroll', () => {
  const scrollSpeedInner = scrollY * 0.4;
  const header = document.querySelector('header');

  header.style.transform = `translateY(${scrollSpeedInner}px)`;

  // if (window.innerWidth > 870) {
  //   header.style.transform = `translateY(${scrollSpeedInner}px)`;
  // } else {
  //   header.style.transform = 'none'; // No parallax effect on small screens
  // }
});



// Hero page opacity

window.addEventListener('scroll', () => {

  const hero = document.getElementById('hero');
  const icons = document.querySelectorAll('.head-fa');
  const nav = document.querySelector('nav');  
  const scrollY = window.scrollY;
  const fadeStart = 0; // start fading immediately
  const fadeEnd = window.innerHeight * 0.9;
  const windowHeight = window.innerHeight;

  const opacity = Math.max(1-(scrollY-fadeStart) / (fadeEnd - fadeStart), 0);

  hero.style.opacity = opacity;

  // icons.forEach ( icon => {
  //   icon.style.opacity = 1;
  // });

  // if (scrollY > windowHeight){
  //   icons.forEach( icon => {
  //     icon.style.color = 'var(--secondary-color)';
  //     nav.style.zIndex = '-100';
  //   })}
  // else {
  //   icons.forEach ( icon => {
  //     icon.style.color = 'var(--bg-color)';
  //     nav.style.zIndex = '100';
  //   })
  // }

  // Icons scroll color


  // const maxScroll = document.body.scrollHeight - window.innerHeight;

  // // Calculate scroll ratio (0 at top, 1 at bottom)
  // const scrollRatio = (scrollY / maxScroll) * 3;

  // // Get the RGB values for your CSS variables
  // const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
  // const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();

  // // Convert hex color to RGB
  // const bgColorRGB = hexToRgb(bgColor);
  // const secondaryColorRGB = hexToRgb(secondaryColor);

  // // Calculate the intermediate color based on scroll
  // const r = Math.floor(bgColorRGB.r + (secondaryColorRGB.r - bgColorRGB.r) * scrollRatio);
  // const g = Math.floor(bgColorRGB.g + (secondaryColorRGB.g - bgColorRGB.g) * scrollRatio);
  // const b = Math.floor(bgColorRGB.b + (secondaryColorRGB.b - bgColorRGB.b) * scrollRatio);

  // const scrollText = document.querySelector('.fa-arrow-circle-o-down');
  
  // // Set the new color dynamically
  // scrollText.style.color = `rgb(${r}, ${g}, ${b})`;


  // // header speed

  // const scrollSpeedInner = scrollY * 0.4;
  // const inner = document.querySelector('.innerBox');

  // inner.style.transform = `translateY(${scrollSpeedInner}px)`;


});

// function hexToRgb(hex) {
//   const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
//   hex = hex.replace(shorthandRegex, (r, g, b) => r + r + g + g + b + b);
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? {
//     r: parseInt(result[1], 16),
//     g: parseInt(result[2], 16),
//     b: parseInt(result[3], 16)
//   } : null;
// }

