# PyAnsys MCP

PyAnsys MCP is a metapackage that helps you discover and install Model Context Protocol (MCP)
servers built with PyAnsys libraries. These MCPs connect large language models (LLMs) and
AI tools to Ansys applications.

With these MCPs, you can:

- Generate simulation code from natural language prompts.
- Automate repetitive simulation tasks.
- Get AI-assisted recommendations for simulation setup and optimization.
- Integrate Ansys workflows into your AI-powered applications.

Each MCP follows the [Model Context Protocol](https://modelcontextprotocol.io/) standard, so it works with Claude, GPT, and other MCP-compatible AI tools.

## Installation

You can install all MCPs or only the ones you need for your workflows.

### Install all MCPs

Install all MCPs in the metapackage:

```bash
pip install pyansys-mcp
```

### Install individual MCPs

Install only the MCPs you need for your workflows:

```bash
pip install ansys-<product>-mcp
```

## Contributing

You can contribute to this project and share feedback:

- Report issues in the relevant MCP repository.
- Share ideas on the [PyAnsys MCP Discussions](https://github.com/ansys/pyansys-mcp/discussions) page.
- Review the contribution guidelines in the individual MCP repositories.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
