using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Todo.Models;
using Newtonsoft.Json;

namespace Todo.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoContext _context;
        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Todos> GetTodos()
        {
            var todoList = _context.Todos;
            return todoList;
        }

        [HttpGet("[action]")]
        public Todos GetTodoDetails(int todoKey)
        {
            var todoDetails = _context.Todos.First(x => x.TodoKey == todoKey);
            return todoDetails;
        }

        [HttpGet("[action]")]
        public IEnumerable<Tasks> GetTodoTasks(int todoKey)
        {
            var taskList = _context.Tasks.Where(x => x.TodoKey == todoKey).ToList();
            return taskList;
        }

        [HttpPatch("[action]")]
        public ActionResult UpdateTodo(int todoKey, [FromBody]JsonPatchDocument<Todos> data)
        {
            var todoToUpdate = _context.Todos.First(x => x.TodoKey == todoKey);
            data.ApplyTo(todoToUpdate);
            try
            {
                _context.SaveChanges();
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            return Ok();
        }

        [HttpPost("[action]")]
        public ActionResult SaveTasksBatch([FromBody]TasksBatch taskBatch, int todoKey)
        {
            string errors = string.Empty;
            if(taskBatch != null)
            {
                if(taskBatch.TasksKeysToDelete != null && taskBatch.TasksKeysToDelete.Count > 0)
                {
                    foreach(var taskKeyToDelete in taskBatch.TasksKeysToDelete)
                    {
                        try
                        {
                            var taskToDelete = _context.Tasks.FirstOrDefault(x => x.TaskKey == taskKeyToDelete);
                            if(taskToDelete != null)
                            {
                                _context.Remove(taskToDelete);
                            }
                        }catch(Exception ex)
                        {
                            errors += " " + ex.Message + ";";
                        }
                    }
                }
                if(taskBatch.TasksToCreate != null && taskBatch.TasksToCreate.Count > 0)
                {
                    foreach (var newTask in taskBatch.TasksToCreate)
                    {
                        Tasks task = new Tasks
                        {
                            Completed = newTask.Completed,
                            TaskDescription = newTask.TaskDescription,
                            TodoKey = todoKey
                        };
                        try
                        {
                            _context.Add(task);
                        }catch(Exception ex)
                        {
                            errors += " " + ex.Message + ";";
                        }
                    }
                }
                if(taskBatch.TasksToUpdate != null && taskBatch.TasksToUpdate.Count > 0)
                {
                    foreach (var task in taskBatch.TasksToUpdate)
                    {
                        try
                        {
                            var taskToUpdate = _context.Tasks.FirstOrDefault(x => x.TaskKey == task.TaskKey);
                            if (taskToUpdate != null)
                            {
                                taskToUpdate.TaskDescription = task.TaskDescription;
                                taskToUpdate.Completed = task.Completed ;
                            }
                        }
                        catch (Exception ex)
                        {
                            errors += " " + ex.Message + ";";
                        }
                    }
                }
                try
                {
                    _context.SaveChanges();
                }catch(Exception ex)
                {
                    errors += " " + ex.Message + ";";
                }
                if (errors.Length > 0)
                    return StatusCode(StatusCodes.Status400BadRequest, errors);
            }
            return Ok();
            
        }

        [HttpPost("[action]")]
        public ActionResult CreateTodo([FromBody]Todos newTodoDetails)
        {
            var newTodo = new Todos
            {
                TodoListName = newTodoDetails.TodoListName
            };

            _context.Todos.Add(newTodo);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status409Conflict, ex.Message);
            }

            return Ok(newTodo.TodoKey);
        }

        [HttpDelete("[action]")]
        public ActionResult DeleteTodo(int todoKey)
        {
            var tasksForTodoToDelete = _context.Tasks.Where(x => x.TodoKey == todoKey).ToList();
            foreach(var task in tasksForTodoToDelete)
            {
                _context.Remove(task);
            }

            var todoToDelete = _context.Todos.FirstOrDefault(x => x.TodoKey == todoKey);

            if(todoToDelete != null)
            {
                _context.Remove(todoToDelete);
            }

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }

            return Ok();
        }



        #region unimplemented methods



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

    public class TasksBatch
    {
        public List<Tasks>TasksToUpdate { get; set; }
        public List<Tasks> TasksToCreate { get; set; }
        public List<int> TasksKeysToDelete { get; set; }
    }
}



