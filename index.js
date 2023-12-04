document.addEventListener('DOMContentLoaded', () => {
    // 加载类别数据
    loadCategories();
});

function loadCategories() {
    // 调用API以获取类别数据，并填充选择框
    // 您需要根据具体的API实现这个函数
}

document.getElementById('categoryForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedPeriod = document.getElementById('period').value;
    const selectedDepartment = document.getElementById('Department').value;

    // 可以在这里添加将选择传递到另一个页面的逻辑
    // 例如，使用 URL 参数
    const queryParameters = `period=${selectedPeriod}&department=${selectedDepartment}`;
    window.location.href = `explore.html?${queryParameters}`;

    // 如果不跳转，而是直接在当前页面加载艺术品
    // loadArtworks(selectedCulture, selectedPeriod, selectedDepartment);
});

function loadArtworks(culture, period, department) {
    // 这里的逻辑将根据所选类别加载艺术品
    // 如果选择了 "others"，则需要排除其他列出的选项
    // 这部分逻辑需要根据您的具体需求和API的能力来实现
}
