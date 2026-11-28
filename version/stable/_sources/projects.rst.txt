.. _ref_projects:

Projects
========

Explore the complete ecosystem of the MCPs built with PyAnsys libraries. Each MCP provides
AI-powered integration with a specific Ansys application, enabling seamless automation
and intelligent workflows.

.. raw:: html

   <div style="padding: 1rem; background: #f9f9f9; border-radius: 0.5rem; margin-bottom: 2rem; border: 2px solid">
     <p style="margin: 0;"><strong>💡 Tip:</strong> Want to install all MCPs at once? See <a href="getting-started/index.html">Getting started</a> in the PyAnsys MCP documentation for metapackage installation instructions.</p>
   </div>


.. jinja:: project_context

    .. raw:: html

        {% from "_templates/project_card.html" import render_card %}
        <div class="projects">
            {% for project, metadata in projects['projects'].items() %}
                {{ render_card(metadata) | indent(20) }}
            {%- endfor %}
        </div>
