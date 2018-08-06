$(function (w) {
    console.log(1111)
    window.onload = function () {
        //控件初始化事件
        eWebOffice1.QuickBarVisible = false;
        eWebOffice1.HideToolbar()
        eWebOffice1.TitleVisible = true;
        eWebOffice1.TitleCaption = "标题栏";
        eWebOffice1.WebUrl = "http://localhost:3725/Models/ServerHandler.ashx";
        eWebOffice1.RecordID = "20180629054144";
        eWebOffice1.TemplateID = "";
        eWebOffice1.UserName = "003";
        eWebOffice1.FileType = "doc";
        eWebOffice1.FileName = "1.doc";
        if ("test" == "new") {
            eWebOffice1.WebNew();
        } else {
            eWebOffice1.WebOpen();
        }
    }
    //保存事件
    $("#j_save").on("click", function () {
        //eWebOffice1.WebSave();
        var radioIndex = window.parent.radioIndex;
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = "2.jpg";
        var div = document.createElement("div");
        div.textContent = "创建的文件类型你.jpg";
        var input = document.createElement("input");
        input.type = "radio";
        input.id = "radio" + radioIndex;
        input.name = "fileRadio";
        var label = document.createElement("label");
        label.setAttribute("for", input.id);
        li.appendChild(img);
        li.appendChild(div);
        li.appendChild(input);
        li.appendChild(label);
        window.opener.document.getElementById("j_fileUl").appendChild(li);
        window.parent.radioIndex++;
        window.close();
    })
    //一键套红
    $("#j_taohong").on("click", function () {
        var o_Arg = new Object();            //准备传递到模式窗口的对象
        o_Arg.TemplateID = "";               //初始化对象的模板属性
        //弹出模板列表的模式窗体（url， 传递到模式窗口的参数，模式窗口的样式属性）
        window.showModalDialog(" /Office/TaoHongView", o_Arg, "dialogHeight:130px; dialogWidth:360px;center:yes;scroll:no;status:no;");
        if (o_Arg.TemplateID != "") {
            eWebOffice1.TemplateID = o_Arg.TemplateID;		//将模式窗口取得的TemplateID赋值给控件中的TemplateID属性
            eWebOffice1.WebEmbedTemplate();					//嵌入模板
        }
    })
    //保留痕迹
    $("#j_markKeep").on("click", function () {
        console.log("保留痕迹")
        eWebOffice1.SetRevision(true, true, false, true);
    })
    //不保留痕迹
    $("#j_markKeepNo").on("click", function () {
        eWebOffice1.SetRevision(true, false, false, true);
    })
    //显示痕迹
    $("#j_markShow").on("click", function () {
        eWebOffice1.SetRevision(true, true, false, true);
    })
    //不显示痕迹
    $("#j_markShowNo").on("click", function () {
        console.log("不显示痕迹")
        eWebOffice1.SetRevision(false, true, false, true);
    })
    //电子签名
    $("#j_seal").on("click", function () {
       // eWebOffice1.InsertPicture("https://images.cnblogs.com/cnblogs_com/yanbigfeg/1248170/o_a1.png", 3);
    })

    //

})

