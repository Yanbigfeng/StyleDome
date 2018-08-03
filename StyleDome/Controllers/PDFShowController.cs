using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StyleDome.Controllers
{
    public class PDFShowController : Controller
    {
        // GET: PDFShow
        #region 非ie浏览器
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region 使用pdfobject.js插件实现
        public ActionResult PDFObjectView()
        {
            return View();
        }
        #endregion
    }
}