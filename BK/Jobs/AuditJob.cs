using FluentScheduler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using BK.Context;
using System.Text;
using System.IO;

namespace BK.Jobs
{
    public class AuditJob : IJob, IRegisteredObject
    {
        private readonly object _lock = new object();

        private bool _shuttingDown;

        public AuditJob()
        {
            // Register this job with the hosting environment.
            // Allows for a more graceful stop of the job, in the case of IIS shutting down.
            HostingEnvironment.RegisterObject(this);
        }

        public void Execute()
        {
            try
            {
                lock (_lock)
                {
                    if (_shuttingDown)
                        return;

                    GenerateAudit();
                }
            }
            finally
            {
                // Always unregister the job when done.
                HostingEnvironment.UnregisterObject(this);
            }
        }

        public void Stop(bool immediate)
        {
            // Locking here will wait for the lock in Execute to be released until this code can continue.
            lock (_lock)
            {
                _shuttingDown = true;
            }

            HostingEnvironment.UnregisterObject(this);
        }

        private void GenerateAudit()
        {
            List<bk_AuditReport_Result> result = null;

            using (bkContext context = new bkContext())
            {
                result = context.bk_AuditReport().ToList();
            }

            if (result == null)
                return;

            var auditTypes = Enum.GetValues(typeof(AuditTypes));

            string baseString = @"<tr><td>{0}</td><td>{1}</td></tr>";
            string templatePath = System.Web.Hosting.HostingEnvironment.MapPath("~/HtmlTemplates/audit.html");
            string html = File.ReadAllText(templatePath);

            StringBuilder builder = new StringBuilder();

            foreach(int auditType in auditTypes)
            {
                builder.Clear();

                var tResult = result.Where(x => x.AuditType == auditType).ToList();

                if (tResult != null && tResult.Count > 0)
                {
                    foreach(var item in tResult)
                    {
                        string member = string.Empty;
                        string family = string.Empty;

                        if (!item.FamilyId.HasValue)
                            item.FamilyId = 0;                        

                        if (item.FamilyId.HasValue && item.FamilyId.Value > 0)
                            family = string.Format("<a href='http://brahmkshatriya.net.in/family/{0}'>{1}</a>", item.FamilyId.Value, item.FamilyName);

                        if (item.MemberId.HasValue && item.MemberId.Value > 0)
                            member = string.Format("<a href='http://brahmkshatriya.net.in/member/{0}/{1}'>{2}</a>", item.FamilyId.Value, item.MemberId.Value, item.MemberName);

                        builder.AppendLine(string.Format(baseString, family, member));
                    }                    
                }

                string placeholder = "{{" + string.Format("audit_{0}", auditType) + "}}";
                string textResult = builder.ToString();
                if (string.IsNullOrWhiteSpace(textResult))
                    textResult = "No discrepancy found on this audit.";

                html = html.Replace(placeholder, textResult);
            }                        
        }
    }
}