# PyAnsys Model Context Protocol (MCP) Hub

The PyAnsys MCP Hub brings together all Model Context Protocols (MCPs) for ANSYS applications, enabling seamless AI-powered automation and workflows. This repository serves as the central hub and documentation site for the PyAnsys MCP ecosystem.

## Installation

### Install All MCPs

Get the complete PyAnsys MCP ecosystem:

```bash
pip install ansys-mcp-metapackage
```

### Install Individual MCPs

Pick the MCPs you need for your workflow:

```bash
pip install pymapdl-mcp
pip install pyfluent-mcp
pip install pymechanical-mcp
pip install pyaedt-mcp
pip install pylumerical-mcp
```

## Documentation

The documentation website provides detailed information about each MCP, including:
- API documentation
- Usage examples
- Integration guides
- Best practices

## Building the Documentation

### Install Dependencies

```bash
uv sync --group doc
```

### Generate Documentation

```bash
cd doc
make clean html
```

### View Documentation

Open the generated documentation in your browser:

```bash
doc/_build/html/index.html
```

## What are Model Context Protocols (MCPs)?

Model Context Protocols (MCPs) are standardized interfaces that connect Large Language Models (LLMs) and AI tools directly to ANSYS applications. With MCPs, you can:

- Generate simulation code from natural language descriptions
- Automate repetitive simulation tasks
- Get AI-assisted recommendations for simulation setup and optimization
- Integrate ANSYS workflows into your AI-powered applications

Each PyAnsys MCP implements the [Model Context Protocol specification](https://modelcontextprotocol.io/), ensuring compatibility with Claude, GPT, and other MCP-compatible AI tools.

## Contributing

We welcome contributions and feedback! Please:

- Report issues on the relevant MCP repository
- Share ideas in our [discussions](https://github.com/ansys/pyansys-mcp/discussions)
- Check out individual MCP repositories for contribution guidelines

## License

Licensed under the Apache License 2.0, see the [LICENSE](LICENSE) file for details.