# Repository Guidelines

## Project Structure & Module Organization

This workspace currently contains one Word document, `Ke_hoach_Bai_test_Bai_tap_cua_toi.docx`, at the repository root. There are no source-code, test, or asset directories and no build configuration. Keep related documents at the root while the collection remains small. Introduce directories such as `docs/` or `assets/` only when additional material makes them useful, and update this guide when the structure changes.

## Build, Test, and Development Commands

No build system, package manager, or automated development commands are configured. Edit the `.docx` file using a compatible word processor and save it in its existing format.

Useful PowerShell checks:

- `Get-ChildItem -Force`: inspect the workspace, including hidden files.
- `Get-ChildItem -Recurse -File`: review files before submitting changes.

If executable code is introduced, document its setup, run, and test commands alongside it.

## Document Style & Naming Conventions

Preserve the document's language, heading hierarchy, and formatting conventions. Use descriptive filenames with underscores, following the existing document's naming pattern. Avoid ambiguous names such as `final2.docx` and unnecessary duplicate copies.

For Markdown, use descriptive headings, short paragraphs, and fenced blocks for multiline commands. No formatter or linter is currently configured.

## Validation Guidelines

No automated tests or coverage requirements exist. After each document edit, reopen the saved file and check headings, tables, page breaks, fonts, and any links. Confirm that the file opens without repair warnings. Review the full document when layout changes can affect later pages.

## Commit & Pull Request Guidelines

No Git metadata or commit history is available, so no established commit convention can be inferred. If version control is introduced, use concise, imperative subjects such as `docs: clarify exercise plan`.

Describe what changed and why in each pull request. Reference related tasks when available, summarize manual validation, and include before-and-after screenshots for meaningful layout changes. Exclude temporary Word lock files such as `~$*.docx`.
