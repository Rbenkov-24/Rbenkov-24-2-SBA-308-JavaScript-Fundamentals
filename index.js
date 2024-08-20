// Information about the course
const courseInfo = {
  id: 101,
  name: "Advanced Web Development",
};

// Information about a group of assignments in the course
const assignmentGroup = {
  id: 1,
  name: "Homework Assignments",
  course_id: 101,
  group_weight: 50, //the weight of the assignment group
  assignments: [
    {
      id: 1,
      name: "HTML & CSS",
      due_at: "2024-09-01",
      points_possible: 100,
    },
    {
      id: 2,
      name: "JavaScript Basics",
      due_at: "2024-09-05",
      points_possible: 150,
    },
    {
      id: 3,
      name: "React Introduction",
      due_at: "2024-09-10",
      points_possible: 200,
    },
  ],
};

// Information about learners submissions
const learnerSubmissions = [
  {
    learner_id: 1,
    assignment_id: 1,
    submission: {
      submitted_at: "2024-09-01",
      score: 90,
    },
  },
  {
    learner_id: 1,
    assignment_id: 2,
    submission: {
      submitted_at: "2024-09-06",
      score: 120,
    },
  },
  {
    learner_id: 1,
    assignment_id: 3,
    submission: {
      submitted_at: "2024-09-09",
      score: 180,
    },
  },
  {
    learner_id: 2,
    assignment_id: 1,
    submission: {
      submitted_at: "2024-08-31",
      score: 95,
    },
  },
  {
    learner_id: 2,
    assignment_id: 2,
    submission: {
      submitted_at: "2024-09-05",
      score: 130,
    },
  },
  {
    learner_id: 2,
    assignment_id: 3,
    submission: {
      submitted_at: "2024-09-11",
      score: 190,
    },
  },
];

// Calculating the learners's average score 
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  try {
    // Validating if assignment group belongs to the correct course
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error("Assignment group does not match the course ID.");
    }

    // Initializing an object to store the result
    const result = {};

    // Processing each learner's submissions
    for (const submission of learnerSubmissions) {
      const assignment = assignmentGroup.assignments.find(
        (a) => a.id === submission.assignment_id
      );
      if (!assignment) {
        continue; // Skip the current iteration if assignment not found
      }

      // Checking if the assignment is past due
      const assignmentDueDate = new Date(assignment.due_at);
      const submissionDate = new Date(submission.submission.submitted_at);

      // Adjusting score for late submissions
      let score = submission.submission.score;
      if (submissionDate > assignmentDueDate) {
        score *= 0.9; // if the submission is late, the score will be multiplied by 0.9 to deduct 10%
      }

      // Initializing learner result if not already present
      if (!result[submission.learner_id]) {
        result[submission.learner_id] = { id: submission.learner_id, avg: 0 };
      }

      // Calculating percentage score for the assignment
      const percentageScore = (score / assignment.points_possible) * 100;
      result[submission.learner_id][assignment.id] = percentageScore;

      // Calculate weighted average
      result[submission.learner_id].avg +=
        percentageScore * (assignmentGroup.group_weight / 100);
    }

    // Converting the result object to an array of objects
    return Object.values(result);
  } catch (error) {
    console.error("Problem with calculating learner scores:", error.message);
    return [];// Return an empty array if there's an error
  }
}

// Call the function to get lerner dataaa
const output = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);

console.log("Learner Scores:");
console.log(output);
