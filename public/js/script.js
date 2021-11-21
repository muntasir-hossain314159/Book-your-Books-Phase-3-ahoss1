// let image = document.getElementById("hero-image");
// let leftButton = document.getElementsByClassName("carousel-left")[0];
// let rightButton = document.getElementsByClassName("carousel-right")[0];
// leftButton.onclick = function () {
    
//     if(image.getAttribute("src") == "./Images/Web-Development-Books.png")
//         image.src = "Images/Calculus-Books.png";
//     else
//         image.src = "./Images/Web-Development-Books.png";

// };
// rightButton.onclick = function () {
//     if(image.getAttribute("src") == "Images/Calculus-Books.png")
//         image.src = "./Images/Web-Development-Books.png";
//     else
//         image.src = "Images/Calculus-Books.png";
// };

// let items = document.querySelectorAll('.carousel .carousel-item');

// items.forEach((el) => {
//     const minPerSlide = 5
//     let next = el.nextElementSibling
//     for (var i=1; i<minPerSlide; i++) {
//         if (!next) {
//             // wrap carousel by using first child
//         	next = items[0]
//       	}
//         let cloneChild = next.cloneNode(true);
//         el.appendChild(cloneChild.children[0])
//         next = next.nextElementSibling
//         console.log(items[0]);
//     }
// });

// let leftButton = document.getElementById("left-button");
// let rightButton = document.getElementById("right-button")
// let courseList = document.getElementById("node-course-list");

// let nodelist = courseList.childNodes;

// rightButton.onclick = () => {
//     for(let i=0; i<5; i++)
//     {
//         courseList.replaceChild(nodelist[i+3],nodelist[i]);
//     }
// }

// leftButton.onclick = () => {
//     for(let i=0; i<5; i++)
//     {
//         courseList.replaceChild(nodelist[i+5],nodelist[i]);
//     }
// }

// let translateRightCourse= () => {
//     courseList.style.transform = `translateX(${translateCount * -100}px)`;
//     translateCount++;
// }

// let translateLeftCourse = () => {

//     courseList.style.transform = `translateX(${translateCount * 100}px)`;
//     translateLeftCount++;
// }

// rightButton.addEventListener('click', translateRightCourse);
// leftButton.addEventListener('click', translateLeftCourse);



// let list = document.getElementById("node-list");

// let children = list.childNodes;



