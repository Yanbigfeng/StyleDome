using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StyleDome.Controllers
{
    public class StyleTemplateController : Controller
    {
        // GET: StyleTemplate
        #region 三列布局中间固定
        public ActionResult Index()
        {
            return View();
        }
        #endregion


        #region 三列布局两边固定
        public ActionResult ThreeColumn()
        {
            return View();
        }
        #endregion
    }
}