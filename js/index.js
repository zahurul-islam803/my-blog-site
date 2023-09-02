// Global variable
let sortingData = "";

// Get All Categories
const allCategoryLoad = async () => {
  const tabContainer = document.getElementById("tab-container");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categories = data.data;
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="allCategoryItem('${category.category_id}')" class="tab bg-[#25252526] text-[#252525B2] font-medium px-5 rounded">${category.category}</a>
    `;
    tabContainer.appendChild(div);
  });
};
// All category items
const allCategoryItem = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  sortingData = data.data;
  displayData(sortingData);
};

const displayData = (data) => {
  const cardContainer = document.getElementById("card-container");
  const emptyTab = document.getElementById("empty-tab");
  cardContainer.innerHTML = "";
  if (data.length === 0) {
    emptyTab.innerHTML = `
      <div class="grid text-center gap-8 justify-items-center content-center">
      <img src="../images/icon.png" alt="icon" />
      <h2 class="font-bold text-[#171717] text-3xl">Oops!! Sorry, There is no <br/> content here</h2>
      </div>
      `;
  } else {
    emptyTab.innerHTML = "";
    data.forEach((categoryItem) => {
      const div = document.createElement("div");
      const getHour = Math.floor(categoryItem.others.posted_date / 3600);
      const getSecond = categoryItem.others.posted_date - getHour * 3600;
      const getMinute = Math.floor(getSecond / 60);
      const getDate = getHour + "hrs " + getMinute + " min ago";

      div.innerHTML = `
         <div class="card card-compact">
        <div style="position:relative">
        <figure><img class="w-[312px] h-[200px] rounded-lg" src="${
          categoryItem.thumbnail
        }" alt="tube" /></figure>
          <span style="position:absolute; font-size:10px; padding:4px 0px; top:160px; right:50px; color:#FFF; background-color:#171717; border-radius:4px">${
            categoryItem.others?.posted_date !== "" ? getDate : ""
          }</span>
        </div>
        <div class="card-body flex flex-row ml-8 md:ml-3 lg:ml-0 mt-5"> 
          <div>
          <img  class="h-10 w-10 rounded-full" src="${
            categoryItem.authors[0]?.profile_picture
          }" alt="profile" />
          </div>
          <div>
           <h2 class="card-title text-[#171717] font-bold">${
             categoryItem?.title
           }</h2>
          <p class="text-[#252525B2] text-sm py-2 flex gap-1">${
            categoryItem.authors[0]?.profile_name || "No Name"
          }<span>${
        categoryItem.authors[0].verified === true
          ? ' <img src="../images/verified.png" alt="" />'
          : " "
      }</span></p>
          <p class="text-[#252525B2] text-sm">${
            categoryItem.others?.views
          } views</p> 
          </div> 
        </div>
      </div>
    `;
      cardContainer.appendChild(div);
    });
  }
};
//  data sorting
const parseItem = (parseString) => {
  const number = parseFloat(parseString);
  if (parseString.endsWith("K")) {
    return number * 1000;
  }
};
const compareData = (a, b) => {
  const compareA = parseItem(a.others.views);
  const compareB = parseItem(b.others.views);
  return compareB - compareA;
};

const sortingBtn = () => {
  sortingData.sort(compareData);
  displayData(sortingData);
};

allCategoryLoad();
allCategoryItem("1000");
