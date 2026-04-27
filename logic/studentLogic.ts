
export const calculateStudentMetrics = (student) => {
  // Academic Standing Logic
  let academicStanding = "Good Standing";
  if (student.gpa >= 3.5) academicStanding = "Honor Roll";
  else if (student.gpa < 2.0) academicStanding = "Probation";

  // Enrollment Load Logic
  let enrollmentLoad = "Part-Time";
  if (student.units >= 12) enrollmentLoad = "Full-Time";
  if (student.units > 18) enrollmentLoad = "Overload";

  // Registration Hold Logic 
  const hasUnpaidDues = student.unpaidDues > 0;
  const isOnProbation = academicStanding === "Probation";
  const registrationHold = hasUnpaidDues || isOnProbation;

  // 4. Risk Level Logic
  let riskLevel = "Low";
  if (isOnProbation && hasUnpaidDues) riskLevel = "High";
  else if (isOnProbation || hasUnpaidDues) riskLevel = "Medium";

  return {
    academicStanding,
    enrollmentLoad,
    registrationHold,
    riskLevel,
  };
};