// Some restricted Windows environments do not expose a POSIX-style user ID,
// while tsx uses it only to choose an isolated temporary directory name.
if (typeof process.geteuid !== "function") {
  process.geteuid = () => 0;
}
