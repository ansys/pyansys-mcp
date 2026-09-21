.. _ref_what_are_mcps:

About MCPs
==========

The `Model Context Protocol <https://modelcontextprotocol.io/>`_ is an open
standard that Anthropic introduced to define how AI clients communicate with
external services. The protocol is language-agnostic and transport-agnostic.

- **Language-agnostic:** You can implement an MCP server in any programming
  language.
- **Transport-agnostic:** You can expose capabilities over ``stdio``, HTTP with
  Server-Sent Events, or WebSockets. Any MCP-compatible client can use them in
  the same way.

.. vale Google.Headings = NO

MCP primitives
--------------

.. vale Google.Headings = YES

The protocol defines three types of server-side primitives:

.. list-table::
   :header-rows: 1
   :widths: 15 45 40

   * - Primitive
     - Description
     - PyAnsys MCP usage examples
   * - Tools
     - Call named functions with inputs defined by a JSON schema, similar to
       function calling in the OpenAI API.
     - Launch a solver, run a script, and read files.
   * - Resources
     - Read data that the server exposes to the client, similar to ``GET``
       endpoints.
     - Expose mesh files, material databases, and simulation reports.
   * - Prompts
     - Reuse optionally parameterized prompt templates that help the client
       phrase requests consistently.
     - Provide consistent instructions and query patterns.

A typical interaction
---------------------

When you ask an MCP-compatible AI client (Claude Desktop, GitHub Copilot, Cursor,
or a custom agent) to run a simulation, the exchange looks roughly like this:

.. mermaid::

   %%{init: {'theme': 'default', 'themeVariables': {'fontSize': '20px', 'fontFamily': 'arial'}, 'sequence': {'width': 250, 'actorMargin': 80, 'messageMargin': 60}}}%%
   sequenceDiagram
       actor User
       participant Client as AI Client<br/>(Claude, Copilot, Cursor…)
       participant MCP as MCP Server<br/>(ansys-mapdl-mcp, ansys-fluent-mcp…)
       participant Solver as Ansys Solver<br/>(MAPDL, Fluent…)

       User->>Client: "Run a modal analysis and give me<br/>the first three natural frequencies."
       Client->>MCP: list_tools()
       MCP-->>Client: [open_session, run_script, get_results, …]

       Client->>MCP: call_tool("open_session", {…})
       MCP->>Solver: launch / connect
       Solver-->>MCP: session ready

       Client->>MCP: call_tool("run_script", {"script": "…"})
       MCP->>Solver: execute script
       Solver-->>MCP: solved

       Client->>MCP: call_tool("get_results", {"quantity": "frequency"})
       MCP->>Solver: read output
       Solver-->>MCP: [45.3, 112.7, 198.4] Hz
       MCP-->>Client: {"frequencies": [45.3, 112.7, 198.4], "unit": "Hz"}

       Client-->>User: "The first three natural frequencies<br/>are 45.3 Hz, 112.7 Hz, and 198.4 Hz."

The client never calls the solver directly. It uses the tools that the MCP
server advertises, and the server determines what those tools do.

.. vale Google.Headings = NO

PyAnsys Common MCP
------------------

.. vale Google.Headings = YES

.. raw:: html

   <div style="display: flex; gap: 0.5rem; margin-top: 1rem; margin-bottom: 1rem;">
       <a href="https://github.com/ansys/pyansys-common-mcp" target="_blank" rel="noopener" class="card-feedback-btn"><i class="fab fa-github"></i> View on GitHub</a>
       <a href="https://common-mcp.docs.pyansys.com/" target="_blank" rel="noopener" class="card-feedback-btn"><i class="fa fa-book"></i> Documentation</a>
   </div>


All PyAnsys MCPs use `PyAnsys Common MCP`_, which itself extends
`FastMCP <https://github.com/jlowin/fastmcp>`_, a high-level Python framework
for building MCP servers. FastMCP handles the protocol layer, including tool registration,
JSON schema generation, and transport. PyAnsys Common MCP adds everything
specific to the Ansys ecosystem:

- **Persistent Python sessions**: Maintains stateful code execution across multiple AI requests.
- **Lifecycle management**: Manages startup, cleanup, and errors automatically.
- **Extensible architecture**: Extends the library with product-specific base classes and patterns.
- **Logging infrastructure**: Uses preconfigured logging that does not interfere with the protocol.

If you are building a new PyAnsys MCP or contributing to an existing one,
start with PyAnsys Common MCP rather than FastMCP. For more information, see the
`PyAnsys Common MCP documentation <https://common-mcp.docs.pyansys.com/>`_.
