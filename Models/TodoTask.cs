using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TaskManager.Models
{
    public enum PriorityLevel
    {
        Low,
        Medium,
        High
    }

    public class TodoTask
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Due Date")]
        public DateTime? DueDate { get; set; }

        [Display(Name = "Completed")]
        public bool IsCompleted { get; set; }

        public string? UserId { get; set; }
        public virtual IdentityUser? User { get; set; }

        [Required]
        [Display(Name = "Priority")]
        public PriorityLevel Priority { get; set; } = PriorityLevel.Medium;
    }
}