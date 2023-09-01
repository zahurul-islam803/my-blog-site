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
  const cardContainer = document.getElementById("card-container");
  const emptyTab = document.getElementById("empty-tab");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const categoryItems = data.data;
  cardContainer.innerHTML = "";
  if (categoryItems.length === 0) {
    emptyTab.innerHTML = `
      <div class="grid text-center gap-8 justify-items-center content-center">
      <img src="../images/icon.png" alt="icon" />
      <h2 class="font-bold text-[#171717] text-3xl">Oops!! Sorry, There is no <br/> content here</h2>
      </div>
    `;
  } else {
    emptyTab.innerHTML = '';
    categoryItems.forEach((categoryItem) => {
      const div = document.createElement("div");
      div.innerHTML = `
         <div class="card">
        <figure><img class="w-[312px] h-[200px] rounded-lg" src="${
          categoryItem.thumbnail
        }" alt="tube" /></figure>
        <div class="card-body flex flex-row gap-3 mt-5">
          
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
            categoryItem.others?.views || "No Views"
          }</p> 
          </div> 
        </div>
      </div>
    `;
      cardContainer.appendChild(div);
    });
  }
}
  
  

allCategoryLoad();
allCategoryItem("1000");
