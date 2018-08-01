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


        #region 新建公文页面
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult OldIndex()
        {
            return View();
        }
        #endregion

        #region 新建日常页面
        public ActionResult DailyView()
        {
            return View();
        }
        #endregion



        #region 新建编辑器word页面
        public ActionResult EditorView()
        {
            return View();
        }
        #endregion

        #region 编辑器excel页面
        public ActionResult EditorView2()
        {
            return View();
        }
        #endregion

        #region 套红页面
        public ActionResult TaoHongView()
        {
            string s_Options;
            s_Options = "";

            s_Options = "<option value='temp.doc'>temp.doc</option>" + "<option value='temp2.doc'>temp2.doc</option>";

            ViewBag.options = s_Options;
            return View();
        }
        #endregion


        #region 获取主办人经办人列表数据
        /// <summary>
        /// 获取主办人经办人列表数据
        /// </summary>
        /// <returns></returns>
        public ActionResult GetData()
        {
            try
            {

                //1.获取数据源
                var pagData = new object[10];
                pagData[0] = new { id = "001", name = "张三" };
                pagData[1] = new { id = "002", name = "李四" };
                pagData[2] = new { id = "003", name = "李四3" };
                pagData[3] = new { id = "004", name = "李四4" };
                pagData[4] = new { id = "005", name = "李四5" };
                pagData[5] = new { id = "006", name = "李四6" };
                pagData[6] = new { id = "007", name = "李四7" };
                pagData[7] = new { id = "008", name = "李四8" };
                pagData[8] = new { id = "009", name = "李四9" };
                pagData[9] = new { id = "010", name = "李四10" };
                var resultData = new
                {
                    total = 10,
                    rows = pagData,
                };
                return Json(resultData, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Content("");  //只为了凑返回值，没有实际用处
            }
        }
        #endregion
    }
}