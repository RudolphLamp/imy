import { test } from "node:test";
import assert from "node:assert/strict";
import { completeModule, completedModules } from "../src/utils/learning.js";

test("a four-module journey ends at 100% with a stable completion date", () => {
  let record = { courseId: "1", progress: 0, completedModules: [] };
  const percentages = [];
  for (let index = 0; index < 4; index++) {
    record = completeModule(record, index, 4, "2026-10-27T08:00:00Z");
    percentages.push(record.progress);
  }
  assert.deepEqual(percentages, [25, 50, 75, 100]);
  assert.equal(record.completedAt, "2026-10-27T08:00:00Z");
  assert.equal(
    completeModule(record, 3, 4),
    record,
    "reviewing completed material must not reset progress",
  );
});

test("repeated completion cannot count the same module twice", () => {
  const first = completeModule({ progress: 0 }, 0, 4);
  assert.equal(completeModule(first, 0, 4), first);
  assert.equal(first.progress, 25);
});

test("legacy percentage records resume at the first unfinished module", () => {
  const legacy = { courseId: "1", progress: 50 };
  assert.deepEqual(completedModules(legacy, 4), [0, 1]);
  const next = completeModule(legacy, 2, 4);
  assert.equal(next.progress, 75);
  assert.equal(next.currentModule, 3);
  assert.equal(
    legacy.progress,
    50,
    "the original stored record must be unchanged",
  );
});

test("out-of-order modules still require all unique modules for completion", () => {
  let record = { progress: 0 };
  for (const index of [3, 1, 0]) record = completeModule(record, index, 4);
  assert.equal(record.progress, 75);
  assert.equal(record.currentModule, 2);
  assert.equal(record.completedAt, undefined);
  record = completeModule(record, 2, 4);
  assert.equal(record.progress, 100);
});

test("invalid module indexes do not modify progress", () => {
  const record = { progress: 0 };
  assert.equal(completeModule(record, -1, 4), record);
  assert.equal(completeModule(record, 4, 4), record);
});
