.. _ref_install:

Install
=======

PyAnsys MCP metapackage
-----------------------

The PyAnsys MCP metapackage is distributed as a Python library. Its installation
follows the standard Python package installation process.

Online installation
~~~~~~~~~~~~~~~~~~~

Download and install PyAnsys MCP metapackage from `PyPI`_:


.. code:: bash

    python -m pip install ansys-mcp-metapackage


The PyAnsys MCP |version| metapackage includes the following projects:

.. jinja:: dependencies

    .. raw:: html

        <!-- Initialize DataTables -->
        <script>
            $(document).ready(function() {
                $('#pyansys-mcp-projects').DataTable();
            });
        </script>

        <!-- Populate and render the table -->
        <table id="pyansys-mcp-projects" class="display" style="width:100%">
            <thead>
                <tr>
                    <th>PyAnsys MCP project</th>
                    <th>Version</th>
                </tr>
            </thead>
            <tbody>
                {% for project, version in dependencies.items() %}
                <tr>
                    <td>{{ project }}</td>
                    <td><a href="https://pypi.org/project/{{ project }}/{{ version }}">{{ version }}</a></td>
                </tr>
                {% endfor %}
            </tbody>
        </table>

Offline installation
~~~~~~~~~~~~~~~~~~~~

Start by downloading the wheelhouse artifact for your platform:

.. jinja:: wheelhouse

    .. raw:: html

        <table class="display" style="width:100%">
            <thead>
                <tr>
                    <th>Platform</th>
                    {% for python in SUPPORTED_PYTHON_VERSIONS %}
                    <th>Python {{ python }}</th>
                    {% endfor %}
                </tr>
            </thead>
            <tbody>
                {% for platform, icon in wheelhouse.items() %}
                <tr>
                    <td><i class="fab fa-{{ icon }}"></i> {{ platform }}</td>
                    {% for python in SUPPORTED_PYTHON_VERSIONS %}
                    <td>
                        {% if "dev" in VERSION %}
                        <a href="https://github.com/ansys/pyansys-mcp/releases">Download wheelhouse</a>
                        {% else %}
                        <a href="https://github.com/ansys/pyansys-mcp/releases/download/v{{ VERSION }}/ansys-mcp-metapackage-v{{ VERSION }}-wheelhouse-{{ platform }}-{{ python }}.zip">Download wheelhouse</a>
                        {% endif %}
                    </td>
                    {% endfor %}
                </tr>
                {% endfor %}
            </tbody>
        </table>

Next, decompress the artifact:

.. code-block:: bash

    unzip <path/to/wheelhouse.zip> wheelhouse

Finally, install from the local wheelhouse:

.. code-block:: bash

    python -m pip install ansys-mcp-metapackage -f wheelhouse --no-index --upgrade --ignore-installed


Per-project installation
------------------------

Each PyAnsys MCP is also available as a standalone package. You can install them individually
if you only need specific solvers.

Check the :ref:`ref_projects` page for a complete list of available MCPs.
