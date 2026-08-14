/* ==================== 公共JavaScript函数 ==================== */

// 图表颜色配置
const chartColors = ['#1890ff', '#52c41a', '#faad14', '#722ed1', '#13c2c2', '#eb2f96', '#2f54eb', '#fa8c16', '#a0d911', '#595959'];

// 通用工具函数
function getShortcutItem(key) {
    return shortcutOptions.find((item) => item.key === key);
}

// 渲染快捷入口
function renderQuickNav() {
    const container = document.getElementById('quick-nav-list');
    const visibleItems = selectedShortcutKeys
        .map(getShortcutItem)
        .filter(Boolean)
        .slice(0, 4);

    if (!visibleItems.length) {
        container.innerHTML = `
            <div class="quick-nav-empty">当前未配置快捷导航</div>
            <button class="quick-nav-add" type="button" id="manage-shortcuts-button">
                <span class="quick-nav-add-plus">+</span>
                <span>快捷入口</span>
            </button>
        `;
        bindQuickNavEntry();
        return;
    }

    container.innerHTML = `
        ${visibleItems.map((item) => `
            <div class="quick-nav-item" data-shortcut-key="${item.key}">
                <span class="quick-nav-icon"></span>
                <span>${item.name}</span>
                <button class="quick-nav-remove" type="button" data-remove-shortcut="${item.key}">×</button>
            </div>
        `).join('')}
        <button class="quick-nav-add" type="button" id="manage-shortcuts-button">
            <span class="quick-nav-add-plus">+</span>
            <span>快捷入口</span>
        </button>
    `;
    bindQuickNavEntry();
}

// 绑定快捷入口事件
function bindQuickNavEntry() {
    const manageButton = document.getElementById('manage-shortcuts-button');
    if (manageButton) {
        manageButton.addEventListener('click', openShortcutModal);
    }

    document.querySelectorAll('[data-remove-shortcut]').forEach((button) => {
        button.addEventListener('click', (event) => {
            const shortcutKey = event.currentTarget.getAttribute('data-remove-shortcut');
            selectedShortcutKeys = selectedShortcutKeys.filter((key) => key !== shortcutKey);
            renderQuickNav();
        });
    });
}

// 渲染快捷入口弹窗
function renderShortcutModal() {
    const selectBox = document.getElementById('shortcut-select-box');
    const dropdown = document.getElementById('shortcut-dropdown');

    selectBox.innerHTML = `
        ${draftShortcutKeys.map((key) => {
            const item = getShortcutItem(key);
            return item ? `
                <span class="shortcut-tag">
                    <span>${item.name}</span>
                    <button type="button" data-delete-tag="${item.key}">×</button>
                </span>
            ` : '';
        }).join('')}
        <input class="shortcut-search" type="text" placeholder="">
    `;

    dropdown.innerHTML = shortcutOptions.map((item) => `
        <div
            class="shortcut-dropdown-item ${draftShortcutKeys.includes(item.key) ? 'disabled' : ''}"
            data-add-shortcut="${item.key}"
        >${item.name}</div>
    `).join('');

    selectBox.querySelectorAll('[data-delete-tag]').forEach((button) => {
        button.addEventListener('click', (event) => {
            const key = event.currentTarget.getAttribute('data-delete-tag');
            draftShortcutKeys = draftShortcutKeys.filter((item) => item !== key);
            renderShortcutModal();
        });
    });

    dropdown.querySelectorAll('[data-add-shortcut]').forEach((item) => {
        item.addEventListener('click', (event) => {
            const key = event.currentTarget.getAttribute('data-add-shortcut');
            if (draftShortcutKeys.includes(key) || draftShortcutKeys.length >= 6) {
                return;
            }
            draftShortcutKeys.push(key);
            renderShortcutModal();
        });
    });
}

// 打开快捷入口弹窗
function openShortcutModal() {
    draftShortcutKeys = [...selectedShortcutKeys];
    renderShortcutModal();
    document.getElementById('shortcut-modal').classList.add('show');
}

