# pi-todo (local fork of `@juicesharp/rpiv-todo`)

Local fork, installed via a path in `~/.pi/agent/settings.json`
(`pi install /Users/nathanp/Code/pi-todo`). It replaced
`npm:@juicesharp/rpiv-todo@2.12.0` so the patch below cannot be silently
overwritten by `pi update --extensions`.

## Divergence from upstream 2.12.0

**`todo-overlay.ts` — the `Todos (done/total)` heading now counts the whole
list, not the visible slice.**

Completed rows are hidden at the start of the next turn
(`hideCompletedTasksFromPreviousTurn`). The heading count was computed from the
*already-filtered* task list, so after a turn that checked off 5 of 9 tasks the
next turn rendered `Todos (0/4)` — the completed work vanished from both the
rows and the count, which reads as "the agent never checked anything off".

```diff
-const counts = selectTodoCounts(overlayState);
+const counts = selectTodoCounts({
+  tasks: snapshot.tasks.filter((task) => task.status !== "deleted"),
+  nextId: snapshot.nextId,
+});
```

`selectHasActive` / `selectShowTaskIds` still read `overlayState` (the visible
set) because they describe the rows actually drawn. The rows are still hidden as
designed — only the count is now cumulative. Note the panel still disappears
once every task is completed and hidden, which is the upstream "finished work
gets out of the way" behavior.

## Also added for local development

- `tsconfig.json` + `devDependencies` (`typescript`, the pi packages, `typebox`)
  so `npx tsc --noEmit` works.
- `types/rpiv-i18n.d.ts` — typecheck-only shim for the optional
  `@juicesharp/rpiv-i18n` peer, which is not installed here or on the host. It
  exists so `tsc` is clean without installing that peer into `node_modules`
  (which would make the fork resolve its own copy at runtime). Delete the shim
  if that package is ever installed alongside this fork.

## Re-syncing with upstream

```sh
npm pack @juicesharp/rpiv-todo@<version>          # or download from npm
# diff the published tree against this one, reapply the counts patch,
# and re-check the two added-for-dev files above
```

Nothing else is intentionally changed.
