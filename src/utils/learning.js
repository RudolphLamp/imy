export function completedModules(enrollment, total) {
  if (Array.isArray(enrollment?.completedModules))
    return [...new Set(enrollment.completedModules)].filter(
      (i) => Number.isInteger(i) && i >= 0 && i < total,
    );
  return Array.from(
    { length: Math.floor(((enrollment?.progress || 0) / 100) * total) },
    (_, i) => i,
  );
}

// Calculate the next record before setting React state: never read a value mutated
// inside a state updater to decide whether to show completion feedback.
export function completeModule(
  enrollment,
  moduleIndex,
  total,
  now = new Date().toISOString(),
) {
  const previous = completedModules(enrollment, total);
  if (moduleIndex < 0 || moduleIndex >= total || previous.includes(moduleIndex))
    return enrollment;
  const completed = [...previous, moduleIndex].sort((a, b) => a - b);
  const progress = Math.round((completed.length / total) * 100);
  return {
    ...enrollment,
    completedModules: completed,
    progress,
    currentModule:
      Array.from({ length: total }, (_, i) => i).find(
        (i) => !completed.includes(i),
      ) ?? 0,
    ...(progress === 100 ? { completedAt: enrollment.completedAt || now } : {}),
  };
}
