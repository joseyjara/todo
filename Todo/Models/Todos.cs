using System;
using System.Collections.Generic;

namespace Todo.Models
{
    public partial class Todos
    {
        public Todos()
        {
            //Tasks = new HashSet<Tasks>();
        }

        public int TodoKey { get; set; }
        public string TodoListName { get; set; }

        public ICollection<Tasks> Tasks { get; set; }
    }
}
