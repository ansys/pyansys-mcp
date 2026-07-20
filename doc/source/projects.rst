.. _ref_projects:

Projects
========

Explore the complete ecosystem of PyAnsys Model Context Protocols. Each MCP provides 
AI-powered integration with a specific ANSYS application, enabling seamless automation 
and intelligent workflows.

.. raw:: html

   <div style="padding: 1rem; background: #f9f9f9; border-radius: 0.5rem; margin-bottom: 2rem; border: 2px solid">
     <p style="margin: 0;"><strong>💡 Tip:</strong> Want all MCPs at once? Install the <code>ansys-mcp-metapackage</code> instead. See the <a href="getting-started/index.html">Getting Started</a> guide for installation instructions.</p>
   </div>


.. jinja:: project_context

    .. raw:: html

        {% from "_templates/project_card.html" import render_card %}
        <div class="projects">
            {% for project, metadata in projects['projects'].items() %}
                {{ render_card(metadata) | indent(20) }}
            {%- endfor %}
        </div>
