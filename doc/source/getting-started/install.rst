.. _ref_install:

Installation
============

Install individual MCPs
------------------------

You can install MCPs for specific Ansys applications as standalone packages. Install only
the MCPs you need:

.. code:: bash

    python -m pip install ansys-<product>-mcp

For a complete list of available MCPs, see the :ref:`ref_projects` page.


.. vale Google.Headings = NO

Install the PyAnsys MCP metapackage
-----------------------------------

.. vale Google.Headings = YES

The PyAnsys MCP metapackage is a Python package that you can install with
standard Python package tools.

Online installation
~~~~~~~~~~~~~~~~~~~

Install the PyAnsys MCP metapackage from `PyPI`_:

.. code:: bash

    python -m pip install pyansys-mcp

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

#. Download the wheelhouse artifact for your platform:

   .. jinja:: wheelhouse

       .. csv-table::
          :header-rows: 1
          :widths: 16, 28, 28, 28

          :fas:`laptop` Platform,
          {%- for python in SUPPORTED_PYTHON_VERSIONS -%}
          :fab:`python` Python {{ python }}
          {%- if not loop.last -%},{%- endif -%}
          {% endfor %}
          {% for platform, icon in wheelhouse.items() -%}
          :fab:`{{ icon }}` {{ platform }},
          {%- for python in SUPPORTED_PYTHON_VERSIONS -%}
          {%- if "dev" in VERSION -%}
          `Download wheelhouse <https://github.com/ansys/pyansys-mcp/releases/download/{{ LAST_RELEASE }}/pyansys-mcp-{{ LAST_RELEASE }}-all-wheelhouse-{{ platform }}-{{ python }}.zip>`__
          {%- else -%}
          `Download wheelhouse <https://github.com/ansys/pyansys-mcp/releases/download/v{{ VERSION }}/pyansys-mcp-v{{ VERSION }}-all-wheelhouse-{{ platform }}-{{ python }}.zip>`__
          {%- endif -%}
          {%- if not loop.last -%},{%- endif -%}
          {% endfor %}
          {% endfor %}

#. Decompress the artifact:

   .. code-block:: bash

       unzip <path/to/wheelhouse.zip> wheelhouse

#. Install the metapackage from the local wheelhouse:

   .. code-block:: bash

       python -m pip install pyansys-mcp -f wheelhouse --no-index --upgrade --ignore-installed
