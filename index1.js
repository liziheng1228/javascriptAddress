// 获取所需要的dom元素
var DOM = {
    mask: document.getElementById('mask'),
    add: document.getElementById('add'),
    avatar: document.getElementById('avatar'),
    names: document.getElementById('name'),
    infos: document.getElementById('info'),
    save: document.getElementById('save'),
    cancel: document.getElementById('cancel'),
    random: document.getElementById('random'),
    content: document.getElementById('content'),
    template: document.getElementById('template'),
    tip: document.getElementById('tip'),
};
// 随机生成名称和英文名
data = [
    { name: '佐藤', info: 'さとう' },
    { name: '铃木', info: 'すずき' },
    { name: '高桥', info: 'たかはし' },
    { name: '田中', info: 'たなか' },
    { name: '高桥', info: 'たかはし' },
    { name: '渡边', info: 'わたなべ' },
    { name: '伊藤', info: 'いとう' },
    { name: '小林', info: 'こばやし' },
    { name: '山本', info: 'やまもと' },
];
var nowNode;
// 弹出框
function disableAddModal(show) {

    switch (show) {
        case true:
            // mask 的class名称修改为 空 显示添加框
            DOM.mask.className = '';
            // 随机头像
            DOM.avatar.style.backgroundImage =
                "url('./avatar/" + Math.floor(Math.random() * 47) + ".jpg')";
            
            // 随机数赋予变量
            index = Math.floor(Math.random() * data.length);
            // 字典内随机取值
            DOM.names.value = data[index].name;
            DOM.infos.value = data[index].info;

            break;

        case false:
            // 隐藏添加框
            DOM.mask.className = 'disableAddModal';
            break;

        default:
            break;
    }
}

// 添加
DOM.add.addEventListener('click', function () {
    disableAddModal(true);
});
// 关闭
DOM.cancel.addEventListener('click', function () {
    nowNode = undefined;
    disableAddModal(false);
});

// 随机头像生成
DOM.random.addEventListener('click', function () {
    DOM.avatar.style.backgroundImage = "url('./avatar/" + Math.floor(Math.random() * 47) + ".jpg')";
});
// 扩展选项
function expand(params) {
    // var that = params.parentNode.className;
    // 未显示
    if (params.parentNode.className == 'card card_expand') {
        params.parentNode.className = 'card ';
    } else {
        //显示中
        params.parentNode.className = 'card card_expand';
    }
}

// 修改
function edit(params) {
    // 将本元素赋值
    nowNode = params;
    // 显示弹窗
    disableAddModal(true);


    // DOM.avatar.style.background = params.getElementsByClassName('avatar')[0].style.background;
    //将现用的头像、名称、英文名 赋值给弹窗
    DOM.avatar.style.backgroundImage = nowNode.getElementsByClassName(
        'avatar'
    )[0].style.backgroundImage;
    DOM.names.value = nowNode.getElementsByClassName('name')[0].innerText;
    DOM.infos.value = nowNode.getElementsByClassName('info')[0].innerText;
}
//删除
function remove(params) {

    params.remove();
}

//保存
DOM.save.addEventListener('click', function () {
    var node;
    DOM.tip.style.display = 'none';
    // 是否为undifind
    // !!noDode 为nowNode 不为空
    if (!!nowNode) {
        // console.log('nowNode不为空:' + nowNode);
        node = nowNode;
    } else {
        //复制DOM.template 元素
        node = DOM.template.cloneNode(true);
        // console.log('nowNode为空:'+node)
    }
    // node = DOM.template.cloneNode(true);

    node.style.display = 'block';
    node.getElementsByClassName('name')[0].innerText = DOM.names.value;
    node.getElementsByClassName('info')[0].innerText = DOM.infos.value;
    node.getElementsByClassName('avatar')[0].style.backgroundImage =
        DOM.avatar.style.backgroundImage;
    node.getElementsByClassName('more')[0].addEventListener('click', function () {
        // console.log(this);
        expand(this);
    });
    node.getElementsByClassName('edit')[0].addEventListener('click', function () {
        // console.log(this.parentNode.parentNode);
        edit(this.parentNode.parentNode);
        // console.log('nowNode' + nowNode);
    });
    node.getElementsByClassName('delete')[0].addEventListener('click', function () {
        // console.log(this.parentNode.parentNode);
        remove(this.parentNode.parentNode);
        // console.log('nowNode' + nowNode);
    });
    // 如果不存在会创建新的，如果存在会替换
    DOM.content.appendChild(node);
    nowNode = undefined;
    disableAddModal(false);
});
