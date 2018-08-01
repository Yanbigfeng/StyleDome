using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Common;
using System.Configuration;
using eWebSoft;
using System.Data;
using System.Text.RegularExpressions;

namespace StyleDome.Models
{
    /// <summary>
    /// ServerHandler 的摘要说明
    /// </summary>
    public class ServerHandler : IHttpHandler
    {
        eWebSoft.eWebOfficeServer EWEBOS = null;
        string ms_Action = "";
        public void ProcessRequest(HttpContext context)
        {
            if (true)
            {
                EWEBOS = new eWebOfficeServer();

                //设置授权序列号
                EWEBOS.SetLicense("");


                try
                {
                    if (!EWEBOS.WebMsgLoad())
                    {
                        return;
                    }

                    ms_Action = EWEBOS.WebMsgGetString("Action").ToUpper();
                    switch (ms_Action)
                    {
                        case "LOADFILE":
                            DoLoadFile();
                            break;
                        case "SAVEFILE"://保存远程按钮触发
                            DoSaveFile();
                            break;
                        case "LOADTEMPLATE"://根据模板ID获取模板
                            DoLoadTemplate();
                            break;
                    }

                }
                catch (Exception ex)
                {
                    EWEBOS.WebMsgClear();
                    EWEBOS.WebMsgAlert(ex.ToString());
                    EWEBOS.WebMsgSend();
                }
                finally
                {
                    
                }
            }
            else
            {
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
        }

        #region 保存数据业务

        /// <summary>
        /// 根据文件名称【路径+名称】加载文件
        /// </summary>
        public void DoLoadFile()
        {

            //修改为取文件
            string s_FileName = EWEBOS.WebMsgGetString("FileName");
            string str = $"F:\\load\\"+s_FileName;
            EWEBOS.WebMsgSetFile("FileBody", str);
            EWEBOS.WebMsgStatus("TRUE", "文件加载成功!");
            EWEBOS.WebMsgSend();

        }



        /// <summary>
        /// 保存文件【需要配置路径】
        /// </summary>
        public void DoSaveFile()
        {
            //修改为存文件
            string s_FileName = EWEBOS.WebMsgGetString("FileName");
            EWEBOS.WebMsgSaveFile("FileBody", $"F:\\load\\"+s_FileName);
            EWEBOS.WebMsgStatus("TRUE", "文件保存成功!");
            EWEBOS.WebMsgSend();

        }


        /// <summary>
        /// 根据模板名称获取模板
        /// </summary>
        public void DoLoadTemplate()
        {

            //修改为取文件
            string s_FileName = EWEBOS.WebMsgGetString("TemplateID");
            string str = $"F:\\template\\"+s_FileName;
            EWEBOS.WebMsgSetFile("FileBody", str);
            EWEBOS.WebMsgStatus("TRUE", "文件加载成功!");
            EWEBOS.WebMsgSend();
        }

          

        #endregion



        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}