// 关闭快捷入口弹窗
function closeShortcutModal() {
    document.getElementById('shortcut-modal').classList.remove('show');
}

// 渲染任务页面
function renderTaskPage(taskKey) {
    const config = taskPageConfig[taskKey];
    if (!config) return;

    document.getElementById('task-page-title').textContent = config.title;
    document.getElementById('task-page-desc').textContent = config.desc;
    document.getElementById('task-filter-keyword').placeholder = config.placeholder;

    const statusSelect = document.getElementById('task-filter-status');
    statusSelect.innerHTML = config.statusOptions.map((item) => `<option>${item}</option>`).join('');

    document.getElementById('task-table-head').innerHTML = config.headers.map((item) => `<th>${item}</th>`).join('');
    document.getElementById('task-table-body').innerHTML = config.rows.map((row) => `
        <tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>
    `).join('');

    const taskTab = document.getElementById('task-tab');
    taskTab.textContent = config.title;
    taskTab.style.display = 'flex';
}

// 打开任务页面
function openTaskPage(taskKey) {
    renderTaskPage(taskKey);
    document.getElementById('dashboard-page').classList.add('hidden');
    document.getElementById('task-page').classList.remove('hidden');
}

// 返回首页看板
function backToDashboard() {
    document.getElementById('task-page').classList.add('hidden');
    document.getElementById('dashboard-page').classList.remove('hidden');
    document.getElementById('task-tab').style.display = 'none';
}

// 绑定待办事项事件
function bindTodoEvents() {
    document.querySelectorAll('[data-task-page]').forEach((card) => {
        card.addEventListener('click', () => {
            openTaskPage(card.getAttribute('data-task-page'));
        });
    });
    document.getElementById('back-dashboard-button').addEventListener('click', backToDashboard);
}

// 渲染渠道选择器
function renderChannelPicker(containerId, visibleSeries, selectedNames, onToggle) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <span class="channel-picker-label">显示渠道</span>
        ${visibleSeries.map((item) => `
            <button
                class="channel-chip ${selectedNames.includes(item.name) ? 'active' : ''}"
                type="button"
                data-channel-name="${item.name}"
            >${item.name}</button>
        `).join('')}
    `;

    container.querySelectorAll('[data-channel-name]').forEach((button) => {
        button.addEventListener('click', () => {
            onToggle(button.getAttribute('data-channel-name'));
        });
    });
}

// 渲染对比图表
function renderCompareChart() {
    const topValue = Number(document.getElementById('compare-top-select').value);
    const visibleSeries = channelSeriesData.slice(0, topValue);
    selectedCompareChannels = selectedCompareChannels.filter((name) => visibleSeries.some((item) => item.name === name));
    if (!selectedCompareChannels.length && visibleSeries.length) {
        selectedCompareChannels = [visibleSeries[0].name];
    }
    renderChannelPicker('compare-channel-picker', visibleSeries, selectedCompareChannels, (name) => {
        if (selectedCompareChannels.includes(name)) {
            if (selectedCompareChannels.length === 1) return;
            selectedCompareChannels = selectedCompareChannels.filter((item) => item !== name);
        } else {
            selectedCompareChannels.push(name);
        }
        renderCompareChart();
    });

    const series = visibleSeries.filter((item) => selectedCompareChannels.includes(item.name));
    const labels = monthLabels;
    const seriesValues = series.map((item) => item.values);
    const maxValue = seriesValues.length ? Math.max(...seriesValues.flat()) : 0;
    const svg = document.getElementById('compare-chart');

    const left = 44;
    const right = 22;
    const top = 24;
    const bottom = 42;
    const width = 760;
    const height = 320;
    const usableWidth = width - left - right;
    const usableHeight = height - top - bottom;
    const lineYs = [top, top + usableHeight * 0.25, top + usableHeight * 0.5, top + usableHeight * 0.75, top + usableHeight];

    let svgContent = '<g stroke="#f0f0f0" stroke-width="1">';
    lineYs.forEach((y) => {
        svgContent += `<line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}"></line>`;
    });
    svgContent += '</g><g fill="none" stroke-linecap="round" stroke-linejoin="round">';

    seriesValues.forEach((values, index) => {
        const path = values.map((value, valueIndex) => {
            const x = left + (usableWidth / Math.max(1, values.length - 1)) * valueIndex;
            const y = top + usableHeight - (value / maxValue) * usableHeight;
            return `${valueIndex === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
        }).join(' ');
        svgContent += `<path d="${path}" stroke="${chartColors[index]}" stroke-width="${index < 5 ? 3 : 2}"></path>`;
    });
    svgContent += '</g>';

    seriesValues.forEach((values, index) => {
        svgContent += `<g fill="${chartColors[index]}">`;
        values.forEach((value, valueIndex) => {
            const x = left + (usableWidth / Math.max(1, values.length - 1)) * valueIndex;
            const y = top + usableHeight - (value / maxValue) * usableHeight;
            svgContent += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${index < 5 ? 4 : 3}"></circle>`;
        });
        svgContent += '</g>';
    });

    svgContent += '<g fill="#8c8c8c" font-size="12" font-family="Arial, sans-serif">';
    labels.forEach((label, index) => {
        const x = left + (usableWidth / Math.max(1, labels.length - 1)) * index - 10;
        svgContent += `<text x="${x.toFixed(1)}" y="${height - 12}">${label}</text>`;
    });
    svgContent += '</g>';

    svg.innerHTML = svgContent;

    document.getElementById('compare-legend').innerHTML = series
        .map((item) => {
            const index = channelSeriesData.findIndex((seriesItem) => seriesItem.name === item.name);
            const legendClass = index === 0 ? 'orders' : index === 1 ? 'amount' : index === 2 ? 'app' : index === 3 ? 'h5' : 'other';
            return `<span class="${legendClass}" style="--legend-color:${chartColors[index]}">${item.name}</span>`;
        })
        .join('');

    document.querySelectorAll('#compare-legend .other').forEach((item, index) => {
        item.style.setProperty('--legend-color', chartColors[index + 4] || '#13c2c2');
    });
}

