using FluentScheduler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK.Jobs
{
    public class bkJobRegistry : Registry
    {
        public bkJobRegistry()
        {
            Schedule<AuditJob>().ToRunEvery(1).Weeks().On(DayOfWeek.Sunday).At(6,0);
        }
    }
}