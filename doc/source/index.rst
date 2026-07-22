.. _ref_index:

.. vale Google.Headings = NO

PyAnsys Model Context Protocol (MCP)
====================================

.. vale Google.Headings = YES

Intelligent integration for ANSYS simulations. Connect your favorite LLMs and AI tools
directly to ANSYS applications. Build, automate, and optimize with AI-assisted workflows.


Discover all available PyAnsys MCPs in one place, or install them all at once with the metapackage.


.. jinja:: project_context

  .. raw:: html

    <!-- Swiper CSS/JS for carousels -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


    <!-- ===================== MCPs Section ===================== -->
    <section id="projects">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h2 style="margin: 0;">Available Model Context Protocols</h2>
        <a href="projects.html" class="btn btn-link">Browse all MCPs</a>
      </div>
      <div class="swiper">
        {% from "_templates/project_card.html" import render_card %}
        <div class="swiper-wrapper">
          {% for project, metadata in projects['projects'].items() %}
            <div class="swiper-slide">
              {{ render_card(metadata) | indent(14) }}
            </div>
          {% endfor %}
        </div>
        <!-- Pagination dots -->
        <div class="swiper-pagination"></div>
      </div>

      <script src="_static/landing-page/js/project_cards.js"></script>
    </section>

    <!-- ===================== Features Section ===================== -->
    <section id="features">
      <h2>Why PyAnsys MCPs?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3><i class="fa fa-robot"></i> Any AI client</h3>
          <p>Works with Claude Desktop, GitHub Copilot, Cursor, and any other MCP-compatible client out of the box.</p>
        </div>
        <div class="feature-card">
          <h3><i class="fa fa-plug"></i> No glue code</h3>
          <p>The MCP server handles the connection to the ANSYS application. Your AI client only needs to know the tool names.</p>
        </div>
        <div class="feature-card">
          <h3><i class="fa fa-cubes"></i> One package</h3>
          <p>Install <code>ansys-mcp-metapackage</code> to get all solvers at once, or pick individual MCPs as needed.</p>
        </div>
        <div class="feature-card">
          <h3><i class="fa fa-layer-group"></i> Common foundation</h3>
          <p>All MCPs share the same base library, so sessions, errors, and tool patterns are consistent across solvers.</p>
        </div>
      </div>
    </section>


    <!-- ===================== Contact CTA ===================== -->
    <section id="contact-cta">
      <div class="workflow-cta">
        <div class="workflow-cta-left">
          <div>
            <h3 class="workflow-cta-title">Have ideas or feedback?</h3>
            <p>Help us improve the PyAnsys MCP ecosystem. Share your thoughts and join our community discussions.</p>
          </div>
        </div>
        <div class="workflow-cta-btn-container">
          <a
            href="https://github.com/ansys/pyansys-mcp/discussions"
            class="workflow-cta-btn"
            target="_blank"
            rel="noopener"
          >Join the Discussion</a>
        </div>
      </div>
    </section>

.. toctree::
   :maxdepth: 2
   :hidden:

   getting-started/index
   projects