// 渲染汇总表格
function renderSummaryTable() {
    const topValue = Number(document.getElementById('summary-top-select').value);
    const searchValue = document.getElementById('channel-summary-search-input')?.value?.trim() || '';

    let rows = channelSeriesData.slice(0, topValue);

    // 如果有搜索关键词，过滤数据
    if (searchValue) {
        rows = channelSeriesData.filter(item => item.name.includes(searchValue));
    }

    const total = rows.reduce((sum, item) => sum + item.values[item.values.length - 1], 0);

    document.getElementById('summary-table-body').innerHTML = rows.map((item) => {
        const count = item.values[item.values.length - 1];
        const ratio = total ? ((count / total) * 100).toFixed(1) : '0.0';
        return `<tr><td>${item.name}</td><td>${count.toLocaleString()}件</td><td>¥${item.amount.toLocaleString()}</td><td>${ratio}%</td></tr>`;
    }).join('');
}

// 绑定快捷事件
function bindShortcutEvents() {
    document.getElementById('shortcut-modal-close').addEventListener('click', closeShortcutModal);
    document.getElementById('shortcut-save-button').addEventListener('click', () => {
        selectedShortcutKeys = [...draftShortcutKeys];
        renderQuickNav();
        closeShortcutModal();
    });
    document.getElementById('shortcut-modal').addEventListener('click', (event) => {
        if (event.target.id === 'shortcut-modal') {
            closeShortcutModal();
        }
    });
}

// 页面初始化公共入口
function initPage() {
    if (typeof renderQuickNav === 'function') renderQuickNav();
    if (typeof bindShortcutEvents === 'function') bindShortcutEvents();
    if (typeof bindTodoEvents === 'function') bindTodoEvents();
    if (typeof bindDashboardPanelEvents === 'function') bindDashboardPanelEvents();
}