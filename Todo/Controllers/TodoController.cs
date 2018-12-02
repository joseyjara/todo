using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Todo.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private Todo[] listOfTodos =
            {
            new Todo { todoKey = 1, name = "Groceries"},
            new Todo { todoKey = 2, name = "Home Repairs" },
            new Todo { todoKey = 3, name = "Workouts" },
            new Todo { todoKey = 4, name = "Books to read" }
        };


        private TodoTask[] listOfTasks =
            {
            new TodoTask {TaskKey = 1, TodoKey=1,TaskName="lettuce", Completed=false },
            new TodoTask {TaskKey = 2, TodoKey=1,TaskName="Tomatoes", Completed=false },
            new TodoTask {TaskKey = 3, TodoKey=1,TaskName="Peppers", Completed=false },
            new TodoTask {TaskKey = 4, TodoKey=1,TaskName="Pineapple", Completed=false },
            new TodoTask {TaskKey = 5, TodoKey=1,TaskName="Milk", Completed=false },
            new TodoTask {TaskKey = 6, TodoKey=2,TaskName="Master bathroom sink", Completed=false },
            new TodoTask {TaskKey = 7, TodoKey=2,TaskName="Kitchen sink", Completed=false },
            new TodoTask {TaskKey = 8, TodoKey=2,TaskName="Buy kitchen faucet", Completed=false },
            new TodoTask {TaskKey = 9, TodoKey=2,TaskName="Re-do deck", Completed=false },
            new TodoTask {TaskKey = 10, TodoKey=3,TaskName="Chest", Completed=false },
            new TodoTask {TaskKey = 11, TodoKey=3,TaskName="Biceps", Completed=false },
            new TodoTask {TaskKey = 12, TodoKey=3,TaskName="Shoulders", Completed=false },
            new TodoTask {TaskKey = 13, TodoKey=3,TaskName="Triceps", Completed=false },
            new TodoTask {TaskKey = 14, TodoKey=4,TaskName="C# for dummies", Completed=false },
            new TodoTask {TaskKey = 15, TodoKey=4,TaskName="Typescript for dummies", Completed=false },
        };


    
        // GET: Todo
        [HttpGet("[action]")]
        public IEnumerable<Todo> GetTodos()
        {
            return listOfTodos;
        }

        #region unimplemented methods
        // GET: Todo/Details/5
        [HttpGet("[action]")]
        public Todo GetTodoDetails(int todoKey)
        {
            var todoDetails = listOfTodos.First(x => x.todoKey == todoKey);
            return todoDetails;
        }

        [HttpGet("[action]")]
        public IEnumerable<TodoTask> GetTodoTasks(int todoKey)
        {
            var taskListForTodo = listOfTasks.Where(x => x.TodoKey == todoKey);
            return taskListForTodo;
        }

        // POST: Todo/Create
        [HttpPost("[action]")]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction();
            }
            catch
            {
                return View();
            }
        }

        // GET: Todo/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Todo/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction();
            }
            catch
            {
                return View();
            }
        }

        // GET: Todo/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }
        #endregion

    }

    public class Todo
    {
        public int todoKey { get; set; }
        public string name { get; set; }
    }

    public class TodoTask
    {
        public int TaskKey { get; set; }
        public int TodoKey { get; set; }
        public string TaskName { get; set; }
        public bool Completed { get; set; }
    }
}