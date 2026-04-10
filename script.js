const categoryList = document.getElementById('category-list');

const mainSection = document.getElementById('main-section');
const formSection = document.getElementById('form-section');
const bookmarkListSection = document.getElementById('bookmark-list-section');

const nameEl = document.getElementById('name');
const url = document.getElementById('url');
const categoryDropdown = document.getElementById('category-dropdown');

const addBookmarkButton = document.getElementById('add-bookmark-button');
const closeFormButton = document.getElementById('close-form-button');
const addBookmarkButtonForm = document.getElementById('add-bookmark-button-form');
const viewCategoryButton = document.getElementById('view-category-button');

const categoryNames = document.getElementsByClassName('category-name');

const getBookmarks = () => {
    const raw = localStorage.getItem('bookmarks');
    if (!raw) return []

    let bookmarks;
    try {
        bookmarks = JSON.parse(raw);
    }
    catch (error) {
        return [];
    }

    const props = ['name', 'category', 'url'];
    if (!bookmarks.every(obj => props.every(p => Object.hasOwn(obj, p)))) return [];

    return bookmarks;
}

const displaySection = section => {
    const sections = [mainSection, formSection, bookmarkListSection];
    sections.forEach(s => s.classList.add('hidden'));

    section.classList.remove('hidden');
}

const displayOrCloseForm = () => displaySection(mainSection.classList.contains('hidden') ? mainSection : formSection);

addBookmarkButton.addEventListener('click', (e) => {
    Array.from(categoryNames).forEach(el => el.textContent = categoryDropdown.value);
    displayOrCloseForm();
})

closeFormButton.addEventListener('click', displayOrCloseForm);

addBookmarkButtonForm.addEventListener('click', (e) => {
    const bookmarks = getBookmarks();
    bookmarks.push({ name: nameEl.value, category: categoryDropdown.value, url: url.value });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    nameEl.value = '';
    url.value = '';
    displayOrCloseForm();
});

const displayOrHideCategory = () => displaySection(mainSection.classList.contains('hidden') ? mainSection : bookmarkListSection);

const renderBookmarks = filtered => filtered.map(({ name, url }) => `<input type='radio' id='${name}' value='${name}' name='${categoryDropdown.value}' >`).join('\n');


viewCategoryButton.addEventListener('click', (e) => {
    debugger
    displayOrHideCategory();
    const filtered = getBookmarks().filter(({ category }) => category === categoryDropdown.value);
    if (!filtered.length) {
        categoryList.innerHTML = '<p>No Bookmarks Found</p>';
        return;
    }
    categoryList.innerHTML = renderBookmarks(filtered);
});