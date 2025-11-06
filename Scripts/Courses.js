import { courses } from "../DataBase/CoursesData.js";
const simplifiedCategories = {
        "Cuisine": ["French cuisine", "Italian cuisine", "Middle east cuisine", "Asian cuisine", "London modern dishes"],
        "Savory Dishes": ["Steak", "Pizza", "Bread", "Croissant", "Innovative dishes"],
        "Desserts": ["Chocolate", "Cakes", "Innovative middle eastern deserts", "Isomalt sugar art"],
        "Techniques": ["Gastronomy food", "Fruit & vegetables carving", "Isomalt sugar art"],
        "Drinks": ["Parista"]
    };

const iconMap = {
    "Cuisine": "🍽️",
    "Savory Dishes": "🥩",
    "Desserts": "🧁",
    "Techniques": "🍷",
    "Drinks": "☕",
    "All": "🌐"
};




function generateSimplifiedFilterHTML() {
    let html = `<h6>Category</h6>
    <div class="filter-box">
    <label class="form-check w-100 p-2 mb-0" for="filterAll">
        <input class="form-check-input" type="radio" name="courseFilter" value="All" id="filterAll" checked>
        <span class="custom-box" aria-hidden="true"></span>
        <span class="form-check-label">🌐 All</span>
    </label>
    </div>`;

    for (const [group, items] of Object.entries(simplifiedCategories)) {
        const icon = iconMap[group] || '';
        const id = group.replace(/\s+/g, '').replace(/[^\w-]/g, '');
        html += `<div class="filter-box">
        <label class="form-check w-100 p-2 mb-0" for="${id}">
            <input class="form-check-input" type="radio" name="courseFilter" value="${group}" id="${id}">
            <span class="custom-box" aria-hidden="true"></span>
            <span class="form-check-label">
            <span class="filter-icon">${icon}</span> ${group}
            </span>
        </label>
        </div>`;
    }
    return html;
}


document.getElementById('filterContentMobile').innerHTML = generateSimplifiedFilterHTML();
document.getElementById('filterContentDesktop').innerHTML = generateSimplifiedFilterHTML();


function renderCourses(courses, selectedFilters = []) {
    const container = document.getElementById('courseContainer');
    container.innerHTML = '';

    const filteredCourses = selectedFilters.length === 0
    ? courses
    : courses.filter(course =>
        course.filterTags?.some(tag => selectedFilters.includes(tag))
        );

    filteredCourses.forEach(course => {
    const imgStyle = course.mainImg ? `style="background-image:url(${course.mainImg})"` : '';
    const cardHTML = `
        <div class="cardcontainer col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card">
            <div class="media media-2x1 gd-primary">
            <a class="media-content" ${imgStyle} data-abc="true"></a>
            </div>
            <div class="card-body">
            <h5 class="card-title">${course.name}</h5>
            <p class="card-text">${course.mainText}</p>
            </div>
            <div class="card-body">
            <a href="#" class="card-link" data-abc="true">Book Now</a>
            <a href="#" class="card-link" data-abc="true">Contact us</a>
            </div>
        </div>
        </div>
    `;
    container.innerHTML += cardHTML;
    });
}

// Listen to filter changes
document.addEventListener('change', (e) => {
    if (e.target && e.target.name === 'courseFilter') {
        const selected = e.target.value;
        if (selected === 'All') {
        renderCourses(courses);
        } else {
        const tags = simplifiedCategories[selected] || [];
        renderCourses(courses, tags);
        }
        // close mobile offcanvas if open
        const offcanvasEl = document.getElementById('filterOffcanvas');
        if (offcanvasEl && offcanvasEl.classList.contains('show') && window.bootstrap && window.bootstrap.Offcanvas) {
        // get or create instance and hide
        const oc = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
        oc.hide();
        }
    }
});

// Initial render
renderCourses(courses);