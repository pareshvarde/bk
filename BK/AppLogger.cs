using Microsoft.Practices.EnterpriseLibrary.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BK
{
    public class AppLogger
    {
        private static LogWriter _logWriter;

        public AppLogger()
        {
            if (_logWriter == null)
                InitApplogger();
        }

        public static void InitApplogger()
        {
            var factory = new LogWriterFactory();
            _logWriter = factory.Create();
        }

        public static void LogInfo(string msg, string category = "Logger")
        {
            if (_logWriter == null)
                InitApplogger();

            _logWriter.Write(msg, category, 0, -1, System.Diagnostics.TraceEventType.Information);
        }

        public static void LogException(Exception ex)
        {
            if (_logWriter == null)
                InitApplogger();

            if (ex is OperationCanceledException)
                return;            

            IDictionary<string, object> stackTrace = new Dictionary<string, object>();
            stackTrace.Add("StackTrace", ex.StackTrace);

            string errorText = ex.Message + "\n\n" + "Inner Exception:" + (ex.InnerException == null ? "" : ex.InnerException.Message) + "\n\n" + "Stack Trace:\n\t" + ex.StackTrace;
            var logEntry = new LogEntry(errorText, "Exception", -1, 0, System.Diagnostics.TraceEventType.Error, "", stackTrace);

            _logWriter.Write(logEntry);            
        }

        public void Dispose()
        {
            _logWriter.Dispose();
        }

        public static void DisposeWriter()
        {
            if (_logWriter != null)
                _logWriter.Dispose();
        }
    }
}