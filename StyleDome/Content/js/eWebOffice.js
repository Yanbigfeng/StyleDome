/*
  使用方法
  -----------------------------------------------
  1. 在<head></head>中，引用此js文件
     <script type="text/javascript" src="/eWebOffice/eWebOffice.js"></script>

  2. 在要显示eWebOffice控件的地方，写如下代码，则创建了ID为eWebOffice1的控件
	<script type="text/javascript">
	eWebOfficeJS.Create("eWebOffice1", "100%", "100%");
	</script>
  -----------------------------------------------
*/





var eWebOfficeJS = (function () {

    //eWebOffice程序文件夹所在路径，用于指向安装包文件及安装时的提示图片
    var _BasePath = "Content/js/"

    //安装包文件路径，用于自动在线安装，请修改为实际部署路径
    var _Codebase = _BasePath + "eWebOfficeActiveX.CAB";

    //clsid,version
    var _Clsid = "3288A274-3E61-4DA5-AC58-FD260D2B5F2B";
    var _Version = "2,6,0,13";


    var _IsIE = (/*@cc_on!@*/false) || document.documentMode >= 11;

    var _CheckInstallBegin = function () {
        var s_Flag = _CheckInstall();
        if (s_Flag != "") {
            document.write('<table _name="eWebOffice_InstallingMsg" border=0 cellpadding=2 cellspacing=3 style="border:1px solid gray">'
                + '<tr>'
                + '<td><img border="0" src="' + _BasePath + 'loading.gif"></td>'
                + '<td style="color:#ff0000;font-size:12px;font-weight:bold;">使用此功能，您需要' + s_Flag + 'eWebOffice控件，当前正在尝试在线安装！请等待...<br>如长时间没有弹出在线安装信息，您可以【<a href="' + _BasePath + 'eWebOfficeActiveXInstall.exe">下载安装包</a>】安装。</td>'
                + '</tr>'
                + '</table>');
            window.setTimeout(_CheckInstallEnd, 1000);
        }
    };

    var _CheckInstallEnd = function () {
        var s_Flag = _CheckInstall();
        if (s_Flag != "") {
            window.setTimeout(_CheckInstallEnd, 1000);
        } else {
            var els = document.getElementsByTagName("TABLE");
            for (var i = 0; i < els.length; i++) {
                if (els[i].getAttribute("_name") == "eWebOffice_InstallingMsg") {
                    els[i].style.display = "none";
                }
            }
        }
    };

    var _CheckInstall = function () {
        var s_Flag = "";
        try {
            var eWebOfficeV = new ActiveXObject("eWebSoft.eWebOfficeVersion");
            if (eWebOfficeV.IsNewVersion(_Version)) {
                s_Flag = "升级";
            }
            eWebOfficeV = null;
            delete eWebOfficeV;
        } catch (e) {
            s_Flag = "安装";
        }
        return s_Flag;
    };

    var _AddEventListener = function (o_SourceObject, s_EventName, v_Listener) {
        if (window.attachEvent) {
            o_SourceObject.attachEvent("on" + s_EventName, v_Listener);
        } else {
            o_SourceObject.addEventListener(s_EventName, v_Listener, false);
        }
    };

    var _RemoveEventListener = function (o_SourceObject, s_EventName, v_Listener) {
        if (window.detachEvent) {
            o_SourceObject.detachEvent("on" + s_EventName, v_Listener);
        } else {
            o_SourceObject.removeEventListener(s_EventName, v_Listener, false);
        }
    };


    var _FixUnload = function () {
        if (document.readyState == 'interactive') {
            function stop() {
                _RemoveEventListener(document, "stop", stop);
                _Unload();
            };
            _AddEventListener(document, "stop", stop);
            window.setTimeout(function () {
                _RemoveEventListener(document, "stop", stop);
            }, 0);
        }
    };

    var _Unload = function () {
        try {
            var els = document.getElementsByTagName("OBJECT");
            for (var i = 0; i < els.length; i++) {
                var s_ClassID = els[i].getAttribute("classid");
                if (s_ClassID) {
                    if (s_ClassID.toUpperCase() == "CLSID:" + _Clsid.toUpperCase()) {
                        els[i].Quit();
                    }
                }
            }
        } catch (e) { };
    };

    try {
        _AddEventListener(window, "unload", _Unload);
        _AddEventListener(window, "beforeunload", _FixUnload);
    } catch (e) { };

    //以上内容都是安装操作
    return {

        //参数分别为：控件ID、宽度、高度
        Create: function (s_ID, s_Width, s_Height) {
            var s_Html = '';
            if (_IsIE) {
                _CheckInstallBegin();
                s_Html = '<object id="' + s_ID + '" codebase="' + _Codebase + '#version=' + _Version + '" classid="clsid:' + _Clsid + '" width="' + s_Width + '" height="' + s_Height + '">' +
                    '<param name="v" value="v">' +
                    '</object>';
            } else {
                s_Html = '<table border=0 cellpadding=0 cellspacing=0 width="' + s_Width + '" height="' + s_Height + '">' +
                    '<tr><td style="background-color:#666666;text-align:center;color:#ffffff;vertical-align:middle;font-size:12px;">请使用IE浏览器浏览此网页！</td></tr>' +
                    '</table>';
            }
            document.write(s_Html);
        },

        //设置基路径,用于此类中用到的相关文件路径指向
        SetBasePath: function (s_Path) {
            _BasePath = s_Path;
        }

    };

})();