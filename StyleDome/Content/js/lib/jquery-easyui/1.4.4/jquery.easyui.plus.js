﻿/** 
* 在iframe中调用，在父窗口中出提示框(herf方式不用调父窗口)
*/
$.extend({
    messageBox5s: function (title, msg) {
        $.messager.show({
            title: '<span class="fa fa-info">&nbsp;&nbsp;' + title + '</span>', msg: msg, timeout: 5000, showType: 'slide', style: {
                left: '',
                right: 30,
                top: '',
                bottom: 35,
                width: 250,
                

            }
        });
    }
});
$.extend({
    messageBox10s: function (title, msg) {
        $.messager.show({
            title: '<span class="fa fa-info">&nbsp;&nbsp;' + title + '</span>', msg: msg, height: 'auto', width: 'auto', timeout: 10000, showType: 'slide', style: {
                left: '',
                right: 5,
                top: '',
                bottom: -document.body.scrollTop - document.documentElement.scrollTop + 5
            }
        });
    }
});
$.extend({
    show_alert: function (strTitle, strMsg) {
        $.messager.alert(strTitle, strMsg);
    }
});

/** 
* panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
*/
$.fn.panel.defaults.onBeforeDestroy = function () {

    var frame = $('iframe', this);
    try {
        // alert('销毁，清理内存');
        if (frame.length > 0) {
            for (var i = 0; i < frame.length; i++) {
                frame[i].contentWindow.document.write('');
                frame[i].contentWindow.close();
            }
            frame.remove();
            if ($.browser.msie) {
                CollectGarbage();
            }
        }
    } catch (e) {
    }
};


var oriFunc = $.fn.datagrid.defaults.view.onAfterRender;
    $.fn.datagrid.defaults.view.onAfterRender = function(tgt){
        oriFunc(tgt);
        $(tgt).datagrid("getPanel").find("div.datagrid-body").find("div.datagrid-cell").each(function(){
            var $Obj = $(this)
            $Obj.attr("title",$Obj.text());
        })
    }

/**
* 防止panel/window/dialog组件超出浏览器边界
* @param left
* @param top
*/

var easyuiPanelOnMove = function (left, top) {
    var l = left;
    var t = top;
    if (l < 1) {
        l = 1;
    }
    if (t < 1) {
        t = 1;
    }
    var width = parseInt($(this).parent().css('width')) + 14;
    var height = parseInt($(this).parent().css('height')) + 14;
    var right = l + width;
    var buttom = t + height;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();
    if (right > browserWidth) {
        l = browserWidth - width;
    }
    if (buttom > browserHeight) {
        t = browserHeight - height;
    }
    $(this).parent().css({/* 修正面板位置 */
        left: l,
        top: t
    });
};
//$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
//$.fn.window.defaults.onMove = easyuiPanelOnMove;
//$.fn.panel.defaults.onMove = easyuiPanelOnMove;
//让window居中
var easyuiPanelOnOpen = function (left, top) {
    
    var iframeWidth = $(this).parent().parent().width();
   
    var iframeHeight = $(this).parent().parent().height();

    var windowWidth = $(this).parent().width();
    var windowHeight = $(this).parent().height();

    var setWidth = (iframeWidth - windowWidth) / 2;
    var setHeight = (iframeHeight - windowHeight) / 2;
    $(this).parent().css({/* 修正面板位置 */
        left: setWidth,
        top: setHeight
    });

    if (iframeHeight < windowHeight)
    {
        $(this).parent().css({/* 修正面板位置 */
            left: setWidth,
            top: 0
        });
    }
    $(".window-shadow").hide();
    //修复被撑大的问题
    if ($(".window-mask") != null)
    {
        if ($(".window-mask").size() > 1)
        {
            $(".window-mask")[0].remove();
        }
    }
    $(".window-mask").attr("style", "display: block; z-index: 9002; width: " + iframeWidth - 200 + "px; height: " + iframeHeight - 200 + "px;");

    //$(".window-mask").hide().width(1).height(3000).show();
};
$.fn.window.defaults.onOpen = easyuiPanelOnOpen;

var easyuiPanelOnResize = function (left, top) {


    var iframeWidth = $(this).parent().parent().width();

    var iframeHeight = $(this).parent().parent().height();

    var windowWidth = $(this).parent().width();
    var windowHeight = $(this).parent().height();


    var setWidth = (iframeWidth - windowWidth) / 2;
    var setHeight = (iframeHeight - windowHeight) / 2;
    $(this).parent().css({/* 修正面板位置 */
        left: setWidth-6,
        top: setHeight-6
    });

    if (iframeHeight < windowHeight) {
        $(this).parent().css({/* 修正面板位置 */
            left: setWidth,
            top: 0
        });
    }
    $(".window-shadow").hide();
    //$(".window-mask").hide().width(1).height(3000).show();
};
$.fn.window.defaults.onResize = easyuiPanelOnResize;


/**
* 
* @requires jQuery,EasyUI
* 
* 扩展tree，使其支持平滑数据格式
*/
$.fn.tree.defaults.loadFilter = function (data, parent) {
    var opt = $(this).data().tree.options;
    var idFiled, textFiled, parentField;
    //alert(opt.parentField);
    if (opt.parentField) {
        idFiled = opt.idFiled || 'id';
        textFiled = opt.textFiled || 'text';
        parentField = opt.parentField;
        var i, l, treeData = [], tmpMap = [];
        for (i = 0, l = data.length; i < l; i++) {
            tmpMap[data[i][idFiled]] = data[i];
        }
        for (i = 0, l = data.length; i < l; i++) {
            if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                if (!tmpMap[data[i][parentField]]['children'])
                    tmpMap[data[i][parentField]]['children'] = [];
                data[i]['text'] = data[i][textFiled];
                tmpMap[data[i][parentField]]['children'].push(data[i]);
            } else {
                data[i]['text'] = data[i][textFiled];
                treeData.push(data[i]);
            }
        }
        return treeData;
    }
    return data;
};

/**

* @requires jQuery,EasyUI
* 
* 扩展combotree，使其支持平滑数据格式
*/
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;


function myformatter(date) {
    var dateArray = date.split(" ");
    return dateArray[0].replace("/", "-").replace("/", "-");
}

function myparser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}

function SetGridWidthSub(w)
{
    return $(window).width() - w;
}
function SetGridHeightSub(h) {
    return $(window).height() - h
}


function SubStrYMD(value)
{
    if (value == null || value == "") {
        return "";
    } else {
        return value.substr(0, value.indexOf(' '))
    }
}

function EnableFormatter(value)
{
    if (value) {
        return "<span class='color-green fa fa-circle'></span>";
    } else {
        return "<span class='color-blue fa fa-circle'></span>";
    }
}