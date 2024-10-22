data = [
  {
    "category": "job",
    "jobTitle": "Job Title",
    "company": "Company",
    "description": ["one", "two" ,"three"]
  },
  {
    "category": "project",
    "title": "Spotify Letterboxd",
    "desc": "Interacting with Spotify API to create a music diary.",
    "description": ["Node.js", "React", "Express"]
 },
  {
    "category": "job",
    "jobTitle": "Job Title",
    "company": "Company",
    "description": ["one", "two" ,"three"]
  },
  {
    "category": "project",
    "title": "Letterboxd Scraper",
    "desc": "Program that takes a Letterboxd username as input, organizes the user's watchlist into a database, and returns a randomly selected movie.",
    "description": ["Python", "Selenium"]
 },
  {
    "category": "project",
    "title": "Project title",
    "desc": "Project description",
    "description": ["Node.js", "React", "Express"]
 },
  {
    "category": "project",
    "title": "Project title",
    "desc": "Project description",
    "description": ["Node.js", "React", "Express"]
 },
   {
    "category": "job",
    "jobTitle": "Job Title",
    "company": "Company",
    "description": ["one", "two" ,"three"]
  },
  ];

  

function fakeFetch () {
  return new Promise( (resolve) => { resolve(data) } )
};


fakeFetch().then( data => {
  
  // make array for each category
  
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

      console.log(descriptionList)

      // make div for each object and give them class = job or project
      const itemDiv = document.createElement('div')
      itemDiv.setAttribute('class', `${item.category} item`);
      console.log(itemDiv.className);

      // jobs 
      if( item.category === "job" ){
        console.log( `${item.jobTitle}` );
        // put it all into the job div
        itemDiv.innerHTML = `
        <h2>${item.jobTitle}</h2>
        <p>${item.company}</p>
        <ul>${descriptionList}</ul>`
      };
     
     // projects
      if ( item.category === 'project' ){
        console.log( `${item.title} `);

        itemDiv.innerHTML = `
        <h2>${item.title}</h2>
        <p>${item.desc}</p>
        <ul>${descriptionList}</ul>
        `
      }
     // add child div (each job or project) to its appropriate container
      container.appendChild(itemDiv);
    })
  }
  
  // display projects first, then jobs
  displayData(projects, 'projects');
  displayData(jobs, 'jobs');
  
  
  
  }).catch( err => console.log("Error fetching fata: ", err))

// const cursor = document.createElement('div');
// cursor.classList.add('cursor-glow');
// document.body.appendChild(cursor);

// Update cursor position
// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = `${e.pageX}px`;
//     cursor.style.top = `${e.pageY}px`;
// });

// // Optional: Add hover effect to increase glow on certain elements
// document.querySelectorAll('.project, .section').forEach(element => {
//     element.addEventListener('mouseenter', () => {
//         cursor.classList.add('hover');
//     });
//     element.addEventListener('mouseleave', () => {
//         cursor.classList.remove('hover');
//     });
// });