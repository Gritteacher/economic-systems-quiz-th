import { categories } from "./questions-data.js";

const categoryList = document.querySelector("#category-list");

for (const category of categories) {
  const card = document.createElement("a");
  card.className = "category-card";
  card.href = `./quiz.html?category=${encodeURIComponent(category.id)}`;
  card.style.setProperty("--accent", category.accent);
  card.innerHTML = `
    <span class="category-name">${category.name}</span>
    <span class="category-size">${category.questions.length} ข้อ</span>
    <span class="category-action">เริ่มสุ่มคำถาม</span>
  `;
  categoryList.append(card);
}
