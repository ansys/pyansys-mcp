"""PyAnsys MCP metapackage general package __init__ file."""

import importlib.metadata as importlib_metadata

# Read from the pyproject.toml
# major, minor, patch
__version__ = importlib_metadata.version(__name__.replace(".", "-"))
"""PyAnsys MCP metapackage version."""