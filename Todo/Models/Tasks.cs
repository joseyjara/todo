using System;
using System.Collections.Generic;

namespace Todo.Models
{
    public partial class Tasks
    {
        public int TaskKey { get; set; }
        public int TodoKey { get; set; }
        public string TaskDescription { get; set; }
        public bool? Completed { get; set; }

        public Todos TodoKeyNavigation { get; set; }
    }
}
