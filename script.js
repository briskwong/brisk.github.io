//当页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    //获取所有的技能列表项
    const skills = document.querySelectorAll('.skill-list li');
    //为每个技能列表项添加点击事件
    skills.forEach(function(skill) {
        skill.addEventListener('click', function() {
            // 切换高亮样式
            this.classList.toggle('highlight');
            
            // 显示提示信息
            showMessage('你点击了: ' + this.textContent);
        });
    });
    
    // 添加新技能的功能
    const addSkillBtn = document.createElement('button');
    addSkillBtn.textContent = '添加技能';
    addSkillBtn.className = 'add-skill-btn';

    // 创建删除按钮容器
    const btnContainer = document.createElement('div');
    btnContainer.style.marginTop = '10px';
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '8px';
    
    // 删除选中技能按钮
    const deleteSelectedBtn = document.createElement('button');
    deleteSelectedBtn.textContent = '删除选中技能';
    deleteSelectedBtn.className = 'delete-selected-btn';

    // 删除最后添加技能按钮
    const deleteLastBtn = document.createElement('button');
    deleteLastBtn.textContent = '删除最后添加';
    deleteLastBtn.className = 'delete-last-btn';
    
    // 添加按钮到页面
    const skillsContainer = document.querySelector('#skills');
    skillsContainer.appendChild(addSkillBtn);
    btnContainer.appendChild(deleteSelectedBtn);
    btnContainer.appendChild(deleteLastBtn);
    skillsContainer.appendChild(btnContainer);
    //添加技能事件
    addSkillBtn.addEventListener('click', function() {
        const newSkill = prompt('请输入新技能:');
        if (newSkill) {
            const skillList = document.querySelector('#skills ul');
            const skillItem = document.createElement('li');
            skillItem.textContent = newSkill;
            
            // 为新添加的技能也添加点击事件
            skillItem.addEventListener('click', function() {
                this.classList.toggle('highlight');
                showMessage('你点击了: ' + this.textContent);
            });
            
            skillList.appendChild(skillItem);
            showMessage('已添加新技能: ' + newSkill);
        }
    });
    //删除选中技能事件
    deleteSelectedBtn.addEventListener('click', function() {
        const skillList = document.querySelector('#skills ul');
        if (!skillList) {
            showMessage('暂无技能可删除');
            return;
        }
        
        const highlightedItems = skillList.querySelectorAll('.highlight');
        if (highlightedItems.length === 0) {
            showMessage('未选中任何技能');
            return;
        }
        
        // 确认删除
        if (confirm(`确定要删除选中的 ${highlightedItems.length} 个技能吗？`)) {
            highlightedItems.forEach(item => {
                skillList.removeChild(item);
            });
            showMessage(`已删除 ${highlightedItems.length} 个技能`);
        }
    });
    
    // 删除最后添加的技能事件
    deleteLastBtn.addEventListener('click', function() {
        const skillList = document.querySelector('#skills ul');
        if (!skillList || skillList.children.length === 0) {
            showMessage('暂无技能可删除');
            return;
        }
        
        const lastItem = skillList.lastElementChild;
        const skillName = lastItem.textContent;
        
        // 确认删除
        if (confirm(`确定要删除最后添加的技能：${skillName} 吗？`)) {
            skillList.removeChild(lastItem);
            showMessage(`已删除技能：${skillName}`);
        }
    });
});


    
    // 添加一些CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: #0078d4;
            color: white;
            padding: 5px;
            border-radius: 4px;
        }
        .add-skill-btn {
            background-color: #0078d4;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
            .delete-selected-btn {
            background-color: #d93025;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        .delete-last-btn {
            background-color: #f59e0b;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        .add-skill-btn:hover {
            background-color: #005a9e;
        }
             .delete-selected-btn:hover {
            background-color: #b4261d;
        }
        .delete-last-btn:hover {
            background-color: #d97706;
        }
        .message {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #333;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
            .skill-list {
            list-style: none;
            padding: 0;
            margin: 10px 0;
        }
        .skill-list li {
            padding: 4px 8px;
            margin: 4px 0;
            cursor: pointer;
            border: 1px solid #eee;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);

// 显示消息的函数
function showMessage(text) {
    // 检查是否已经有消息元素
    let messageEl = document.querySelector('.message');
    
    // 如果没有，创建一个
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'message';
        document.body.appendChild(messageEl);
    }
    
    // 设置消息内容
    messageEl.textContent = text;
    
    // 显示消息
    messageEl.style.opacity = '1';
    
    // 3秒后隐藏消息
    setTimeout(function() {
        messageEl.style.opacity = '0';
    }, 3000);
}