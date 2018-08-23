using FluentScheduler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using BK.Context;

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

            var tResult = result.Where(x => x.AuditType == (int)AuditTypes.AliveWithoutDOB).ToList();
            if (tResult != null && tResult.Count > 0)
            {
                
            }
            else
            {

            }

        }
    }
}