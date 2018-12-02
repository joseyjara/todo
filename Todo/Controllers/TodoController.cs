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
    
        // GET: Todo
        [HttpGet("[action]")]
        public IEnumerable<Todo> GetTodos()
        {
            return listOfTodos;
        }

        #region unimplemented methods
        // GET: Todo/Details/5
        public ActionResult Details(int id)
        {
            return View();
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
}