.. _ref_index:

.. vale Google.Headings = NO

PyAnsys MCP
===========

.. vale Google.Headings = YES

PyAnsys MCP is a metapackage that helps you discover and install Model Context Protocol (MCP)
servers built with PyAnsys libraries. These MCPs connect large language models (LLMs) and
AI tools to Ansys applications.

With these MCPs, you can:

- Generate simulation code from natural language prompts.
- Automate repetitive simulation tasks.
- Get AI-assisted recommendations for simulation setup and optimization.
- Integrate Ansys workflows into your AI-powered applications.

Each MCP follows the `Model Context Protocol`_ standard, so it
works with Claude, GPT, and other MCP-compatible AI tools.

.. _Model Context Protocol standard: https://modelcontextprotocol.io/

.. jinja:: project_context

  .. raw:: html

    <!-- Swiper CSS/JS for carousels -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


    <!-- ===================== MCPs Section ===================== -->
    <section id="projects">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h2 style="margin: 0;">Available MCPs</h2>
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
      <h2>Why use MCPs?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3><i class="fa fa-robot"></i> Any AI client</h3>
          <p>Use Claude Desktop, GitHub Copilot, Cursor, or any other MCP-compatible client without additional configuration.</p>
        </div>
        <div class="feature-card">
          <h3><i class="fa fa-plug"></i> No custom connection code</h3>
          <p>Connect to Ansys applications without writing custom connection code. Your AI client only needs to know the tool names.</p>
        </div>
        <div class="feature-card">
          <h3><i class="fa fa-cubes"></i> One metapackage</h3>
          <p>Install the PyAnsys MCP metapackage to access all MCPs, or install individual MCP packages as needed.</p>
        </div>
        <div class="feature-card">
          <h3><i class="fa fa-layer-group"></i> Common foundation</h3>
          <p>Use the same base library for consistent sessions, errors, and tool patterns across solvers.</p>
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
          >Join the discussion</a>
        </div>
      </div>
    </section>

.. toctree::
   :maxdepth: 2
   :hidden:

   getting-started/index
   projects
